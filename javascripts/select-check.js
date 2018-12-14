;$(function(){
    //业务需求
    //根据小图改变显示大图片

    //目标
    //根据下标（小图片），改变对应大图片下标

    function SelectCheck(){};
    $.extend(SelectCheck.prototype,{
        init:function(){
            this.bigShow=$(".bigshow-wrapper ul li");
            this.smallShow=$(".smallshow-wrapper ul li");
            this.handleEvent();
        },
        handleEvent:function(){
            this.smallShow.on("mouseenter",this.changeIndex);
        },
        changeIndex:function(event){
           $(".bigshow-wrapper ul li").eq(Number($(this).index()-3)).addClass("current")
           .siblings("li").removeClass("current")
        }
    })
    var selectCheck=new SelectCheck();
    selectCheck.init();
})