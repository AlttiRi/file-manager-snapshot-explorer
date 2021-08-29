/**
 * Meta info of a scan.
 * @typedef {Object} Meta
 * @property {String[]} path
 * @property {String} separator
 * @property {Number} scanDate
 * @property {String} platform
 * @property {Number} files
 * @property {Number} folders
 * @property {Number} symlinks
 * @property {Number} fifos
 * @property {Number} charDevs
 * @property {Number} blockDevs
 * @property {Number} sockets
 * @property {Number} unknowns
 * @property {Number} total
 * @property {Number} errors
 * @property {Error[]} unknownErrors
 */

/**
 * Scan error.
 * @typedef {Object} ScanError
 * @property {String} syscall - "scandir", "readlink", ...
 * @property {String} code    - "EPERM", ...
 * @property {Number} errno   - "-4048", ...
 * @property {String} path    - "C:\System Volume Information", ...
 */

/**
 * @typedef {
 * "folder" |
 * "file" |
 * "symlink" |
 * "fifo" |
 * "charDev" |
 * "blockDev" |
 * "socket"
 * } EntryType
 */

/**
 * Additional properties.
 * @typedef {Object} EntryMeta
 * @property {String?} pathTo - where symlink goes (Absolute path)
 */

export class SimpleEntry {
    // [Symbol.toStringTag] = "SimpleEntry"; // Disables reactivity, BTW.
    /**
     * @param {String} name
     * @param {SimpleEntry|null} parent
     * @param {EntryType} type
     * @param {EntryMeta?} meta
     * @param {ScanError[]?} errors
     */
    constructor({name, parent, type, meta, errors}) {
        Object.assign(this, {name, parent, type});
        if (meta) {
            Object.assign(this, {meta});
        }
        if (errors) {
            Object.assign(this, {errors});
        }
    }
    /** @param {SimpleEntry} entry */
    addChild(entry) {
        if (!this.children) {
            /** @type {SimpleEntry[]} */
            this.children = [];
        }
        this.children.push(entry);
    }

    /** @return {SimpleEntry[]} */
    get folders() {
        return this.children?.filter(e => e.type === "folder") || [];
    }
    /** @return {SimpleEntry[]} */
    get files() {
        return this.children?.filter(e => e.type === "file") || [];
    }
    /** @return {SimpleEntry[]} */
    get symlinks() {
        return this.children?.filter(e => e.type === "symlink") || [];
    }

    /** @return {SimpleEntry[]} */
    get fifos() {
        return this.children?.filter(e => e.type === "fifo") || [];
    }
    /** @return {SimpleEntry[]} */
    get charDevs() {
        return this.children?.filter(e => e.type === "charDev") || [];
    }
    /** @return {SimpleEntry[]} */
    get blockDevs() {
        return this.children?.filter(e => e.type === "blockDev") || [];
    }
    /** @return {SimpleEntry[]} */
    get sockets() {
        return this.children?.filter(e => e.type === "socket") || [];
    }

    /** @return {Boolean} */
    get isEmpty() {
        return !Boolean(this.children?.length);
    }
    /** @return {Boolean} */
    get hasErrors() {
        return Boolean(this.errors?.length);
    }
    /** @return {SimpleEntry} */
    get root() {
        if (!this.parent) {
            return this;
        }
        return this.parent.root;
    }
    /** @return {SimpleEntry[]} */
    get path() {
        if (!this.parent) {
            return [this];
        }
        return [...this.parent.path, this];
    }
}

/**
 * @param {Object} rootFolder
 * @param {SimpleEntry|null} parent
 * @return {SimpleEntry}
 */
export function parseEntries(rootFolder, parent = null) {
    const root = new SimpleEntry({
        name: rootFolder.name,
        type: "folder",
        errors: rootFolder.errors,
        parent
    });
    if (rootFolder.folders) {
        rootFolder.folders.forEach(folder => {
            root.addChild(parseEntries(folder, root));
        });
    }
    /** @type {EntryType[]} */
    const simpleTypes = ["file", "fifo", "charDev", "blockDev", "socket"];
    simpleTypes.forEach(type => {
        if (rootFolder[type+"s"]) {
            rootFolder[type+"s"].forEach(file => {
                root.addChild(new SimpleEntry({
                    name: file,
                    parent: root,
                    type: type
                }));
            });
        }
    });
    if (rootFolder.symlinks) {
        rootFolder.symlinks.forEach(symlink => {
            if (typeof symlink === "string") { // for old scans
                root.addChild(new SimpleEntry({
                    name: symlink,
                    parent: root,
                    type: "symlink"
                }));
                return;
            }
            const meta = symlink.pathTo ? {
                pathTo: symlink.pathTo
            } : null;
            root.addChild(new SimpleEntry({
                name: symlink.name,
                parent: root,
                type: "symlink",
                meta,
                errors: symlink.errors
            }));
        });
    }
    return root;
}

/** @type {SimpleEntry} */
export const folderDummy = new SimpleEntry({
    name: "",
    parent: null,
    type: "folder"
});
