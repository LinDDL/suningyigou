;$(function(){
    //鼠标移入显示二维码，移除隐藏
    $(".code-wrapper").hover(function(){
        $(this).children(".code").css("display","block");
    },function(){
        $(this).children(".code").css("display","none");

    })
    //二级菜单
    var obj={
        index:0
    }
    $(".index-list li").on("mouseenter",function(){
        $(this).addClass("current").siblings("li").removeClass("current");
        
        $(".index-sort-detail").css({"display":"block","width":"999px"});
        obj.index=$(this).index();
    })
    setTimeout(function(){
        $(".index-list li").on("mouseleave",function(){
            $(this).removeClass("current");
            $(".index-sort-detail").css({"display":"none","width":"0px"})
        })
    },2000)
    $(".index-sort-detail").on("mouseenter",function(){
        $(".index-list li").eq(obj.index).addClass("current").siblings("li").removeClass("current");
        $(".index-sort-detail").css({"display":"block","width":"999px"})
    })
    $(".index-sort-detail").on("mouseleave",function(){
        $(".index-list li").eq(obj.index).removeClass("current");
        $(".index-sort-detail").css({"display":"none","width":"0"})
    })
    //头部菜单隐藏显示
    $('.ng-bar-node-site').on("mouseenter",function(){
        $(this).addClass("ng-bar-node-hover");
        $(this).siblings("div").css({"display":"block"})
    })
    setTimeout(function(){
        $('.ng-bar-node-site').on("mouseleave",function(){
            $(this).removeClass("ng-bar-node-hover");
            $(this).siblings("div").css({"display":"none"})
        })
    },2000)
     $(".site-nav-child").on("mouseenter",function(){
        $(this).siblings("a").addClass("ng-bar-node-hover");
        $(this).css({"display":"block"})
    });
    $(".site-nav-child").on("mouseleave",function(){
        $(this).siblings("a").removeClass("ng-bar-node-hover");
        $(this).css({"display":"none"})
    });
})