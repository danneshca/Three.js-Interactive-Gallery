import{r as P,j as d,C as be,O as Te,b as we,u as pe,B as X,T as te,g as Me,a as Ee}from"./react-three-vendor-611369f6.js";import{u as oe}from"./leva.esm-82acce57.js";import{d as z}from"./style-vendor-32f1d845.js";import{a4 as Ae,h as ve,aT as Ie,ai as xe,M as Re,P as Le,S as ne,W as Se,a0 as Ne,X as re,e as U,a$ as $,b0 as Fe,aR as _e,G as se,R as Ce,D as Ue,aZ as G,b1 as K,b2 as Oe,J as ge,b3 as je,aU as Be,b4 as ze,b5 as Pe,p as Ge,b6 as ke,b7 as De,a5 as Ve,at as He,b8 as Ye,Q as We,d as Xe,a2 as me}from"./three-vendor-1aa2ed72.js";import{m as Ke}from"./animation-vendor-a22bc070.js";let Y,J,k,W;function q(c,e=1/0,t=null){J||(J=new Ae(2,2,1,1)),k||(k=new ve({uniforms:{blitTexture:new Ie(c)},vertexShader:`
            varying vec2 vUv;
            void main(){
                vUv = uv;
                gl_Position = vec4(position.xy * 1.0,0.,.999999);
            }`,fragmentShader:`
            uniform sampler2D blitTexture; 
            varying vec2 vUv;

            void main(){ 
                gl_FragColor = vec4(vUv.xy, 0, 1);
                
                #ifdef IS_SRGB
                gl_FragColor = LinearTosRGB( texture2D( blitTexture, vUv) );
                #else
                gl_FragColor = texture2D( blitTexture, vUv);
                #endif
            }`})),k.uniforms.blitTexture.value=c,k.defines.IS_SRGB=c.colorSpace==xe,k.needsUpdate=!0,W||(W=new Re(J,k),W.frustrumCulled=!1);const n=new Le,r=new ne;r.add(W),t||(t=Y=new Se({antialias:!1})),t.setSize(Math.min(c.image.width,e),Math.min(c.image.height,e)),t.clear(),t.render(r,n);const i=new Ne(t.domElement);return i.minFilter=c.minFilter,i.magFilter=c.magFilter,i.wrapS=c.wrapS,i.wrapT=c.wrapT,i.name=c.name,Y&&(Y.dispose(),Y=null),i}const ae={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]};class ie{constructor(){this.pluginCallbacks=[],this.register(function(e){return new rt(e)}),this.register(function(e){return new it(e)}),this.register(function(e){return new ct(e)}),this.register(function(e){return new lt(e)}),this.register(function(e){return new ut(e)}),this.register(function(e){return new ft(e)}),this.register(function(e){return new ot(e)}),this.register(function(e){return new at(e)}),this.register(function(e){return new dt(e)}),this.register(function(e){return new ht(e)}),this.register(function(e){return new pt(e)}),this.register(function(e){return new xt(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){const i=new st,s=[];for(let o=0,a=this.pluginCallbacks.length;o<a;o++)s.push(this.pluginCallbacks[o](i));i.setPlugins(s),i.write(e,t,r).catch(n)}parseAsync(e,t){const n=this;return new Promise(function(r,i){n.parse(e,r,i,t)})}}const I={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Q="KHR_mesh_quantization",O={};O[Be]=I.NEAREST;O[ze]=I.NEAREST_MIPMAP_NEAREST;O[Pe]=I.NEAREST_MIPMAP_LINEAR;O[Ge]=I.LINEAR;O[ke]=I.LINEAR_MIPMAP_NEAREST;O[De]=I.LINEAR_MIPMAP_LINEAR;O[Ve]=I.CLAMP_TO_EDGE;O[He]=I.REPEAT;O[Ye]=I.MIRRORED_REPEAT;const ce={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},$e=new re,le=12,Je=1179937895,qe=2,ue=8,Qe=1313821514,Ze=5130562;function H(c,e){return c.length===e.length&&c.every(function(t,n){return t===e[n]})}function et(c){return new TextEncoder().encode(c).buffer}function tt(c){return H(c.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function nt(c,e,t){const n={min:new Array(c.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(c.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let r=e;r<e+t;r++)for(let i=0;i<c.itemSize;i++){let s;c.itemSize>4?s=c.array[r*c.itemSize+i]:(i===0?s=c.getX(r):i===1?s=c.getY(r):i===2?s=c.getZ(r):i===3&&(s=c.getW(r)),c.normalized===!0&&(s=se.normalize(s,c.array))),n.min[i]=Math.min(n.min[i],s),n.max[i]=Math.max(n.max[i],s)}return n}function ye(c){return Math.ceil(c/4)*4}function Z(c,e=0){const t=ye(c.byteLength);if(t!==c.byteLength){const n=new Uint8Array(t);if(n.set(new Uint8Array(c)),e!==0)for(let r=c.byteLength;r<t;r++)n[r]=e;return n.buffer}return c}function fe(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function de(c,e){if(c.toBlob!==void 0)return new Promise(n=>c.toBlob(n,e));let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),c.convertToBlob({type:e,quality:t})}class st{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map}}setPlugins(e){this.plugins=e}async write(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),this.processInput(e),await Promise.all(this.pending);const r=this,i=r.buffers,s=r.json;n=r.options;const o=r.extensionsUsed,a=r.extensionsRequired,l=new Blob(i,{type:"application/octet-stream"}),y=Object.keys(o),g=Object.keys(a);if(y.length>0&&(s.extensionsUsed=y),g.length>0&&(s.extensionsRequired=g),s.buffers&&s.buffers.length>0&&(s.buffers[0].byteLength=l.size),n.binary===!0){const A=new FileReader;A.readAsArrayBuffer(l),A.onloadend=function(){const f=Z(A.result),p=new DataView(new ArrayBuffer(ue));p.setUint32(0,f.byteLength,!0),p.setUint32(4,Ze,!0);const m=Z(et(JSON.stringify(s)),32),M=new DataView(new ArrayBuffer(ue));M.setUint32(0,m.byteLength,!0),M.setUint32(4,Qe,!0);const T=new ArrayBuffer(le),v=new DataView(T);v.setUint32(0,Je,!0),v.setUint32(4,qe,!0);const u=le+M.byteLength+m.byteLength+p.byteLength+f.byteLength;v.setUint32(8,u,!0);const w=new Blob([T,M,m,p,f],{type:"application/octet-stream"}),b=new FileReader;b.readAsArrayBuffer(w),b.onloadend=function(){t(b.result)}}}else if(s.buffers&&s.buffers.length>0){const A=new FileReader;A.readAsDataURL(l),A.onloadend=function(){const f=A.result;s.buffers[0].uri=f,t(s)}}else t(s)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;const n=this.options,r=this.extensionsUsed;try{const i=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&i.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(const s in i.gltfExtensions)t.extensions[s]=i.gltfExtensions[s],r[s]=!0;delete i.gltfExtensions}Object.keys(i).length>0&&(t.extras=i)}catch(i){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+i.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){const r=new Map;r.set(!0,this.uid++),r.set(!1,this.uid++),this.uids.set(e,r)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;const n=new U;for(let r=0,i=e.count;r<i;r++)if(Math.abs(n.fromBufferAttribute(e,r).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){const t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);const n=e.clone(),r=new U;for(let i=0,s=n.count;i<s;i++)r.fromBufferAttribute(n,i),r.x===0&&r.y===0&&r.z===0?r.setX(1):r.normalize(),n.setXYZ(i,r.x,r.y,r.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1;const r={};(t.offset.x!==0||t.offset.y!==0)&&(r.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(r.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(r.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=r,this.extensionsUsed.KHR_texture_transform=!0)}buildMetalRoughTexture(e,t){if(e===t)return e;function n(f){return f.colorSpace===xe?function(m){return m<.04045?m*.0773993808:Math.pow(m*.9478672986+.0521327014,2.4)}:function(m){return m}}console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),e instanceof $&&(e=q(e)),t instanceof $&&(t=q(t));const r=e?e.image:null,i=t?t.image:null,s=Math.max(r?r.width:0,i?i.width:0),o=Math.max(r?r.height:0,i?i.height:0),a=fe();a.width=s,a.height=o;const l=a.getContext("2d");l.fillStyle="#00ffff",l.fillRect(0,0,s,o);const y=l.getImageData(0,0,s,o);if(r){l.drawImage(r,0,0,s,o);const f=n(e),p=l.getImageData(0,0,s,o).data;for(let m=2;m<p.length;m+=4)y.data[m]=f(p[m]/256)*256}if(i){l.drawImage(i,0,0,s,o);const f=n(t),p=l.getImageData(0,0,s,o).data;for(let m=1;m<p.length;m+=4)y.data[m]=f(p[m]/256)*256}l.putImageData(y,0,0);const A=(e||t).clone();return A.source=new Fe(a),A.colorSpace=_e,A.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),A}processBuffer(e){const t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,r,i){const s=this.json;s.bufferViews||(s.bufferViews=[]);let o;switch(t){case I.BYTE:case I.UNSIGNED_BYTE:o=1;break;case I.SHORT:case I.UNSIGNED_SHORT:o=2;break;default:o=4}const a=ye(r*e.itemSize*o),l=new DataView(new ArrayBuffer(a));let y=0;for(let f=n;f<n+r;f++)for(let p=0;p<e.itemSize;p++){let m;e.itemSize>4?m=e.array[f*e.itemSize+p]:(p===0?m=e.getX(f):p===1?m=e.getY(f):p===2?m=e.getZ(f):p===3&&(m=e.getW(f)),e.normalized===!0&&(m=se.normalize(m,e.array))),t===I.FLOAT?l.setFloat32(y,m,!0):t===I.INT?l.setInt32(y,m,!0):t===I.UNSIGNED_INT?l.setUint32(y,m,!0):t===I.SHORT?l.setInt16(y,m,!0):t===I.UNSIGNED_SHORT?l.setUint16(y,m,!0):t===I.BYTE?l.setInt8(y,m):t===I.UNSIGNED_BYTE&&l.setUint8(y,m),y+=o}const g={buffer:this.processBuffer(l.buffer),byteOffset:this.byteOffset,byteLength:a};return i!==void 0&&(g.target=i),i===I.ARRAY_BUFFER&&(g.byteStride=e.itemSize*o),this.byteOffset+=a,s.bufferViews.push(g),{id:s.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){const t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(r){const i=new FileReader;i.readAsArrayBuffer(e),i.onloadend=function(){const s=Z(i.result),o={buffer:t.processBuffer(s),byteOffset:t.byteOffset,byteLength:s.byteLength};t.byteOffset+=s.byteLength,r(n.bufferViews.push(o)-1)}})}processAccessor(e,t,n,r){const i=this.json,s={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"};let o;if(e.array.constructor===Float32Array)o=I.FLOAT;else if(e.array.constructor===Int32Array)o=I.INT;else if(e.array.constructor===Uint32Array)o=I.UNSIGNED_INT;else if(e.array.constructor===Int16Array)o=I.SHORT;else if(e.array.constructor===Uint16Array)o=I.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)o=I.BYTE;else if(e.array.constructor===Uint8Array)o=I.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(r===void 0||r===1/0)&&(r=e.count),r===0)return null;const a=nt(e,n,r);let l;t!==void 0&&(l=e===t.index?I.ELEMENT_ARRAY_BUFFER:I.ARRAY_BUFFER);const y=this.processBufferView(e,o,n,r,l),g={bufferView:y.id,byteOffset:y.byteOffset,componentType:o,count:r,max:a.max,min:a.min,type:s[e.itemSize]};return e.normalized===!0&&(g.normalized=!0),i.accessors||(i.accessors=[]),i.accessors.push(g)-1}processImage(e,t,n,r="image/png"){if(e!==null){const i=this,s=i.cache,o=i.json,a=i.options,l=i.pending;s.images.has(e)||s.images.set(e,{});const y=s.images.get(e),g=r+":flipY/"+n.toString();if(y[g]!==void 0)return y[g];o.images||(o.images=[]);const A={mimeType:r},f=fe();f.width=Math.min(e.width,a.maxTextureSize),f.height=Math.min(e.height,a.maxTextureSize);const p=f.getContext("2d");if(n===!0&&(p.translate(0,f.height),p.scale(1,-1)),e.data!==void 0){t!==Ce&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>a.maxTextureSize||e.height>a.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);const M=new Uint8ClampedArray(e.height*e.width*4);for(let T=0;T<M.length;T+=4)M[T+0]=e.data[T+0],M[T+1]=e.data[T+1],M[T+2]=e.data[T+2],M[T+3]=e.data[T+3];p.putImageData(new ImageData(M,e.width,e.height),0,0)}else p.drawImage(e,0,0,f.width,f.height);a.binary===!0?l.push(de(f,r).then(M=>i.processBufferViewImage(M)).then(M=>{A.bufferView=M})):f.toDataURL!==void 0?A.uri=f.toDataURL(r):l.push(de(f,r).then(M=>new FileReader().readAsDataURL(M)).then(M=>{A.uri=M}));const m=o.images.push(A)-1;return y[g]=m,m}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){const t=this.json;t.samplers||(t.samplers=[]);const n={magFilter:O[e.magFilter],minFilter:O[e.minFilter],wrapS:O[e.wrapS],wrapT:O[e.wrapT]};return t.samplers.push(n)-1}processTexture(e){const n=this.options,r=this.cache,i=this.json;if(r.textures.has(e))return r.textures.get(e);i.textures||(i.textures=[]),e instanceof $&&(e=q(e,n.maxTextureSize));let s=e.userData.mimeType;s==="image/webp"&&(s="image/png");const o={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,s)};e.name&&(o.name=e.name),this._invokeAll(function(l){l.writeTexture&&l.writeTexture(e,o)});const a=i.textures.push(o)-1;return r.textures.set(e,a),a}processMaterial(e){const t=this.cache,n=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);const r={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");const i=e.color.toArray().concat([e.opacity]);if(H(i,[1,1,1,1])||(r.pbrMetallicRoughness.baseColorFactor=i),e.isMeshStandardMaterial?(r.pbrMetallicRoughness.metallicFactor=e.metalness,r.pbrMetallicRoughness.roughnessFactor=e.roughness):(r.pbrMetallicRoughness.metallicFactor=.5,r.pbrMetallicRoughness.roughnessFactor=.5),e.metalnessMap||e.roughnessMap){const o=this.buildMetalRoughTexture(e.metalnessMap,e.roughnessMap),a={index:this.processTexture(o),channel:o.channel};this.applyTextureTransform(a,o),r.pbrMetallicRoughness.metallicRoughnessTexture=a}if(e.map){const o={index:this.processTexture(e.map),texCoord:e.map.channel};this.applyTextureTransform(o,e.map),r.pbrMetallicRoughness.baseColorTexture=o}if(e.emissive){const o=e.emissive;if(Math.max(o.r,o.g,o.b)>0&&(r.emissiveFactor=e.emissive.toArray()),e.emissiveMap){const l={index:this.processTexture(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(l,e.emissiveMap),r.emissiveTexture=l}}if(e.normalMap){const o={index:this.processTexture(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(o.scale=e.normalScale.x),this.applyTextureTransform(o,e.normalMap),r.normalTexture=o}if(e.aoMap){const o={index:this.processTexture(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(o.strength=e.aoMapIntensity),this.applyTextureTransform(o,e.aoMap),r.occlusionTexture=o}e.transparent?r.alphaMode="BLEND":e.alphaTest>0&&(r.alphaMode="MASK",r.alphaCutoff=e.alphaTest),e.side===Ue&&(r.doubleSided=!0),e.name!==""&&(r.name=e.name),this.serializeUserData(e,r),this._invokeAll(function(o){o.writeMaterial&&o.writeMaterial(e,r)});const s=n.materials.push(r)-1;return t.materials.set(e,s),s}processMesh(e){const t=this.cache,n=this.json,r=[e.geometry.uuid];if(Array.isArray(e.material))for(let u=0,w=e.material.length;u<w;u++)r.push(e.material[u].uuid);else r.push(e.material.uuid);const i=r.join(":");if(t.meshes.has(i))return t.meshes.get(i);const s=e.geometry;let o;e.isLineSegments?o=I.LINES:e.isLineLoop?o=I.LINE_LOOP:e.isLine?o=I.LINE_STRIP:e.isPoints?o=I.POINTS:o=e.material.wireframe?I.LINES:I.TRIANGLES;const a={},l={},y=[],g=[],A={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=s.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),s.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let p=null;for(let u in s.attributes){if(u.slice(0,5)==="morph")continue;const w=s.attributes[u];if(u=A[u]||u.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(u)||(u="_"+u),t.attributes.has(this.getUID(w))){l[u]=t.attributes.get(this.getUID(w));continue}p=null;const x=w.array;u==="JOINTS_0"&&!(x instanceof Uint16Array)&&!(x instanceof Uint8Array)&&(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),p=new G(new Uint16Array(x),w.itemSize,w.normalized));const h=this.processAccessor(p||w,s);h!==null&&(u.startsWith("_")||this.detectMeshQuantization(u,w),l[u]=h,t.attributes.set(this.getUID(w),h))}if(f!==void 0&&s.setAttribute("normal",f),Object.keys(l).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){const u=[],w=[],b={};if(e.morphTargetDictionary!==void 0)for(const x in e.morphTargetDictionary)b[e.morphTargetDictionary[x]]=x;for(let x=0;x<e.morphTargetInfluences.length;++x){const h={};let E=!1;for(const L in s.morphAttributes){if(L!=="position"&&L!=="normal"){E||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),E=!0);continue}const R=s.morphAttributes[L][x],F=L.toUpperCase(),C=s.attributes[L];if(t.attributes.has(this.getUID(R,!0))){h[F]=t.attributes.get(this.getUID(R,!0));continue}const S=R.clone();if(!s.morphTargetsRelative)for(let N=0,j=R.count;N<j;N++)for(let B=0;B<R.itemSize;B++)B===0&&S.setX(N,R.getX(N)-C.getX(N)),B===1&&S.setY(N,R.getY(N)-C.getY(N)),B===2&&S.setZ(N,R.getZ(N)-C.getZ(N)),B===3&&S.setW(N,R.getW(N)-C.getW(N));h[F]=this.processAccessor(S,s),t.attributes.set(this.getUID(C,!0),h[F])}g.push(h),u.push(e.morphTargetInfluences[x]),e.morphTargetDictionary!==void 0&&w.push(b[x])}a.weights=u,w.length>0&&(a.extras={},a.extras.targetNames=w)}const m=Array.isArray(e.material);if(m&&s.groups.length===0)return null;const M=m?e.material:[e.material],T=m?s.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let u=0,w=T.length;u<w;u++){const b={mode:o,attributes:l};if(this.serializeUserData(s,b),g.length>0&&(b.targets=g),s.index!==null){let h=this.getUID(s.index);(T[u].start!==void 0||T[u].count!==void 0)&&(h+=":"+T[u].start+":"+T[u].count),t.attributes.has(h)?b.indices=t.attributes.get(h):(b.indices=this.processAccessor(s.index,s,T[u].start,T[u].count),t.attributes.set(h,b.indices)),b.indices===null&&delete b.indices}const x=this.processMaterial(M[T[u].materialIndex]);x!==null&&(b.material=x),y.push(b)}a.primitives=y,n.meshes||(n.meshes=[]),this._invokeAll(function(u){u.writeMesh&&u.writeMesh(e,a)});const v=n.meshes.push(a)-1;return t.meshes.set(i,v),v}detectMeshQuantization(e,t){if(this.extensionsUsed[Q])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");const r=e.split("_",1)[0];ae[r]&&ae[r].includes(n)&&(this.extensionsUsed[Q]=!0,this.extensionsRequired[Q]=!0)}processCamera(e){const t=this.json;t.cameras||(t.cameras=[]);const n=e.isOrthographicCamera,r={type:n?"orthographic":"perspective"};return n?r.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:r.perspective={aspectRatio:e.aspect,yfov:se.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(r.name=e.type),t.cameras.push(r)-1}processAnimation(e,t){const n=this.json,r=this.nodeMap;n.animations||(n.animations=[]),e=ie.Utils.mergeMorphTargetTracks(e.clone(),t);const i=e.tracks,s=[],o=[];for(let a=0;a<i.length;++a){const l=i[a],y=K.parseTrackName(l.name);let g=K.findNode(t,y.nodeName);const A=ce[y.propertyName];if(y.objectName==="bones"&&(g.isSkinnedMesh===!0?g=g.skeleton.getBoneByName(y.objectIndex):g=void 0),!g||!A)return console.warn('THREE.GLTFExporter: Could not export animation track "%s".',l.name),null;const f=1;let p=l.values.length/l.times.length;A===ce.morphTargetInfluences&&(p/=g.morphTargetInfluences.length);let m;l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(m="CUBICSPLINE",p/=3):l.getInterpolation()===Oe?m="STEP":m="LINEAR",o.push({input:this.processAccessor(new G(l.times,f)),output:this.processAccessor(new G(l.values,p)),interpolation:m}),s.push({sampler:o.length-1,target:{node:r.get(g),path:A}})}return n.animations.push({name:e.name||"clip_"+n.animations.length,samplers:o,channels:s}),n.animations.length-1}processSkin(e){const t=this.json,n=this.nodeMap,r=t.nodes[n.get(e)],i=e.skeleton;if(i===void 0)return null;const s=e.skeleton.bones[0];if(s===void 0)return null;const o=[],a=new Float32Array(i.bones.length*16),l=new ge;for(let g=0;g<i.bones.length;++g)o.push(n.get(i.bones[g])),l.copy(i.boneInverses[g]),l.multiply(e.bindMatrix).toArray(a,g*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new G(a,16)),joints:o,skeleton:n.get(s)}),r.skin=t.skins.length-1}processNode(e){const t=this.json,n=this.options,r=this.nodeMap;t.nodes||(t.nodes=[]);const i={};if(n.trs){const o=e.quaternion.toArray(),a=e.position.toArray(),l=e.scale.toArray();H(o,[0,0,0,1])||(i.rotation=o),H(a,[0,0,0])||(i.translation=a),H(l,[1,1,1])||(i.scale=l)}else e.matrixAutoUpdate&&e.updateMatrix(),tt(e.matrix)===!1&&(i.matrix=e.matrix.elements);if(e.name!==""&&(i.name=String(e.name)),this.serializeUserData(e,i),e.isMesh||e.isLine||e.isPoints){const o=this.processMesh(e);o!==null&&(i.mesh=o)}else e.isCamera&&(i.camera=this.processCamera(e));if(e.isSkinnedMesh&&this.skins.push(e),e.children.length>0){const o=[];for(let a=0,l=e.children.length;a<l;a++){const y=e.children[a];if(y.visible||n.onlyVisible===!1){const g=this.processNode(y);g!==null&&o.push(g)}}o.length>0&&(i.children=o)}this._invokeAll(function(o){o.writeNode&&o.writeNode(e,i)});const s=t.nodes.push(i)-1;return r.set(e,s),s}processScene(e){const t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);const r={};e.name!==""&&(r.name=e.name),t.scenes.push(r);const i=[];for(let s=0,o=e.children.length;s<o;s++){const a=e.children[s];if(a.visible||n.onlyVisible===!1){const l=this.processNode(a);l!==null&&i.push(l)}}i.length>0&&(r.nodes=i),this.serializeUserData(e,r)}processObjects(e){const t=new ne;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);this.processScene(t)}processInput(e){const t=this.options;e=e instanceof Array?e:[e],this._invokeAll(function(r){r.beforeParse&&r.beforeParse(e)});const n=[];for(let r=0;r<e.length;r++)e[r]instanceof ne?this.processScene(e[r]):n.push(e[r]);n.length>0&&this.processObjects(n);for(let r=0;r<this.skins.length;++r)this.processSkin(this.skins[r]);for(let r=0;r<t.animations.length;++r)this.processAnimation(t.animations[r],e[0]);this._invokeAll(function(r){r.afterParse&&r.afterParse(e)})}_invokeAll(e){for(let t=0,n=this.plugins.length;t<n;t++)e(this.plugins[t])}}class rt{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}const n=this.writer,r=n.json,i=n.extensionsUsed,s={};e.name&&(s.name=e.name),s.color=e.color.toArray(),s.intensity=e.intensity,e.isDirectionalLight?s.type="directional":e.isPointLight?(s.type="point",e.distance>0&&(s.range=e.distance)):e.isSpotLight&&(s.type="spot",e.distance>0&&(s.range=e.distance),s.spot={},s.spot.innerConeAngle=(1-e.penumbra)*e.angle,s.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),i[this.name]||(r.extensions=r.extensions||{},r.extensions[this.name]={lights:[]},i[this.name]=!0);const o=r.extensions[this.name].lights;o.push(s),t.extensions=t.extensions||{},t.extensions[this.name]={light:o.length-1}}}class it{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}writeMaterial(e,t){if(!e.isMeshBasicMaterial)return;const r=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},r[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}}class ot{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;const n=this.writer,r=n.extensionsUsed,i={};if(i.clearcoatFactor=e.clearcoat,e.clearcoatMap){const s={index:n.processTexture(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(s,e.clearcoatMap),i.clearcoatTexture=s}if(i.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){const s={index:n.processTexture(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(s,e.clearcoatRoughnessMap),i.clearcoatRoughnessTexture=s}if(e.clearcoatNormalMap){const s={index:n.processTexture(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};n.applyTextureTransform(s,e.clearcoatNormalMap),i.clearcoatNormalTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class at{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;const n=this.writer,r=n.extensionsUsed,i={};if(i.iridescenceFactor=e.iridescence,e.iridescenceMap){const s={index:n.processTexture(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(s,e.iridescenceMap),i.iridescenceTexture=s}if(i.iridescenceIor=e.iridescenceIOR,i.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],i.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){const s={index:n.processTexture(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(s,e.iridescenceThicknessMap),i.iridescenceThicknessTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class ct{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const n=this.writer,r=n.extensionsUsed,i={};if(i.transmissionFactor=e.transmission,e.transmissionMap){const s={index:n.processTexture(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(s,e.transmissionMap),i.transmissionTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class lt{constructor(e){this.writer=e,this.name="KHR_materials_volume"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const n=this.writer,r=n.extensionsUsed,i={};if(i.thicknessFactor=e.thickness,e.thicknessMap){const s={index:n.processTexture(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(s,e.thicknessMap),i.thicknessTexture=s}i.attenuationDistance=e.attenuationDistance,i.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class ut{constructor(e){this.writer=e,this.name="KHR_materials_ior"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;const r=this.writer.extensionsUsed,i={};i.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class ft{constructor(e){this.writer=e,this.name="KHR_materials_specular"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals($e)&&!e.specularIntensityMap&&!e.specularColorTexture)return;const n=this.writer,r=n.extensionsUsed,i={};if(e.specularIntensityMap){const s={index:n.processTexture(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(s,e.specularIntensityMap),i.specularTexture=s}if(e.specularColorMap){const s={index:n.processTexture(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(s,e.specularColorMap),i.specularColorTexture=s}i.specularFactor=e.specularIntensity,i.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class dt{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;const n=this.writer,r=n.extensionsUsed,i={};if(e.sheenRoughnessMap){const s={index:n.processTexture(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(s,e.sheenRoughnessMap),i.sheenRoughnessTexture=s}if(e.sheenColorMap){const s={index:n.processTexture(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(s,e.sheenColorMap),i.sheenColorTexture=s}i.sheenRoughnessFactor=e.sheenRoughness,i.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class ht{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}writeMaterial(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;const n=this.writer,r=n.extensionsUsed,i={};if(e.anisotropyMap){const s={index:n.processTexture(e.anisotropyMap)};n.applyTextureTransform(s,e.anisotropyMap),i.anisotropyTexture=s}i.anisotropyStrength=e.anisotropy,i.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class pt{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}writeMaterial(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;const r=this.writer.extensionsUsed,i={};i.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class xt{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;const n=this.writer,r=e,i=new Float32Array(r.count*3),s=new Float32Array(r.count*4),o=new Float32Array(r.count*3),a=new ge,l=new U,y=new We,g=new U;for(let f=0;f<r.count;f++)r.getMatrixAt(f,a),a.decompose(l,y,g),l.toArray(i,f*3),y.toArray(s,f*4),g.toArray(o,f*3);const A={TRANSLATION:n.processAccessor(new G(i,3)),ROTATION:n.processAccessor(new G(s,4)),SCALE:n.processAccessor(new G(o,3))};r.instanceColor&&(A._COLOR_0=n.processAccessor(r.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:A},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}}ie.Utils={insertKeyframe:function(c,e){const n=c.getValueSize(),r=new c.TimeBufferType(c.times.length+1),i=new c.ValueBufferType(c.values.length+n),s=c.createInterpolant(new c.ValueBufferType(n));let o;if(c.times.length===0){r[0]=e;for(let a=0;a<n;a++)i[a]=0;o=0}else if(e<c.times[0]){if(Math.abs(c.times[0]-e)<.001)return 0;r[0]=e,r.set(c.times,1),i.set(s.evaluate(e),0),i.set(c.values,n),o=0}else if(e>c.times[c.times.length-1]){if(Math.abs(c.times[c.times.length-1]-e)<.001)return c.times.length-1;r[r.length-1]=e,r.set(c.times,0),i.set(c.values,0),i.set(s.evaluate(e),c.values.length),o=r.length-1}else for(let a=0;a<c.times.length;a++){if(Math.abs(c.times[a]-e)<.001)return a;if(c.times[a]<e&&c.times[a+1]>e){r.set(c.times.slice(0,a+1),0),r[a+1]=e,r.set(c.times.slice(a+1),a+2),i.set(c.values.slice(0,(a+1)*n),0),i.set(s.evaluate(e),(a+1)*n),i.set(c.values.slice((a+1)*n),(a+2)*n),o=a+1;break}}return c.times=r,c.values=i,o},mergeMorphTargetTracks:function(c,e){const t=[],n={},r=c.tracks;for(let i=0;i<r.length;++i){let s=r[i];const o=K.parseTrackName(s.name),a=K.findNode(e,o.nodeName);if(o.propertyName!=="morphTargetInfluences"||o.propertyIndex===void 0){t.push(s);continue}if(s.createInterpolant!==s.InterpolantFactoryMethodDiscrete&&s.createInterpolant!==s.InterpolantFactoryMethodLinear){if(s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),s=s.clone(),s.setInterpolation(je)}const l=a.morphTargetInfluences.length,y=a.morphTargetDictionary[o.propertyIndex];if(y===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+o.propertyIndex);let g;if(n[a.uuid]===void 0){g=s.clone();const f=new g.ValueBufferType(l*g.times.length);for(let p=0;p<g.times.length;p++)f[p*l+y]=g.values[p];g.name=(o.nodeName||"")+".morphTargetInfluences",g.values=f,n[a.uuid]=g,t.push(g);continue}const A=s.createInterpolant(new s.ValueBufferType(1));g=n[a.uuid];for(let f=0;f<g.times.length;f++)g.values[f*l+y]=A.evaluate(g.times[f]);for(let f=0;f<s.times.length;f++){const p=this.insertKeyframe(g,s.times[f]);g.values[p*l+y]=s.values[f]}}return c.tracks=t,c}};class gt{parse(e){let t="",n=0,r=0,i=0;const s=new U,o=new re,a=new U,l=new Xe,y=[];function g(p){let m=0,M=0,T=0;const v=p.geometry,u=new me,w=v.getAttribute("position"),b=v.getAttribute("normal"),x=v.getAttribute("uv"),h=v.getIndex();if(t+="o "+p.name+`
`,p.material&&p.material.name&&(t+="usemtl "+p.material.name+`
`),w!==void 0)for(let E=0,L=w.count;E<L;E++,m++)s.fromBufferAttribute(w,E),s.applyMatrix4(p.matrixWorld),t+="v "+s.x+" "+s.y+" "+s.z+`
`;if(x!==void 0)for(let E=0,L=x.count;E<L;E++,T++)l.fromBufferAttribute(x,E),t+="vt "+l.x+" "+l.y+`
`;if(b!==void 0){u.getNormalMatrix(p.matrixWorld);for(let E=0,L=b.count;E<L;E++,M++)a.fromBufferAttribute(b,E),a.applyMatrix3(u).normalize(),t+="vn "+a.x+" "+a.y+" "+a.z+`
`}if(h!==null)for(let E=0,L=h.count;E<L;E+=3){for(let R=0;R<3;R++){const F=h.getX(E+R)+1;y[R]=n+F+(b||x?"/"+(x?r+F:"")+(b?"/"+(i+F):""):"")}t+="f "+y.join(" ")+`
`}else for(let E=0,L=w.count;E<L;E+=3){for(let R=0;R<3;R++){const F=E+R+1;y[R]=n+F+(b||x?"/"+(x?r+F:"")+(b?"/"+(i+F):""):"")}t+="f "+y.join(" ")+`
`}n+=m,r+=T,i+=M}function A(p){let m=0;const M=p.geometry,T=p.type,v=M.getAttribute("position");if(t+="o "+p.name+`
`,v!==void 0)for(let u=0,w=v.count;u<w;u++,m++)s.fromBufferAttribute(v,u),s.applyMatrix4(p.matrixWorld),t+="v "+s.x+" "+s.y+" "+s.z+`
`;if(T==="Line"){t+="l ";for(let u=1,w=v.count;u<=w;u++)t+=n+u+" ";t+=`
`}if(T==="LineSegments")for(let u=1,w=u+1,b=v.count;u<b;u+=2,w=u+1)t+="l "+(n+u)+" "+(n+w)+`
`;n+=m}function f(p){let m=0;const M=p.geometry,T=M.getAttribute("position"),v=M.getAttribute("color");if(t+="o "+p.name+`
`,T!==void 0){for(let u=0,w=T.count;u<w;u++,m++)s.fromBufferAttribute(T,u),s.applyMatrix4(p.matrixWorld),t+="v "+s.x+" "+s.y+" "+s.z,v!==void 0&&(o.fromBufferAttribute(v,u).convertLinearToSRGB(),t+=" "+o.r+" "+o.g+" "+o.b),t+=`
`;t+="p ";for(let u=1,w=T.count;u<=w;u++)t+=n+u+" ";t+=`
`}n+=m}return e.traverse(function(p){p.isMesh===!0&&g(p),p.isLine===!0&&A(p),p.isPoints===!0&&f(p)}),t}}class mt{parse(e,t,n={}){function r(u){e.traverse(function(w){if(w.isMesh===!0||w.isPoints){const b=w,x=b.geometry;x.hasAttribute("position")===!0&&u(b,x)}})}n=Object.assign({binary:!1,excludeAttributes:[],littleEndian:!1},n);const s=n.excludeAttributes;let o=!0,a=!1,l=!1,y=!1,g=0,A=0;e.traverse(function(u){if(u.isMesh===!0){const b=u.geometry,x=b.getAttribute("position"),h=b.getAttribute("normal"),E=b.getAttribute("uv"),L=b.getAttribute("color"),R=b.getIndex();if(x===void 0)return;g+=x.count,A+=R?R.count/3:x.count/3,h!==void 0&&(a=!0),E!==void 0&&(y=!0),L!==void 0&&(l=!0)}else if(u.isPoints){const b=u.geometry,x=b.getAttribute("position"),h=b.getAttribute("normal"),E=b.getAttribute("color");g+=x.count,h!==void 0&&(a=!0),E!==void 0&&(l=!0),o=!1}});const f=new re;if(o=o&&s.indexOf("index")===-1,a=a&&s.indexOf("normal")===-1,l=l&&s.indexOf("color")===-1,y=y&&s.indexOf("uv")===-1,o&&A!==Math.floor(A))return console.error("PLYExporter: Failed to generate a valid PLY file with triangle indices because the number of indices is not divisible by 3."),null;const p=4;let m=`ply
format ${n.binary?n.littleEndian?"binary_little_endian":"binary_big_endian":"ascii"} 1.0
element vertex ${g}
property float x
property float y
property float z
`;a===!0&&(m+=`property float nx
property float ny
property float nz
`),y===!0&&(m+=`property float s
property float t
`),l===!0&&(m+=`property uchar red
property uchar green
property uchar blue
`),o===!0&&(m+=`element face ${A}
property list uchar int vertex_index
`),m+=`end_header
`;const M=new U,T=new me;let v=null;if(n.binary===!0){const u=new TextEncoder().encode(m),w=g*(4*3+(a?4*3:0)+(l?3:0)+(y?4*2:0)),b=o?A*(p*3+1):0,x=new DataView(new ArrayBuffer(u.length+w+b));new Uint8Array(x.buffer).set(u,0);let h=u.length,E=u.length+w,L=0;r(function(R,F){const C=F.getAttribute("position"),S=F.getAttribute("normal"),N=F.getAttribute("uv"),j=F.getAttribute("color"),B=F.getIndex();T.getNormalMatrix(R.matrixWorld);for(let _=0,D=C.count;_<D;_++)M.fromBufferAttribute(C,_),M.applyMatrix4(R.matrixWorld),x.setFloat32(h,M.x,n.littleEndian),h+=4,x.setFloat32(h,M.y,n.littleEndian),h+=4,x.setFloat32(h,M.z,n.littleEndian),h+=4,a===!0&&(S!=null?(M.fromBufferAttribute(S,_),M.applyMatrix3(T).normalize(),x.setFloat32(h,M.x,n.littleEndian),h+=4,x.setFloat32(h,M.y,n.littleEndian),h+=4,x.setFloat32(h,M.z,n.littleEndian),h+=4):(x.setFloat32(h,0,n.littleEndian),h+=4,x.setFloat32(h,0,n.littleEndian),h+=4,x.setFloat32(h,0,n.littleEndian),h+=4)),y===!0&&(N!=null?(x.setFloat32(h,N.getX(_),n.littleEndian),h+=4,x.setFloat32(h,N.getY(_),n.littleEndian),h+=4):(x.setFloat32(h,0,n.littleEndian),h+=4,x.setFloat32(h,0,n.littleEndian),h+=4)),l===!0&&(j!=null?(f.fromBufferAttribute(j,_).convertLinearToSRGB(),x.setUint8(h,Math.floor(f.r*255)),h+=1,x.setUint8(h,Math.floor(f.g*255)),h+=1,x.setUint8(h,Math.floor(f.b*255)),h+=1):(x.setUint8(h,255),h+=1,x.setUint8(h,255),h+=1,x.setUint8(h,255),h+=1));if(o===!0)if(B!==null)for(let _=0,D=B.count;_<D;_+=3)x.setUint8(E,3),E+=1,x.setUint32(E,B.getX(_+0)+L,n.littleEndian),E+=p,x.setUint32(E,B.getX(_+1)+L,n.littleEndian),E+=p,x.setUint32(E,B.getX(_+2)+L,n.littleEndian),E+=p;else for(let _=0,D=C.count;_<D;_+=3)x.setUint8(E,3),E+=1,x.setUint32(E,L+_,n.littleEndian),E+=p,x.setUint32(E,L+_+1,n.littleEndian),E+=p,x.setUint32(E,L+_+2,n.littleEndian),E+=p;L+=C.count}),v=x.buffer}else{let u=0,w="",b="";r(function(x,h){const E=h.getAttribute("position"),L=h.getAttribute("normal"),R=h.getAttribute("uv"),F=h.getAttribute("color"),C=h.getIndex();T.getNormalMatrix(x.matrixWorld);for(let S=0,N=E.count;S<N;S++){M.fromBufferAttribute(E,S),M.applyMatrix4(x.matrixWorld);let j=M.x+" "+M.y+" "+M.z;a===!0&&(L!=null?(M.fromBufferAttribute(L,S),M.applyMatrix3(T).normalize(),j+=" "+M.x+" "+M.y+" "+M.z):j+=" 0 0 0"),y===!0&&(R!=null?j+=" "+R.getX(S)+" "+R.getY(S):j+=" 0 0"),l===!0&&(F!=null?(f.fromBufferAttribute(F,S).convertLinearToSRGB(),j+=" "+Math.floor(f.r*255)+" "+Math.floor(f.g*255)+" "+Math.floor(f.b*255)):j+=" 255 255 255"),w+=j+`
`}if(o===!0){if(C!==null)for(let S=0,N=C.count;S<N;S+=3)b+=`3 ${C.getX(S+0)+u}`,b+=` ${C.getX(S+1)+u}`,b+=` ${C.getX(S+2)+u}
`;else for(let S=0,N=E.count;S<N;S+=3)b+=`3 ${u+S} ${u+S+1} ${u+S+2}
`;A+=C?C.count/3:E.count/3}u+=E.count}),v=`${m}${w}${o?`${b}
`:`
`}`}return typeof t=="function"&&requestAnimationFrame(()=>t(v)),v}}class yt{parse(e,t={}){t=Object.assign({binary:!1},t);const n=t.binary,r=[];let i=0;e.traverse(function(T){if(T.isMesh){const v=T.geometry,u=v.index,w=v.getAttribute("position");i+=u!==null?u.count/3:w.count/3,r.push({object3d:T,geometry:v})}});let s,o=80;if(n===!0){const T=i*2+i*3*4*4+80+4,v=new ArrayBuffer(T);s=new DataView(v),s.setUint32(o,i,!0),o+=4}else s="",s+=`solid exported
`;const a=new U,l=new U,y=new U,g=new U,A=new U,f=new U;for(let T=0,v=r.length;T<v;T++){const u=r[T].object3d,w=r[T].geometry,b=w.index,x=w.getAttribute("position");if(b!==null)for(let h=0;h<b.count;h+=3){const E=b.getX(h+0),L=b.getX(h+1),R=b.getX(h+2);p(E,L,R,x,u)}else for(let h=0;h<x.count;h+=3){const E=h+0,L=h+1,R=h+2;p(E,L,R,x,u)}}return n===!1&&(s+=`endsolid exported
`),s;function p(T,v,u,w,b){a.fromBufferAttribute(w,T),l.fromBufferAttribute(w,v),y.fromBufferAttribute(w,u),b.isSkinnedMesh===!0&&(b.applyBoneTransform(T,a),b.applyBoneTransform(v,l),b.applyBoneTransform(u,y)),a.applyMatrix4(b.matrixWorld),l.applyMatrix4(b.matrixWorld),y.applyMatrix4(b.matrixWorld),m(a,l,y),M(a),M(l),M(y),n===!0?(s.setUint16(o,0,!0),o+=2):(s+=`		endloop
`,s+=`	endfacet
`)}function m(T,v,u){g.subVectors(u,v),A.subVectors(T,v),g.cross(A).normalize(),f.copy(g).normalize(),n===!0?(s.setFloat32(o,f.x,!0),o+=4,s.setFloat32(o,f.y,!0),o+=4,s.setFloat32(o,f.z,!0),o+=4):(s+="	facet normal "+f.x+" "+f.y+" "+f.z+`
`,s+=`		outer loop
`)}function M(T){n===!0?(s.setFloat32(o,T.x,!0),o+=4,s.setFloat32(o,T.y,!0),o+=4,s.setFloat32(o,T.z,!0),o+=4):s+="			vertex "+T.x+" "+T.y+" "+T.z+`
`}}}const bt=z.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  padding-top: 80px;
`,Tt=z.div`
  flex: 1;
  height: calc(100vh - 80px);
  position: relative;
`,wt=z(Ke.div)`
  width: 350px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
`,Mt=z.h2`
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,he=z.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,ee=z.ul`
  color: var(--text-secondary);
  margin-left: 1rem;
  
  li {
    margin-bottom: 0.5rem;
    
    code {
      background: rgba(0, 255, 255, 0.1);
      color: var(--accent-color);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }
  }
`,Et=z.details`
  margin-top: 2rem;
  
  summary {
    color: var(--accent-color);
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
`;z.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  
  .export-section {
    margin-bottom: 1.5rem;
    
    h4 {
      color: var(--accent-color);
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    
    .export-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
  }
  
  .export-stats {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    padding: 0.5rem;
    margin-top: 1rem;
    
    .stat-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.25rem;
      font-size: 0.8rem;
      
      .label {
        color: var(--text-secondary);
      }
      
      .value {
        color: var(--accent-color);
      }
    }
  }
`;z.button`
  background: ${c=>c.primary?"var(--accent-color)":"rgba(255, 255, 255, 0.1)"};
  color: ${c=>c.primary?"#000":"var(--text-secondary)"};
  border: 1px solid ${c=>c.primary?"var(--accent-color)":"rgba(255, 255, 255, 0.2)"};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: var(--accent-color);
    color: #000;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;z.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0.5rem 0;
  
  .progress-fill {
    height: 100%;
    background: var(--accent-color);
    width: ${c=>c.progress}%;
    transition: width 0.3s ease;
  }
`;z.div`
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  
  &.success {
    background: rgba(76, 175, 80, 0.2);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.3);
  }
  
  &.error {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.3);
  }
  
  &.info {
    background: rgba(33, 150, 243, 0.2);
    color: #2196F3;
    border: 1px solid rgba(33, 150, 243, 0.3);
  }
`;class At{constructor(){this.gltfExporter=new ie,this.objExporter=new gt,this.plyExporter=new mt,this.stlExporter=new yt}async exportGLTF(e,t={}){return new Promise((n,r)=>{const s={...{binary:!1,embedImages:!0,animations:!0,includeCustomExtensions:!1,onlyVisible:!0,truncateDrawRange:!0,maxTextureSize:4096},...t};this.gltfExporter.parse(e,o=>{const a=s.binary?o:JSON.stringify(o,null,2);n({data:a,filename:`scene.${s.binary?"glb":"gltf"}`,mimeType:s.binary?"model/gltf-binary":"model/gltf+json"})},o=>r(o),s)})}async exportOBJ(e,t={}){return new Promise(n=>{const r=this.objExporter.parse(e);n({data:r,filename:"scene.obj",mimeType:"text/plain"})})}async exportPLY(e,t={}){return new Promise(n=>{const i={...{binary:!1,excludeAttributes:[]},...t},s=this.plyExporter.parse(e,i);n({data:s,filename:`scene.${i.binary,"ply"}`,mimeType:i.binary?"application/octet-stream":"text/plain"})})}async exportSTL(e,t={}){return new Promise(n=>{const i={...{binary:!1},...t},s=this.stlExporter.parse(e,i);n({data:s,filename:`scene.${i.binary,"stl"}`,mimeType:i.binary?"application/octet-stream":"text/plain"})})}downloadFile(e,t,n){const r=e instanceof Blob?e:new Blob([e],{type:n}),i=URL.createObjectURL(r),s=document.createElement("a");s.href=i,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}}function V({position:c,type:e,color:t,name:n}){const r=P.useRef(),[i,s]=P.useState(!1);pe(l=>{r.current&&(r.current.rotation.x=l.clock.elapsedTime*.5,r.current.rotation.y=l.clock.elapsedTime*.3,i?r.current.scale.setScalar(1.1+Math.sin(l.clock.elapsedTime*5)*.05):r.current.scale.setScalar(1))});const o=()=>{s(!i)},a=()=>{switch(e){case"box":return d.jsx(X,{args:[1,1,1]});case"sphere":return d.jsx(Ee,{args:[.5,32,32]});case"cylinder":return d.jsx(Me,{args:[.3,.3,1,8]});default:return d.jsx(X,{args:[1,1,1]})}};return d.jsxs("group",{ref:r,position:c,onClick:o,userData:{name:n,type:e,exportable:!0},children:[a(),d.jsx("meshStandardMaterial",{color:i?"#ff6b6b":t,emissive:i?"#330000":"#000000",wireframe:i}),i&&d.jsxs(d.Fragment,{children:[d.jsx(X,{args:[1.2,1.2,1.2],children:d.jsx("meshBasicMaterial",{color:"#ff6b6b",transparent:!0,opacity:.2,wireframe:!0})}),d.jsx(te,{position:[0,1,0],fontSize:.2,color:"#ff6b6b",anchorX:"center",anchorY:"bottom",children:n})]})]})}function vt(){const{scene:c,gl:e,camera:t}=we();P.useState(()=>new At),P.useState(0),P.useState(null);const[n,r]=P.useState({objects:0,triangles:0,vertices:0,textures:0}),{showGrid:i,showLights:s,animationSpeed:o}=oe("场景设置",{showGrid:{value:!0,label:"显示网格"},showLights:{value:!0,label:"显示光源"},animationSpeed:{value:1,min:0,max:3,step:.1,label:"动画速度"}});return oe("导出设置",{gltfBinary:{value:!1,label:"GLTF二进制格式"},includeAnimations:{value:!0,label:"包含动画"},embedImages:{value:!0,label:"嵌入图像"},screenshotWidth:{value:1920,min:512,max:4096,step:128,label:"截图宽度"},screenshotHeight:{value:1080,min:512,max:4096,step:128,label:"截图高度"},screenshotFormat:{value:"png",options:{PNG:"png",JPEG:"jpeg",WebP:"webp"},label:"截图格式"}}),pe(()=>{let a=0,l=0,y=0,g=0;c.traverse(A=>{if(A.isMesh){if(a++,A.geometry){const f=A.geometry;f.index?l+=f.index.count/3:f.attributes.position&&(l+=f.attributes.position.count/3),f.attributes.position&&(y+=f.attributes.position.count)}A.material&&(Array.isArray(A.material)?A.material:[A.material]).forEach(p=>{Object.values(p).forEach(m=>{m&&m.isTexture&&g++})})}}),r({objects:Math.round(a),triangles:Math.round(l),vertices:Math.round(y),textures:Math.round(g)})}),d.jsxs(d.Fragment,{children:[d.jsx(V,{position:[-3,0,0],type:"box",color:"#ff6b6b",name:"红色立方体"}),d.jsx(V,{position:[-1,0,0],type:"sphere",color:"#4ecdc4",name:"青色球体"}),d.jsx(V,{position:[1,0,0],type:"cylinder",color:"#45b7d1",name:"蓝色圆柱"}),d.jsx(V,{position:[3,0,0],type:"box",color:"#96ceb4",name:"绿色立方体"}),d.jsx(V,{position:[0,2,0],type:"sphere",color:"#feca57",name:"黄色球体"}),i&&d.jsx(X,{position:[0,-2,0],args:[20,.1,20],children:d.jsx("meshStandardMaterial",{color:"#2c2c2c",wireframe:!0})}),s&&d.jsxs(d.Fragment,{children:[d.jsx("ambientLight",{intensity:.4}),d.jsx("directionalLight",{position:[10,10,5],intensity:.6}),d.jsx("pointLight",{position:[-10,5,-10],color:"#ff0080",intensity:.3}),d.jsx("pointLight",{position:[10,5,10],color:"#0080ff",intensity:.3})]}),d.jsx(te,{position:[0,4,0],fontSize:1.5,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"场景导出器"}),d.jsx(te,{position:[0,3.5,0],fontSize:.5,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"点击对象选择，然后导出场景"})]})}function Ft(){return P.useState(0),P.useState(null),P.useState({objects:0,triangles:0,vertices:0,textures:0}),d.jsxs(bt,{children:[d.jsx(Tt,{children:d.jsx(be,{camera:{position:[8,5,8],fov:75},gl:{antialias:!0,preserveDrawingBuffer:!0},children:d.jsxs(P.Suspense,{fallback:null,children:[d.jsx(vt,{}),d.jsx(Te,{enableDamping:!0,dampingFactor:.05,minDistance:3,maxDistance:30})]})})}),d.jsxs(wt,{initial:{x:350},animate:{x:0},transition:{duration:.5},children:[d.jsx(Mt,{children:"📦 场景导出器"}),d.jsx(he,{children:"强大的3D场景导出工具，支持多种格式导出，包括GLTF、OBJ、PLY、STL等主流3D格式，以及高质量截图导出功能。"}),d.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"支持格式"}),d.jsxs(ee,{children:[d.jsxs("li",{children:[d.jsx("code",{children:"GLTF/GLB"})," - 现代3D传输格式，支持动画和材质"]}),d.jsxs("li",{children:[d.jsx("code",{children:"OBJ"})," - 通用3D模型格式，广泛支持"]}),d.jsxs("li",{children:[d.jsx("code",{children:"PLY"})," - 点云和网格数据格式"]}),d.jsxs("li",{children:[d.jsx("code",{children:"STL"})," - 3D打印标准格式"]}),d.jsxs("li",{children:[d.jsx("code",{children:"PNG/JPEG"})," - 高质量截图导出"]})]}),d.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"导出特性"}),d.jsxs(ee,{children:[d.jsxs("li",{children:[d.jsx("code",{children:"选择性导出"})," - 只导出选中的对象"]}),d.jsxs("li",{children:[d.jsx("code",{children:"材质保留"})," - 保持原始材质和纹理"]}),d.jsxs("li",{children:[d.jsx("code",{children:"动画支持"})," - 导出骨骼和关键帧动画"]}),d.jsxs("li",{children:[d.jsx("code",{children:"压缩优化"})," - 自动优化文件大小"]}),d.jsxs("li",{children:[d.jsx("code",{children:"批量处理"})," - 支持批量导出多个对象"]})]}),d.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"技术实现"}),d.jsxs(ee,{children:[d.jsxs("li",{children:[d.jsx("code",{children:"GLTFExporter"})," - Three.js官方GLTF导出器"]}),d.jsxs("li",{children:[d.jsx("code",{children:"OBJExporter"})," - Wavefront OBJ格式导出"]}),d.jsxs("li",{children:[d.jsx("code",{children:"WebGL渲染"})," - 高质量离屏渲染"]}),d.jsxs("li",{children:[d.jsx("code",{children:"Blob API"})," - 浏览器文件下载"]}),d.jsxs("li",{children:[d.jsx("code",{children:"Worker线程"})," - 后台处理大文件"]})]}),d.jsx("h3",{style:{color:"var(--accent-color)",marginBottom:"1rem"},children:"应用场景"}),d.jsxs(he,{children:["• 3D模型分享和交换",d.jsx("br",{}),"• 3D打印文件准备",d.jsx("br",{}),"• 游戏资源导出",d.jsx("br",{}),"• 建筑可视化交付",d.jsx("br",{}),"• 教育演示材料"]}),d.jsxs(Et,{children:[d.jsx("summary",{children:"🔍 查看核心代码"}),d.jsx("pre",{children:`// 场景导出器实现
class SceneExporter {
  constructor() {
    this.gltfExporter = new GLTFExporter()
    this.objExporter = new OBJExporter()
    this.plyExporter = new PLYExporter()
    this.stlExporter = new STLExporter()
  }
  
  // GLTF格式导出
  async exportGLTF(scene, options = {}) {
    return new Promise((resolve, reject) => {
      const defaultOptions = {
        binary: false,
        embedImages: true,
        animations: true,
        includeCustomExtensions: false,
        onlyVisible: true,
        truncateDrawRange: true,
        maxTextureSize: 4096
      }
      
      const exportOptions = { ...defaultOptions, ...options }
      
      this.gltfExporter.parse(
        scene,
        (result) => {
          const output = exportOptions.binary ? 
            result : JSON.stringify(result, null, 2)
          
          resolve({
            data: output,
            filename: \`scene.\${exportOptions.binary ? 'glb' : 'gltf'}\`,
            mimeType: exportOptions.binary ? 
              'model/gltf-binary' : 'model/gltf+json'
          })
        },
        (error) => reject(error),
        exportOptions
      )
    })
  }
  
  // 文件下载
  downloadFile(data, filename, mimeType) {
    const blob = data instanceof Blob ? 
      data : new Blob([data], { type: mimeType })
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.href = url
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }
}`})]})]})]})}export{Ft as default};
//# sourceMappingURL=SceneExporter-7e36e02f.js.map
