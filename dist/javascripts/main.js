;$(function(){
    /******** bn-hc start *******/
    function Accordion(){};
    $.extend(Accordion.prototype,{
        init:function(){
            this.four_hc=document.querySelector(".four-hc");
            this.animate_hc=document.querySelector(".animate-hc");
            this.getData();
            this.bindEvent();
        },
        getData:function(){
            var options={
                url: 'https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=154341515643283540&cityId=010&sceneIds=19-84&count=4&viewCount=4&parameter=1984',
                    type: 'GET',
                    dataType: "jsonp",
                    context:this
            }
            $.ajax(options)
            .then(function(res){
                var data=res.sugGoods[0].skus;
                this.renderPage(data);
            })
        },
        renderPage:function(data){
             //前端art-template模板
             var html=template.render($("#four-hc").html(),data);
             $(".four-hc").html(html);
            var html1="";
            for(var i=0;i<data.length;i++){
                html1+=`<li class="item" style="width: 655px;">
                    <div class="label label-bg${i}">
                        <p style="color: #EF4124">${data[i].venuelist[0].venueName}</p>
                    </div>
                    <div class="hclist">
                        <div class="hc-con">
                            <a href="javascript:void(0)">
                                <p class="title">${data[i].venuelist[0].venueName}</p>
                                <p class="des">${data[i].venuelist[0].venueDes}</p>
                                <img class="pro" src="${data[i].venuelist[0].venuePic}" alt="">
                            </a>
                        </div>
                        <ul>
                            <li class="item${i}">
                                <a href="javascript:void(0)">
                                    <p class="hc-title" style="color: #ef4124">${data[i].venuelist[i].venueName}</p>
                                    <img class="pro" src="${data[i].venuelist[i].venuePic}">
                                    <div class="desc-wrapper">
                                        <p class="desc" style="background-color: #FC917E">${data[i].venuelist[i].venueName}</p>
                                        <i class="angle angle-left"></i>
                                        <i class="angle angle-right"></i>
                                    </div>
                                </a>
                            </li>
                            <li class="item${i}">
                            <a href="javascript:void(0)">
                                <p class="hc-title" style="color: #ef4124">${data[i].venuelist[i].venueName}</p>
                                <img class="pro" src="${data[i].venuelist[i].venuePic}">
                                <div class="desc-wrapper">
                                    <p class="desc" style="background-color: #FC917E">${data[i].venuelist[i].venueName}</p>
                                    <i class="angle angle-left"></i>
                                    <i class="angle angle-right"></i>
                                </div>
                            </a>
                        </li>
                        <li class="item${i}">
                        <a href="javascript:void(0)">
                            <p class="hc-title" style="color: #ef4124">${data[i].venuelist[i].venueName}</p>
                            <img class="pro" src="${data[i].venuelist[i].venuePic}">
                            <div class="desc-wrapper">
                                <p class="desc" style="background-color: #FC917E">${data[i].venuelist[i].venueName}</p>
                                <i class="angle angle-left"></i>
                                <i class="angle angle-right"></i>
                            </div>
                        </a>
                    </li>
                        </ul>
                    </div>
                </li>`
            }
            $(".animate-hc ul").html(html1);
        },
        bindEvent:function(){
            this.four_hc.onmouseover=this.hidePip.bind(this);
            this.four_hc.onmouseout=this.showPip.bind(this);
            this.animate_hc.onmouseover=this.hidePip.bind(this);
            this.animate_hc.onmouseout=this.showPip.bind(this);
           
        },
        hidePip:function(){
            this.four_hc.style.display="none";
            this.animate_hc.style.display="block";
          
        },
        showPip:function(){
            this.animate_hc.style.display="none";
            this.four_hc.style.display="block";
        }
    })
    var accordion=new Accordion();
    accordion.init();
        
        



    
})
// $(function(){
//     $("ul li").mousemove(function(){
//         $(this).stop().animate({
//             width:540
//         })
//         .siblings()
//         .stop()
//         .animate({
//             width:220
//         })
//     })
        
//     })







    //原生跨域方法
    //     function _jsonp(url,cb){
    //         cb=cb?cb:"callback"
    //         var random_name="zh"+Date.now();
    //         return new Promise(function(resolve,reject){
    //             var _script=document.createElement("script");
    //             url+=(/\?/.test(url)?"&":"?")+cb+"="+random_name;
    //             _script.src=url;
    //             console.log(_script)
    //             document.body.appendChild(_script);
    //             window[random_name]=function(res){
    //                 resolve(res)
    //             }
    //             _script.onload=function(){
    //                 this.remove();
    //             }
    //         })
    //     }
    //     _jsonp("https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=154341515643283540&cityId=010&sceneIds=19-84&count=4&viewCount=4&parameter=1984")
    //     .then(function(res){
    //   console.log(res)
    // })

        
    /******** bn-hc end *******/
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
//瀑布流渲染页面
;$(function(){
    function PopPage(){};
    $.extend(PopPage.prototype,{
        init(){
            this.getData();
            this.handleEvent();
        },
        handleEvent(){

        },
        getData(){
            var options={
                url:'https://f.m.suning.com/api/getPCPromotionsTag1.do?u=&c=154341515643283540&cityCode=010&sceneIds=12-14&count=100&flag=1&channelId=31&marketId=&storeId=',
                type:"GET",
                dataType:"jsonp",
                // context:"this"
            };
            $.ajax(options)
            .then(function(res){
                var data=res.data.sugGoods[0].skus;
                this.render(data)
            }.bind(this))
        },
        render:function(data){
            var html="";
            for(var i = 0;i<data.length;i++){
                html+=`
                <li>
                <a href="" class="pro-link">
                    <img src="${data[i].pictureUrl}" alt="">
                    <p class="title"></p>
                    <p class="price"><i>￥</i>${data[i].price}</p>
                    <p class="cxIcon"></p>
                </a>
                <a href="" class="same">找相似</a>
            </li>
                `
            }
            $(".rec-content ul").html(html)
        }
    })
    new PopPage().init();
})
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
;$(function(){
    var _selects=$(".t-list ul li");
   _selects.on("mouseover",function(){
       $(this).addClass("cur").siblings("li").removeClass("cur");
       var index=$(this).index();
       $(".tab-content").children(".con-list").eq(index).addClass("con-list-cur").siblings(".con-list").removeClass("con-list-cur")
   })
})

;$(function(){
    var swiper = new Swiper('.swiper1', {
        slidesPerView: 5,
        // spaceBetween: 20,
        slidesPerGroup: 5,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    $(".tab-content").on("mouseenter",function(){
      $(".pointer").show()
    });
    $(".tab-content").on("mouseleave",function(){
      $(".pointer").hide()
    })
})
;$(function(){
  var swiper = new Swiper('.swiper2', {
    loop: true,
    autoplay:true,
    navigation: {
      nextEl: '.right-botton',
      prevEl: '.left-botton',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

})
;$(function(){
  var swiper = new Swiper('.swiper3', {
      slidesPerView: 3,
      spaceBetween: 5,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      // autoplay:true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });
  // $(".tab-content").on("mouseenter",function(){
  //   $(".pointer").show()
  // });
  // $(".tab-content").on("mouseleave",function(){
  //   $(".pointer").hide()
  // })
})

;$(function(){
    function getTime(){
        var date=new Date();
        var start=date.getTime();
        var enddate=new Date("2018-12-7 00:00:00")
        var end=enddate.getTime();
        var lastTime=end-start;
        if(lastTime>=0){
            var d=Math.floor(lastTime/1000/60/60/24%365);
            var h=Math.floor(lastTime/1000/60/60%24);
            var m=Math.floor(lastTime/1000/60%60);
            var s=Math.floor(lastTime/1000%60);
            if(d<10){
                d="0"+d;
            }
            if(h<10){
                h="0"+h;
            }
            if(m<10){
                m="0"+m;
            }
            if(s<10){
                s="0"+s;
            }
        }
        $(".hour-node").html(h);
        $(".minute-node").html(m);
        $(".second-node").html(s)
    }
    setInterval(getTime,1000);    
})
;$(function(){
/********  顶部广告位start  ********/
TOP_ACTIVE=$("#TOP_ACTIVE");
TOP_ACTIVE_WRAP=$("#TOP_ACTIVE_WRAP");
TOP_ACTIVE.on("click",function(){
    TOP_ACTIVE.hide();
    TOP_ACTIVE_WRAP.hide();
})
/******** 顶部广告位end ********/
})

;$(function(){
    $(".index-list").on("mouseenter","li",selects);
    function selects(){
        console.log( $(this).index());
        $(".sort-btn").eq($(this).index()).removeClass("hide").siblings(".sort-btn").addClass("hide");
    }
})
//免密码登陆
;$(function(){
    function token(){
        var options={
            url:'http://localhost:8001/api/users/token',
            type:"POST"
        };
        $.ajax(options)
        .then(function(res){
            console.log(res)
            if(res.status == "success"){
                $("#user").addClass("login").html("退出登陆");
                $(".user-img").css({
                    "background-image":"url(./images/touxiang.jpg)",
                    "background-size":"55px 55px",
                    "background-position":"0 0"
                })
                $(".user-touxiang").css({
                    "background-image":"url(./images/touxiang.jpg)",
                    "background-size":"55px 55px",
                    "background-position":"0 0"
                })
                //退出登陆
                $("#user").click(function(){
                    $(this).html("欢迎登陆")
                    $.cookie("USER.ID","",{expires:-1})
                    $(".user-img").css({
                        "background-image":"url(../images/index.png)",
                        "background-size":"auto",
                        "background-position":"-93px -23px"
                    })
                    $(".user-touxiang").css({
                        "background-image":"url(../images/index.png)",
                        "background-size":"auto",
                        "background-position":"-93px -23px"
                    })
                })
            }else{
                $("#user").click(function(){
                    $(this).attr("href","login.html");
                })
            }
        })
    }
    token();
})
;$(function(){
   
})
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
  
//# sourceMappingURL=main.js.map
