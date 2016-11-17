/**
 * Created by Administrator on 2016/11/5.
 */
//获取图片部分开始
$(function () {
    getPage();
    function getPage() {
        var pages = _.getUrlParam("pageid");
        var sel = document.querySelector("#sel");
        var pageKey = pages + "key";
        $.ajax({
            type: "GET",
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            data: {"pageid": pages},
            beforeSend: function () {
                //将键存储在number里面
                var number = window.sessionStorage.getItem(pageKey);
                if (number != null) {
                    //将字符串转换成json对象
                    number = JSON.parse(number);
                    var html = template("moneyctrl", number);
                    $("#cxdiv > ul").html(html);
                    var html = template("page", {"pageid": pages});
                    $(".btn").html(html);
                    //下拉框
                    //1：获得page总页数
                    var totalPage = Math.floor(number["totalCount"] / number["pagesize"]);
                    //2：动态创建下拉列表选项
                    for (var i = 1; i <= totalPage; i++) {
                        var option = $('<option id=pageid-' + i + ' value="' + i + '">' + i + '/' + totalPage + '</option>');
                        $("#sel").append(option);
                        //3：下拉菜单改变，请求数据传入新的pageid
                        // 记录原始的categoryid
                        var firstId = pages + 1;
                        //4: select改变事件
                        $("#sel").change(function () {
                            var value = $(this).val();
                            window.location.search = "?categoryid=" + firstId + "&pageid=" + value;
                        });
                        //4 解决select的change事件默认项不能选中
                        if (pages == i) {
                            option.attr("selected", "selected");
                        }
                    }
                    return false;
                }

            },
            success: function (items) {
                var html = template("moneyctrl", items);
                $("#cxdiv > ul").html(html);
                var html = template("page", {"pageid": pages});
                $(".btn").html(html)
                //将json转换成字符串并存储
                var localFile = JSON.stringify(items);
                //将数据存储在sessionStorage里面
                window.sessionStorage.setItem(pageKey, localFile);
                //下拉框
                //1：获得page总页数
                var totalPage = Math.floor(items["totalCount"] / items["pagesize"]);
                //2：动态创建下拉列表选项
                for (var i = 1; i <= totalPage; i++) {
                    var option = $('<option id=pageid-' + i + ' value="' + i + '">' + i + '/' + totalPage + '</option>');
                    $("#sel").append(option);
                    //3：下拉菜单改变，请求数据传入新的pageid
                    // 记录原始的categoryid
                    var firstId = pages + 1;
                    //4: select改变事件
                    $("#sel").change(function () {
                        var value = $(this).val();
                        window.location.search = "?categoryid=" + firstId + "&pageid=" + value;
                    });
                    //4 解决select的change事件默认项不能选中
                    if (pages == i) {
                        option.attr("selected", "selected");
                    }
                }
            }
        })
        ;
    }
})
