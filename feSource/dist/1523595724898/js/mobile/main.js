!function(t){function e(e){for(var r,n,a=e[0],u=e[1],l=e[2],p=0,h=[];p<a.length;p++)n=a[p],s[n]&&h.push(s[n][0]),s[n]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(c&&c(e);h.length;)h.shift()();return o.push.apply(o,l||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],r=!0,a=1;a<i.length;a++){var u=i[a];0!==s[u]&&(r=!1)}r&&(o.splice(e--,1),t=n(n.s=i[0]))}return t}var r={},s={1:0},o=[];function n(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=r,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/faceliveness/dist/1523595724898/";var a=window.duAI=window.duAI||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var c=u;o.push([141,0]),i()}({101:function(t,e,i){"use strict";i.d(e,"a",function(){return r}),i.d(e,"b",function(){return s});var r=function(){var t=this.$createElement;this._self._c;return this._m(0)},s=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading"},[e("div",{staticClass:"loading-icon"}),this._v(" "),e("span",{staticClass:"loading-text"},[this._v("验证中...")])])}];r._withStripped=!0},137:function(t,e,i){"use strict";var r=i(68),s=i.n(r),o=i(101),n=i(6),a=!1;var u=function(t){a||i(363)},l=Object(n.a)(s.a,o.a,o.b,!1,u,null,null);l.options.__file="src/mobile/components/loading.vue",e.default=l.exports},138:function(t,e,i){"use strict";i.r(e);var r=i(53),s=i(32),o=i.n(s),n={props:{videoFail:{type:Boolean,default:!1},videoFailText:{type:Object,default:{title:"视频无法上传",detail:"您录制的视频时间过长,请重新录制"}}},data:function(){return{timeHaveToStay:3,refreshTime:60,btnPoint:!1,codeResult:"",sessionId:"",stayTimer:null,startTimeMinute:null}},created:function(){this.getVerifyCodeModal()},filters:{confirmBtnText:function(t){return t>0?"记住了，开始录制("+t+"s)":"记住了，开始录制"}},methods:{closePopup:function(){this.clearTimer(),this.$emit("cancel")},clearTimer:function(){this.stayTimer&&clearTimeout(this.stayTimer),this.startTimeMinute&&clearTimeout(this.startTimeMinute),this.stayTimer=null,this.startTimeMinute=null},stayTimerF:function(){var t=this;this.stayTimer=setTimeout(function(){if(0==--t.timeHaveToStay)return t.stayTimer=null,void(t.btnPoint=!0);t.stayTimerF()},1e3)},getVerifyCodeModal:function(){var t=this;o.a.post("/aidemo").type("form").send({type:"faceliveness_sessioncode",apiType:"faceliveness"}).then(function(e){var i=e.body,r=(i.errno,i.data.result);r?(t.codeResult=r.code,t.sessionId=r.session_id,t.timeHaveToStay=3,t.stayTimerF(),t.btnPoint=!1):t.errorContent()}).catch(function(e){console.log(e),t.errorContent()}),this.refreshTime=60,this.timeout()},timeout:function(){var t=this;this.startTimeMinute=setTimeout(function(){if(0==--t.refreshTime)return t.getVerifyCodeModal(),void(t.startTimeMinute=null);t.timeout()},1e3)},videoRestart:function(){this.$emit("update:videoFail",!1),this.$emit("update:videoFailText",{}),this.clearTimer(),this.getVerifyCodeModal()},errorContent:function(){this.$emit("update:videoFail",!0),this.$emit("update:videoFailText",{title:"获取验证码失败",detail:"请重新获取验证码"})},iptChange:function(t){0===this.timeHaveToStay&&(this.$emit("videoResult",t,this.sessionId),this.clearTimer())}},mounted:function(){},beforeDestroy:function(){this.clearTimer()}},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal-layer"},[i("div",{staticClass:"modal-layer-mask"}),t._v(" "),i("div",{staticClass:"modal-layer-popup"},[t.videoFail?t._e():i("div",{staticClass:"modal-layer-success"},[i("div",{staticClass:"modal-layer-popup-title"},[t._v("请牢记以下验证码")]),t._v(" "),i("div",{staticClass:"modal-layer-popup-content"},[t._v("此验证码将于"),i("span",[t._v(t._s(t.refreshTime))]),t._v("秒后过期"),i("br"),t._v("用普通话朗读数字，视频时长"),i("span",[t._v("3-8")]),t._v("秒最佳")]),t._v(" "),i("div",{staticClass:"modal-layer-popup-number"},t._l(t.codeResult,function(e){return i("span",[t._v(t._s(e))])})),t._v(" "),i("div",{staticClass:"modal-wrapper",class:{"modal-point":t.btnPoint}},[i("span",{staticClass:"modal-confirm-btn",attrs:{disabled:t.timeHaveToStay>0}},[t._v("\n                    "+t._s(t._f("confirmBtnText")(t.timeHaveToStay))+"\n                ")]),t._v(" "),i("input",{ref:"cameraInput",staticClass:"camera-input",attrs:{type:"file",accept:"video/*",capture:"camcorder"},on:{change:function(e){t.iptChange(e)}}})])]),t._v(" "),t.videoFail?i("div",{staticClass:"modal-layer-fail"},[i("div",{staticClass:"modal-layer-fail-icon"}),t._v(" "),i("div",{staticClass:"modal-layer-fail-title"},[t._v(t._s(t.videoFailText.title))]),t._v(" "),i("div",{staticClass:"modal-layer-fail-detail"},[t._v(t._s(t.videoFailText.detail))]),t._v(" "),i("div",{staticClass:"modal-layer-fail-restart",on:{click:t.videoRestart}},[t._v("重新获取")])]):t._e(),t._v(" "),i("span",{staticClass:"modal-layer-close",on:{click:function(e){t.closePopup()}}})])])};a._withStripped=!0;var u=i(6),l=!1;var c=function(t){l||i(367)},p=Object(u.a)(n,a,[],!1,c,null,null);p.options.__file="src/mobile/components/verifyCodeModal.vue";var h=p.exports,d=i(137),f=i(140),v={props:{videoResultDetail:{type:Object,default:{}},showResult:Boolean},filters:{getErrorText:function(t){switch(t){case 216501:return"没有找到人脸";case 216434:return"活体检测失败";case 216507:return"视频中有多张脸";default:return"服务器异常"}}},computed:{imgsrc:function(){return 0===this.videoResultDetail.err_no?"data:image/jpeg;base64,"+this.videoResultDetail.result.pic_list[0].pic:f},errcode:function(){return this.videoResultDetail.err_no},result:function(){return this.videoResultDetail.result}},watch:{videoResultDetail:{handler:function(t,e){},deep:!0}},methods:{restart:function(){this.$emit("restart")},finish:function(){this.$emit("update:showResult",!1)}}},_=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"result"},[t.videoResultDetail?i("div",{staticClass:"result-box"},[i("span",{staticClass:"result-box-pic"},[i("span",{staticClass:"result-box-pic-icon icon-top"}),t._v(" "),i("span",{staticClass:"result-box-pic-icon icon-right"}),t._v(" "),i("span",{staticClass:"result-box-pic-icon icon-bottom"}),t._v(" "),i("span",{staticClass:"result-box-pic-icon icon-left"}),t._v(" "),i("img",{staticClass:"result-box-return-img",attrs:{src:t.imgsrc}})]),t._v(" "),i("span",{staticClass:"result-box-text"},[t._v("活体检测\n            "),i("span",{staticClass:"result-box-color",class:0===t.errcode?"resulr-color-green":"resulr-color-red"},[t._v(t._s(0===t.errcode?"成功":"失败"))]),t._v(" "),0!==t.errcode?i("span",{staticClass:"result-box-failcolor"},[t._v(t._s(t._f("getErrorText")(t.errcode)))]):t._e()]),t._v(" "),i("div",{staticClass:"result-box-value"},[i("span",{staticClass:"result-box-value-text"},[t._v("检测分值:"+t._s(0===t.errcode&&t.result.score?t.result.score:0)+"\n            ")]),t._v(" "),i("span",{staticClass:"result-box-value-text"},[t._v("应读数字:"+t._s(0===t.errcode&&t.result.code.create?t.result.code.create:0)+"\n            ")]),t._v(" "),i("span",{staticClass:"result-box-value-text"},[t._v("检测数字:"+t._s(0===t.errcode&&t.result.code.identify?t.result.code.identify:0)+"\n            ")])])]):t._e(),t._v(" "),i("div",{staticClass:"result-option"},[i("span",{staticClass:"result-option-btn result-option-btn-ok",on:{click:t.finish}},[t._v("完成")]),t._v(" "),i("span",{staticClass:"result-option-btn result-option-btn-again",on:{click:t.restart}},[t._v("重拍")])])])};_._withStripped=!0;var m=!1;var y=function(t){m||i(361)},b=Object(u.a)(v,_,[],!1,y,null,null);b.options.__file="src/mobile/components/result.vue";var x=b.exports,w={props:{showPopupError:Boolean},mounted:function(){},methods:{closePopError:function(){this.$emit("update:showPopupError",!1)}}},T=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"face-mobile-popuperror"},[e("div",{staticClass:"face-mobile-popuperror-mask"}),this._v(" "),e("div",{staticClass:"face-mobile-popuperror-box"},[this._m(0),this._v(" "),e("div",{staticClass:"face-mobile-popuperror-box-btn",on:{click:this.closePopError}},[this._v("知道了")])])])};T._withStripped=!0;var C=!1;var g=function(t){C||i(355)},E=Object(u.a)(w,T,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"face-mobile-popuperror-box-text"},[this._v("安卓版本微信不支持视频上传功能"),e("br"),this._v("请使用浏览器体验")])}],!1,g,null,null);E.options.__file="src/mobile/components/popupError.vue";var R=E.exports,k={components:{verifyCodeModal:h,loading:d.default,result:x,popupError:R},data:function(){return{showVerifyCodeModal:!1,verifyCode:"",nextDisabled:!1,showLoading:!1,showResult:!1,videoResultDetail:null,videoFail:!1,videoFailText:{},showPopupError:!1,items:[{number:1,text:"牢记验证码，点击开始录制",border:1},{number:2,text:"开启前置摄像头，用普通话朗读数字",border:1},{number:3,text:"完成录制，等待验证结果",border:0}]}},mounted:function(){var t=navigator.userAgent.toLowerCase(),e=t.indexOf("android"),i=t.indexOf("micromessenger");-1!==e&&-1!==i&&(this.showPopupError=!0)},methods:{onDialogCancel:function(){this.nextDisabled=!1,this.showVerifyCodeModal=!1},onDialogAgain:function(){this.nextDisabled=!1,this.showResult=!1,this.showVerifyCodeModal=!0},onDialogVideoResult:function(t,e){var i=t.target.files;if(this.showLoading=!0,i&&i.length>0){var r=i[0],s=this;if(r.size>20971520)return this.showLoading=!1,this.videoFail=!0,void(this.videoFailText={title:"视频上传失败",detail:"您录制的视频时间过大,请重新录制"});var n=new FileReader;n.readAsDataURL(r),n.addEventListener("loadend",function(){var t=this,i={type:"faceliveness_verify",apiType:"faceliveness",session_id:e,video_base64:n.result.split(",")[1]};o.a.post("/aidemo").type("form").send(i).then(function(e){var i=e.body,r=i.err_no,o=i.data;r?t.errorContent():(s.showLoading=!1,s.showResult=!0,s.videoResultDetail=o,s.showVerifyCodeModal=!1)}).catch(function(e){t.errorContent()})})}},nextStep:function(){this.showVerifyCodeModal=!0},errorContent:function(){this.showLoading=!1,this.videoFail=!0,this.videoFailText={title:"视频上传失败",detail:"视频上传失败，请重新上传"}}}},O=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("div",{staticClass:"prompt"},[i("div",{staticClass:"prompt-box"},t._l(t.items,function(e){return i("div",{key:e.number,staticClass:"prompt-box-text"},[i("span",{staticClass:"prompt-box-text-number"},[t._v(t._s(e.number))]),i("span",{staticClass:"prompt-box-text-content"},[t._v(t._s(e.text))]),t._v(" "),e.border?i("span",{staticClass:"prompt-box-text-border"}):t._e()])})),t._v(" "),i("span",{staticClass:"prompt-next",class:{"prompt-next-disabled":t.nextDisabled},on:{click:t.nextStep}},[t._v("下一步")])]),t._v(" "),t.showPopupError?i("popupError",{attrs:{showPopupError:t.showPopupError},on:{"update:showPopupError":function(e){t.showPopupError=e}}}):t._e(),t._v(" "),t.showVerifyCodeModal?i("verifyCodeModal",{attrs:{videoFail:t.videoFail,videoFailText:t.videoFailText},on:{cancel:t.onDialogCancel,videoResult:t.onDialogVideoResult,"update:videoFail":function(e){t.videoFail=e},"update:videoFailText":function(e){t.videoFailText=e}}}):t._e(),t._v(" "),t.showLoading?i("loading"):t._e(),t._v(" "),t.showResult?i("result",{attrs:{showResult:t.showResult,videoResultDetail:t.videoResultDetail},on:{restart:t.onDialogAgain,"update:showResult":function(e){t.showResult=e}}}):t._e()],1)};O._withStripped=!0;var D=!1;var P=function(t){D||i(370)},j=Object(u.a)(k,O,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sketch"},[e("div",{staticClass:"sketch-img"}),this._v(" "),e("p",{staticClass:"sketch-text"},[this._v("正面平视手机、保证光线充足"),e("br"),this._v("请勿遮挡面部")])])}],!1,P,null,null);j.options.__file="src/mobile/app.vue";var S=j.exports;new r.default(S).$mount("#app")},140:function(t,e,i){t.exports=i.p+"images/pic_default.png"},141:function(t,e,i){t.exports=i(138)},32:function(t,e,i){var r;"undefined"!=typeof window?r=window:"undefined"!=typeof self?r=self:(console.warn("Using browser-only version of superagent in non-browser environment"),r=this);var s=i(73),o=i(72),n=i(48),a=i(71),u=i(69);function l(){}var c=e=t.exports=function(t,i){return"function"==typeof i?new e.Request("GET",t).end(i):1==arguments.length?new e.Request("GET",t):new e.Request(t,i)};e.Request=m,c.getXHR=function(){if(!(!r.XMLHttpRequest||r.location&&"file:"==r.location.protocol&&r.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}throw Error("Browser-only version of superagent could not find XHR")};var p="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};function h(t){if(!n(t))return t;var e=[];for(var i in t)d(e,i,t[i]);return e.join("&")}function d(t,e,i){if(null!=i)if(Array.isArray(i))i.forEach(function(i){d(t,e,i)});else if(n(i))for(var r in i)d(t,e+"["+r+"]",i[r]);else t.push(encodeURIComponent(e)+"="+encodeURIComponent(i));else null===i&&t.push(encodeURIComponent(e))}function f(t){for(var e,i,r={},s=t.split("&"),o=0,n=s.length;o<n;++o)-1==(i=(e=s[o]).indexOf("="))?r[decodeURIComponent(e)]="":r[decodeURIComponent(e.slice(0,i))]=decodeURIComponent(e.slice(i+1));return r}function v(t){return/[\/+]json($|[^-\w])/.test(t)}function _(t){this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText;var e=this.xhr.status;1223===e&&(e=204),this._setStatusProperties(e),this.header=this.headers=function(t){for(var e,i,r,s,o=t.split(/\r?\n/),n={},a=0,u=o.length;a<u;++a)-1!==(e=(i=o[a]).indexOf(":"))&&(r=i.slice(0,e).toLowerCase(),s=p(i.slice(e+1)),n[r]=s);return n}(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),null===this.text&&t._responseType?this.body=this.xhr.response:this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null}function m(t,e){var i=this;this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var t,e=null,r=null;try{r=new _(i)}catch(t){return(e=new Error("Parser is unable to parse the response")).parse=!0,e.original=t,i.xhr?(e.rawResponse=void 0===i.xhr.responseType?i.xhr.responseText:i.xhr.response,e.status=i.xhr.status?i.xhr.status:null,e.statusCode=e.status):(e.rawResponse=null,e.status=null),i.callback(e)}i.emit("response",r);try{i._isResponseOK(r)||(t=new Error(r.statusText||"Unsuccessful HTTP response"))}catch(e){t=e}t?(t.original=e,t.response=r,t.status=r.status,i.callback(t,r)):i.callback(null,r)})}function y(t,e,i){var r=c("DELETE",t);return"function"==typeof e&&(i=e,e=null),e&&r.send(e),i&&r.end(i),r}c.serializeObject=h,c.parseString=f,c.types={html:"text/html",json:"application/json",xml:"text/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},c.serialize={"application/x-www-form-urlencoded":h,"application/json":JSON.stringify},c.parse={"application/x-www-form-urlencoded":f,"application/json":JSON.parse},a(_.prototype),_.prototype._parseBody=function(t){var e=c.parse[this.type];return this.req._parser?this.req._parser(this,t):(!e&&v(this.type)&&(e=c.parse["application/json"]),e&&t&&(t.length||t instanceof Object)?e(t):null)},_.prototype.toError=function(){var t=this.req,e=t.method,i=t.url,r="cannot "+e+" "+i+" ("+this.status+")",s=new Error(r);return s.status=this.status,s.method=e,s.url=i,s},c.Response=_,s(m.prototype),o(m.prototype),m.prototype.type=function(t){return this.set("Content-Type",c.types[t]||t),this},m.prototype.accept=function(t){return this.set("Accept",c.types[t]||t),this},m.prototype.auth=function(t,e,i){1===arguments.length&&(e=""),"object"==typeof e&&null!==e&&(i=e,e=""),i||(i={type:"function"==typeof btoa?"basic":"auto"});return this._auth(t,e,i,function(t){if("function"==typeof btoa)return btoa(t);throw new Error("Cannot use basic auth, btoa is not a function")})},m.prototype.query=function(t){return"string"!=typeof t&&(t=h(t)),t&&this._query.push(t),this},m.prototype.attach=function(t,e,i){if(e){if(this._data)throw Error("superagent can't mix .send() and .attach()");this._getFormData().append(t,e,i||e.name)}return this},m.prototype._getFormData=function(){return this._formData||(this._formData=new r.FormData),this._formData},m.prototype.callback=function(t,e){if(this._shouldRetry(t,e))return this._retry();var i=this._callback;this.clearTimeout(),t&&(this._maxRetries&&(t.retries=this._retries-1),this.emit("error",t)),i(t,e)},m.prototype.crossDomainError=function(){var t=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");t.crossDomain=!0,t.status=this.status,t.method=this.method,t.url=this.url,this.callback(t)},m.prototype.buffer=m.prototype.ca=m.prototype.agent=function(){return console.warn("This is not supported in browser version of superagent"),this},m.prototype.pipe=m.prototype.write=function(){throw Error("Streaming is not supported in browser version of superagent")},m.prototype._isHost=function(t){return t&&"object"==typeof t&&!Array.isArray(t)&&"[object Object]"!==Object.prototype.toString.call(t)},m.prototype.end=function(t){return this._endCalled&&console.warn("Warning: .end() was called twice. This is not supported in superagent"),this._endCalled=!0,this._callback=t||l,this._finalizeQueryString(),this._end()},m.prototype._end=function(){var t=this,e=this.xhr=c.getXHR(),i=this._formData||this._data;this._setTimeouts(),e.onreadystatechange=function(){var i=e.readyState;if(i>=2&&t._responseTimeoutTimer&&clearTimeout(t._responseTimeoutTimer),4==i){var r;try{r=e.status}catch(t){r=0}if(!r){if(t.timedout||t._aborted)return;return t.crossDomainError()}t.emit("end")}};var r=function(e,i){i.total>0&&(i.percent=i.loaded/i.total*100),i.direction=e,t.emit("progress",i)};if(this.hasListeners("progress"))try{e.onprogress=r.bind(null,"download"),e.upload&&(e.upload.onprogress=r.bind(null,"upload"))}catch(t){}try{this.username&&this.password?e.open(this.method,this.url,!0,this.username,this.password):e.open(this.method,this.url,!0)}catch(t){return this.callback(t)}if(this._withCredentials&&(e.withCredentials=!0),!this._formData&&"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof i&&!this._isHost(i)){var s=this._header["content-type"],o=this._serializer||c.serialize[s?s.split(";")[0]:""];!o&&v(s)&&(o=c.serialize["application/json"]),o&&(i=o(i))}for(var n in this.header)null!=this.header[n]&&this.header.hasOwnProperty(n)&&e.setRequestHeader(n,this.header[n]);return this._responseType&&(e.responseType=this._responseType),this.emit("request",this),e.send(void 0!==i?i:null),this},c.agent=function(){return new u},["GET","POST","OPTIONS","PATCH","PUT","DELETE"].forEach(function(t){u.prototype[t.toLowerCase()]=function(e,i){var r=new c.Request(t,e);return this._setDefaults(r),i&&r.end(i),r}}),u.prototype.del=u.prototype.delete,c.get=function(t,e,i){var r=c("GET",t);return"function"==typeof e&&(i=e,e=null),e&&r.query(e),i&&r.end(i),r},c.head=function(t,e,i){var r=c("HEAD",t);return"function"==typeof e&&(i=e,e=null),e&&r.query(e),i&&r.end(i),r},c.options=function(t,e,i){var r=c("OPTIONS",t);return"function"==typeof e&&(i=e,e=null),e&&r.send(e),i&&r.end(i),r},c.del=y,c.delete=y,c.patch=function(t,e,i){var r=c("PATCH",t);return"function"==typeof e&&(i=e,e=null),e&&r.send(e),i&&r.end(i),r},c.post=function(t,e,i){var r=c("POST",t);return"function"==typeof e&&(i=e,e=null),e&&r.send(e),i&&r.end(i),r},c.put=function(t,e,i){var r=c("PUT",t);return"function"==typeof e&&(i=e,e=null),e&&r.send(e),i&&r.end(i),r}},355:function(t,e){},361:function(t,e){},363:function(t,e){},367:function(t,e){},370:function(t,e){},48:function(t,e,i){"use strict";t.exports=function(t){return null!==t&&"object"==typeof t}},6:function(t,e,i){"use strict";function r(t,e,i,r,s,o,n,a){var u=typeof(t=t||{}).default;"object"!==u&&"function"!==u||(t=t.default);var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),r&&(c.functional=!0),o&&(c._scopeId=o),n?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=l):s&&(l=a?function(){s.call(this,this.$root.$options.shadowRoot)}:s),l)if(c.functional){c._injectStyles=l;var p=c.render;c.render=function(t,e){return l.call(e),p(t,e)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,l):[l]}return{exports:t,options:c}}i.d(e,"a",function(){return r})},68:function(t,e){},69:function(t,e){function i(){this._defaults=[]}["use","on","once","set","query","type","accept","auth","withCredentials","sortQuery","retry","ok","redirects","timeout","buffer","serialize","parse","ca","key","pfx","cert"].forEach(function(t){i.prototype[t]=function(){return this._defaults.push({fn:t,arguments:arguments}),this}}),i.prototype._setDefaults=function(t){this._defaults.forEach(function(e){t[e.fn].apply(t,e.arguments)})},t.exports=i},70:function(t,e,i){"use strict";e.type=function(t){return t.split(/ *; */).shift()},e.params=function(t){return t.split(/ *; */).reduce(function(t,e){var i=e.split(/ *= */),r=i.shift(),s=i.shift();return r&&s&&(t[r]=s),t},{})},e.parseLinks=function(t){return t.split(/ *, */).reduce(function(t,e){var i=e.split(/ *; */),r=i[0].slice(1,-1);return t[i[1].split(/ *= */)[1].slice(1,-1)]=r,t},{})},e.cleanHeader=function(t,e){return delete t["content-type"],delete t["content-length"],delete t["transfer-encoding"],delete t.host,e&&(delete t.authorization,delete t.cookie),t}},71:function(t,e,i){"use strict";var r=i(70);function s(t){if(t)return function(t){for(var e in s.prototype)t[e]=s.prototype[e];return t}(t)}t.exports=s,s.prototype.get=function(t){return this.header[t.toLowerCase()]},s.prototype._setHeaderProperties=function(t){var e=t["content-type"]||"";this.type=r.type(e);var i=r.params(e);for(var s in i)this[s]=i[s];this.links={};try{t.link&&(this.links=r.parseLinks(t.link))}catch(t){}},s.prototype._setStatusProperties=function(t){var e=t/100|0;this.status=this.statusCode=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.redirect=3==e,this.clientError=4==e,this.serverError=5==e,this.error=(4==e||5==e)&&this.toError(),this.accepted=202==t,this.noContent=204==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.forbidden=403==t,this.notFound=404==t}},72:function(t,e,i){"use strict";var r=i(48);function s(t){if(t)return function(t){for(var e in s.prototype)t[e]=s.prototype[e];return t}(t)}t.exports=s,s.prototype.clearTimeout=function(){return clearTimeout(this._timer),clearTimeout(this._responseTimeoutTimer),delete this._timer,delete this._responseTimeoutTimer,this},s.prototype.parse=function(t){return this._parser=t,this},s.prototype.responseType=function(t){return this._responseType=t,this},s.prototype.serialize=function(t){return this._serializer=t,this},s.prototype.timeout=function(t){if(!t||"object"!=typeof t)return this._timeout=t,this._responseTimeout=0,this;for(var e in t)switch(e){case"deadline":this._timeout=t.deadline;break;case"response":this._responseTimeout=t.response;break;default:console.warn("Unknown timeout option",e)}return this},s.prototype.retry=function(t,e){return 0!==arguments.length&&!0!==t||(t=1),t<=0&&(t=0),this._maxRetries=t,this._retries=0,this._retryCallback=e,this};var o=["ECONNRESET","ETIMEDOUT","EADDRINFO","ESOCKETTIMEDOUT"];s.prototype._shouldRetry=function(t,e){if(!this._maxRetries||this._retries++>=this._maxRetries)return!1;if(this._retryCallback)try{var i=this._retryCallback(t,e);if(!0===i)return!0;if(!1===i)return!1}catch(t){console.error(t)}if(e&&e.status&&e.status>=500&&501!=e.status)return!0;if(t){if(t.code&&~o.indexOf(t.code))return!0;if(t.timeout&&"ECONNABORTED"==t.code)return!0;if(t.crossDomain)return!0}return!1},s.prototype._retry=function(){return this.clearTimeout(),this.req&&(this.req=null,this.req=this.request()),this._aborted=!1,this.timedout=!1,this._end()},s.prototype.then=function(t,e){if(!this._fullfilledPromise){var i=this;this._endCalled&&console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"),this._fullfilledPromise=new Promise(function(t,e){i.end(function(i,r){i?e(i):t(r)})})}return this._fullfilledPromise.then(t,e)},s.prototype.catch=function(t){return this.then(void 0,t)},s.prototype.use=function(t){return t(this),this},s.prototype.ok=function(t){if("function"!=typeof t)throw Error("Callback required");return this._okCallback=t,this},s.prototype._isResponseOK=function(t){return!!t&&(this._okCallback?this._okCallback(t):t.status>=200&&t.status<300)},s.prototype.get=function(t){return this._header[t.toLowerCase()]},s.prototype.getHeader=s.prototype.get,s.prototype.set=function(t,e){if(r(t)){for(var i in t)this.set(i,t[i]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},s.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},s.prototype.field=function(t,e){if(null===t||void 0===t)throw new Error(".field(name, val) name can not be empty");if(this._data&&console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"),r(t)){for(var i in t)this.field(i,t[i]);return this}if(Array.isArray(e)){for(var s in e)this.field(t,e[s]);return this}if(null===e||void 0===e)throw new Error(".field(name, val) val can not be empty");return"boolean"==typeof e&&(e=""+e),this._getFormData().append(t,e),this},s.prototype.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this)},s.prototype._auth=function(t,e,i,r){switch(i.type){case"basic":this.set("Authorization","Basic "+r(t+":"+e));break;case"auto":this.username=t,this.password=e;break;case"bearer":this.set("Authorization","Bearer "+t)}return this},s.prototype.withCredentials=function(t){return void 0==t&&(t=!0),this._withCredentials=t,this},s.prototype.redirects=function(t){return this._maxRedirects=t,this},s.prototype.maxResponseSize=function(t){if("number"!=typeof t)throw TypeError("Invalid argument");return this._maxResponseSize=t,this},s.prototype.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}},s.prototype.send=function(t){var e=r(t),i=this._header["content-type"];if(this._formData&&console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"),e&&!this._data)Array.isArray(t)?this._data=[]:this._isHost(t)||(this._data={});else if(t&&this._data&&this._isHost(this._data))throw Error("Can't merge these send calls");if(e&&r(this._data))for(var s in t)this._data[s]=t[s];else"string"==typeof t?(i||this.type("form"),i=this._header["content-type"],this._data="application/x-www-form-urlencoded"==i?this._data?this._data+"&"+t:t:(this._data||"")+t):this._data=t;return!e||this._isHost(t)?this:(i||this.type("json"),this)},s.prototype.sortQuery=function(t){return this._sort=void 0===t||t,this},s.prototype._finalizeQueryString=function(){var t=this._query.join("&");if(t&&(this.url+=(this.url.indexOf("?")>=0?"&":"?")+t),this._query.length=0,this._sort){var e=this.url.indexOf("?");if(e>=0){var i=this.url.substring(e+1).split("&");"function"==typeof this._sort?i.sort(this._sort):i.sort(),this.url=this.url.substring(0,e)+"?"+i.join("&")}}},s.prototype._appendQueryString=function(){console.trace("Unsupported")},s.prototype._timeoutError=function(t,e,i){if(!this._aborted){var r=new Error(t+e+"ms exceeded");r.timeout=e,r.code="ECONNABORTED",r.errno=i,this.timedout=!0,this.abort(),this.callback(r)}},s.prototype._setTimeouts=function(){var t=this;this._timeout&&!this._timer&&(this._timer=setTimeout(function(){t._timeoutError("Timeout of ",t._timeout,"ETIME")},this._timeout)),this._responseTimeout&&!this._responseTimeoutTimer&&(this._responseTimeoutTimer=setTimeout(function(){t._timeoutError("Response timeout of ",t._responseTimeout,"ETIMEDOUT")},this._responseTimeout))}},73:function(t,e,i){function r(t){if(t)return function(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}(t)}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function i(){this.off(t,i),e.apply(this,arguments)}return i.fn=e,this.on(t,i),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var i,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var s=0;s<r.length;s++)if((i=r[s])===e||i.fn===e){r.splice(s,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),i=this._callbacks["$"+t];if(i)for(var r=0,s=(i=i.slice(0)).length;r<s;++r)i[r].apply(this,e);return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}}});