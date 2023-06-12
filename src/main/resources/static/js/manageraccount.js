$(document).ready(function (){
    // $('#container-account').hide();
    var page = 1;
    var limit = 10;
    // Hàm để hiển thị danh sách sản phẩm
    function showAccountList(accounts) {
        var accountList = $('#account-list');
        accountList.empty();

        accounts.forEach(function(account) {
            var row = $('<tr>');

            row.append($('<td>').text(account.id));
            row.append($('<td>').text(account.username));
            row.append($('<td>').text(account.password));
            row.append($('<td>').text(account.typeaccCode));
            row.append($('<td>').text(account.createdDate));
            row.append($('<td>').text(account.modifiedDate));

            accountList.append(row);

        });
    }

    // Hàm để gửi yêu cầu API để lấy danh sách tài khoaản
    function getaccountList() {
        $.ajax({
            url: '/acc',
            method: 'GET',
            data: {
                page: page,
                limit: limit
            },
            success: function(response) {
                showAccountList(response.listResults);

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (page < response.totalpage) {
                    $('#load-more-account').show();

                } else {
                    $('#load-more-account').hide();
                }
                if (page > 1){
                    $('#load-previous-account').show();
                }else{
                    $('#load-previous-account').hide();
                }
            },
            error: function() {
                alert('Error occurred while fetching account list');
            }
        });
    }

    // Gọi hàm getaccountList để hiển thị danh sách sản phẩm ban đầu
    getaccountList();

    // Xử lý sự kiện khi nhấn vào nút "Load More"
    $('#load-more-account').click(function() {
        page++;
        getaccountList();
    });

    // Xử lý sự kiện khi nhấn vào nút "See Previous"
    $('#load-previous-account').click(function() {
        if (page > 1) {
            page--;
            getaccountList();
        }
    });
    // Xử lý sự kiện khi nhấn vào nút "Hide"
    $('#hide-account').click(function(){
        $('#container-account').hide();
    });
    // Xử lý sự kiện khi nhấn vào "menu-account"
    $('#Account').click(function(){ $('#container-account').show();});
});