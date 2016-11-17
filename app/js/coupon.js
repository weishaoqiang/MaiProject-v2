/**
 * Created by yanfeng on 2016/11/5.
 */
//coupon-title����
var getData= function (demo,url) {
    $(function () {
        $.ajax({
            type:'get',
            url:url,
            success: function (data) {
                var html=template('coupon-title',{'items':data.result});
                $(demo).html(html);
            }
        })
    })
}
getData('.coupon-title>ul','http://mmb.ittun.com/api/getcoupon');
