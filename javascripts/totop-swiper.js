;$(function(){
      /******** 头条向上轮播 start*******/
    var $ul=$(".toutiao ul");
    var $li=$ul.children();
    // var $marginTop=$ul.css("margin-top")
    function changeMarginTop(){
            $ul.css({
                "margin-top":"0"
            })
            .stop()
            .animate({
                "margin-top":-$li.height()*3
            })               
    }
    setInterval(changeMarginTop,4000)
    
/******** 头条向上轮播 end*******/
})
  