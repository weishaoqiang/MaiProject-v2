/**
 * Created by Administrator on 2016/11/6.
 */
window.itams = {
    tap: function (obj, callback) {
        var datas;
        var falg = true;
        obj.addEventListener('touchstart', function () {
            datas = Date.now();
        });
        obj.addEventListener('touchmove', function () {
            falg = false;
        });
        obj.addEventListener('touchend', function (e) {
            var dataover = Date.now();
            if ((dataover - datas) < 150 && falg) {
                falg = false;
                callback && callback(e);
            }
        });
    }
};
$.ajax({
    type: 'get',
    url: 'http://mmb.ittun.com/api/getcategorytitle',
    data: {},
    success: function (result) {
        var html = "";
        var results = result.result;
        $(results).each(function (index, value) {
            html += "<div class='category_list_li' data-tage=" + this.titleId + ">" +
                "<div class='category_list_title'>" +
                this.title +
                "<span class='iconfont icon-xiangxiajiantou'></span>" +
                "</div>" +
                "<div class='category_list_body'></div>" +
                "</div>";
        });
        creation_body(html);
    }
});
function creation_body(html) {
    $('.category_list').html(html);
    $('.category_list_li').each(function (index, value) {
        itams.tap(value, function () {
            click_start(value);
        })
    })
}
function click_start(king) {
    var key = $(king).data('tage');
    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getcategory',
        data: {"titleid": key},
        success: function (result) {
            var results = result.result;
            var category_body = $(king).children('.category_list_body')[0];
            var html = '';
            $(results).each(function (index, value) {
                html += "<div class='category_list_some' style='width: 33.33%' data-categoryid=" + this.categoryId + ">" +
                    this.category +
                    "</div>";
            });
            $('.category_list_body').html('');
            $(category_body).html(html).find('.category_list_some').each(function (index, value) {
                console.log($(value).data('categoryid'));
                var url_key = $(value).data('categoryid');
                itams.tap(value, function () {
                    window.location.href = 'http://localhost:63342/1105/maiProject/app/productlist.html?categoryid=' + url_key;
                })
            })

        }
    })
}
































