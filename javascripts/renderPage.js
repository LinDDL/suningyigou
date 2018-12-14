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