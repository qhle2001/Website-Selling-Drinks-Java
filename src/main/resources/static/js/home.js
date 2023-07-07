$(document).ready(function() {
    var number_of_comment = 0;
    var next = $('.next');
    var prev = $('.prev');
    var comment = $('.list-comment');
    // var commentItem = $('.list-comment .item');

    var translateY = 0;
    var count = 1;
    // var count = commentItem.length;
    var imgs = ["../img/bg2.png", "../img/bg3.png", "../img/bg4.png", "../img/bg5.png"];
    var element = $("#banner");
    var index = 1;

    function changeBackground() {
        element.css("backgroundImage", "url('" + imgs[index] + "')");
        index++;
        if (index == 4) {
            index = 0;
        }
    }

    setInterval(changeBackground, 5000);

    var pagecategory = 1;
    var limitcategory = 10;
    var page = 1;
    var limit  = 4;
    var categoryId;
    var containerproduct = $('#container-coffee');
    containerproduct.empty();

    var containertea = $('#container-tea');
    containertea.empty();

    var containerfreeze = $('#container-freeze');
    containerfreeze.empty();

    var containeranother = $('#container-another');
    containeranother.empty();
    // Gọi API để lấy danh sách thể loại
    $.ajax({
        url: '/category',
        method: 'GET',
        data: {
            page: pagecategory,
            limit: limitcategory,
        },
        success: function (response) {
            var categories = response.listResults;
            categories.forEach(function (category) {
                categoryId = category.id;
                if (category.code === 'coffee') {
                    var classh3 = $('<h3>').text(category.name);
                    containerproduct.append(classh3);
                    getProduct(category.code, containerproduct);
                } else if (category.code === 'tea') {
                    var classh3 = $('<h3>').text(category.name);
                    containertea.append(classh3);
                    getProduct(category.code, containertea);
                } else if (category.code === 'freeze') {
                    var classh3 = $('<h3>').text(category.name);
                    containerfreeze.append(classh3);
                    getProduct(category.code, containerfreeze);
                } else {
                    var classh3 = $('<h3>').text(category.name);
                    containeranother.append(classh3);
                    getProduct(category.code, containeranother);
                }
                // getProduct(category.code);
            });
        }
    });

    function getProduct(category, container) {
        $.ajax({
            url: '/product',
            method: 'GET',
            data: {
                page: page,
                limit: limit,
                category_id: categoryId
            },
            success: function (response) {
                var products = response.listResults; // Danh sách thể loại từ API

                var listProducts = $('<ul>').addClass('list-products');
                listProducts.empty();

                products.forEach(function (product) {
                    var item = $('<div>').addClass('item').attr('id', product.id);

                    var image = $('<img>').attr('src', product.picture).attr('height', '150').attr('width', '200');
                    item.append(image);

                    var stars = $('<div>').addClass('stars');
                    for (var i = 0; i < 5; i++) {
                        var star = $('<img>').attr('src', '/img/star.png').attr('height', '27').attr('width', '28');
                        stars.append($('<span>').append(star));
                    }
                    item.append(stars);

                    var name = $('<div>').addClass('name').text(product.title);
                    item.append(name);

                    var desc = $('<div>').addClass('desc').text('Mô Tả Ngắn Cho Sản Phẩm');
                    item.append(desc);

                    var price = $('<div>').addClass('price').text('500.000 VNĐ');
                    item.append(price);

                    var add = $('<div>').addClass('add');

                    var cart = $('<div>').addClass('cart').text('Thêm vào giỏ hàng');

                    var buy = $('<div>').addClass('buy_now').text('Mua ngay');

                    add.append(cart);
                    add.append(buy);

                    item.append(add);



                    listProducts.append(item);

                });
                container.append(listProducts);

                var loadpage = $('<div>').addClass('list-page');
                loadpage.empty();
                for (var i = 1; i <= response.totalpage; i++) {
                    var item = $('<div>').addClass('item');
                    var ploadpage = $('<p>').addClass('ploadpage').text(i);
                    item.append(ploadpage);
                    loadpage.append(item);
                }
                container.append(loadpage);
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    }

    $(document).on('click', '#container-product .list-page .item .ploadpage', function(){
        categoryId = 1;
        page = parseInt($(this).text());
        containerproduct.empty();
        var classh3 = $('<h3>').text('cà phê');
        containerproduct.append(classh3);
        getProduct('coffee');
    });
    $(document).on('click', '#container-freeze .list-page .item .ploadpage', function(){
        categoryId = 3;
        page = parseInt($(this).text());
        containerfreeze.empty();
        var classh3 = $('<h3>').text('freeze');
        containerfreeze.append(classh3);
        getProduct('freeze');
    });
    $(document).on('click', '#container-tea .list-page .item .ploadpage', function(){
        categoryId = 2;
        page = parseInt($(this).text());
        containertea.empty();
        var classh3 = $('<h3>').text('Trà');
        containertea.append(classh3);
        getProduct('tea', containertea);
    });
    $(document).on('click', '#container-another .list-page .item .ploadpage', function(){
        categoryId = 4;
        page = parseInt($(this).text());
        containeranother.empty();
        var classh3 = $('<h3>').text('khác');
        containeranother.append(classh3);
        getProduct('other');
    });
    $(document).on('click', '.list-page .item .ploadpage', function (){
        $(this).css("color", "blue");
    });
    var number_of_comment ;
    $.ajax({
        url: '/comment',
        method: 'GET',
        data: {
            page: null,
            limit: null
        },
        success: function(response){
            var comments = response.listResults;
            number_of_comment = comments.length;
            count = comments.length;
            var content;
            var stars;
            comments.forEach(function (comment) {
                var item = $('<li>').addClass('item');
                item.empty();
                var account_id = comment.acc_id;
                var judge = parseInt(comment.judge);
                content = $('<p>').addClass('text').text(comment.content);

                stars = $('<div>').addClass('stars');
                for (var i = 0; i < judge; i++) {
                    var star = $('<img>').attr('src', '/img/star.png').attr('height', '27').attr('width', '28');
                    stars.append($('<span>').append(star));
                }
                getAccount(item, account_id, stars, content);
            });
        }
    });
    function getAccount(item, account_id, stars, content){
        $.ajax({
            url: 'acc',
            method: 'GET',
            data: {
                page: null,
                limit: null
            },
            success: function(response){
                var account = response.listResults;
                account.forEach(function(account){
                    if(account_id === account.id){
                        var avatar = $('<div>').addClass('avatar');
                        var img = $('<img>').attr('src', account.picture).attr('height', '78').attr('width', '78');
                        avatar.append(img);
                        var name = $('<div>').addClass('name').text(account.username);
                        item.append(avatar);
                        item.append(stars);
                        item.append(name);
                        item.append(content);
                        comment.append(item);
                    }
                })
            }
        })
    }
    next.click(function(event) {
        event.preventDefault();
        if (count == 1) {
            // Xem hết bình luận
            return false;
        }
        translateY += -400;
        comment.css("transform", "translateY(" + translateY + "px)");
        count--;
    });

    prev.click(function(event) {
        event.preventDefault();
        if (count == number_of_comment) {
            // Xem hết bình luận
            return false;
        }
        translateY += 400;
        comment.css("transform", "translateY(" + translateY + "px)");
        count++;
    });

    $(document).on('click', '.buy_now', function() {
        // var productName = $('.list-products .item').siblings('.name').text();
        var productName = $(this).closest('.list-products .item').find('.name').text();
        var productId = $(this).closest('.list-products .item').attr('id');

        window.location.href = '../html/buynow.html?id=' + productId;
        // $.ajax({
        //     url: '../html/buynow.html?id=' + productId,
        //     success: function(result){
        //         $('#container-information').html(result);
        //     }
        // })
        // alert(productName);
        // alert(productId);
    });
});
