$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var accountId = parseInt(urlParams.get('id'));
    // alert(accountId);

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
    var isExist = false;

    function changeBackground() {
        element.css("backgroundImage", "url('" + imgs[index] + "')");
        index++;
        if (index == 4) {
            index = 0;
        }
    }

    setInterval(changeBackground, 5000);
    if(accountId){
        getcartnum();
    }

    var pagecategory = 1;
    var limitcategory = 10;
    var page = 1;
    var limit  = 4;
    var categoryId;
    var containercoffee = $('#container-coffee');
    containercoffee.empty();

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
                // categoryId = category.id;
                if (category.code === 'coffee') {
                    var classh3 = $('<h3>').text(category.name);
                    containercoffee.append(classh3);
                    getProduct(page, category.code, containercoffee, category.id);
                } else if (category.code === 'tea') {
                    var classh3 = $('<h3>').text(category.name);
                    containertea.append(classh3);
                    getProduct(page, category.code, containertea, category.id);
                } else if (category.code === 'freeze') {
                    var classh3 = $('<h3>').text(category.name);
                    containerfreeze.append(classh3);
                    getProduct(page, category.code, containerfreeze, category.id);
                } else {
                    var classh3 = $('<h3>').text(category.name);
                    containeranother.append(classh3);
                    getProduct(page, category.code, containeranother, category.id);
                }
                // getProduct(category.code);
            });
        }
    });

    function getProduct(page, category, container, categoryId) {
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

                    // var desc = $('<div>').addClass('desc').text('Mô Tả Ngắn Cho Sản Phẩm');
                    // item.append(desc);

                    var number_price = parseInt(product.smallsize);

                    var price = $('<div>').addClass('price').text(formatCurrency(number_price) + " VNĐ");
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

    $(document).on('click', '#container-coffee .list-page .item .ploadpage', function(){
        // categoryId = 1;
        page = parseInt($(this).text());
        containercoffee.empty();
        var classh3 = $('<h3>').text('cà phê');
        containercoffee.append(classh3);
        getProduct(page, 'coffee', containercoffee, 1);
    });
    $(document).on('click', '#container-freeze .list-page .item .ploadpage', function(){
        // categoryId = 3;
        page = parseInt($(this).text());
        containerfreeze.empty();
        var classh3 = $('<h3>').text('freeze');
        containerfreeze.append(classh3);
        getProduct(page, 'freeze', containerfreeze, 3);
    });
    $(document).on('click', '#container-tea .list-page .item .ploadpage', function(){
        // categoryId = 2;
        page = parseInt($(this).text());
        containertea.empty();
        var classh3 = $('<h3>').text('Trà');
        containertea.append(classh3);
        getProduct(page, 'tea', containertea, 2);
    });
    $(document).on('click', '#container-another .list-page .item .ploadpage', function(){
        // categoryId = 4;
        page = parseInt($(this).text());
        containeranother.empty();
        var classh3 = $('<h3>').text('khác');
        containeranother.append(classh3);
        getProduct(page, 'other', containeranother, 4);
    });
    // $(document).on('click', '.list-page .item .ploadpage', function (){
    //     $(this).css("color", "blue");
    // });
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
                        // var image_container = $('<div>').addClass('image-container');
                        var img = $('<img>').attr('src', account.picture);
                        // image_container.append(img);
                        avatar.append(img);
                        var name = $('<div>').addClass('name').text(account.customer_name);
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

    $(document).on('click', '.buy_now', function(event) {
        event.preventDefault();
        // var productName = $('.list-products .item').siblings('.name').text();
        var productName = $(this).closest('.list-products .item').find('.name').text();
        var productId = $(this).closest('.list-products .item').attr('id');

        window.location.href = '../html/buynow.html?id=' + productId + '&id2=' + accountId;
    });
    // var count_click = 0;
    $(document).on('click', '.cart', function(event){
        event.preventDefault();
        var isExist = false;

        var productId = $(this).closest('.list-products .item').attr('id');
        if (accountId) {
            checkcart(productId, isExist);
        }else{
            $('#cart-number').hide();
            alert("Bạn cần đăng nhập trước!");
        }
    });
    function checkcart(Id, isExist){
        var count_click;
        $.ajax({
            url: '/cart',
            method: 'GET',
            data: {
                page: null,
                limit: null,
                accId: accountId
            },
            success: function(response){
                var check = response.listResults;
                count_click = check.length;
                check.forEach(function(cart){
                    if(parseInt(cart.accId) === parseInt(accountId) && parseInt(cart.productId) === parseInt(Id)){
                        isExist = true;
                        return;
                    }
                })
                if(isExist === false){
                    addcart(Id);
                    count_click++;
                    $('#cart-number').text(count_click);
                    $('#cart-number').show();
                }
            }
        })
    }
    function addcart(Id){
        var data = {
            accId: accountId,
            productId: Id
        }
        $.ajax({
            url: '/cart',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {}
        });
    }
    function getcartnum(){
        $.ajax({
            url: '/cart',
            method: 'GET',
            data: {
                page: null,
                limit: null,
                accId: accountId
            },
            success: function(response){
                var num = response.listResults.length;
                $('#cart-number').text(num);
                if(num > 0){
                    $('#cart-number').show();
                }
            }
        })
    }
    function formatCurrency(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});
