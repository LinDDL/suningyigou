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