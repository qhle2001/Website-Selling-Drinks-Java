$(document).ready(function() {
    var IseventaccessVisible = false;
    var urlParams = new URLSearchParams(window.location.search);
    var accountId = parseInt(urlParams.get('id'));
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
                getid.forEach(function(account){
                    if(account.id === Id){
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
    $('#user').on('click', function(e){
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
});
