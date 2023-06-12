$(document).ready(function (){
    $('#eye').click(function (){
        $(this).toggleClass('open')
        $(this).children('i').toggleClass('fa-eye fa-eye-slash')
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text')
        }
        else{
            $(this).prev().attr('type', 'password')
        }
    })
    // Lắng nghe sự kiện click trên nút "Đăng nhập"
    $('#form-submit').click(function(event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        checkLogin(username, password);
    });
    function checkLogin(username, password){
        $.ajax({
           url: '/acc/' + username,
           type: 'GET',
           dataType: 'json',
           success: function(response){
               // Kiểm tra sự trùng khớp của username và password
               if(username === "admin@gmail.com") {
                   if (response.password === password) {
                       // Đăng nhập thành công
                       window.location.href = '../html/Manager.html';
                   } else {
                       alert('Password wrong. Please retype your password')
                   }
               } else{

               }
           },
           error: function(xhr, status, error){
               alert('Username do not exist!');
           }
        });
    }
})