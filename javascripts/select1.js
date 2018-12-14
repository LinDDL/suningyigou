;$(function(){
    var _selects=$(".t-list ul li");
   _selects.on("mouseover",function(){
       $(this).addClass("cur").siblings("li").removeClass("cur");
       var index=$(this).index();
       $(".tab-content").children(".con-list").eq(index).addClass("con-list-cur").siblings(".con-list").removeClass("con-list-cur")
   })
})