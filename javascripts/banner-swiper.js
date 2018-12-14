;$(function(){
    /******** 轮播图 start ********/
    var index=0;
    //获取轮播图的每个li
    var $slide=$(".banner").children().children("li");
    //获取图的数量，作为最大数index
    var MaxLength=$slide.length-1;
    //前面一个显示的图
    var prevIndex=0;
    //点击切换图片
    $(".btn-left").on("click",prev)
    $(".btn-right").on("click",next)
    //封装函数
    //向右切换
    function next(){
        if(index==MaxLength){
            index=0;
            changeClass()
            return false;
        }
        index++;
        changeClass()
    }
    //向左切换
    function prev(){
        if(index==0){
            index=MaxLength;
            changeClass()
            return false
        }
        index--;
        changeClass()
    }
    //动画
    function changeClass(){
        $slide.eq(index)
        .fadeIn()
        .siblings("li")
        .fadeOut() 
        
        $(".banner-nav").children("span").eq(index)
        .addClass("current")
        .siblings("span")
        .removeClass("current")
        
    }
    //渲染按钮
    function initPagination(){
        for(var i=0;i<MaxLength+1;i++){
            var $span=$("<span class='page-item'></span>")
            if(i==index){
                $span.addClass("current");
            }
            $(".banner-nav").append($span)
        }
    }
    //事件委托，给按钮添加事件
    $(".banner-nav").on("mouseover","span",toIndex);
    function toIndex(event){
        var e=event||window.event;
        var target=e.target||e.srcElement;
        prevIndex=index;
        index=$(".banner-nav").children().index(target)
        changeClass()
    }
    initPagination()
    //自动循环播放
    var banner_timer=setInterval(function(){
        $(".btn-right").trigger('click')
    },3000)
    //性能优化，当鼠标移入时停止动画，移出开始
    $(".banner-wrapper").on("mouseover",function(){
        $(".banner-wrapper .btn").css("display","block");
        clearInterval(banner_timer)
    })
    $(".banner-wrapper").on("mouseout",function(){
        $(".banner-wrapper .btn").css("display","none");
         banner_timer=setInterval(function(){
            $(".btn-right").trigger('click')
        },3000)
    })

/******** 轮播图 end ********/
})