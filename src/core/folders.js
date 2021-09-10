import {computed, markRaw, ref, unref, watch} from "vue";
import {clearSearch} from "./search.js";
import {folderDummy, parseFlatScan} from "./entry.js";
import {dateToDayDateString} from "../util.js";
import {addMessage} from "./debug.js";
import {scanParser} from "./scan-parser.js";


/** @type {import("vue").Ref<ScanMeta>} */
export const meta = ref(null);
/** @type {import("vue").Ref<SimpleEntry>} */
const json = ref(null);
/**
 * @param {Blob|Response} input
 * @return {Promise<void>}
 */
export async function setScan(input) {
    const {
        meta: scanMeta,
        root: rootEntry
    } = await scanParser(input);

    meta.value = markRaw(scanMeta);
    json.value = markRaw(rootEntry);
    globalThis.json = rootEntry;

    openFolder(rootEntry);
    clearSearch();
}

/** @type {import("vue").ComputedRef<string>} */
export const separator = computed(() => {
    return meta.value?.separator || "/";
});
/** @type {import("vue").ComputedRef<string[]>} */
export const scanRootPath = computed(() => {
    return meta.value?.path || [];
});


/** @type {import("vue").Ref<SimpleEntry>} */
export const openedFolder = ref(folderDummy);
/** @type {import("vue").ComputedRef<SimpleEntry[]>} */
export const openedFolders = computed(() => {
    return openedFolder.value.path;
});

/** @param {SimpleEntry} entry */
export function openFolder(entry) {
    clearSearch();
    openedFolder.value = markRaw(unref(entry));
}
export function goBack() {
    if (openedFolder.value.parent) {
        openFolder(openedFolder.value.parent);
    }
}
/** @type {import("vue").ComputedRef<Boolean>} */
export const empty = computed(() => json.value && openedFolder.value.isEmpty);


watch(meta, async (newValue, oldValue) => {
    console.log("[meta]:", meta.value);
    const {files, folders, symlinks, errors, total, scanDate} = meta.value;
    if (meta.value.scanDate) {
        addMessage(
            `files: "${files}" folders: "${folders}", symlinks: "${symlinks}", ` +
            `errors: "${errors}", total: "${total}", scanDate: "${dateToDayDateString(scanDate)}"`
        );
    }
});
