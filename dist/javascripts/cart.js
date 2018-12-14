;$(function(){
    //渲染页面
    function RenderPop(){};
    $.extend(RenderPop.prototype,{
        init(){
            this.box=$(".recommend-box");
            this.addCarbtn=$(".cart-list")
            this.getDate();
            this.bindEvent();
        },
        getDate(){
            //当前页面的添加购物车
            var options={
                url:'https://tuijian.suning.com/recommend-portal/recommend/paramsBiz.jsonp?parameters=000000000161786163&cityId=010&sceneIds=10-23&count=40&u=&c=154341515643283540&flag=',
                type:"GET",
                dataType:"jsonp",
            };
            $.ajax(options)
            .then(function(res){
                var json=res.sugGoods[0].skus;
                this.goodsJson=json;
                this.rendePage(json);
            }.bind(this));
        },
        //渲染页面
        rendePage(data){
            var html="";
            for(var i= 0;i<data.length;i++){
                html+=`
                <li class="product-box unlikeSign">
                <a href="javascriptL:void(0)" class="product-pic unlikeASign">
                    <img class="product-img lazy-loading" src="${data[i].pictureUrl}" alt="">
                </a>
                <p class="product-price-num"><span class="sn-price clearfix"><i class="price-icon l">¥</i><em class="price-big l">${data[i].price}</em></span><span class="product-num"><em>72.3万</em>人已购买</span></p>
                <p class="product-name">
                    <a href="javcascript:void(0)">
                            ${data[i].sugGoodsName}
                    </a>
                </p>
                <a href="javascript:void(0)" class="add-cart " data-id=${data[i].promotionId}>
                    <i></i>
                    加入购物车
                </a>
            </li>
                `
            }
            this.box.html(html);
        },
        //绑定事件
        bindEvent(){
            this.box.on("click",".add-cart",this.handleCarClick.bind(this));
            this.addCarbtn.on("click",".plus",this.addCount);
            this.addCarbtn.on("click",".minus",this.reduceCount);
        },
        //增加已有商品数量
        addCount(){
            var goods=getCart();
            var btnId=$(this).attr("btn-id");
            for(var i=0;i<goods.length;i++){
                if(goods[i].promotionId === btnId){
                    goods[i].count++;
                    localStorage.cart1=JSON.stringify(goods);
                    $(this).siblings("input").val(goods[i].count);
                    allPrice=goods[i].count*goods[i].price;
                    $(this).parents(".td-amount").siblings(".td-sum").find("em").html(allPrice); 
                    loading();                    
                }
            }
        },
        //减少已有商品数量
        reduceCount(){
            var goods=getCart();
            var btnId=$(this).attr("btn-iid");
            for(var i=0;i<goods.length;i++){
                if(goods[i].promotionId === btnId){
                    goods[i].count--;
                    if(goods[i].count>=1){
                        localStorage.cart1=JSON.stringify(goods);
                        $(this).siblings("input").val(goods[i].count);
                        allPrice=goods[i].count*goods[i].price;
                        $(this).parents(".td-amount").siblings(".td-sum").find("em").html(allPrice); 
                        loading();                                            
                    }else{
                        alert("小姐姐，小哥哥，别再减了哦^-^ 再减就没了！")
                    }
                }
            }
        },
        //增加购物车触发事件
        handleCarClick(event){
            var e=event||window.event;
            var target=e.target||e.srcElement;
            var promotionId=$(target).attr("data-id");
            var nowMsg=this.findJson(promotionId)[0];
            this.addCar(nowMsg,promotionId);
        },
        //查找符合当前promotionId的元素，并返回；
        findJson(promotionId){
            return this.goodsJson.filter(function(item){
                return item.promotionId === promotionId;
            })
        }
        ,
        //增加购物车
        addCar(nowMsg,promotionId){
            $.extend(nowMsg,{count:1});
            var sNowMsg = JSON.stringify(nowMsg);

            if(!localStorage.cart1){
                localStorage.setItem("cart1",`[${sNowMsg}]`)
                return false;
            };
            var aMsg=JSON.parse(localStorage.cart1);
            if(!this.hasId(aMsg,promotionId)){
                aMsg.push(nowMsg);
            }
            localStorage.setItem("cart1",JSON.stringify(aMsg));
            renderCart();
            loading();
        },
        //找寻数组中是否存在
        hasId(aMsg,promotionId){
            for(var i=0;i<aMsg.length;i++){
                if(aMsg[i].promotionId===promotionId){
                    aMsg[i].count++;
                    return true;
                }
            }
            return false;
        },
        
       
    });
    new RenderPop().init();

    //总数据改变
    function loading(){
        var numbox =$(".td-sum em");
        var num=0;
        for(var i=0;i<numbox.length;i++){
            num+=Number($(".td-sum em").eq(i).html()) 
        }
        $("#cart1PayAmount").html(num)
    }
    //获取本地储存的商品，返回数组
    function getCart(){
        if(!localStorage.cart1) return 0;
        var aMsg=JSON.parse(localStorage.cart1);
        return aMsg;
    }
    //渲染购物车
    function renderCart(){
        var html="";
            var cart_json=getCart();
            if(!cart_json) return 0;
            for(var i=0;i<cart_json.length;i++){
                html+=`
                <div class="item ">
                    <div class="item-main clearfix">
                        <div class="td td-chk from">
                            <div class="cart-checkbox">
                                <input type="checkbox" id="sp" class="checkbox chk-item">
                                <label for="sp"></label>
                            </div>
                        </div>
                        <div class="td td-item">
                            <div class="item-pic">
                                <a href="javascript:void(0)" class="item-img-box">
                                    <img src="${cart_json[i].pictureUrl}" alt="">
                                </a>
                            </div>
                            <div class="item-info">
                                <a href="javascript:void(0)" class="item-title">
                                ${cart_json[i].sugGoodsName}    </a>
                            </div>
                        </div>
                        <div class="td td-price">
                            <div class="price-line">
                                <span class="price-now sn-price">
                                    <i>¥</i>
                                    <em> ${cart_json[i].price}  </em>
                                </span>
                            </div>
                        </div>
                        <div class="td td-amount">
                            <div class="item-amount">
                                <a href="javascript:;" class="minus no-minus" btn-iid="${cart_json[i].promotionId}">-</a>
                                <input type="text" class="ui-text text-amount" value="${cart_json[i].count}">
                                <a href="javascript:;" class="plus" btn-id="${cart_json[i].promotionId}">+</a>
                            </div>
                        </div>
                        <div class="td td-sum">
                            <b class="sn-price">
                                <i>¥</i>
                                <em>${cart_json[i].price * cart_json[i].count}</em>
                            </b>
                            <p class="pro-weight">0.15kg</p>
                        </div>
                        <div class="td td-op">
                            <a href="javascript:void(0)" class="add-fav tip-common-click-fn-btn">移入收藏</a>
                            <a href="javascript:void(0)" class="del tip-common-click-fn-btn">删除</a>
                        </div>
                    </div>
                </div>
                `
            }
            $(".cart-list").html(html);
            loading();
    }
    renderCart();

    //清空购物车
    function clearCart(){
      localStorage.clear("cart1");
    }


    //获取本地储存的商品，返回数组其他页面添加
    function getCartOther(){
        if(!localStorage.cart2) return 0;
        var aMsg=JSON.parse(localStorage.cart2);
        return aMsg;
    }
    function renderCartOther(){
        var html="";
        var cart_json=getCartOther();
        if(!cart_json) return 0;
        for(var i=0;i<cart_json.length;i++){
            html+=`
            <div class="item ">
                <div class="item-main clearfix">
                    <div class="td td-chk from">
                        <div class="cart-checkbox">
                            <input type="checkbox" id="sp" class="checkbox chk-item">
                            <label for="sp"></label>
                        </div>
                    </div>
                    <div class="td td-item">
                        <div class="item-pic">
                            <a href="javascript:void(0)" class="item-img-box">
                                <img src="${cart_json[i].adSrc}" alt="">
                            </a>
                        </div>
                        <div class="item-info">
                            <a href="javascript:void(0)" class="item-title">
                            ${cart_json[i].title}    </a>
                        </div>
                    </div>
                    <div class="td td-price">
                        <div class="price-line">
                            <span class="price-now sn-price">
                                <i>¥</i>
                                <em> ${cart_json[i].tPrice}  </em>
                            </span>
                        </div>
                    </div>
                    <div class="td td-amount">
                        <div class="item-amount">
                            <a href="javascript:;" class="minus no-minus" btn-iid="${cart_json[i].sid}">-</a>
                            <input type="text" class="ui-text text-amount" value="${cart_json[i].count}">
                            <a href="javascript:;" class="plus" btn-id="${cart_json[i].sid}">+</a>
                        </div>
                    </div>
                    <div class="td td-sum">
                        <b class="sn-price">
                            <i>¥</i>
                            <em></em>
                        </b>
                        <p class="pro-weight">0.15kg</p>
                    </div>
                    <div class="td td-op">
                        <a href="javascript:void(0)" class="add-fav tip-common-click-fn-btn">移入收藏</a>
                        <a href="javascript:void(0)" class="del tip-common-click-fn-btn">删除</a>
                    </div>
                </div>
            </div>
            `
        }
        $(".cart-list").html(($(".cart-list").html()+html));
        onetoTallPrice();
    }
    renderCartOther();
   
    //减少商品的时候触发
    function cursor(){
        if($(".cart-list").find(".text-amount").val()>1){
            $(".cart-list").find(".no-minus").css("cursor","pointer");
        }else{
                $(".cart-list").find(".no-minus").css("cursor","no-drop");
        }
    }

   
})




//# sourceMappingURL=cart.js.map
