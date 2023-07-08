$(document).ready(function(){
    // Lấy giá trị id từ URL
    var urlParams = new URLSearchParams(window.location.search);
    var itemId = parseInt(urlParams.get('id'));
    var isBannerVisible = false;

    $.ajax({
        url: '/product',
        method: 'GET',
        data: {
            page: null,
            limit: null,
            category_id: null
        },
        success: function (response) {
            var product = response.listResults;

            product.forEach(function (product){
                if (product.id === itemId){
                    $('.image img').attr('src', product.picture);

                    $('#ten').text(product.title);
                }
            });
        }
    });

    // alert(itemId);
    $('#decrease').on('click', function(){
        let count = parseInt($(".count").val());
        if (count > 1) {
            count--;
            $(".count").val(count);
        }
    });
    $('#increase').on('click', function(){
        let count = parseInt($(".count").val());
        count++;
        $(".count").val(count);
    });

    $('#home').on('click', function(){
        window.location.href='../#';
    });
    $('.menu').on('click', function(){
        if (isBannerVisible) {
            $('#left .information-banner').animate({left: '-100%'}, 500);
            // $('#right').animate({marginLeft: '200px'}, 500);
        } else {
            $('#left .information-banner').animate({left: '0px'}, 500);
            // $('#right').animate({marginLeft: '400px'}, 500);
        }

        isBannerVisible = !isBannerVisible;
    });
})