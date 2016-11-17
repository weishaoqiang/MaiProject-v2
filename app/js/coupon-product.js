/**
 * Created by yanfeng on 2016/11/5.
 */
//coupon-product����
var productData = null;
$(function () {
    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getcouponproduct',
        data: {'couponid': 0},
        success: function (data) {
            productData = data;
            var html = template('coupon-list', {'items': data.result});
            $('.coupon-list>ul').html(html);
        }
    })
})
function render(){
    setTimeout(function () {
        var productHtml = template('list-cover', {'items2': productData.result});
        $('.coupon-list-cover>ul').html(productHtml);
        var couponlistLis = $('.coupon-list-cover>ul>li');
        var lisHeight = couponlistLis.height();
        var windowWidth = $(window).width();
        var liWidth = couponlistLis.width(windowWidth);
        var liLength = couponlistLis.length;
        var totalWidth = windowWidth * liLength;
        var ulWidth = $('.coupon-list-cover>ul').width(totalWidth);
        var ulHeight = $('.coupon-list-cover>ul').height(lisHeight);
        var index = 0;
        var couponLis = $('.coupon-list>ul>li')
        //���ֲ�������Ч��
        couponLis.on('click', function () {
            $('.coupon-list-cover').css('display', 'block');
            index = $(this).index();
            $('.coupon-list-cover>ul').css('transform', 'translateX(' + (-index * windowWidth) + 'px)')

            $('.cover-arrow-prev').css({
                'zIndex': '100',
                'display': 'block'
            });
            $('.cover-arrow-next').css({
                'zIndex': '100',
                'display': 'block'
            });
        })
        //���Ҽ�ͷ�����¼�
        $('.cover-arrow-next').on('click', function () {
            if (index<liLength-1) {
                index++;
            }
            $('.coupon-list-cover>ul').animate({transform: "translateX(" + (-index * windowWidth) + "px)"}, 200, 'ease')
            return false
        })
        $('.cover-arrow-prev').on('click', function () {
            if (index != 0) {
                index--;
            }
            $('.coupon-list-cover>ul').animate({transform: "translateX(" + (-index * windowWidth) + "px)"}, 200, 'ease')
            return false;
        })
        $('.coupon-list-cover').on('click', function () {
            $('.coupon-list-cover').css('display', 'none');
        })
    },100)
}
render();
$(window).on('resize', function () {
    render();
})
