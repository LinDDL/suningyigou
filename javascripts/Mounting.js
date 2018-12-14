;$(function(){
    //吸顶效果+hover显示隐藏
    function Mounting(){};
    $.extend(Mounting.prototype,{
        init(){
            this.bar=$(".ng-fix-bar");
            this.hook=$(".ng-fix-bar .index-all-hook");
            this.list=$(".ng-fix-bar .index-sort-list-wrapper")
            this.bindEvent();
        },
        bindEvent(){
            $(window).scroll(this.show.bind(this));
            this.hook.hover(this.showList.bind(this),this.hideList.bind(this))
        },
        show(){
            if($(window).scrollTop()>=800){
                this.bar.css("display","block")
            }else{
                this.bar.css("display","none")

            }
        },
        showList(){
            this.list.css("display","block")

        },
        hideList(){
            this.list.css("display","none")
        }
    })
    new Mounting().init();
})