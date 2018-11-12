webpackJsonp([9],{253:function(t,a,e){"use strict";var n=e(553),r=e.n(n);a.a={name:"CountTo",data:function(){return{counter:{},unitText:"",countId:"count"+parseInt(1e6*Math.random())}},props:{mainClass:String,countClass:String,mainStyle:{type:Object,default:function(){return{}}},countStyle:Object,initCount:{type:Number,default:0},startVal:{type:Number,default:0},endVal:{type:Number,required:!0},simplify:{type:Boolean,default:!1},duration:{type:Number,default:2},delay:{type:Number,default:200},uneasing:{type:Boolean,default:!1},ungroup:{type:Boolean,default:!1},separator:{type:String,default:","},decimals:{type:Number,default:0},decimal:{type:String,default:"."},unit:{type:Array,default:function(){return[[3,"K+"],[6,"M+"],[9,"B+"]]}}},methods:{transformValue:function(t){var a=0,e="",n=this.unit.length;if(t<Math.pow(10,this.unit[0][0]))a=t;else for(var r=1;r<n;r++)t>=Math.pow(10,this.unit[r-1][0])&&t<Math.pow(10,this.unit[r][0])&&(a=parseInt(t/Math.pow(10,this.unit[r-1][0])),e=this.unit[r-1][1]);return t>Math.pow(10,this.unit[n-1][0])&&(a=parseInt(t/Math.pow(10,this.unit[n-1][0])),e=this.unit[n-1][1]),{val:a,unit:e}}},mounted:function(){var t=this;this.$nextTick(function(){setTimeout(function(){var a=0,e={};t.simplify?(e=t.transformValue(t.endVal),a=e.val,t.unitText=e.unit):a=t.endVal;var n={};t.counter=n=new r.a(t.countId,t.startVal,a,t.decimals,t.duration,{useEasing:!t.uneasing,useGrouping:!t.ungroup,separator:t.separator,decimal:t.decimal}),n.error||n.start()},t.delay)})},watch:{endVal:function(t){var a=0;if(this.simplify){var e=this.transformValue(this.endVal);a=e.val,this.unitText=e.unit}else a=this.endVal;this.counter.update(a)}}}},552:function(t,a,e){"use strict";var n=e(253),r=e(554),i=e(1),s=i(n.a,r.a,!1,null,null,null);s.options.__file="src\\views\\page\\components\\CountTo.vue",a.a=s.exports},553:function(t,a,e){var n,r;!function(i,s){n=s,void 0!==(r="function"==typeof n?n.call(a,e,a,t):n)&&(t.exports=r)}(0,function(t,a,e){return function(t,a,e,n,r,i){for(var s=0,o=["webkit","moz","ms","o"],l=0;l<o.length&&!window.requestAnimationFrame;++l)window.requestAnimationFrame=window[o[l]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[o[l]+"CancelAnimationFrame"]||window[o[l]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,a){var e=(new Date).getTime(),n=Math.max(0,16-(e-s)),r=window.setTimeout(function(){t(e+n)},n);return s=e+n,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)});var u=this;u.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null};for(var c in i)i.hasOwnProperty(c)&&(u.options[c]=i[c]);""===u.options.separator&&(u.options.useGrouping=!1),u.options.prefix||(u.options.prefix=""),u.options.suffix||(u.options.suffix=""),u.d="string"==typeof t?document.getElementById(t):t,u.startVal=Number(a),u.endVal=Number(e),u.countDown=u.startVal>u.endVal,u.frameVal=u.startVal,u.decimals=Math.max(0,n||0),u.dec=Math.pow(10,u.decimals),u.duration=1e3*Number(r)||2e3,u.formatNumber=function(t){t=t.toFixed(u.decimals),t+="";var a,e,n,r;if(a=t.split("."),e=a[0],n=a.length>1?u.options.decimal+a[1]:"",r=/(\d+)(\d{3})/,u.options.useGrouping)for(;r.test(e);)e=e.replace(r,"$1"+u.options.separator+"$2");return u.options.prefix+e+n+u.options.suffix},u.easeOutExpo=function(t,a,e,n){return e*(1-Math.pow(2,-10*t/n))*1024/1023+a},u.easingFn=u.options.easingFn?u.options.easingFn:u.easeOutExpo,u.formattingFn=u.options.formattingFn?u.options.formattingFn:u.formatNumber,u.version=function(){return"1.7.1"},u.printValue=function(t){var a=u.formattingFn(t);"INPUT"===u.d.tagName?this.d.value=a:"text"===u.d.tagName||"tspan"===u.d.tagName?this.d.textContent=a:this.d.innerHTML=a},u.count=function(t){u.startTime||(u.startTime=t),u.timestamp=t;var a=t-u.startTime;u.remaining=u.duration-a,u.options.useEasing?u.countDown?u.frameVal=u.startVal-u.easingFn(a,0,u.startVal-u.endVal,u.duration):u.frameVal=u.easingFn(a,u.startVal,u.endVal-u.startVal,u.duration):u.countDown?u.frameVal=u.startVal-(u.startVal-u.endVal)*(a/u.duration):u.frameVal=u.startVal+(u.endVal-u.startVal)*(a/u.duration),u.countDown?u.frameVal=u.frameVal<u.endVal?u.endVal:u.frameVal:u.frameVal=u.frameVal>u.endVal?u.endVal:u.frameVal,u.frameVal=Math.round(u.frameVal*u.dec)/u.dec,u.printValue(u.frameVal),a<u.duration?u.rAF=requestAnimationFrame(u.count):u.callback&&u.callback()},u.start=function(t){return u.callback=t,u.rAF=requestAnimationFrame(u.count),!1},u.pauseResume=function(){u.paused?(u.paused=!1,delete u.startTime,u.duration=u.remaining,u.startVal=u.frameVal,requestAnimationFrame(u.count)):(u.paused=!0,cancelAnimationFrame(u.rAF))},u.reset=function(){u.paused=!1,delete u.startTime,u.startVal=a,cancelAnimationFrame(u.rAF),u.printValue(u.startVal)},u.update=function(t){cancelAnimationFrame(u.rAF),u.paused=!1,delete u.startTime,u.startVal=u.frameVal,u.endVal=Number(t),u.countDown=u.startVal>u.endVal,u.rAF=requestAnimationFrame(u.count)},u.printValue(u.startVal)}})},554:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("p",{class:t.mainClass,style:t.mainStyle},[t._t("leftText"),t._v(" "),e("span",{class:t.countClass,style:t.countStyle},[e("span",{attrs:{id:t.countId}},[t._v(t._s(t.initCount))]),e("span",[t._v(t._s(t.unitText))])]),t._v(" "),t._t("rightText")],2)},r=[];n._withStripped=!0;var i={render:n,staticRenderFns:r};a.a=i},575:function(t,a,e){"use strict";var n=e(552),r=e(624);a.a={components:{CountTo:n.a,complaint_more_modal:r.a},data:function(){var t=this;return{pageSize:10,pageCount:100,pageCurrent:1,companyList:[],statusList:[{value:"",label:"全部"},{value:"未处理",label:"未处理"},{value:"处理中",label:"处理中"},{value:"完成",label:"完成"}],areaList:[],latest_complaint:[],latest_complaint_column:[{title:"流水单号",key:"complaintNo"},{title:"公司",key:"company"},{title:"区域",key:"area"},{title:"时间",key:"time"},{title:"状态",align:"center",render:function(t,a){var e="error";return a.row.status&&"处理中"==a.row.status&&(e="warning"),a.row.status&&"完成"==a.row.status&&(e="success"),t("Button",{props:{type:e,size:"small",shape:"circle"}},a.row.status)}},{title:"详情",align:"center",render:function(a,e){return a("Button",{props:{type:"info"},on:{click:function(){t.$Modal.info({title:"投诉详情",width:"500px",okText:"关闭",onOk:function(){},render:function(t){return t(r.a,{props:{prop_value:e.row}})}})}}},"查看详情")}}]}},methods:{goback:function(){this.$router.go(-1)},get_company_date:function(){var t=this;this.$ajax({method:"post",url:this.$uri+"mapInterface/getCompanyData"}).then(function(a){a.data.rows.splice(0,0,{value:"",label:"所有"}),t.$data.companyList=a.data.rows}).catch(function(t){console.log(t)})},get_area_date:function(t){var a=this,e="6941139967a311e8a93e1843420641b8";t&&(e=t);var n=new URLSearchParams;n.append("parentId",e),this.$ajax({method:"post",url:this.$uri+"mapInterface/getAreaData",data:n}).then(function(t){t.data.rows.splice(0,0,{value:"",label:"成都市"}),a.$data.areaList=t.data.rows}).catch(function(t){console.log(t)})},get_data:function(t){var a=this,e=new URLSearchParams;if(t&&parseInt(t)){var n=parseInt(t);n&&e.append("pagenum",n)}var r=this.$refs.no.currentValue,i=this.$refs.company.publicValue,s=this.$refs.status.publicValue,o=this.$refs.area.publicValue,l={};""!=r&&r&&(l.id=r),""!=i&&i&&(l.company=i),""!=s&&s&&(l.status=s),""!=o&&o&&(l.area=o),e.append("param",JSON.stringify(l)),this.$ajax({method:"post",url:this.$uri+"mapInterface/getComplaintList",data:e}).then(function(t){a.$data.latest_complaint=t.data.rows,a.$data.pageCount=t.data.total}).catch(function(t){console.log(t)})}},mounted:function(){this.get_company_date(),this.get_area_date(),this.get_data()}}},576:function(t,a,e){"use strict";a.a={props:{prop_value:""},data:function(){return{current_data:""}},methods:{getStatus:function(){var t=1;return"处理中"==this.$data.current_data.status&&(t=2),"完成"==this.$data.current_data.status&&(t=3),t}},mounted:function(){this.$data.current_data=JSON.parse(JSON.stringify(this.$props.prop_value))}}},61:function(t,a,e){"use strict";function n(t){s||e(623)}Object.defineProperty(a,"__esModule",{value:!0});var r=e(575),i=e(627),s=!1,o=e(1),l=n,u=o(r.a,i.a,!1,l,"data-v-e4e35a6e",null);u.options.__file="src\\views\\page\\richangjianguan\\complaint_more.vue",a.default=u.exports},623:function(t,a){},624:function(t,a,e){"use strict";function n(t){s||e(625)}var r=e(576),i=e(626),s=!1,o=e(1),l=n,u=o(r.a,i.a,!1,l,"data-v-f454fe92",null);u.options.__file="src\\views\\page\\richangjianguan\\complaint_more_modal.vue",a.a=u.exports},625:function(t,a){},626:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal_complaint"},[e("Row",{staticClass:"box_card",staticStyle:{"margin-top":"10px"}},[e("Col",{staticStyle:{"line-height":"20px","margin-top":"5px"},attrs:{span:"12"}},[t._v("流水单号:"+t._s(t.current_data.complaintNo))]),t._v(" "),e("Col",{staticStyle:{"line-height":"20px","margin-top":"5px"},attrs:{span:"12"}},[t._v("公司:"+t._s(t.current_data.company))]),t._v(" "),e("Col",{staticStyle:{"line-height":"20px","margin-top":"5px"},attrs:{span:"12"}},[t._v("区域:"+t._s(t.current_data.area))]),t._v(" "),e("Col",{staticStyle:{"line-height":"20px","margin-top":"5px"},attrs:{span:"12"}},[t._v("状态:"+t._s(t.current_data.status))])],1),t._v(" "),e("Row",{staticClass:"box_card",staticStyle:{"margin-top":"20px","line-height":"30px"}},[e("Steps",{attrs:{current:t.getStatus()}},[e("Step",{attrs:{title:"未处理",content:""}}),t._v(" "),e("Step",{attrs:{title:"处理中",content:""}}),t._v(" "),e("Step",{attrs:{title:"完成",content:""}})],1)],1),t._v(" "),e("Row",{staticClass:"box_card",staticStyle:{"margin-top":"20px"}},[e("Col",[e("div",{staticClass:"line"})])],1),t._v(" "),e("Row",{staticClass:"box_card",staticStyle:{"margin-top":"20px","line-height":"30px"}},[e("Card",[e("p",{attrs:{slot:"title"},slot:"title"},[t._v("\n                投诉\n            ")]),t._v(" "),e("p",[t._v("投诉时间："+t._s(t.current_data.time))]),t._v(" "),e("p",[t._v("事件描述："+t._s(t.current_data.msg))])])],1),t._v(" "),"完成"==t.current_data.status||"处理中"==t.current_data.status?e("Row",{staticClass:"box_card",staticStyle:{"margin-top":"20px","line-height":"30px"}},[e("Card",[e("p",{attrs:{slot:"title"},slot:"title"},[t._v("\n                处理中\n            ")]),t._v(" "),e("p",[t._v("处理时间："+t._s(t.current_data.deal_time))]),t._v(" "),e("p",[t._v("处理描述："+t._s(t.current_data.deal_msg))])])],1):t._e(),t._v(" "),"完成"==t.current_data.status?e("Row",{staticClass:"box_card",staticStyle:{"margin-top":"20px","line-height":"30px"}},[e("Card",[e("p",{attrs:{slot:"title"},slot:"title"},[t._v("\n                完成\n            ")]),t._v(" "),e("p",[t._v("处理时间："+t._s(t.current_data.complete_time))]),t._v(" "),e("p",[t._v("处理描述："+t._s(t.current_data.complete_msg))])])],1):t._e()],1)},r=[];n._withStripped=!0;var i={render:n,staticRenderFns:r};a.a=i},627:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Row",[e("Col",{staticClass:"box_card"},[e("a",{attrs:{href:"javascript:void(0);"},on:{click:function(a){t.goback()}}},[e("Icon",{attrs:{type:"arrow-return-left"}}),t._v("返回上级")],1),t._v(" "),e("div",{staticStyle:{height:"1px","background-color":"rgba(116, 116, 116, 0.63)","margin-top":"10px"}})])],1),t._v(" "),e("Row",{staticClass:"box_card"},[e("Col",{attrs:{span:"4"}},[t._v("当前投诉总数："),e("Tag",{attrs:{color:"green"}},[e("CountTo",{attrs:{endVal:1025564}})],1)],1),t._v(" "),e("Col",{attrs:{span:"3"}},[t._v("未处理："),e("Tag",{attrs:{color:"blue"}},[e("CountTo",{attrs:{endVal:900064}})],1)],1),t._v(" "),e("Col",{attrs:{span:"3"}},[t._v("处理中："),e("Tag",{attrs:{color:"red"}},[e("CountTo",{attrs:{endVal:25560}})],1)],1),t._v(" "),e("Col",{attrs:{span:"2"}},[t._v("完成："),e("Tag",{attrs:{color:"yellow"}},[e("CountTo",{attrs:{endVal:1e5}})],1)],1)],1),t._v(" "),e("Row",{staticClass:"box_card"},[e("Col",{staticStyle:{"padding-right":"10px"},attrs:{span:"3"}},[e("Input",{ref:"no",attrs:{placeholder:"输入流水单号"}})],1),t._v(" "),e("Col",{staticStyle:{"padding-right":"10px",width:"200px"},attrs:{span:"3"}},[e("Select",{ref:"company",attrs:{placeholder:"选择公司"}},t._l(t.companyList,function(a){return e("Option",{key:a.value,attrs:{value:a.value}},[t._v(t._s(a.label))])}))],1),t._v(" "),e("Col",{staticStyle:{"padding-right":"10px"},attrs:{span:"3"}},[e("Select",{ref:"status",attrs:{placeholder:"选择处理状态"}},t._l(t.statusList,function(a){return e("Option",{key:a.value,attrs:{value:a.value}},[t._v(t._s(a.label))])}))],1),t._v(" "),e("Col",{staticStyle:{"padding-right":"10px"},attrs:{span:"3"}},[e("Select",{ref:"area",attrs:{placeholder:"选择区域"}},t._l(t.areaList,function(a){return e("Option",{key:a.value,attrs:{value:a.value}},[t._v(t._s(a.label))])}))],1),t._v(" "),e("Col",{staticStyle:{"padding-right":"10px"},attrs:{span:"4"}},[e("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:t.get_data}},[t._v("查询")])],1)],1),t._v(" "),e("Row",{staticClass:"box_card"},[e("Table",{attrs:{stripe:"",columns:t.latest_complaint_column,data:t.latest_complaint}})],1),t._v(" "),e("Row",{staticClass:"box_card"},[e("Page",{attrs:{total:t.pageCount,current:t.pageCurrent,"page-size":t.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":t.get_data}})],1)],1)},r=[];n._withStripped=!0;var i={render:n,staticRenderFns:r};a.a=i}});