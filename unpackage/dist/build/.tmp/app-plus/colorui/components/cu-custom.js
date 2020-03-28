(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"08e7":function(t,n,a){"use strict";var e,u=function(){var t=this,n=t.$createElement;t._self._c},c=[];a.d(n,"b",function(){return u}),a.d(n,"c",function(){return c}),a.d(n,"a",function(){return e})},"4baf":function(t,n,a){"use strict";a.r(n);var e=a("08e7"),u=a("ec16");for(var c in u)"default"!==c&&function(t){a.d(n,t,function(){return u[t]})}(c);var r,o=a("f0c5"),i=Object(o["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],r);n["default"]=i.exports},"58d1":function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,e="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(e="".concat(e,"background-image:url(").concat(a,");")),e}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};n.default=a}).call(this,a("6e42")["default"])},ec16:function(t,n,a){"use strict";a.r(n);var e=a("58d1"),u=a.n(e);for(var c in e)"default"!==c&&function(t){a.d(n,t,function(){return e[t]})}(c);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("4baf"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
