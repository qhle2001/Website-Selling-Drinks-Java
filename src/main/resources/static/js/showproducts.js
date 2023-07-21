$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var accountId = parseInt(urlParams.get('id'));
    var isBannerVisible = false;
    $('#home').on('click', function(){
        window.location.href='../?id=' + accountId;
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
    var pagecategory = 1;
    var limitcategory = 10;
    var page = 1;
    var limit  = 3;
    // var categoryId;
    var containerproduct = $('#container-coffee');
    containerproduct.empty();

    var containertea = $('#container-tea');
    containertea.empty();

    var containerfreeze = $('#container-freeze');
    containerfreeze.empty();

    var containeranother = $('#container-another');
    containeranother.empty();
    // Gọi API để lấy danh sách thể loại
    showproducts();
    function showproducts(){
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
                    // var categoryId = category.id;
                    if (category.code === 'coffee') {
                        var classh3 = $('<h3>').text(category.name);
                        containerproduct.append(classh3);
                        getProduct(category.id, category.code, containerproduct);
                    } else if (category.code === 'tea') {
                        var classh3 = $('<h3>').text(category.name);
                        containertea.append(classh3);
                        getProduct(category.id, category.code, containertea);
                    } else if (category.code === 'freeze') {
                        var classh3 = $('<h3>').text(category.name);
                        containerfreeze.append(classh3);
                        getProduct(category.id, category.code, containerfreeze);
                    } else {
                        var classh3 = $('<h3>').text(category.name);
                        containeranother.append(classh3);
                        getProduct(category.id, category.code, containeranother);
                    }
                    // getProduct(category.code);
                });
            }
        });
    }

    function getProduct(categoryId, category, container) {
        $.ajax({
            url: '/product',
            method: 'GET',
            data: {
                page: null,
                limit: null,
                category_id: null
            },
            success: function (response) {
                var products = response.listResults; // Danh sách thể loại từ API

                var listProducts = $('<ul>').addClass('list-products');
                listProducts.empty();

                products.forEach(function (product) {
                    // alert(product.id.length)
                    if (product.category_id === categoryId) {
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

                        var price_number = parseInt(product.smallsize);
                        var price = $('<div>').addClass('price').text(formatCurrency(price_number) + ' VNĐ');
                        item.append(price);

                        var add = $('<div>').addClass('add');

                        var cart = $('<div>').addClass('cart').text('Thêm vào giỏ hàng');

                        var buy = $('<div>').addClass('buy_now').text('Mua ngay');

                        add.append(cart);
                        add.append(buy);

                        item.append(add);

                        listProducts.append(item);
                    }

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
                // container.append(loadpage);
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    }
    function formatCurrency(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $('#comments').on('click', function(){
        window.location.href = '../html/comment.html?id=' + accountId;
    })
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
                } else{
                    alert('Sản phẩm này đã có trong giỏ hàng của bạn!');
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
            success: function (response) {
                alert('Thêm vào giỏ hàng thành công!');
            }
        });
    }
    $(document).on('click', '.buy_now', function(event) {
        event.preventDefault();
        var productName = $(this).closest('.list-products .item').find('.name').text();
        var productId = $(this).closest('.list-products .item').attr('id');

        window.location.href = '../html/buynow.html?id=' + productId + '&id2=' + accountId;
    });
    $('#contact').on('click', function(){
        window.location.href = '../?id=' + accountId + '&type=' + encodeURIComponent('contact');

    })
    $('#products').on('click', function(){
        containerproduct.empty();
        containertea.empty();
        containerfreeze.empty();
        containeranother.empty();

        showproducts();
    })
})