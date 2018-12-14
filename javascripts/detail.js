;$(function(){
    //二维码的显示
    $(".mainbtns").on("mouseenter",".q-bottom",function(){
        $(".qrc-wrapper").addClass("extend-up")
        $(this).find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up")
    })
    $(".mainbtns").on("mouseleave",".q-bottom",function(){
        $(".qrc-wrapper").removeClass("extend-up")
        $(this).find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down")
    })
    //颜色选中
    $(".proattr-radio ul").on("click","li",function(){
        $(this).addClass("selected")
        .siblings("li").removeClass("selected")
    })
    //选项卡
    var obj={
        "tabareaIndex":0
    }
    $(".tabarea-items li").on("click",function(){
        $(this).addClass("current").siblings("li").removeClass("current");
        obj.tabareaIndex=$(this).index();
        $(".box img").eq(obj.tabareaIndex).addClass("showimg").siblings("img").removeClass("showimg")
    })
    //选择小图改变大图
    $(".imgzoom-thumb-main ul").on("mouseenter","li",function(){
        var src=$(this).find("img").attr("src");
        $(this).addClass("current").siblings("li").removeClass("current")
        $(".view-img img").attr("src",src);
        $(".imgzoom-pop img").attr("src",src);
    })
    //放大镜
    function Tobig(){};
    $.extend(Tobig.prototype,{
        init(){
            this.box=$(".imgzoom-main");
            this.small=$(".view-img");
            this.mark=$(".imgzoom-shot");
            this.big=$(".imgzoom-pop");
            this.bindEvent();
        },
        bindEvent(){
            this.box.on("mouseenter",this.showPop.bind(this));
            this.box.on("mouseleave",this.hidePop.bind(this));
            this.mark.on("mousemove",this.move.bind(this))
        },
        showPop(){
            this.mark.css("opacity",".3");
            this.big.css("display","block");
        },
        hidePop(){
            this.mark.css("opacity","0");
            this.big.css("display","none");
        },
        move(event){
            let e=event||window.event;
            let left=e.pageX - this.box.offset().left- this.mark.width() /2;
            let top=e.pageY - this.box.offset().top - this.mark.height() /2;
            if(left<0){
                left=0;
            }else if(left >= this.small.width()-this.mark.width()){
                left=this.small.width()-this.mark.width();
            }else{
                left=left;
            }
            if(top<0){
                top=0;
            }else if(top >= this.small.height() - this.mark.height()){
                top=this.small.height() - this.mark.height();
            }else{
                top=top;
            }
            this.mark.css({"left":left})
            this.mark.css({"top":top})
            var x=left*2;
            var y=top*2;
            this.big.children().css({"left": -x +"px"});
            this.big.children().css({"top": -y +"px"});
        }
    })
    new Tobig().init();
});
;$(function(){
    function Yangxin(){};
    $.extend(Yangxin.prototype,{
        init(){
            this.btnbox=$(".mainbtns")
            this.getData();
            this.bindEvent();
        },
        getData(){
            var options={
                url:"http://localhost:8001/json/goods.json",
                type:'GET',
                dataType:"json"
            };
            $.ajax(options)
            .then(function(res){
                this.goodslist=res;
                this.renderPage(res);
            }.bind(this))
        },
        renderPage(data){
            var sid=$.cookie("dataId");
            var imgsrc="";
            var title="";
            var price="";
            var btnbox='';
            for(var i=0;i<data.length;i++){
                if(data[i].sid===sid){
                    imgsrc=`
                        <img alt="【热卖爆品】Apple iPhone XS Max 256GB 金色 移动联通电信4G手机 双卡双待" src="${data[i].adSrc}"> 
                    `;
                    title=`
                    <span class="zy" id="itemNameZy">自营</span>
                    ${data[i].title}
                    `;
                    price=`
                    <span class="mainprice">
                        <i>¥</i>
                        ${data[i].tPrice}
                    </span>
                    `
                    btnbox=`
                    <a href="javascript:void(0)" class="btn-dark-buy">立即购买</a>
                    <a href="javascript:void(0)" class="btn-orange-buy" data-id=${data[i].sid}>
                        <i></i>
                        加入购物车
                    </a>
                    <div class="qrcode-panel">
                        <div class="qrc-wrapper  " > 
                            <img onerror="javascript:$('#qrCode').hide();" class="b-img lazy-loading" src="//code.suning.cn/pc/build.do?longUrl=687474703a2f2f632e6d2e73756e696e672e636f6d2f6368616e6e656c7761702e68746d3f61707069643d31267061636b6e76657273696f6e3d313331266368616e6e656c636f64653d313030363126646f776e666c61673d312675746d5f736f757263653d7172636f64652675746d5f6d656469756d3d312675746d5f636f6e74656e743d343030302675746d5f7465726d3d30322675746d5f63616d706169676e3d26616454797065436f64653d3130313326616449643d31303630363634393836325f30303030303030303030266368616e6e656c747970653d30362673746f72653d343030305f30315f2670726f64756374547970653d30&amp;bizCode=i9seHn"> 
                        </div>
                        <div class="q-bottom"> 
                            <span class="s-img"></span> 
                            <div class="q-text one-row">
                                <div class="cli-buy txt">扫一扫购买</div>
                            </div> 
                            <i class="ng-iconfont fa fa-angle-down"></i> 
                        </div>
                    </div>
                    `
                }
            }
            $("#bigImg").html(imgsrc);
            $(".first").html(imgsrc);
            $(".imgzoom-pop").html(imgsrc);
            $("#itemDisplayName").html(title);
            $(".price-promo dd").html(price);
            $(".mainbtns").html(btnbox);
        },
        bindEvent(){
            this.btnbox.on("click",".btn-orange-buy",this.addCar.bind(this));
        },
        addCar(event){
            var e=event||window.event;
            var target=e.target||e.srcElement;
            var sid=$(target).attr("data-id");
            var goods=this.findJson(sid)[0];
            $.extend(goods,{count:1});
            var sgoods=JSON.stringify(goods);
            if(!localStorage.cart2){
                localStorage.setItem("cart2",`[${sgoods}]`);
                return false;
            };
            var ogoods=JSON.parse(localStorage.cart2);
            if(!this.hasId(ogoods,sid)){
                ogoods.push(goods);
            };
            localStorage.setItem("cart2",JSON.stringify(ogoods))

        },
        findJson(sid){
            return this.goodslist.filter(function(item){
                return item.sid===sid;
            })
        },
        hasId(goods,sid){
            for(var i=0;i<goods.length;i++){
                if(goods[i].sid === sid){
                    goods[i].count++;
                    return true;
                }
            }
            return false;
        }

    })
    new Yangxin().init();
})

;$(function(){
})