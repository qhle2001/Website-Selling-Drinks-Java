$(document).ready(function() {
    var page = 1;
    var limit = 10;
    var checkbox;
    var selectedCustomerIds = [];

    // Hàm để hiển thị danh sách sản phẩm
    function showCustomerList(customer) {
        var customerList = $('#customer-list');
        customerList.empty();

        customer.forEach(function(customer) {
            var row = $('<tr>');
            row.append($('<td>').text(customer.id));
            row.append($('<td>').text(customer.username));
            row.append($('<td>').text(customer.firstname));
            row.append($('<td>').text(customer.lastname));
            row.append($('<td>').text(customer.dayofbirth));
            row.append($('<td>').text(customer.homeaddress));
            row.append($('<td>').text(customer.createdDate));
            row.append($('<td>').text(customer.modifiedDate));
            row.append($('<td>').text(customer.picture));

            customerList.append(row);

        });
    }

    // Hàm để gửi yêu cầu API để lấy danh sách sản phẩm
    function getCustomerList() {
        $.ajax({
            url: '/customer',
            method: 'GET',
            data: {
                page: page,
                limit: limit
            },
            success: function(response) {
                showCustomerList(response.listResults);

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (page < response.totalpage) {
                    $('#load-more-customer').show();

                } else {
                    $('#load-more-customer').hide();
                }
                if (page > 1){
                    $('#load-previous-customer').show();
                }else{
                    $('#load-previous-customer').hide();
                }
            },
            error: function() {
                alert('Error occurred while fetching customer list');
            }
        });
    }

    // Gọi hàm getCustomerList để hiển thị danh sách sản phẩm ban đầu
    getCustomerList();

    // Xử lý sự kiện khi nhấn vào nút "Load More"
    $('#load-more-customer').click(function() {
        page++;
        getcustomerList();
    });

    // Xử lý sự kiện khi nhấn vào nút "See Previous"
    $('#load-previous-customer').click(function() {
        if (page > 1) {
            page--;
            getCustomerList();
        }
    });
    // Xử lý sự kiện khi nhấn vào nút "Hide"
    $('#hide-customer').click(function(){
        $('#container-customer').hide();
    });
    // Xử lý sự kiện khi nhấn vào "menu-customer"
    $('#Customer').click(function(){ $('#container-customer').show();});
    // Xử lý sự kiện hiển thị form khi nhấn vào nút "Add Customer"
    $('#add-customer-btn').click(function(){
        $('#add-customer-form').show();
    });
    // Xử lý sự kiện khi nhấn vào nút "Add"
    $('#add-customer').click(function() {
        var customer = {
            code: $('#customer-code').val(),
            name: $('#customer-name').val(),

        };

        $.ajax({
            url: '/customer',
            method: 'POST',
            data: JSON.stringify(customer),
            contentType: 'application/json',
            success: function() {
                getCustomerList();
                // Reset các trường input
                $('#customer-code').val('');
                $('#customer-name').val('');
                alert('Customer added successfully');
            },
            error: function() {
                alert('Error occurred while adding the customer');
            }
        });
    });
    // Xử lý sự kiện khi nhấn vào nút Cancel
    $('#cancel-add-customer').click(function(){
        $('#add-customer-form').hide();
    });
    // Xử lý sự kiện khi nhấn vào nút "delete-customer"
    $(document).on('click', '.delete-customer', function(){
        customerId = $(this).data('id');
        // alert(customerId);
        $.ajax({
            url: '/customer',
            method: 'DELETE',
            data: JSON.stringify([customerId]),
            contentType: 'application/json',
            success: function() {
                getCustomerList();
                alert('Customer deleted successfully');
            },
            error: function() {
                alert('Error occurred while deleting the customer');
            }
        });
    });

    $('#delete-customer').click(function() {
        if (selectedCustomerIds.length === 0){
            alert('You have not selected the customer to delete!');
        }else {
            // Gọi hàm xóa mảng sản phẩm
            deleteCustomers(selectedCustomerIds);
        }
    });
    function deleteCustomers() {
        $.ajax({
            url: '/customer',
            method: 'DELETE',
            data: JSON.stringify(selectedCustomerIds),
            contentType: 'application/json',
            success: function() {
                getCustomerList();
                alert('Customers deleted successfully');
                // Xóa danh sách sản phẩm đã chọn sau khi xóa thành công
                selectedCustomerIds = [];
            },
            error: function() {
                alert('Error occurred while deleting customers');
            }
        });
    }
});
