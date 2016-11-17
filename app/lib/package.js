window._ = {
    // 封装移动端的轻敲事件
    tap:function(dom,callback){
        var isMove = false;
        var stratTime = 0;
        dom.addEventListener("touchstart",function(e){
            startTime = Date.now();
        });
        dom.addEventListener("touchmove",function(e){
            isMove = true;
        });
        dom.addEventListener("touchend",function(e){
            if(isMove==false && (Date.now()-startTime) < 200 ){
                callback&&callback(e);
            }
            isMove = false;
        })
    },
    //该函数是获取url中的
    getUrlParam:function(name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}
