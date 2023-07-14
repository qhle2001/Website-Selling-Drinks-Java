$(document).ready(function(){
    // Lấy giá trị id từ URL
    var urlParams = new URLSearchParams(window.location.search);
    var itemId = parseInt(urlParams.get('id'));
    var accountId = parseInt(urlParams.get('id2'));
    var isBannerVisible = false;
    let count = parseInt($(".count").val());
    var selectedValue = $('#myComboBox').val();
    var username_cus = "";
    var ordername= "";
    var orderquantity= "";
    var ordersize= "Nhỏ";
    var orderadd= "";
    var ordercusname= "";
    var orderphone= "";

    if (accountId){
        $('#checkbox').prop('disabled', false);
        $('#address-customer').show();
        getcusadd();
        getusetname();
    } else{
        $('#checkbox').prop('disabled', true);
        $('#address-customer').hide();
        username_cus = "";
    }

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
    // Xử lý sự kiện khi checkbox được thay đổi
    $(document).on('change', '#address-customer input[type="checkbox"]', function() {
        // Kiểm tra xem checkbox có được chọn hay không
        if ($(this).is(':checked')) {
            // Hủy chọn tất cả các checkbox khác
            $('#address-customer input[type="checkbox"]').not(this).prop('checked', false);
        }
    });

    function showproduct(countproduct, selectedValue){
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
                    // var selectedValue = $("#myComboBox").val();
                    $('.image img').attr('src', product.picture);

                    $('#ten').text(product.title);
                    ordername = product.title;
                    var formattedPrice;
                    if (selectedValue === "option1"){
                        ordersize = "Nhỏ";
                        formattedPrice = formatCurrency(product.smallsize);
                        $('#gia').text(formattedPrice + " VNĐ");
                    } else if (selectedValue === "option2"){
                        formattedPrice = formatCurrency(product.medium);
                        $('#gia').text(formattedPrice + " VNĐ");
                        ordersize = "Vừa";
                    } else{
                        formattedPrice = formatCurrency(product.large);
                        $('#gia').text(formattedPrice + " VNĐ");
                        ordersize = "Lớn";
                    }
                    var numericPrice = parseFloat(formattedPrice.replace(/,/g, ''));
                    var total = numericPrice * countproduct;
                    var prices;
                    // var total = formatCurrency(numericPrice * countproduct + 150000) + "VNĐ";
                    if (total < 100000){
                        $('#total-delivery').text("Phí vận chuyển: 15,000 VNĐ")
                        total = formatCurrency(total + 15000) + "VNĐ";
                    } else if(total < 500000){
                        $('#total-delivery').text("Phí vận chuyển: 10,000 VNĐ")
                        total = formatCurrency(total + 15000) + "VNĐ";;
                    } else{
                        $('#total-delivery').text("Phí vận chuyển: 0 VNĐ")
                        total = formatCurrency(total) + "VNĐ";
                    }
                    // total = formatCurrency(numericPrice * countproduct + 150000) + "VNĐ";
                    $('#total').text("Thành tiền: " + total);
                }
            });
        }
    });
    }
    showproduct(count, selectedValue);
    $('#myComboBox').change(function() {
        selectedValue = $(this).val(); // Lấy giá trị đã chọn trong combobox
        showproduct(count, selectedValue);
    });

    function formatCurrency(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // alert(itemId);
    $('#decrease').on('click', function(){
        // let count = parseInt($(".count").val());
        if (count > 1) {
            count--;
            $(".count").val(count);
            orderquantity = count;
            showproduct(count, selectedValue);
        }
    });
    $('#increase').on('click', function(){
        // let count = parseInt($(".count").val());
        count++;
        $(".count").val(count);
        orderquantity = count;
        showproduct(count, selectedValue);
    });
    $(document).click(function (){
        count = parseInt($(".count").val());
        orderquantity = count;
        showproduct(count, selectedValue);
    })

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
    // $('#checkbox').change(function() {
    //     if ($(this).is(':checked')) {
    //         if($('#customer-name').val() !== '' & $('#email').val() !== ''
    //             & $('#phone-number').val() !== '' & $('#address').val() !== ''){
    //             // buyproduct();
    //         }
    //         console.log('Checkbox đã được chọn');
    //     } else {
    //         // Checkbox đã bị bỏ chọn
    //         console.log('Checkbox đã bị bỏ chọn');
    //     }
    // });
    $('#mua-ngay').on('click', function (){
       // if ($('#checkbox').prop('checked')){
       //
       // }
        var isChecked = false;
        $('#address-customer .customer-address').each(function() {
            var checkbox = $(this).find('input[type="checkbox"]');
            if (checkbox.is(':checked')) {
                var temp = $(this).find('.label label:nth-child(1)').text();
                var parts = temp.split(",");
                ordercusname = parts[0].trim();
                orderphone = parts[1].trim();
                orderadd = $(this).find('.label label:nth-child(2)').text();
                isChecked = true; // Đặt biến cờ thành true nếu có checkbox được chọn
                return false;
            }
        });
        if(isChecked){
            addodersignedin();
        } else{
            if($('#customer-name').val() !== '' & $('#email').val() !== ''
                & $('#phone-number').val() !== '' & $('#address').val() !== ''){
                if ($('#checkbox').prop('checked')){
                    addcusadd();
                    $('#myCheckbox').prop('checked', false);
                }
                ordercusname = $('#customer-name').val();
                orderadd = $('#address').val();
                orderphone = $('#phone-number').val();
                addodersignedin();
            } else{
                alert('Bạn hãy điền đầy đủ thông tin!');
            }
        }
    });
    function addodersignedin(){
        var data = {
            productname: ordername,
            size: ordersize,
            quantity: orderquantity,
            homeaddress:orderadd,
            customername: ordercusname,
            phonenumber: orderphone,
            username_buy: username_cus
        }
        $.ajax({
           url: '/orders',
           method: 'POST',
           data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response){
                alert("Bạn đã đặt hàng thành công");
            }

        });
    }

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

            }
        })
    }

})