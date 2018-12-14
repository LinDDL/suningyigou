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