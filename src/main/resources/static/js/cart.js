$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var accountId = parseInt(urlParams.get('id'));
    var isBannerVisible = false;
    var isManagerVisible = false;
    var checkboxes = [];
    var selectedElement = "";
    var totalprice = 0;
    var isCheckedchange;
    var formattedPrice = 0;
    var checkboxOrcombobox = true;
    var username_cus;
    function getproductincart(){
        $.ajax({
            url: '/cart',
            method: 'GET',
            data: {
                page: null,
                limit: null,
                accId: accountId
            },
            success: function(response){
                var products = response.listResults;
                var container = $('.products-wrapper');
                container.empty();
                products.forEach(function(cart){
                    var product = $('<div>').addClass('wrapper-product').attr('id', cart.id);
                    product.empty();
                    var checkboxpart = $('<div>').addClass('checkbox-part');
                    var checkbox = $('<input>', {
                        type: 'checkbox',
                        // id: cart.id,
                        name: 'checkbox'
                    });
                    checkboxes.push(checkbox);
                    var label = $('<div>').addClass("label");
                    label.empty();
                    var label1 = $('<label>').attr('for', 'checkbox').text('Chọn mua');
                    label.append(label1);

                    checkboxpart.append(checkbox);
                    checkboxpart.append(label);
                    product.append(checkboxpart);

                    getproductinfor(cart.productId, container, product);
                });
            }
        })
    }
    function getproductinfor(productId, container, productcontainer){
        $.ajax({
            url: '/product',
            method: 'GET',
            data: {
                page: null,
                limit: null,
                category_id: null
            },
            success: function(response){
                var product = response.listResults;
                var productinfor = $('<div>').addClass('product-infor');
                productinfor.empty();
                product.forEach(function(product){
                    if (product.id === productId){
                        var imagecontainer = $('<div>').addClass('img');
                        var image = $('<img>').attr('src', product.picture).attr('height', '70').attr('width', '70');
                        imagecontainer.append(image);

                        var keyinformationlist = $('<div>').addClass('key-information');
                        var form = $('<form>');
                        var productinformation = $('<div>').addClass('product-information');
                        var name = $('<div>').addClass('name').text('Tên sản phẩm: ');
                        var size = $('<div>').addClass('size').text('Size: ');
                        var price = $('<div>').addClass('price').text('Giá: ');
                        var quantity = $('<div>').addClass('quantity').text('Số lượng: ');
                        productinformation.append(name);
                        productinformation.append(size);
                        productinformation.append(price);
                        productinformation.append(quantity);

                        var keyinformation = $('<div>').addClass('key-information');
                        var name = $('<div>').addClass('name').text(product.title);
                        var selectElement = $('<select>').addClass('myComboBox');
                        var option1 = $('<option>').val('option1').text('Nhỏ');
                        var option2 = $('<option>').val('option2').text('Vừa');
                        var option3 = $('<option>').val('option3').text('Lớn');
                        selectElement.append(option1, option2, option3);
                        var price = $('<div>').addClass('price-number').text(formatCurrency(product.smallsize) + " VNĐ");
                        var slContainer = $('<div>').addClass('sl');
                        var decreaseBtn = $('<div>').addClass('decrease').text('-');
                        var countInput = $('<input>').addClass('count').attr('type', 'text').val('1');
                        var increaseBtn = $('<div>').addClass('increase').text('+');
                        slContainer.append(decreaseBtn, countInput, increaseBtn);
                        keyinformation.append(name, selectElement, price, slContainer);

                        var deleteproduct = $('<div>').addClass('delete');
                        var image = $('<img>').attr('src', '../img/8664938_trash_can_delete_remove_icon.png').attr('height', '20').attr('width', '20');
                        deleteproduct.append(image);



                        form.append(productinformation);
                        form.append(keyinformation);
                        form.append(deleteproduct);

                        keyinformationlist.append(form);

                        productinfor.append(imagecontainer, keyinformationlist);
                        productcontainer.append(productinfor);
                        container.append(productcontainer);
                    }
                });
            },
        })
    };
    getproductincart();
    function getcusadd(){
        $.ajax({
            url: '/customer',
            method: 'GET',
            data: {
                page: null,
                limit: null,
            },
            success: function(response){
                var getid = response.listResults;
                var addressForm = $("#address-customer");
                addressForm.empty();
                var heading = $('<h3>').text('Địa chỉ nhận hàng');
                addressForm.append(heading);
                var countadd = 0;
                getid.forEach(function(customer){
                    if(customer.account_id === accountId){
                        countadd++;
                        var cusadd = $('<div>').addClass("customer-address");
                        cusadd.empty();
                        var checkbox = $('<input>', {
                            type: 'checkbox',
                            id: countadd,
                            name: 'checkbox'
                        });
                        cusadd.append(checkbox);
                        var label = $('<div>').addClass("label");
                        label.empty();
                        var label1 = $('<label>').attr('for', 'checkbox').text(customer.fullname + ", " + customer.phonenumber);
                        var label2 = $('<label>').attr('for', 'checkbox').text(customer.homeaddress);
                        label.append(label1);
                        label.append(label2);
                        cusadd.append(label);
                        addressForm.append(cusadd);
                    }
                });
            }
        });
    }
    getcusadd();
    $('.menu').on('click', function(event){
        event.preventDefault();
        if (isBannerVisible) {
            $('#left .information-banner').animate({left: '-100%'}, 500);
        } else {
            $('#left .information-banner').animate({left: '0px'}, 500);
        }

        isBannerVisible = !isBannerVisible;
    });
    $('#img-change').on('click', function(e){
        e.preventDefault();
        if(isManagerVisible){
            $('#manager').animate({right: '-100%'}, 500);
            $("#right").css("overflow-y", "hidden");
            $(this).find('img').attr('src', '../img/prev.png');
        } else{
            $('#manager').animate({right: '-30px'}, 500);
            $("#right").css("overflow-y", "scroll");
            $(this).find('img').attr('src', '../img/next.png');
        }
        isManagerVisible = !isManagerVisible;
    })
    $(document).on('click', '.decrease', function(){
        var productId = $(this).closest('.products-wrapper .wrapper-product').attr('id');
        var isChecked = $(this).closest('.wrapper-product').find('input[type="checkbox"]').prop('checked');
        let count = parseInt($("#" + productId + " .count").val());
        var totalpricetemp = totalprice;
        if (count > 1) {
            count--;
            $("#" + productId + " .count").val(count);
            if(isChecked){
                var price = formatpriceInt($("#" + productId + " .price-number").text());
                totalprice -= price;
                $('#total-price-item').text("Tiền hàng: " + formatCurrency(totalprice) + " VNĐ");
                showdeliverycost(totalprice);
            } else{
                totalprice = totalpricetemp;
                $('#total-price-item').text("Tiền hàng: " + formatCurrency(totalprice) + " VNĐ");
                showdeliverycost(totalprice);
            }
        }
    })
    $(document).on('click', '.increase', function(){
        var productId = $(this).closest('.products-wrapper .wrapper-product').attr('id');
        var isChecked = $(this).closest('.wrapper-product').find('input[type="checkbox"]').prop('checked');
        var totalpricetemp = totalprice;
        let count = parseInt($("#" + productId + " .count").val());
        count++;
        $("#" + productId + " .count").val(count);
        if(isChecked){
            var price = formatpriceInt($("#" + productId + " .price-number").text());
            totalprice += price;
            $('#total-price-item').text("Tiền hàng: " + formatCurrency(totalprice) + " VNĐ");
            showdeliverycost(totalprice);
        } else{
            totalprice = totalpricetemp;
            $('#total-price-item').text("Tiền hàng: " + formatCurrency(totalprice) + " VNĐ");
            showdeliverycost(totalprice);
        }
    })
    $('#home').on('click', function(){
        window.location.href='../?id=' + accountId;
    })
    $('.products-wrapper').on('change', 'input[type="checkbox"]', function() {
        checkboxOrcombobox = true;
        var cartId = $(this).closest('.products-wrapper .wrapper-product').attr('id');
        let quantity = parseInt($("#" + cartId + " .count").val());
        var price = formatpriceInt($("#" + cartId + " .price-number").text());
        if ($(this).prop('checked')) {
            selectedElement = $("#" + cartId + " .myComboBox").val();
            getproductid(cartId, selectedElement);
            totalprice += (price * quantity);
            $('#total-price-item').text("Tiền hàng: " + formatCurrency(totalprice) + " VNĐ");
            showdeliverycost(totalprice);
        } else {
            totalprice -= (price * quantity);
            $('#total-price-item').text("Tiền hàng: " + formatCurrency(totalprice) + " VNĐ");
            $('#total-delivery').text("Phí vận chuyển: 0 VNĐ");
            $('#total').text('Thành tiền: ' + formatCurrency(totalprice) + " VNĐ");
            // showdeliverycost(totalprice);
        }
    });
    function getSelectedSize(productId, cartId, Element){
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
                product.forEach(function(product){
                    if(product.id === productId){
                        switch (Element) {
                            case 'option1':
                                formattedPrice = formatCurrency(product.smallsize);
                                $('#gia').text(formattedPrice + " VNĐ");
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                break;
                            case 'option2':
                                formattedPrice = formatCurrency(product.medium);
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                break;
                            case 'option3':
                                formattedPrice = formatCurrency(product.large);
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                break;
                            default:
                                formattedPrice = formatCurrency(product.smallsize);
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                break;
                        }
                    }
                })
            }
        });
    }

    function getSelectedSizeCombo(productId, cartId, Element){
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
                product.forEach(function(product){
                    if(product.id === productId){
                        switch (Element) {
                            case 'option1':
                                var getoldprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                formattedPrice = formatCurrency(product.smallsize);
                                $('#gia').text(formattedPrice + " VNĐ");
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                var getnewprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                if(isCheckedchange){
                                    fixtotalwhenchangesize(getoldprice, getnewprice, cartId);
                                }
                                break;
                            case 'option2':
                                var getoldprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                formattedPrice = formatCurrency(product.medium);
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                var getnewprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                if(isCheckedchange){
                                    fixtotalwhenchangesize(getoldprice, getnewprice, cartId);
                                }
                                break;
                            case 'option3':
                                var getoldprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                formattedPrice = formatCurrency(product.large);
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                var getnewprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                if(isCheckedchange){
                                    fixtotalwhenchangesize(getoldprice, getnewprice, cartId);
                                }
                                break;
                            default:
                                var getoldprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                formattedPrice = formatCurrency(product.smallsize);
                                $("#" + cartId + " .price-number").text(formattedPrice + " VNĐ");
                                var getnewprice = formatpriceInt($("#" + cartId + " .price-number").text());
                                if(isCheckedchange){
                                    fixtotalwhenchangesize(getoldprice, getnewprice, cartId);
                                }
                                break;
                        }
                    }
                })
            }
        });
    }

    function fixtotalwhenchangesize(getoldprice, getnewprice, cartId){
        let quantity = parseInt($("#" + cartId + " .count").val());
        totalprice -= (getoldprice * quantity);
        totalprice += (getnewprice * quantity);
        $('#total-price-item').text("Tiền hàng: " + formatCurrency(totalprice) + " VNĐ");
        showdeliverycost(totalprice);
    }
    function formatCurrency(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function formatpriceInt(number){
        var priceInt = parseInt(number.replace(/,/g, '').replace(' VNĐ', ''));
        return priceInt;
    }
    $('.products-wrapper').on('change', '.myComboBox', function() {
        checkboxOrcombobox = false;
        selectedElement = $(this).val(); // Giá trị đã chọn trong combobox
        var wrapperProductId = $(this).closest('.wrapper-product').attr('id');
        isCheckedchange = $(this).closest('.wrapper-product').find('input[type="checkbox"]').prop('checked');
        getproductid(wrapperProductId, selectedElement);
    });

    function getproductid(productId, selectedElement){
        $.ajax({
            url: '/cart',
            method: 'GET',
            data: {
                page: null,
                limit: null,
                accId: accountId
            },
            success: function(response){
                var product = response.listResults;
                product.forEach(function(cart){
                    if(cart.id === parseInt(productId)){
                        if(checkboxOrcombobox){
                            getSelectedSize(cart.productId, productId, selectedElement)
                        } else{
                            getSelectedSizeCombo(cart.productId, productId, selectedElement)
                        }
                    }
                })
            },
        })
    }
    function showdeliverycost(total){
        if(total < 100000){
            $('#total-delivery').text("Phí vận chuyển: 15,000 VNĐ");
            $('#total').text('Thành tiền: ' + formatCurrency(total + 15000) + " VNĐ");
        } else if(total < 500000){
            $('#total-delivery').text("Phí vận chuyển: 10,000 VNĐ");
            $('#total').text('Thành tiền: ' + formatCurrency(total + 10000) + " VNĐ");
        } else{
            $('#total-delivery').text("Phí vận chuyển: 0 VNĐ");
            $('#total').text('Thành tiền: ' + formatCurrency(total) + " VNĐ");
        }
    }
    $('#comments').on('click', function(){
        window.location.href = '../html/comment.html?id=' + accountId;
    })
    $(document).on('click', '.delete', function(){
        var wrapperProductId = $(this).closest('.wrapper-product').attr('id');
        $.ajax({
            url: '/cart',
            method: 'DELETE',
            data: JSON.stringify([wrapperProductId]),
            contentType: 'application/json',
            success: function() {
                getproductincart();
            },
            error: function() {
                alert('Error occurred while deleting the product');
            }
        });
    })
    getusetname();
    function getusetname() {
        $.ajax({
            url: '/acc',
            method: 'GET',
            data: {
                page: null,
                limit: null,
            },
            success: function (response) {
                var getid = response.listResults;
                getid.forEach(function (account) {
                    if (account.id === accountId) {
                        username_cus = account.username;
                    }
                });
            }
        });
    }
    $('#add_address').on('click', function(){
        if($('#customer-name').val() !== '' & $('#email').val() !== ''
            & $('#phone-number').val() !== '' & $('#address').val() !== ''){
            addcusadd();
        }else{
            alert('Bạn cần điền đầy đủ thông tin!');
        }
    })
    function addcusadd(){
        var data = {
            fullname: $('#customer-name').val(),
            email: $('#email').val(),
            phonenumber: $('#phone-number').val(),
            homeaddress: $('#address').val(),
            username: username_cus
        }
        $.ajax({
            url: '/customer',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response){
                $('#customer-name').val('');
                $('#email').val('');
                $('#phone-number').val('');
                $('#address').val('');
                getcusadd();

            }
        })
    }
    $(document).on('change', '#address-customer input[type="checkbox"]', function() {
        // Kiểm tra xem checkbox có được chọn hay không
        if ($(this).is(':checked')) {
            // Hủy chọn tất cả các checkbox khác
            $('#address-customer input[type="checkbox"]').not(this).prop('checked', false);
        }
    });
    $('#products').on('click', function(){
        window.location.href = '../html/showproducts.html?id=' + accountId;
    })
    $('#contact').on('click', function(){
        window.location.href = '../?id=' + accountId + '&type=' + encodeURIComponent('contact');

    })
});