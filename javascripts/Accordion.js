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