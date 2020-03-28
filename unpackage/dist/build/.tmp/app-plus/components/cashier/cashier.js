(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/cashier/cashier"],{"2ddd":function(e,t,r){"use strict";r.r(t);var n=r("cd77"),i=r("e7d8");for(var o in i)"default"!==o&&function(e){r.d(t,e,function(){return i[e]})}(o);var d,a=r("f0c5"),u=Object(a["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],d);t["default"]=u.exports},"879c":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:{providerList:Array},data:function(){return{providerOrder:["wxpay","alipay","ccb","netcom"],providerIndex:0}},onReady:function(){for(var e=0;e<this.providerList.length;e++)if(this.providerList[e].id==this.providerOrder[0]){this.providerIndex=e;break}},methods:{tapPaymentType:function(e){this.providerIndex=e},requestPayment:function(){var e=this.providerList[this.providerIndex];this.$emit("requestPayment",e)}}};t.default=n},cd77:function(e,t,r){"use strict";var n,i=function(){var e=this,t=e.$createElement;e._self._c},o=[];r.d(t,"b",function(){return i}),r.d(t,"c",function(){return o}),r.d(t,"a",function(){return n})},e7d8:function(e,t,r){"use strict";r.r(t);var n=r("879c"),i=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,function(){return n[e]})}(o);t["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/cashier/cashier-create-component',
    {
        'components/cashier/cashier-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("2ddd"))
        })
    },
    [['components/cashier/cashier-create-component']]
]);
