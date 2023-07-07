$(document).ready(function() {
    $.ajax({
        url: '../html/home.html',
        success: function (result) {
            $('#container-information').html(result);
        }
    });
    $('#Trang-chủ').click(function(){
        $.ajax({
            url: '../html/home.html',
            success: function (result) {
                $('#container-information').html(result);
            }
        });

        $('html, body').animate({ scrollTop: 0 }, 500);

    });
    $('#Sản-phẩm').click(function(){
        $.ajax({
            url: '../html/products.html',
            success: function(result){
                $('#container-information').html(result);
            }
        });
    });

    // $('#Sản-phẩm').on('click', function() {
    //     $('html, body').animate({ scrollTop: 0 }, 500);
    // });

    $('#comment-res').click(function(){
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
    $('#Liên-hệ').on('click', function() {
        // Sử dụng animate để thực hiện cuộn xuống cuối trang trong 300ms
        $('html, body').animate({ scrollTop: $(document).height() }, 500);
    });
});
