;$(function(){
    $(".input-wrapper").on("click",function(){
        $(this).children(".placeholder").css("display","none");
        // $(this).children("input")
        // .blur(function(){
        //     $(this).siblings(".placeholder").css("display","block")
        // })
    })


    $("#save").on("click",register);
    function register(){
        var username=$("#mobileAlias").val();
        var password=$("#setPsw").val();
        var options={
            url:'http://localhost:8001/api/users/register',
            type:"POST",
            data:{
                username:username,
                password:password
            }
           
        };
        $.ajax(options)
        .then(function(res){
            var reg=/^(13|14|15|17|18)\d{9}$/g;
            var pwd=/^(?![\d]+$)(?![a-zA-Z]+$)(?![\W]+$)[\da-zA-Z_@#\.]{6,12}$/;
            if(reg.test(username)==true||pwd.test(password)==true){
                if(res.status=="success"){
                    $("#setPsw_rank").removeClass("hide");
                    var temp = 0;
                    if(/[0-9]/g.test(res)){
                        temp++
                    }
                    if(/[a-zA-Z]/g.test(res)){
                        temp++
                    }
                    if(/[!@#$%^*.-]/g.test(res)){
                        temp++
                    }
                    console.log(temp)
                    switch(temp){
                        case 1: $(".level1").css("background","#d00");break;
                        case 2: $(".level2").css("background","#dd0");break;
                        case 3: $(".level3").css("background","blue");break;
                    }
                    // setTimeout(function(username){
                    //     location.href="http://localhost:8001/login.html";
                    // },3000) 
                }else{
                    alert("用户名重名")
                }
               
            }else{
                if(reg.test(username)==false){
                    $("#aliasTip").removeClass("hide").html("格式不正确，请输入您正确的手机号。")
                }else{
                    $("#aliasTip").addClass("hide");
                }
                if(pwd.test(password)==false){
                    $(".suggestion").removeClass("hide")
                }else{
                    $(".suggestion").addClass("hide");
                }
            }
        },function(err){
            console.log(err,"错误")
        })
    }


})

//# sourceMappingURL=register.js.map
