webpackJsonp([14],{572:function(e,t,n){"use strict";function a(e){c.setDrawingMode(BMAP_DRAWING_RECTANGLE),c.open(),s.centerAndZoom(e,20)}function o(e){c.setDrawingMode(BMAP_DRAWING_POLYGON),c.open(),s.centerAndZoom(e,20)}function r(){var e=p.pop();s.removeOverlay(e)}function i(){window.history.go(-1)}function d(){if(null!=s){for(var e=0;e<p.length;e++)s.removeOverlay(p[e]);p.length=0,u=""}}function l(e){for(var t=e.split("&"),n=0;n<t.length;n++){var a=t[n],o={strokeColor:"red",fillColor:"red",strokeWeight:1,strokeOpacity:.8,fillOpacity:.6,strokeStyle:"solid"},r=new BMap.Polygon(a,o);p.push(r),s.addOverlay(r)}}var s=null,c=null,u="",p=[],g=function(e){var t=c.getDrawingMode();if(t!=BMAP_DRAWING_POLYGON&&t!=BMAP_DRAWING_RECTANGLE){var n=new BMap.ContextMenu;n.addItem(new BMap.MenuItem("返回",function(){d(),s.removeContextMenu(n),i()},{width:140,id:"addarearect"})),n.addItem(new BMap.MenuItem("添加矩形区域",function(){a(e.point),s.removeContextMenu(n)},{width:140,id:"addarearect"})),n.addItem(new BMap.MenuItem("添加不规则区域",function(){o(e.point),s.removeContextMenu(n)},{width:140,id:"addareapolygon"})),n.addItem(new BMap.MenuItem("清除新加区域",function(){r(),s.removeContextMenu(n)},{width:140,id:"cleararea"})),n.addItem(new BMap.MenuItem("附近投放区",function(){e.point,s.removeContextMenu(n)},{width:140,id:"putin"})),n.addItem(new BMap.MenuItem("附近禁投区",function(){e.point,s.removeContextMenu(n)},{width:140,id:"exputin"})),s.addContextMenu(n)}};t.a={props:{id:"",areacoords:""},methods:{save:function(){var e=this,t=u,n=this.$route.query.id,a=new URLSearchParams;a.append("areaCoordinate",t),a.append("id",n),this.$ajax({method:"post",url:this.$uri+"mapInterface/updateAreaCoordinate",data:a}).then(function(t){d(),e.$router.push("/richangjianguan/area")}).catch(function(t){console.log(t),d(),e.$router.push("/richangjianguan/area")})},goback:function(){d(),this.$router.go(-1)},clearall:function(){d()}},mounted:function(){s=new BMap.Map("markmap"),s.centerAndZoom(new BMap.Point(104.072051,30.662979),13),s.enableScrollWheelZoom(!0),s.setMapStyle({style:"grassgreen"});var e={strokeColor:"red",fillColor:"red",strokeWeight:1,strokeOpacity:.8,fillOpacity:.6,strokeStyle:"solid"};c=new BMapLib.DrawingManager(s,{isOpen:!1,enableDrawingTool:!0,enableCalculate:!1,drawingType:BMAP_DRAWING_RECTANGLE,drawingToolOptions:{anchor:BMAP_ANCHOR_TOP_RIGHT,offset:new BMap.Size(5,5),scale:.6,drawingModes:[BMAP_DRAWING_POLYGON,BMAP_DRAWING_RECTANGLE]},circleOptions:e,polylineOptions:e,polygonOptions:e,rectangleOptions:e}),c.addEventListener("overlaycomplete",function(e){p.push(e.overlay),c.close(),c.setDrawingMode(0)}),c.addEventListener("polygoncomplete",function(e){var t=e.getPath();if(u){for(var n=0;n<t.length;n++){var a=t[n].lat,o=t[n].lng;strCoords+=o+","+a,n<t.length-1&&(strCoords+=";")}u=u+"&"+strCoords}else{for(var n=0;n<t.length;n++){var a=t[n].lat,o=t[n].lng;strCoords+=o+","+a,n<t.length-1&&(strCoords+=";")}u=strCoords}}),c.addEventListener("rectanglecomplete",function(e){var t=e.getPath(),n="";if(u){for(var a=0;a<t.length;a++){var o=t[a].lat,r=t[a].lng;n+=r+","+o,a<t.length-1&&(n+=";")}u=u+"&"+n}else{for(var a=0;a<t.length;a++){var o=t[a].lat,r=t[a].lng;n+=r+","+o,a<t.length-1&&(n+=";")}u=n}}),s.addEventListener("click",function(e){if(!e.overlay){var t=c.getDrawingMode();t!=BMAP_DRAWING_POLYGON&&t!=BMAP_DRAWING_RECTANGLE&&s.centerAndZoom(e.point,20)}}),s.addEventListener("rightclick",g);var t=this.$route.query.id,n=new URLSearchParams;n.append("id",t),this.$ajax({method:"post",url:this.$uri+"mapInterface/getAreacCoordinateById",data:n}).then(function(e){var t=e.data.areacCoordinate;u=t,l(t)}).catch(function(e){console.log(e)})}}},58:function(e,t,n){"use strict";function a(e){i||(n(617),n(618))}Object.defineProperty(t,"__esModule",{value:!0});var o=n(572),r=n(619),i=!1,d=n(1),l=a,s=d(o.a,r.a,!1,l,"data-v-ed45a5a6",null);s.options.__file="src\\views\\page\\richangjianguan\\addRegion\\area_add_region.vue",t.default=s.exports},617:function(e,t){},618:function(e,t){},619:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%",height:"900px"}},[n("div",{staticStyle:{height:"5%",width:"100%"}},[n("Button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")]),e._v(" "),n("Button",{attrs:{type:"primary"},on:{click:e.goback}},[e._v("返回")]),e._v(" "),n("Button",{attrs:{type:"primary"},on:{click:e.clearall}},[e._v("清除")])],1),e._v(" "),n("div",{staticStyle:{height:"94%","-webkit-transition":"all 0.5s ease-in-out",transition:"all 0.5s ease-in-out"},attrs:{id:"markmap"}})])},o=[];a._withStripped=!0;var r={render:a,staticRenderFns:o};t.a=r}});