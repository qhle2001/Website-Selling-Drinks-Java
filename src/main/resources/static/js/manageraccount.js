var page = 1;
var limit = 10;
function showAccountList(accounts) {
    var accountList = $('#account-list');
    accountList.empty();

    accounts.forEach(function(account) {
        var row = $('<tr>');
        row.append($('<td>').text(account.id));
        row.append($('<td>').text(account.username));
        row.append($('<td>').text(account.password));
        row.append($('<td>').text(account.customer_name));
        row.append($('<td>').text(account.picture));
        row.append($('<td>').text(account.createdDate));
        row.append($('<td>').text(account.modifiedDate));

        accountList.append(row);

    });
}

function getaccountList() {
    $.ajax({
        url: '/acc',
        method: 'GET',
        data: {
            page: page,
            limit: limit
        },
        success: function (response) {
            showAccountList(response.listResults);

            // Kiểm tra nếu còn sản phẩm để hiển thị
            if (page < response.totalpage) {
                $('#load-more-account').show();

            } else {
                $('#load-more-account').hide();
            }
            if (page > 1) {
                $('#load-previous-account').show();
            } else {
                $('#load-previous-account').hide();
            }
        },
        error: function () {
            alert('Error occurred while fetching account list');
        }
    });
}
$(document).ready(function (){
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