$(document).ready(function(){
    var IseventaccessVisible = false;

    var urlParams = new URLSearchParams(window.location.search);
    var accId = parseInt(urlParams.get('id'));

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
    $('#user').on('click', function(e){
        e.stopPropagation();
        if(IseventaccessVisible){
            $('#event-access').hide();
        } else{
            $('#event-access').show();
        }
        IseventaccessVisible = !IseventaccessVisible;
    });
    $(document).click(function() {
        $('#event-access').hide();
        IseventaccessVisible = !IseventaccessVisible;
    });
    $('#log-out').on('click', function(){
        window.location.href='../#';
    });
    $('#edit-pass').on('click', function(){
        var wrapper = $('#wrapper');
        var eventarea = $('#event-area');
        eventarea.show();
        wrapper.addClass('overlay');
    })
    $('#cancel').on('click', function(event){
        event.preventDefault();
        $('#event-area').hide();
    })
    $('#action').on('click', function(event){
        // $('#event-area').show();
        event.preventDefault();
        checkLogin(accId);
        if ($('#new-pass').val() === $('#retype').val()){
            alert('match')
            $('#announce-new-pass').hide();
            $('#announce-old-pass').hide();
        }else{
            $('#announce-new-pass').show();
            $('#retype').val('');
        }
    })
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
                            $('#announce-old-pass').hide();
                        }else{
                            $('#announce-old-pass').show();
                            $('#announce-new-pass').hide();
                            $('#old-pass').val('');
                            $('#new-pass').val('');
                            $('#retype').val('');

                        }
                    }
                });


                // Kiểm tra sự trùng khớp của username và password
                if(username === "admin@gmail.com") {
                    if (response.id === password) {
                        // Đăng nhập thành công
                        window.location.href = '../html/Manager.html?id=' + 1;
                    } else {
                        alert('Password wrong. Please retype your password')
                    }
                } else{
                    if (response.id === password) {
                        // Đăng nhập thành công
                        window.location.href = '../html/Manager.html?id=' + 1;
                    } else {
                        alert('Password wrong. Please retype your password')
                    }
                }
            },
            error: function(xhr, status, error){
                alert('Username do not exist!');
            }
        });
    }
})