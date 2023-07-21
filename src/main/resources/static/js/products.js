$(document).ready(function() {
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
});
