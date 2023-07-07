$(document).ready(function(){
    // Lấy giá trị id từ URL
    var urlParams = new URLSearchParams(window.location.search);
    var itemId = urlParams.get('id');
    alert(itemId);

})