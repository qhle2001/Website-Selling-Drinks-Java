// const next = document.querySelector('.next')
// const prev = document.querySelector('.prev')
// const comment = document.querySelector('#list-comment')
// const commentItem = document.querySelectorAll('#list-comment .item')
// const user = document.getElementById('user')
// var translateY = 0
// var count = commentItem.length
// var imgs = ["../img/bg2.png", "../img/bg3.png",
//                         "../img/bg4.png", "../img/bg5.png"];
// var element = document.getElementById("banner");
//
// var sanpham = document.getElementById("Sản-phẩm");
// var myListproducts = document.getElementById("myListproducts");
//
// document.addEventListener("DOMContentLoaded", function() {
//
//     sanpham.addEventListener("mouseover", function() {
//         myListproducts.style.display = "block";
//     });
//
//     sanpham.addEventListener("mouseout", function() {
//         myListproducts.style.display = "none";
//     });
// });
//
// var index = 1;
// function changeBackground(){
//     element.style.backgroundImage = "url('" + imgs[index] + "')";
//     index++;
//     if(index == 4){
//         index = 0;
//     }
// }
// setInterval(changeBackground, 5000);
//
// next.addEventListener('click', function (event) {
//     event.preventDefault()
//     if (count == 1) {
//         // Xem hết bình luận
//         return false
//     }
//     translateY += -400
//     comment.style.transform = `translateY(${translateY}px)`
//     count--
// })
//
// prev.addEventListener('click', function (event) {
//     event.preventDefault()
//     if (count == 3) {
//         // Xem hết bình luận
//         return false
//     }
//     translateY += 400
//     comment.style.transform = `translateY(${translateY}px)`
//     count++
// })
$(document).ready(function() {
    var page = 1;
    var limit  = 10;
    // Gọi API để lấy danh sách thể loại
    function getProduct() {
        $.ajax({
            url: '/product',
            method: 'GET',
            data: {
                page: page,
                limit: limit
            },
            success: function (response) {
                var products = response.listResults; // Danh sách thể loại từ API

                // Lặp qua danh sách thể loại
                // var categoryList = $('#list-products');
                // categoryList.empty();

                var listProducts = $('#list-products');
                listProducts.empty();

                products.forEach(function (product) {
                    // alert(product.id.length)
                    var item = $('<div>').addClass('item');

                    var image = $('<img>').attr('src', product.picture).attr('height', '174').attr('width', '256');
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

                    listProducts.append(item);

                });
                var loadpage = $('.list-page');
                loadpage.empty();
                for (var i = 1; i <= response.totalpage; i++){
                    var item = $('<div>').addClass('item');
                    var ploadpage = $('<p>').addClass('ploadpage').text(i);
                    item.append(ploadpage);
                    loadpage.append(item);
                }
                // alert($('.list-page .item').length);
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    }
    getProduct();
    $(document).on('click', '.list-page .item .ploadpage', function(){
        // alert($(this).text());
        var plus = parseInt($(this).text());
        page = page + plus;
        getProduct();
    });
});
