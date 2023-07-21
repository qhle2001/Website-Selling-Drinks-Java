$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var accountId = parseInt(urlParams.get('id'));
    var isBannerVisible = false;
    var selectedProductIds = [];
    var takeusername;
    var takepass;
    var takepic;
    var takecusname;
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
    function getcusname() {
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
                        $('#cusname').text("Tên người dùng: " + account.customer_name);
                        takeusername = account.username;
                        takepass = account.password;
                        takepic = account.picture;
                        takecusname = account.customer_name;
                    }
                });
            }
        });
    }
    getcusname();
    function getcuspicture() {
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
                        if(account.picture){
                            var img = $('<img>').attr('src', account.picture);
                            $('#image-cus').append(img);
                            $('#edit-picture').text('Thay đổi')
                        } else{
                            var img = $('<img>').attr('src', '../img/user.png');
                            $('#image-cus').append(img);
                            $('#edit-picture').text('Thêm ảnh')
                        }
                        takeusername = account.username;
                        takepass = account.password;
                        takepic = account.picture;
                        takecusname = account.customer_name;
                    }
                });
            }
        });
    }
    getcuspicture();
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
                var addressForm = $("#addresscus");
                addressForm.empty();
                var addressgive = $('<label>').text('Địa chỉ nhận hàng');
                addressForm.append(addressgive);
                var countadd = 0;
                getid.forEach(function(customer){
                    if(customer.account_id === accountId){
                        countadd++;
                        var cusadd = $('<div>').addClass("customer-address").attr('id', customer.id);
                        cusadd.empty();
                        var checkbox = $('<input>', {
                            type: 'checkbox',
                            id: countadd,
                            name: 'checkbox'
                        });
                        checkbox.change(function() {
                            if ($(this).is(':checked')) {
                                // Checkbox đã được chọn, lấy ID của hàng
                                var addressId = cusadd.attr('id');
                                // Lưu productId vào mảng selectedProductIds
                                selectedProductIds.push(addressId);
                            } else {
                                // Checkbox đã bị bỏ chọn, xóa ID của hàng khỏi mảng selectedProductIds (nếu có)
                                var addressId = cusadd.attr('id');
                                var index = selectedProductIds.indexOf(addressId);
                                if (index !== -1) {
                                    selectedProductIds.splice(index, 1);
                                }
                            }
                        });
                        cusadd.append(checkbox);
                        var label = $('<div>').addClass("label");
                        label.empty();
                        var label1 = $('<label>').attr('for', 'checkbox').text(customer.fullname + ", " + customer.phonenumber);
                        var label2 = $('<label>').attr('for', 'checkbox').text(customer.homeaddress);
                        label.append(label1);
                        label.append(label2);
                        cusadd.append(label);

                        var deleteproduct = $('<div>').addClass('delete');
                        var image = $('<img>').attr('src', '../img/8664938_trash_can_delete_remove_icon.png').attr('height', '20').attr('width', '20');
                        deleteproduct.append(image);
                        cusadd.append(deleteproduct);

                        addressForm.append(cusadd);
                    }
                });
                var button = $('<button>').text('Xóa').attr({
                    'id': 'delete-address-give',
                    'type': 'button'
                });
                addressForm.append(button);
            }
        });
    }
    getcusadd();
    $(document).on('click', '.delete', function(){
        var addressId = $(this).closest('#addresscus .customer-address').attr('id');
        $.ajax({
            url: '/customer',
            method: 'DELETE',
            data: JSON.stringify([addressId]),
            contentType: 'application/json',
            success: function() {
                getcusadd();
            },
            error: function() {
                alert('Error occurred while deleting the product');
            }
        });
    })
    // $('.customer-address').on('change', 'input[type="checkbox"]', function() {
    //     if ($(this).is(':checked')) {
    //         // Checkbox đã được chọn, lấy ID của hàng
    //         var addressId = $(this).closest('#addresscus .customer-address').attr('id');
    //         // Lưu productId vào mảng selectedProductIds
    //         selectedProductIds.push(addressId);
    //     } else {
    //         // Checkbox đã bị bỏ chọn, xóa ID của hàng khỏi mảng selectedProductIds (nếu có)
    //         var addressId = $(this).closest('#addresscus .customer-address').attr('id');
    //         var index = selectedProductIds.indexOf(addressId);
    //         if (index !== -1) {
    //             selectedProductIds.splice(index, 1);
    //         }
    //     }
    // })
    $(document).on('click', '#delete-address-give', function() {
        // alert('success');
        // alert(selectedProductIds)
        if (selectedProductIds.length === 0){
            alert('Bạn chưa chọn địa chỉ để xóa!');
        }else {
            // Gọi hàm xóa mảng sản phẩm
            deleteProducts(selectedProductIds);
        }
    });
    function deleteProducts() {
        $.ajax({
            url: '/customer',
            method: 'DELETE',
            data: JSON.stringify(selectedProductIds),
            contentType: 'application/json',
            success: function() {
                getcusadd();
                selectedProductIds = [];
            },
            error: function() {
                alert('Error occurred while deleting products');
            }
        });
    }
    $('#edit-name').on('click', function(){
        if($('#user_name').val() !== ''){
            var data = {
                username: takeusername,
                password: takepass,
                picture: takepic,
                customer_name: $('#user_name').val()
            }
            $.ajax({
                url: '/acc/' + accountId,
                method: 'PUT',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    alert('Bạn đã thay đổi tên thành công!');
                    getcusname();
                    $('#user_name').val('');
                }
            });
        } else{
            alert('Bạn chưa điền thông tin để thay đổi!')
        }
    })
    $('#home').on('click', function(){
        window.location.href='../?id=' + accountId;
    });
    function editpass(Id){
        var data = {
            username: takeusername,
            password: $('#retype').val(),
            picture: takepic,
            customer_name: takecusname
        }
        $.ajax({
            url: '/acc/' + Id,
            method: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                alert('Bạn đã thay đổi mật khẩu thành công!');
                $('#event-area').hide();
                $('#old-pass').val('');
                $('#new-pass').val('');
                $('#retype').val('');
            }
        });
    }
    function checkLogin(Id){
        $.ajax({
            url: '/acc',
            type: 'GET',
            data: {
                page: null,
                limit: null
            },
            success: function(response){
                var account = response.listResults;
                account.forEach(function(account){
                    if(account.id === Id){
                        if(account.password === $('#old-pass').val()){
                            // $('#announce-old-pass').hide();
                            if ($('#new-pass').val() === $('#retype').val()){
                                // editpass(accId);
                                $('#announce-new-pass').hide();
                                $('#announce-old-pass').hide();
                                if($('#new-pass').val() !== '' && $('#retype').val() !== ''){
                                    editpass(Id);
                                }
                            }else{
                                $('#announce-new-pass').show();
                                $('#retype').val('');
                            }

                        }else{
                            $('#announce-old-pass').show();
                            $('#announce-new-pass').hide();
                            $('#old-pass').val('');
                            $('#new-pass').val('');
                            $('#retype').val('');

                        }
                    }
                });

                // // Kiểm tra sự trùng khớp của username và password
                // if(username === "admin@gmail.com") {
                //     if (response.id === password) {
                //         // Đăng nhập thành công
                //         window.location.href = '../html/Manager.html?id=' + 1;
                //     } else {
                //         alert('Password wrong. Please retype your password')
                //     }
                // } else{
                //     if (response.id === password) {
                //         // Đăng nhập thành công
                //         window.location.href = '../html/Manager.html?id=' + 1;
                //     } else {
                //         alert('Password wrong. Please retype your password')
                //     }
                // }
            },
            error: function(xhr, status, error){
                alert('Username do not exist!');
            }
        });
    }
    $('#action').on('click', function(){
        checkLogin(accountId)
    })
    $('.eye').on('click', function(){
        $(this).toggleClass('open')
        $(this).children('i').toggleClass('fa-eye fa-eye-slash')
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text')
        }
        else{
            $(this).prev().attr('type', 'password')
        }
    })
    $('#image-input').change(function(event) {
        var file = event.target.files[0];
        var imagePreview = $('#image-preview');
        // var productPicture = $('#product-picture');

        // Hiển thị ảnh xem trước
        var reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.attr('src', e.target.result);
        };
        reader.readAsDataURL(file);

        // Hiển thị tên ảnh
        // $('#product-picture').val("../img/" + file.name);
        // $('#edit-product-picture').val("../img/" + file.name);
    });
})