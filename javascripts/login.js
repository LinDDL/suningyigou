;$(function(){
    //选择登陆方式
    $(".tab-item").on("click",function(){
        $(this).addClass("on").siblings(".tab-item").removeClass("on");
        console.log($(this).index())
        if($(this).index()===0){
            $(this).parent().siblings(".scan-login").css("display","block").siblings(".pc-login").css("display","none")
        }
        if($(this).index()===1){
            $(this).parent().siblings(".pc-login").css("display","block").siblings(".scan-login").css("display","none")
        }
    })
    //二维码特效
    $(".scan-box").on("mouseenter",function(){
        $(".qrcode").addClass("edge").siblings(".phone-scan").css("display","block");
    })
    $(".scan-box").on("mouseleave",function(){
        $(".qrcode").removeClass("edge").siblings(".phone-scan").css("display","none");
    })
    //选择登陆
    $(".login-switch").on("click",function(){
        $(".username-login").toggle();
        $(".phone-login").toggle();
    })
    //聚焦
    $(".input-box").on("click",function(){
        $(this).children("label").css("display","none");
        // $(this).children("input")
        // .blur(function(){
        //     $(this).siblings("label").css("display","block")
        // })
    })
   //登陆
   $("#submit").on("click",login);
   function login(){
    var username=$("#userName").val();
    var password=$("#password").val();
    var options={
        url:'http://localhost:8001/api/users/login',
        type:"POST",
        data:{
            username:username,
            password:password
        }
       
    };
    $.ajax(options)
    .then(function(res){
        var reg=/^(13|14|15|17|18)\d{9}$/g;
        if(reg.test(username)==true){
            if(res.status=="success"){
                setTimeout(function(){
                    location.href="http://localhost:8001/home.html";
                },3000) 
            }
        }else{
            if(reg.test(username)!=true){
                $(".email-list").removeClass("hide").html("用户名或密码错误");
            }else{
                $(".email-list").addClass("hide").html("用户名或密码错误");
            }
        }
    },function(err){
        console.log(err,"错误")
    })
   }
})