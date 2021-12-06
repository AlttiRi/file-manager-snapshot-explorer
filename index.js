var e=Object.defineProperty,t=("undefined"!=typeof require&&require,(t,n,a)=>(((t,n,a)=>{n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a})(t,"symbol"!=typeof n?n+"":n,a),a));import{r as n,c as a,i as s,t as o,w as r,a as i,m as l,u as c,p as u,b as d,o as p,d as f,e as h,f as m,g as v,h as y,j as g,n as b,k as S,l as w,F as z,q as k,s as D,v as T,x as M,y as j,z as x,A as _,B as $,C,D as P,E as I,G as E}from"./vendor.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))processPreload(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&processPreload(e)})).observe(document,{childList:!0,subtree:!0})}function processPreload(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const L=globalThis.setImmediate||function(){const{port1:e,port2:t}=new MessageChannel,n=[];return e.onmessage=function(){n.shift()()},function(e){t.postMessage(null),n.push(e)}}();function sleep(e){return new Promise(void 0===e?e=>L(e):t=>setTimeout(t,e))}const W=["mp4","webm","mkv","avi"];const O=["png","jpg","jpeg","gif","tiff","webp"];function dateToDayDateString(e,t=!0){const n=new Date(e);function pad2(e){return e.toString().padStart(2,"0")}"Invalid Date"===n.toString()&&console.warn("Invalid Date value: ",e);const a=t?"UTC":"",s=n[`get${a}FullYear`](),o=n[`get${a}Month`]()+1,r=n[`get${a}Date`]();return s+"."+pad2(o)+"."+pad2(r)}function dateToDayDateTimeString(e,t=!0){const n=new Date(e);function pad2(e){return e.toString().padStart(2,"0")}const a=t?"UTC":"",s=n[`get${a}Hours`](),o=n[`get${a}Minutes`](),r=n[`get${a}Seconds`](),i=pad2(s)+":"+pad2(o)+":"+pad2(r);return dateToDayDateString(n,t)+" "+i+(t?"Z":"")}async function*iterateAsyncDataSource(e){if(e instanceof Response&&(e=e.body),e instanceof ReadableStream)yield*async function*(e){const t=e.getReader();for(;;){const{done:e,value:n}=await t.read();if(e)break;yield n}}(e);else if(e instanceof Blob)for(const t of function*(e,t=2097152){let n=0;for(;;){const a=e.slice(n,n+t);if(!a.size)break;yield read(a),n+=t}async function read(e){return new Uint8Array(await e.arrayBuffer())}}(e))yield await t}function bytesToSizeWinLike(e){if(e<1024)return e+" B";let t=Math.floor(Math.log(e)/Math.log(1024)),n=e/Math.pow(1024,t);return n>=1e3&&(t++,n/=1024),function(e){let t;e<10?t=Math.trunc(100*e)/100:e<100?t=Math.trunc(10*e)/10:e<1e3&&(t=Math.trunc(e));if(e<.1)return t.toPrecision(1);if(e<1)return t.toPrecision(2);return t.toPrecision(3)}(n)+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}const B=n(!0),R=n("name"),N=n({name:!1,size:!1,mtime:!1}),F=a((()=>N.value[R.value]));function toggleOrder(){N.value[R.value]=!N.value[R.value]}const{compare:A}=new Intl.Collator(void 0,{numeric:!0,sensitivity:"accent"});function comparator(e,t){const n=F.value?-1:1;if(B.value){if("name"===R.value)return A(e.name,t.name)*n;if("size"===R.value)return(e.size-t.size)*n;if("mtime"===R.value)return(e.mtime-t.mtime)*n}return 0}const U=a((()=>(se.value,[...ie.value.folders.sort(comparator),...ie.value.files.sort(comparator),...ie.value.symlinks.sort(comparator),...ie.value.fifos.sort(comparator),...ie.value.charDevs.sort(comparator),...ie.value.blockDevs.sort(comparator),...ie.value.sockets.sort(comparator)]))),H=n(50),Z=a((()=>Q.value.length?X.value:U.value)),q=a((()=>Z.value.slice(0,H.value))),G=a((()=>X.value.length>H.value?X.value.length:Z.value.length)),J=n(null),K=n("");function addMessage(e){K.value=e}function appendMessage(e){K.value+=e}function debugMessageFromEntry(e){var t;if(console.log(s(e)?"Proxy:":"Raw:",o(e)),e.hasErrors)K.value="";else{const n='"'+e.name.slice(0,20)+(e.name.length<20?"":"...")+'"';let a="";a+=`mtime "${dateToDayDateTimeString(e.mtime,!1)}"`,a+=` —  btime "${dateToDayDateTimeString(null!=(t=e.btime)?t:0,!1)}"`,a+=` — ${n} — ${e.size} (${bytesToSizeWinLike(e.size)})`,K.value=a}}const V=["folder","file","symlink","fifo","charDev","blockDev","socket"];class SimpleEntry{constructor(e,t,n){this.name=e.name,this.parent=t,this.type=e.type,e.size&&(this._size=e.size),e.mtime&&(this.mtime=e.mtime),e.btime&&(this.btime=e.btime),e.errors&&(this.errors=e.errors.map((e=>n.get(e)))),e.pathTo&&(this.pathTo=e.pathTo),e.content&&(this.content=e.content)}addChild(e){this.children||(this.children=[]),this.children.push(e),this.increaseContentSize(e.size)}addHardlinks(e,t){this.hardlinks=e,this.hardlinksTotal=t}increaseContentSize(e){e&&(this._contentSize||(this._contentSize=0),this._contentSize+=e,this.parent&&e&&this.parent.increaseContentSize(e))}get size(){return"folder"===this.type?this._contentSize||0:this._size||0}get folders(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"folder"===e.type)))||[]}get files(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"file"===e.type)))||[]}get symlinks(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"symlink"===e.type)))||[]}get fifos(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"fifo"===e.type)))||[]}get charDevs(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"charDev"===e.type)))||[]}get blockDevs(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"blockDev"===e.type)))||[]}get sockets(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"socket"===e.type)))||[]}get isEmpty(){var e;return!Boolean(null==(e=this.children)?void 0:e.length)}get hasErrors(){var e;return Boolean(null==(e=this.errors)?void 0:e.length)}get root(){return this.parent?this.parent.root:this}get path(){return this.parent?[...this.parent.path,this]:[this]}}class EntryStreamParser{constructor(){this.rootId=0,this.map=new Map,this.hidMap=new Map}setMeta(e){this.meta=e;const t=e.errorsMap;t&&(this.errorsIDMap=new Map(Object.entries(t).map((([e,t])=>{const[n,a,s]=e.split(":");return[t,{code:n,syscall:a,errno:Number(s)}]}))))}parse(e){var t;let n=!1;for(const a of e){const e=null!=(t=this.map.get(a.pid))?t:null,s=new SimpleEntry(a,e,this.errorsIDMap);if("folder"===a.type&&this.map.set(a.id,s),null==e||e.addChild(s),a.hid){const e=this.hidMap.get(a.hid)||[];this.hidMap.set(a.hid,[...e,s])}a.pid===this.rootId&&(n=!0)}return{root:this.map.get(this.rootId),rootUpdated:n}}processHIDMapAsync(){this.hidMap.size&&(console.log("[hidMap]:",this.hidMap),console.time("hidMap"),async function(e){let t=0,n=0;for(const[a,s]of e.entries()){if(!(t++%1e3)){const e=Date.now();e-n>15&&(n=e,await sleep())}const e=Number(a.split(":")[1]);s.forEach((t=>{t.addHardlinks(s,e)}))}}(this.hidMap).then((()=>console.timeEnd("hidMap"))))}}const Y=new SimpleEntry({type:"folder",name:"",pid:null},null),Q=n("");function clearSearch(){Q.value=""}const X=n([]);function setSearchResult(e){const t=o(e);X.value=t,H.value=50,function(e){globalThis.search=e,console.log("globalThis.search:",e),Object.defineProperty(globalThis.search,"download",{get(){console.log("download")}}),Object.defineProperty(globalThis.search,"names",{get:()=>globalThis.search.map((e=>e.name))}),Object.defineProperty(globalThis.search,"namelist",{get:()=>globalThis.search.map((e=>e.name)).join("\n")})}(t)}r([R,F],(()=>{X.value.length&&(console.time("sort searchResult"),X.value=X.value.sort(comparator),console.timeEnd("sort searchResult"))}));const ee=function(e,t=50){let n;return function(){n&&clearTimeout(n),n=setTimeout((()=>{e.apply(this,arguments),n=null}),t)}}(performSearch,300);async function performSearch(){const e=ie.value,t=Q.value,n=i(e)?o(e):e,a=performance.now(),s=await async function(e,t){var n,a;if(t.startsWith("//"))return justSearch(t.slice(2));if(t.startsWith("/size")){const{size:a,plus:s,plusRange:o,range:r}=(null==(n=t.match(/\/size[:\/](?<size>\d+)(\+(?<plus>(\d+)|(-\d+))|~(?<plusRange>\d+)|-(?<range>\d+))?/))?void 0:n.groups)||{};if(a){let t,n;console.log({size:a,plus:s,plusRange:o,range:r});const i=Number(a);if(s){const a=i+Number(s),{min:o,max:r}=i<a?{min:i,max:a}:{min:a,max:i};t=`Size search from ${bytesToSizeWinLike(o)} to ${bytesToSizeWinLike(r)}`,n=await findAll(e,(e=>e.size>=o&&e.size<=r))}else if(r){const a=Number(r),{min:s,max:o}=i<a?{min:i,max:a}:{min:a,max:i};t=`Size search from ${bytesToSizeWinLike(s)} to ${bytesToSizeWinLike(o)}`,n=await findAll(e,(e=>e.size>=s&&e.size<=o))}else if(o){const a=i-Number(o),s=i+Number(o);t=`Size search from ${bytesToSizeWinLike(a)} to ${bytesToSizeWinLike(s)}`,n=await findAll(e,(e=>e.size>=a&&e.size<=s))}else t=`Size search ${bytesToSizeWinLike(i)}`,n=await findAll(e,(e=>e.size===i));return console.log(...function(e){return[`%c${e}`,"color: #2196f3; font-weight: bold;"]}(t)),Object.defineProperty(n,"customSearchText",{value:t}),n}console.log("no size to search")}if(t.startsWith("/")){const{type:n,word:s}=(null==(a=t.match(/\/type:(?<type>[^\/]+)\/?(?<word>[^\/]*)/))?void 0:a.groups)||{};if(n&&(console.log({type:n,word:s}),V.includes(n)))return findAll(e,(e=>e.type===n&&e.name.includes(s)))}else if(t.includes(" ")){const e=t.split(" ").filter((e=>e));if(e.length>1){let t,n=await justSearch(e.shift());for(;t=e.shift();)n=n.filter((e=>e.name.includes(t)));return n}}return justSearch(t);function justSearch(t){return findAll(e,(e=>e.name.includes(t)))}}(n,t);if(!s)return;addMessage(`Search time: ${(performance.now()-a).toFixed(2)} ms; `),await sleep();const r=performance.now(),l=s.sort(comparator);appendMessage(`Sort time: ${(performance.now()-r).toFixed(2)} ms; `),await sleep(),console.time("search result size computing");const c=new Set(s),u=s.reduce(((e,t)=>computeEntrySize(t,c)+e),0),d=s.filter((e=>"folder"!==e.type)).reduce(((e,t)=>t.size+e),0);console.timeEnd("search result size computing"),console.log(u,d),setSearchResult(l);const p=s.customSearchText||t;appendMessage(`${s.length} items; size: ${bytesToSizeWinLike(d)} (${bytesToSizeWinLike(u)});  search: ${p}`)}function computeEntrySize(e,t){if("folder"!==e.type)return e.size;let n=0;for(const a of e.children||[])t.has(e)||("folder"===a.type?n+=computeEntrySize(a,t):n+=a.size);return n}async function findAll(e,t){let n=[],a=Date.now();for(const s of function*(e){const t=1e3;let n=[];function*takePart(e){for(const a of e.children||[])"folder"===a.type&&(yield*takePart(a)),n.push(a),n.length===t&&(yield n,n=[])}yield*takePart(e),yield n}(e)){const e=Date.now();e-a>15&&(a=e,await sleep());for(const a of s)t(a)&&n.push(a)}return n}async function*parseScan(e){const t=new EntryStreamParser;let n,a;if(e instanceof Response?n=e.headers.get("content-type"):e instanceof Blob&&(n=e.type),function(e){return Boolean(e.match(/^application\/.*?gzip/))}(n)){console.log("parseGZippedJSONScan");for await(const n of async function*(e){const t=new TextDecoder,n=new TextParser;let a=0,s=0;for await(const o of async function*(e){te||await async function(){if(!te){const e="https://cdn.jsdelivr.net/npm/pako@2.0.4/dist/pako_inflate.min.js",t="sha256-ZIKs3+RZEULSy0dR6c/mke8V9unZm9vuh05TqvtMdGU=";await function(e,t){return new Promise(((n,a)=>{const s=document.createElement("script");s.onload=n,s.onerror=n=>a({message:"Failed to load script",src:e,integrity:t,event:n}),s.src=e,s.async=!0,t&&(s.integrity=t,s.crossOrigin="anonymous"),document.body.append(s)}))}(e,t),te=!0,console.log("pako is loaded")}}();let t=[];const n=new pako.Inflate;pako.Inflate.prototype.onData=function(e){t.push(e)};for await(const a of iterateAsyncDataSource(e)){n.push(a);for(const e of t)yield e;t=[]}yield n.result,n.err&&console.error(n.msg)}(e)){if(!(a++%20)){const e=Date.now();e-s>15&&(s=e,await sleep())}const e=t.decode(o,{stream:!0}),r=n.parsePart(e);r.length&&(yield r)}}(e))a||(a=n.shift(),t.setMeta(a)),yield{meta:a,...t.parse(n)}}else if(function(e){return Boolean(e.match(/^application\/.*?json/))}(n)){console.log("streamParseJSONScan");for await(const n of async function*(e){const t=new TextDecoder,n=new TextParser;let a=0,s=0;for await(const o of iterateAsyncDataSource(e)){if(!(a++%10)){const e=Date.now();e-s>15&&(s=e,await sleep())}const e=t.decode(o,{stream:!0}),r=n.parsePart(e);r.length&&(yield r)}}(e))a||(a=n.shift(),t.setMeta(a)),yield{meta:a,...t.parse(n)}}t.processHIDMapAsync()}r(Q,(async(e,t)=>{e?e.length-t.length>1?await performSearch():await ee():setSearchResult([])}));class TextParser{constructor(){t(this,"buffer",""),t(this,"startHandled",!1),t(this,"metaLines",[]),t(this,"objects",[])}trimComma(e){return e.endsWith(",")?e.slice(0,-1):e}handleStart(e){if("["!==e)return""===e?(this.objects.push(this.metaLines.join("")),void(this.startHandled=!0)):void this.metaLines.push(e)}handleLine(e,t){t?this.buffer+=e:this.buffer?(this.objects.push(this.buffer+e),this.buffer=""):this.objects.push(e)}parsePart(e){const t=e.endsWith("\n]"),n=e.split("\n");for(let s=0;s<n.length;s++){const e=n[s],a=s===n.length-1;a&&t||(this.startHandled?this.handleLine(e,a):this.handleStart(e,a))}try{const e=JSON.parse(`[${this.trimComma(this.objects.join(""))}]`);return this.objects=[],e}catch(a){throw console.log(`[${this.trimComma(this.objects.join(""))}]`),console.log(this.objects),console.log(this,{isLastPart:t,textPart:e}),a}}}let te=!1;const ne=n(null),ae=n(null),se=n(0);async function setScan(e){let t=!1,n=!1;console.time("setScan");let a=Date.now();for await(const{meta:s,root:o,rootUpdated:r}of parseScan(e)){!t&&s&&(ne.value=l(s),t=!0),!n&&o&&(ae.value=l(o),globalThis.json=o,openFolder(o),n=!0);const e=Date.now();(r||e-a>50)&&(a=e,se.value++,await sleep())}se.value++,console.timeEnd("setScan"),clearSearch()}const oe=a((()=>{var e;return(null==(e=ne.value)?void 0:e.separator)||"/"})),re=a((()=>{var e;return(null==(e=ne.value)?void 0:e.path)||[]})),ie=n(Y),le=a((()=>ie.value.path));function openFolder(e){clearSearch(),ie.value=l(c(e)),H.value=50,globalThis.folder=e,console.log("globalThis.folder:",e)}const ce=a((()=>ae.value&&ie.value.isEmpty));r(ne,(async(e,t)=>{console.log("[meta]:",ne.value);const{files:n,folders:a,symlinks:s,errors:o,total:r,scanDate:i}=ne.value;ne.value.scanDate&&addMessage(`files: "${n}" folders: "${a}", symlinks: "${s}", errors: "${o}", total: "${r}", scanDate: "${dateToDayDateString(i)}"`)}));u("data-v-7487a6bd");const ue={class:"scanPath"},de=["title"],pe={class:"part"},fe={class:"part spaced"},he={key:0,class:"spaced separator"};d();const me={setup(e){const t=a((()=>{if(!ne.value)return;const{files:e,folders:t,symlinks:n,charDevs:a,blockDevs:s,fifos:o,sockets:r,total:i,platform:l,scanDate:c}=ne.value;function doString(e){return Object.entries(e).map((([e,t])=>function(e){const t=3-Math.trunc(e.length/4);return e+"\t".repeat(t)}(e)+": "+t)).join("\n")}const u=doString({files:e,folders:t,symlinks:n}),d=doString({charDevs:a,blockDevs:s,fifos:o,sockets:r}),p=doString({total:i,platform:l,scanDate:dateToDayDateString(c)});let f;return f="win32"!==l?[u,d,p].join("\n"):[u,p].join("\n"),console.log(f),f})),n=a((()=>{var e;const t=[...re.value,ie.value.root.name].join(oe.value);return t.startsWith("//")?t.slice(1):"win32"===(null==(e=ne.value)?void 0:e.platform)?t[0].toUpperCase()+t.slice(1):t})),s=a((()=>[...n.value].slice(0,-1).join(""))),o=a((()=>[...n.value].slice(-1).join(""))),r=a((()=>le.value.length-1&&"/"!==n.value));function goToRoot(){const e=ie.value.root;debugMessageFromEntry(e),openFolder(e)}return(e,n)=>(p(),f("span",ue,[h("span",{class:"parts",onClick:goToRoot,title:c(t)},[h("span",pe,m(c(s)),1),h("span",fe,m(c(o)),1)],8,de),c(r)?(p(),f("span",he,m(c(oe)),1)):v("",!0)]))},__scopeId:"data-v-7487a6bd"};u("data-v-3c8242f7");const ve={class:"opened-folder"},ye={class:"part"},ge={class:"part spaced"},be={key:0,class:"separator spaced"};d();const Se={props:["index","count","entry"],setup(e){const t=e,{index:n,count:s,entry:o}=y(t),r=a((()=>n.value+1===s.value)),i=a((()=>[...o.value.name].slice(0,-1).join(""))),l=a((()=>[...o.value.name].slice(-1).join("")));function onClick(){debugMessageFromEntry(o.value),openFolder(o.value)}return(e,t)=>(p(),f("span",ve,[h("span",{class:"parts",onClick:onClick},[h("span",ye,m(c(i)),1),h("span",ge,m(c(l)),1)]),c(r)?v("",!0):(p(),f("span",be,m(c(oe)),1))]))},__scopeId:"data-v-3c8242f7"};u("data-v-f8be0ec4");const we={class:"box"};d();const ze={props:{maxWidth:{default:"max-content",type:String}},setup:e=>(t,n)=>(p(),f("div",we,[h("div",{class:"sub",style:b({maxWidth:e.maxWidth})},[g(t.$slots,"default",{},void 0,!0)],4)])),__scopeId:"data-v-f8be0ec4"};const ke={setup(e){async function onContextmenu(e){e.preventDefault();const t=[...ne.value.path,...ie.value.path.map((e=>e.name))].join(oe.value);console.log("Copy to clipboard:",t),await navigator.clipboard.writeText(t)}return(e,t)=>(p(),f("div",{class:"address",onContextmenu:onContextmenu},[S(ze,null,{default:w((()=>[S(me)])),_:1}),(p(!0),f(z,null,k(c(le).slice(1),((e,t)=>(p(),D(ze,null,{default:w((()=>[S(Se,{entry:e,index:t,count:c(le).slice(1).length},null,8,["entry","index","count"])])),_:2},1024)))),256))],32))},__scopeId:"data-v-63da6b8a"};u("data-v-618aa3a3");const De={class:"search-wrapper"},Te={class:"search"},Me=h("label",{for:"json-scan-search-input",class:"fuck-off-lighthouse"},".",-1);d();const je={setup:e=>(e,t)=>(p(),f("div",De,[h("div",Te,[T(h("input",{id:"json-scan-search-input",type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>j(Q)?Q.value=e:null)},null,512),[[M,c(Q)]]),h("button",{onClick:t[1]||(t[1]=(...e)=>c(clearSearch)&&c(clearSearch)(...e))},"Clear")]),Me])),__scopeId:"data-v-618aa3a3"};u("data-v-23a29b76");const xe={class:"file-select"},_e=x(" Select file "),$e=h("hr",null,null,-1);d();const Ce={setup(e){function onChange(e){return setScan(e.target.files[0])}return(e,t)=>(p(),f("div",xe,[h("label",null,[_e,h("input",{type:"file",accept:"application/json,application/gzip",onChange:onChange},null,32)]),$e]))},__scopeId:"data-v-23a29b76"};u("data-v-4cf83322");const Pe={class:"tabs"},Ie=h("div",{class:"tab"},null,-1);d();const Ee={setup:e=>(e,t)=>(p(),f("div",Pe,[S(Ce,{class:"tab"}),Ie])),__scopeId:"data-v-4cf83322"};u("data-v-f3203ed6");const Le=["title"],We={class:"icon"},Oe={class:"name"},Be={class:"mtime"};d();const Re={props:["entry"],setup(e){const t=e,n=a((()=>(se.value,o.value.hasErrors?"":bytesToSizeWinLike(o.value.size)))),s=a((()=>"0 B"===n.value?"Z":n.value.split(" ")[1])),o=y(t).entry,r=a((()=>o.value.hasErrors)),i=a((()=>{if(void 0===o.value.mtime)return"";return dateToDayDateTimeString(o.value.mtime,!1).slice(0,-3)})),l=a((()=>o.value.hasErrors?JSON.stringify(o.value.errors[0],null," "):"symlink"===o.value.type?o.value.pathTo:void 0)),u=a((()=>"folder"===o.value.type?"📁":"file"===o.value.type?function(e){const{ext:t}=e.match(/(?<ext>[^.]+)$/).groups;return W.includes(t)}(o.value.name)?"🎦":function(e){const{ext:t}=e.match(/(?<ext>[^.]+)$/).groups;return O.includes(t)}(o.value.name)?"🖼":"📄":"symlink"===o.value.type?"🔗":"👾"));function onClick(e){debugMessageFromEntry(o.value),"folder"===o.value.type&&openFolder(o.value)}function onMousedown(e){1===e.button&&(e.preventDefault(),console.log(o.value,[...ne.value.path,...o.value.path.map((e=>e.name))].join(oe.value).replace("//","/")),ie.value!==o.value.parent&&openFolder(o.value.parent))}function onMouseover(e){J.value=o.value}function onMouseleave(e){J.value=null}return(e,t)=>(p(),f("tr",{class:_(["row",{error:c(r)}]),onClick:onClick,onMousedown:onMousedown,onMouseover:onMouseover,onMouseleave:onMouseleave,title:c(l)},[h("td",We,m(c(u)),1),h("td",Oe,m(c(o).name),1),h("td",{class:_(["size",c(s)])},m(c(n)),3),h("td",Be,m(c(i)),1)],42,Le))},__scopeId:"data-v-f3203ed6"};const Ne={setup(e){const t=new IntersectionObserver((e=>{const[t]=e;t.isIntersecting&&G.value>H.value&&(H.value=H.value+50)})),a=n(null);return $((()=>{t.observe(a.value)})),C((()=>{t.disconnect()})),(e,t)=>(p(),f("div",{class:"intersection",ref:(e,t)=>{t.intersection=e,a.value=e}},null,512))},__scopeId:"data-v-5baedc86"};u("data-v-d2171e22");const Fe={key:0,class:"rows"},Ae={key:1,class:"empty-message"},Ue=[h("span",null,"The folder is empty.",-1)],He={key:2,class:"error-message"},Ze=h("h2",null,"Error",-1),qe=h("td",null,"syscall",-1),Ge=h("td",null,"code",-1),Je=h("td",null,"errno",-1);d();const Ke={setup(e){P((e=>({"78b3c76e":s.value})));const t=a((()=>!!ie.value.hasErrors&&ie.value.errors[0]));function onContextMenu(e){e.preventDefault(),ie.value.parent&&openFolder(ie.value.parent)}const s=n("880px");return $((()=>{const e=document.body.offsetWidth;if(e<1280){let t=880-(1280-e);t=t<140?140:t,s.value=`${t}px`}})),(e,n)=>(p(),f("div",{class:"content",onContextmenu:onContextMenu},[c(q).length?(p(),f("table",Fe,[h("tbody",null,[(p(!0),f(z,null,k(c(q),(e=>(p(),D(Re,{entry:e},null,8,["entry"])))),256)),S(Ne)])])):v("",!0),c(ce)&&!c(t)?(p(),f("div",Ae,Ue)):v("",!0),c(t)?(p(),f("div",He,[h("div",null,[Ze,h("table",null,[h("tr",null,[qe,h("td",null,[h("pre",null,m(c(t).syscall),1)])]),h("tr",null,[Ge,h("td",null,[h("pre",null,m(c(t).code),1)])]),h("tr",null,[Je,h("td",null,[h("pre",null,m(c(t).errno),1)])])])])])):v("",!0)],32))},__scopeId:"data-v-d2171e22"};u("data-v-08ca63fc");const Ve={class:"status"};d();const Ye={setup(e){const t=a((()=>{var e;return(null==(e=J.value)?void 0:e.size)&&bytesToSizeWinLike(J.value.size)}));return(e,n)=>(p(),f("div",Ve,[h("span",null,"Items count: "+m(c(G)),1),T(h("span",null,". Hover item's size: "+m(c(t)),513),[[I,c(J)]])]))},__scopeId:"data-v-08ca63fc"};u("data-v-148ea483");const Qe={class:"switch"};d();const Xe={setup(e){function onN(){"name"===R.value&&toggleOrder(),R.value="name"}function onS(){"size"===R.value&&toggleOrder(),R.value="size"}function onD(){"mtime"===R.value&&toggleOrder(),R.value="mtime"}return(e,t)=>(p(),f("div",Qe,[h("button",{class:_(["order-by-name",{active:"name"===c(R)}]),title:"Order by name",onClick:onN},m(c(N).name?"N":"n"),3),h("button",{class:_(["order-by-size",{active:"size"===c(R)}]),title:"Order by size",onClick:onS},m(c(N).size?"S":"s"),3),h("button",{class:_(["order-by-date",{active:"mtime"===c(R)}]),title:"Order by date",onClick:onD},m(c(N).mtime?"D":"d"),3)]))},__scopeId:"data-v-148ea483"};u("data-v-16910406");const et={class:"debug"},tt={key:0},nt={key:1};d();const at={setup:e=>(e,t)=>(p(),f("div",et,[c(K)?(p(),f("span",tt,m(c(K)),1)):(p(),f("span",nt,"_"))])),__scopeId:"data-v-16910406"};u("data-v-76a0a2a1");const st={class:"main"};d();const ot={setup:e=>($((async()=>{const e=new URL(location.href),t=e.searchParams.get("filepath");if(t){const e=await fetch(t);await setScan(e)}const n=e.searchParams.get("search");n&&(Q.value=n)})),(e,t)=>(p(),f("div",st,[S(Xe,{style:{"grid-area":"switch"}}),S(ke,{style:{"grid-area":"address"}}),S(je,{style:{"grid-area":"search"}}),S(Ee,{style:{"grid-area":"tabs"}}),S(Ke,{style:{"grid-area":"content"}}),S(Ye,{style:{"grid-area":"status"}}),S(at,{style:{"grid-area":"debug"}})]))),__scopeId:"data-v-76a0a2a1"};E({setup:e=>(e,t)=>(p(),D(ot))}).mount("#app");
//# sourceMappingURL=index.js.map
