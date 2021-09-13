var e=Object.defineProperty,t=("undefined"!=typeof require&&require,(t,n,a)=>(((t,n,a)=>{n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a})(t,"symbol"!=typeof n?n+"":n,a),a));import{r as n,c as a,w as s,m as o,i as r,t as l,u as i,p as c,a as u,o as d,b as p,d as f,e as h,f as v,g as m,h as y,n as g,j as b,k as w,F as S,l as k,q as D,s as M,v as T,x as j,y as _,z,A as C,B as P,C as x}from"./vendor.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))processPreload(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&processPreload(e)})).observe(document,{childList:!0,subtree:!0})}function processPreload(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const I=globalThis.setImmediate||function(){const{port1:e,port2:t}=new MessageChannel,n=[];return e.onmessage=function(){n.shift()()},function(e){t.postMessage(null),n.push(e)}}();function sleep(e){return new Promise(void 0===e?e=>I(e):t=>setTimeout(t,e))}const $=["mp4","webm","mkv","avi"];const E=["png","jpg","jpeg","gif","tiff","webp"];function dateToDayDateString(e,t=!0){const n=new Date(e);function pad2(e){return e.toString().padStart(2,"0")}"Invalid Date"===n.toString()&&console.warn("Invalid Date value: ",e);const a=t?"UTC":"",s=n[`get${a}FullYear`](),o=n[`get${a}Month`]()+1,r=n[`get${a}Date`]();return s+"."+pad2(o)+"."+pad2(r)}function dateToDayDateTimeString(e,t=!0){const n=new Date(e);function pad2(e){return e.toString().padStart(2,"0")}const a=t?"UTC":"",s=n[`get${a}Hours`](),o=n[`get${a}Minutes`](),r=n[`get${a}Seconds`](),l=pad2(s)+":"+pad2(o)+":"+pad2(r);return dateToDayDateString(n,t)+" "+l+(t?"Z":"")}async function*iterateAsyncDataSource(e){if(e instanceof Response&&(e=e.body),e instanceof ReadableStream)yield*async function*(e){const t=e.getReader();for(;;){const{done:e,value:n}=await t.read();if(e)break;yield n}}(e);else if(e instanceof Blob)for(const t of function*(e,t=2097152){let n=0;for(;;){const a=e.slice(n,n+t);if(!a.size)break;yield read(a),n+=t}async function read(e){return new Uint8Array(await e.arrayBuffer())}}(e))yield await t}function bytesToSizeWinLike(e){if(e<1024)return e+" B";let t=Math.floor(Math.log(e)/Math.log(1024)),n=e/Math.pow(1024,t);return n>=1e3&&(t++,n/=1024),function(e){let t=e;e<10?t=Math.trunc(100*t)/100:t<100?t=Math.trunc(10*t)/10:t<1e3&&(t=Math.trunc(t));if(e<.1)return t.toPrecision(1);if(e<1)return t.toPrecision(2);return t.toPrecision(3)}(n)+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}const B=n(!0),{compare:L}=new Intl.Collator(void 0,{numeric:!0,sensitivity:"accent"});function comparator(e,t){return B.value?L(e.name,t.name):0}const F=a((()=>(Q.value,[...te.value.folders.sort(comparator),...te.value.files.sort(comparator),...te.value.symlinks.sort(comparator),...te.value.fifos.sort(comparator),...te.value.charDevs.sort(comparator),...te.value.blockDevs.sort(comparator),...te.value.sockets.sort(comparator)]))),R=n(1e3),A=a((()=>q.value.length?J.value:F.value)),W=a((()=>A.value.slice(0,R.value))),U=a((()=>J.value.length>R.value?J.value.length:A.value.length)),H=n(null),O=n("");function addMessage(e){O.value=e}function appendMessage(e){O.value+=e}function debugMessageFromEntry(e){if(console.log(e),e.hasErrors)O.value="";else{const t='"'+e.name.slice(0,20)+(e.name.length<20?"":"...")+'"';let n="";n+=`mtime "${dateToDayDateTimeString(e.mtime,!1)}"`,n+=` —  btime "${dateToDayDateTimeString(e.btime,!1)}"`,n+=` — ${t} — ${e.size} (${bytesToSizeWinLike(e.size)})`,O.value=n}}const N=["folder","file","symlink","fifo","charDev","blockDev","socket"];class SimpleEntry{constructor(e,t){this.name=e.name,this.parent=t,this.type=e.type,e.size&&(this._size=e.size),e.mtime&&(this.mtime=e.mtime),e.btime&&(this.btime=e.btime),e.errors&&(this.errors=e.errors),e.pathTo&&(this.pathTo=e.pathTo),e.content&&(this.content=e.content)}addChild(e){this.children||(this.children=[]),this.children.push(e),this.increaseContentSize(e.size)}addHardlinks(e,t){this.hardlinks=e,this.hardlinksTotal=t}increaseContentSize(e){e&&(this._contentSize||(this._contentSize=0),this._contentSize+=e,this.parent&&e&&this.parent.increaseContentSize(e))}get size(){return"folder"===this.type?this._contentSize||0:this._size||0}get folders(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"folder"===e.type)))||[]}get files(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"file"===e.type)))||[]}get symlinks(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"symlink"===e.type)))||[]}get fifos(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"fifo"===e.type)))||[]}get charDevs(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"charDev"===e.type)))||[]}get blockDevs(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"blockDev"===e.type)))||[]}get sockets(){var e;return(null==(e=this.children)?void 0:e.filter((e=>"socket"===e.type)))||[]}get isEmpty(){var e;return!Boolean(null==(e=this.children)?void 0:e.length)}get hasErrors(){var e;return Boolean(null==(e=this.errors)?void 0:e.length)}get root(){return this.parent?this.parent.root:this}get path(){return this.parent?[...this.parent.path,this]:[this]}}class EntryStreamParser{constructor(){this.rootId=0,this.map=new Map,this.hidMap=new Map}parse(e){var t;let n=!1;for(const a of e){const e=null!=(t=this.map.get(a.pid))?t:null,s=new SimpleEntry(a,e);if("folder"===a.type&&this.map.set(a.id,s),null==e||e.addChild(s),a.hid){const e=this.hidMap.get(a.hid)||[];this.hidMap.set(a.hid,[...e,s])}a.pid===this.rootId&&(n=!0)}return{root:this.map.get(this.rootId),rootUpdated:n}}processHIDMapAsync(){this.hidMap.size&&(console.log("[hidMap]:",this.hidMap),console.time("hidMap"),async function(e){let t=0,n=0;for(const[a,s]of e.entries()){if(!(t++%1e3)){const e=Date.now();e-n>15&&(n=e,await sleep())}const e=Number(a.split(":")[1]);s.forEach((t=>{t.addHardlinks(s,e)}))}}(this.hidMap).then((()=>console.timeEnd("hidMap"))))}}const Z=new SimpleEntry({type:"folder",name:"",pid:null},null),q=n("");function clearSearch(){q.value=""}const J=n([]);function setSearchResult(e){J.value=o(e),console.log("globalThis.search:",globalThis.search=e),Object.defineProperty(globalThis.search,"download",{get(){console.log("download")}})}const G=function(e,t=50){let n;return function(){n&&clearTimeout(n),n=setTimeout((()=>{e.apply(this,arguments),n=null}),t)}}(performSearch,300);async function performSearch(){const e=te.value,t=q.value,n=r(e)?l(e):e,a=performance.now(),s=await async function(e,t){var n;if(!t.startsWith("/"))return findAll(e,(e=>e.name.includes(t)));{const{type:a,word:s}=(null==(n=t.match(/\/type:(?<type>[^\/]+)\/?(?<word>[^\/]*)/))?void 0:n.groups)||{};if(a&&(console.log({type:a,word:s}),N.includes(a)))return findAll(e,(e=>e.type===a&&e.name.includes(s)))}return!1}(n,t);if(!s)return;addMessage(`Search time: ${(performance.now()-a).toFixed(2)} ms; `),await sleep();const o=performance.now(),i=s.sort(comparator);appendMessage(`Sort time: ${(performance.now()-o).toFixed(2)} ms; `),await sleep(),setSearchResult(i),appendMessage(`${s.length} items; search: ${t}`)}async function findAll(e,t){let n=[],a=Date.now();for(const s of function*(e){const t=1e3;let n=[];function*takePart(e){for(const a of e.children||[])"folder"===a.type&&(yield*takePart(a)),n.push(a),n.length===t&&(yield n,n=[])}yield*takePart(e),yield n}(e)){const e=Date.now();e-a>15&&(a=e,await sleep());for(const a of s)t(a)&&n.push(a)}return n}async function*parseScan(e){const t=new EntryStreamParser;let n,a;if(e instanceof Response?n=e.headers.get("content-type"):e instanceof Blob&&(n=e.type),function(e){return Boolean(e.match(/^application\/.*?gzip/))}(n)){console.log("parseGZippedJSONScan");for await(const n of async function*(e){await async function(){if(!K){const e="https://cdn.jsdelivr.net/npm/pako@2.0.4/dist/pako_inflate.min.js",t="sha256-ZIKs3+RZEULSy0dR6c/mke8V9unZm9vuh05TqvtMdGU=";await function(e,t){return new Promise(((n,a)=>{const s=document.createElement("script");s.onload=n,s.onerror=n=>a({message:"Failed to load script",src:e,integrity:t,event:n}),s.src=e,s.async=!0,t&&(s.integrity=t,s.crossOrigin="anonymous"),document.body.append(s)}))}(e,t),K=!0,console.log("pako is loaded")}}();const t=new TextDecoder,n=new TextParser;let a=0,s=0;for await(const o of async function*(e){let t=[];const n=new pako.Inflate;pako.Inflate.prototype.onData=function(e){t.push(e)};for await(const a of iterateAsyncDataSource(e)){n.push(a);for(const e of t)yield e;t=[]}yield n.result,n.err&&console.error(n.msg)}(e)){if(!(a++%20)){const e=Date.now();e-s>15&&(s=e,await sleep())}const e=t.decode(o,{stream:!0}),r=n.parsePart(e);r.length&&(yield r)}}(e))a||(a=n.shift()),yield{meta:a,...t.parse(n)}}else if(function(e){return Boolean(e.match(/^application\/.*?json/))}(n)){console.log("streamParseJSONScan");for await(const n of async function*(e){const t=new TextDecoder,n=new TextParser;let a=0,s=0;for await(const o of iterateAsyncDataSource(e)){if(!(a++%10)){const e=Date.now();e-s>15&&(s=e,await sleep())}const e=t.decode(o,{stream:!0}),r=n.parsePart(e);r.length&&(yield r)}}(e))a||(a=n.shift()),yield{meta:a,...t.parse(n)}}t.processHIDMapAsync()}s(q,(async(e,t)=>{e?e.length-t.length>1?await performSearch():await G():setSearchResult([])}));class TextParser{constructor(){t(this,"buffer",""),t(this,"startHandled",!1),t(this,"metaLines",[]),t(this,"objects",[])}trimComma(e){return e.endsWith(",")?e.slice(0,-1):e}handleStart(e){if("["!==e)return""===e?(this.objects.push(this.metaLines.join("")),void(this.startHandled=!0)):void this.metaLines.push(e)}handleLine(e,t){t?this.buffer+=e:this.buffer?(this.objects.push(this.buffer+e),this.buffer=""):this.objects.push(e)}parsePart(e){const t=e.endsWith("\n]"),n=e.split("\n");for(let s=0;s<n.length;s++){const e=n[s],a=s===n.length-1;a&&t||(this.startHandled?this.handleLine(e,a):this.handleStart(e,a))}try{const e=JSON.parse(`[${this.trimComma(this.objects.join(""))}]`);return this.objects=[],e}catch(a){throw console.log(`[${this.trimComma(this.objects.join(""))}]`),console.log(this.objects),console.log(this,{isLastPart:t,textPart:e}),a}}}let K=!1;const V=n(null),Y=n(null),Q=n(0);async function setScan(e){let t=!1,n=!1;console.time("setScan");const a=R.value;R.value=25;let s=Date.now();for await(const{meta:r,root:l,rootUpdated:i}of parseScan(e)){!t&&r&&(V.value=o(r),t=!0),!n&&l&&(Y.value=o(l),globalThis.json=l,openFolder(l),n=!0);const e=Date.now();(i||e-s>100)&&(s=e,Q.value++,await sleep())}R.value=a,Q.value++,console.timeEnd("setScan"),clearSearch()}const X=a((()=>{var e;return(null==(e=V.value)?void 0:e.separator)||"/"})),ee=a((()=>{var e;return(null==(e=V.value)?void 0:e.path)||[]})),te=n(Z),ne=a((()=>te.value.path));function openFolder(e){clearSearch(),te.value=o(i(e))}const ae=a((()=>Y.value&&te.value.isEmpty));s(V,(async(e,t)=>{console.log("[meta]:",V.value);const{files:n,folders:a,symlinks:s,errors:o,total:r,scanDate:l}=V.value;V.value.scanDate&&addMessage(`files: "${n}" folders: "${a}", symlinks: "${s}", errors: "${o}", total: "${r}", scanDate: "${dateToDayDateString(l)}"`)}));c("data-v-5fbee073");const se={class:"scanPath"},oe=["title"],re={class:"part"},le={class:"part spaced"},ie={key:0,class:"spaced separator"};u();const ce={setup(e){const t=a((()=>{if(!V.value)return;const{files:e,folders:t,symlinks:n,charDevs:a,blockDevs:s,fifos:o,sockets:r,total:l,platform:i,scanDate:c}=V.value;function doString(e){return Object.entries(e).map((([e,t])=>function(e){const t=3-Math.trunc(e.length/4);return e+"\t".repeat(t)}(e)+": "+t)).join("\n")}const u=doString({files:e,folders:t,symlinks:n}),d=doString({charDevs:a,blockDevs:s,fifos:o,sockets:r}),p=doString({total:l,platform:i,scanDate:dateToDayDateString(c)});let f;return f="win32"!==i?[u,d,p].join("\n"):[u,p].join("\n"),console.log(f),f})),n=a((()=>{var e;const t=[...ee.value,te.value.root.name].join(X.value);return t.startsWith("//")?t.slice(1):"win32"===(null==(e=V.value)?void 0:e.platform)?t[0].toUpperCase()+t.slice(1):t})),s=a((()=>[...n.value].slice(0,-1).join(""))),o=a((()=>[...n.value].slice(-1).join(""))),r=a((()=>ne.value.length-1&&"/"!==n.value));function goToRoot(){const e=te.value.root;debugMessageFromEntry(e),openFolder(e)}return(e,n)=>(d(),p("span",se,[f("span",{class:"parts",onClick:goToRoot,title:i(t)},[f("span",re,h(i(s)),1),f("span",le,h(i(o)),1)],8,oe),i(r)?(d(),p("span",ie,h(i(X)),1)):v("",!0)]))},__scopeId:"data-v-5fbee073"};c("data-v-3c8242f7");const ue={class:"opened-folder"},de={class:"part"},pe={class:"part spaced"},fe={key:0,class:"separator spaced"};u();const he={props:["index","count","entry"],setup(e){const t=e,{index:n,count:s,entry:o}=m(t),r=a((()=>n.value+1===s.value)),l=a((()=>[...o.value.name].slice(0,-1).join(""))),c=a((()=>[...o.value.name].slice(-1).join("")));function onClick(){debugMessageFromEntry(o.value),openFolder(o.value)}return(e,t)=>(d(),p("span",ue,[f("span",{class:"parts",onClick:onClick},[f("span",de,h(i(l)),1),f("span",pe,h(i(c)),1)]),i(r)?v("",!0):(d(),p("span",fe,h(i(X)),1))]))},__scopeId:"data-v-3c8242f7"};c("data-v-f8be0ec4");const ve={class:"box"};u();const me={props:{maxWidth:{default:"max-content",type:String}},setup:e=>(t,n)=>(d(),p("div",ve,[f("div",{class:"sub",style:g({maxWidth:e.maxWidth})},[y(t.$slots,"default",{},void 0,!0)],4)])),__scopeId:"data-v-f8be0ec4"};c("data-v-55c28eea");const ye={class:"address"};u();const ge={setup:e=>(e,t)=>(d(),p("div",ye,[b(me,null,{default:w((()=>[b(ce)])),_:1}),(d(!0),p(S,null,k(i(ne).slice(1),((e,t)=>(d(),D(me,null,{default:w((()=>[b(he,{entry:e,index:t,count:i(ne).slice(1).length},null,8,["entry","index","count"])])),_:2},1024)))),256))])),__scopeId:"data-v-55c28eea"};c("data-v-25e26c47");const be={style:{display:"contents"}},we={class:"search"},Se=f("label",{for:"json-scan-search-input",class:"fuck-off-lighthouse"},".",-1);u();const ke={setup:e=>(e,t)=>(d(),p("div",be,[f("div",we,[M(f("input",{id:"json-scan-search-input",type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>j(q)?q.value=e:null)},null,512),[[T,i(q)]]),f("button",{onClick:t[1]||(t[1]=(...e)=>i(clearSearch)&&i(clearSearch)(...e))},"Clear")]),Se])),__scopeId:"data-v-25e26c47"};c("data-v-23a29b76");const De={class:"file-select"},Me=_(" Select file "),Te=f("hr",null,null,-1);u();const je={setup(e){function onChange(e){return setScan(e.target.files[0])}return(e,t)=>(d(),p("div",De,[f("label",null,[Me,f("input",{type:"file",accept:"application/json,application/gzip",onChange:onChange},null,32)]),Te]))},__scopeId:"data-v-23a29b76"};c("data-v-4cf83322");const _e={class:"tabs"},ze=f("div",{class:"tab"},null,-1);u();const Ce={setup:e=>(e,t)=>(d(),p("div",_e,[b(je,{class:"tab"}),ze])),__scopeId:"data-v-4cf83322"};c("data-v-aaaff7cc");const Pe=["title"],xe={class:"icon"},Ie={class:"name"},$e={class:"mtime"};u();const Ee={props:["entry"],setup(e){const t=e,n=a((()=>(Q.value,o.value.hasErrors?"":bytesToSizeWinLike(o.value.size)))),s=a((()=>"0 B"===n.value?"Z":n.value.split(" ")[1])),o=m(t).entry,r=a((()=>o.value.hasErrors)),l=a((()=>{if(void 0===o.value.mtime)return"";return dateToDayDateTimeString(o.value.mtime,!1).slice(0,-3)})),c=a((()=>o.value.hasErrors?JSON.stringify(o.value.errors[0],null," "):"symlink"===o.value.type?o.value.pathTo:void 0)),u=a((()=>"folder"===o.value.type?"📁":"file"===o.value.type?function(e){const{ext:t}=e.match(/(?<ext>[^.]+)$/).groups;return $.includes(t)}(o.value.name)?"🎦":function(e){const{ext:t}=e.match(/(?<ext>[^.]+)$/).groups;return E.includes(t)}(o.value.name)?"🖼":"📄":"symlink"===o.value.type?"🔗":"👾"));function onClick(e){debugMessageFromEntry(o.value),"folder"===o.value.type&&openFolder(o.value)}function onMousedown(e){1===e.button&&(e.preventDefault(),console.log(o.value,[...V.value.path,...o.value.path.map((e=>e.name))].join(X.value).replace("//","/")))}function onMouseover(e){H.value=o.value}function onMouseleave(e){H.value=null}return(e,t)=>(d(),p("tr",{class:z(["row",{error:i(r)}]),onClick:onClick,onMousedown:onMousedown,onMouseover:onMouseover,onMouseleave:onMouseleave,title:i(c)},[f("td",xe,h(i(u)),1),f("td",Ie,h(i(o).name),1),f("td",{class:z(["size",i(s)])},h(i(n)),3),f("td",$e,h(i(l)),1)],42,Pe))},__scopeId:"data-v-aaaff7cc"};c("data-v-1fc6a295");const Be={key:0,class:"rows"},Le={key:1,class:"empty-message"},Fe=[f("span",null,"The folder is empty.",-1)],Re={key:2,class:"error-message"},Ae=f("h2",null,"Error",-1),We=f("td",null,"syscall",-1),Ue=f("td",null,"code",-1),He=f("td",null,"errno",-1);u();const Oe={setup(e){const t=a((()=>!!te.value.hasErrors&&te.value.errors[0]));function onContextMenu(e){e.preventDefault(),te.value.parent&&openFolder(te.value.parent)}return(e,n)=>(d(),p("div",{class:"content",onContextmenu:onContextMenu},[i(W).length?(d(),p("table",Be,[f("tbody",null,[(d(!0),p(S,null,k(i(W),(e=>(d(),D(Ee,{entry:e},null,8,["entry"])))),256))])])):v("",!0),i(ae)&&!i(t)?(d(),p("div",Le,Fe)):v("",!0),i(t)?(d(),p("div",Re,[f("div",null,[Ae,f("table",null,[f("tr",null,[We,f("td",null,[f("pre",null,h(i(t).syscall),1)])]),f("tr",null,[Ue,f("td",null,[f("pre",null,h(i(t).code),1)])]),f("tr",null,[He,f("td",null,[f("pre",null,h(i(t).errno),1)])])])])])):v("",!0)],32))},__scopeId:"data-v-1fc6a295"};c("data-v-08ca63fc");const Ne={class:"status"};u();const Ze={setup(e){const t=a((()=>{var e;return(null==(e=H.value)?void 0:e.size)&&bytesToSizeWinLike(H.value.size)}));return(e,n)=>(d(),p("div",Ne,[f("span",null,"Items count: "+h(i(U)),1),M(f("span",null,". Hover item's size: "+h(i(t)),513),[[C,i(H)]])]))},__scopeId:"data-v-08ca63fc"};c("data-v-16910406");const qe={class:"debug"},Je={key:0},Ge={key:1};u();const Ke={setup:e=>(e,t)=>(d(),p("div",qe,[i(O)?(d(),p("span",Je,h(i(O)),1)):(d(),p("span",Ge,"_"))])),__scopeId:"data-v-16910406"};c("data-v-602ec060");const Ve={class:"main"},Ye=f("div",{style:{"grid-area":"switch"}},null,-1);u();const Qe={setup:e=>(P((async()=>{const e=new URL(location.href).searchParams.get("filepath");if(e){return setScan(await fetch(e))}})),(e,t)=>(d(),p("div",Ve,[Ye,b(ge,{style:{"grid-area":"address"}}),b(ke,{style:{"grid-area":"search"}}),b(Ce,{style:{"grid-area":"tabs"}}),b(Oe,{style:{"grid-area":"content"}}),b(Ze,{style:{"grid-area":"status"}}),b(Ke,{style:{"grid-area":"debug"}})]))),__scopeId:"data-v-602ec060"};x({setup:e=>(e,t)=>(d(),D(Qe))}).mount("#app");
//# sourceMappingURL=index.js.map
