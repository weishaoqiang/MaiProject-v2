$(function(){
    $.ajax({
        // url:"http://192.168.37.76:9090/api/getindexmenu",
        url:"http://mmb.ittun.com/api/getindexmenu",
        beforeSend:function(){
            if(window.sessionStorage.getItem("indexMune")){
                var data = JSON.parse(window.sessionStorage.getItem("indexMune"));
                var html=template('indexMune',data);
                $('.nav-all > ul').html(html);
                var li = document.querySelectorAll(".nav-all > ul > li");
                $(li[7]).on('click',function(){
                    $('.nav-all > ul > li:nth-last-child(-n+4)').toggleClass("show");
                })
                return false;
            }
        },
        success:function(data){
            // 将json转成字符串并储存。
            var resultSotorage = JSON.stringify(data);
            // 将数据储存在sessionStorage中
            window.sessionStorage.setItem("indexMune",resultSotorage);
            var html=template('indexMune',data);
            $('.nav-all > ul').html(html);
            var li = document.querySelectorAll(".nav-all > ul > li");
            $(li[7]).on('click',function(){
                $('.nav-all > ul > li:nth-last-child(-n+4)').toggleClass("show");
            })
        }
    })
    $.ajax({
        url:"http://mmb.ittun.com/api/getmoneyctrl",
        beforeSend:function(){
            if(window.sessionStorage.getItem("indexRecomend")){
                var data = JSON.parse(window.sessionStorage.getItem("indexRecomend"));
                var html=template('recommend',data);
                $('.rebate-bottom').html(html);
                return false;
            }
        },
        success:function(data){
            // 将json转成字符串并储存。
            var resultSotorage = JSON.stringify(data);
            // 将数据储存在sessionStorage中
            window.sessionStorage.setItem("indexRecomend",resultSotorage);
            var html=template('recommend',data);
            $('.rebate-bottom').html(html);
        }
    })
})
