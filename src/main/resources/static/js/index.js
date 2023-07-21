$(document).ready(function() {
    var IseventaccessVisible = false;
    var urlParams = new URLSearchParams(window.location.search);
    var accountId = parseInt(urlParams.get('id'));
    var type = urlParams.get('type');
    if(!accountId){
        var user_picture = $('#user_picture');
        user_picture.empty();
        var img = $('<img>').attr('src', '../img/user.png').attr('id', 'user');
        user_picture.append(img);
    }
    if(type === 'contact'){
        setTimeout(function() {
            $('html, body').animate({ scrollTop: $(document).height() }, 500);
        }, 500);
    }
    $.ajax({
        url: '../html/home.html',
        data: {id: accountId},
        success: function (result) {
            $('#container-information').html(result);
            if(accountId){
                getName(accountId);
            }
        }
    });
    function getName(Id){
        $.ajax({
            url: '/acc',
            method: 'GET',
            data: {
                page: null,
                limit: null,
            },
            success: function(response){
                var getid = response.listResults;
                var user_picture = $('#user_picture');
                user_picture.empty();
                getid.forEach(function(account){
                    if(account.id === Id){
                        if(account.picture){
                            var img = $('<img>').attr('src', account.picture).attr('id', 'user');
                            user_picture.append(img);
                        } else{
                            var img = $('<img>').attr('src', '../img/user.png').attr('id', 'user');
                            user_picture.append(img);
                        }
                        $('#customername').text(account.customer_name);
                    }
                });
            }
        });
    }

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

    $('#comment-res').click(function(){
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
    $('#Liên-hệ').on('click', function() {
        // Sử dụng animate để thực hiện cuộn xuống cuối trang trong 300ms
        $('html, body').animate({ scrollTop: $(document).height() }, 500);
    });
    $('#user_picture').on('click', function(e){
        e.stopPropagation();
        if(IseventaccessVisible){
            $('#event-access').hide();
            $('#customername').hide();
            $('#setting').hide();
            $('#log-out').hide();
            $('#log-in').hide();
        } else{
            $('#event-access').show();
            if(accountId){
                $('#customername').show();
                $('#setting').show();
                $('#log-out').show();
            } else{
                $('#log-in').show();
            }
        }
        IseventaccessVisible = !IseventaccessVisible;
    });
    $('#cart').on('click', function(e){
        e.preventDefault();
        if(accountId){
            window.location.href = '../html/cart.html?id=' + accountId;
        } else{
            alert('Bạn cần đăng nhập trước');
        }
    })
    $(document).click(function() {
        $('#event-access').hide();
        $('#customername').hide();
        $('#setting').hide();
        $('#log-out').hide();
        $('#log-in').hide();
        IseventaccessVisible = !IseventaccessVisible;
    });
    $('#log-in').on('click', function(){
        window.location.href = '../html/formlogin.html';
    })
    $('#log-out').on('click', function(){
        window.location.href = '../';
    })
    $('#comment-res').on('click', function(){
        window.location.href='../html/comment.html?id=' + accountId;
    })
    $('#setting').on('click', function(){
        window.location.href='../html/setting.html?id=' + accountId;
    })
});
