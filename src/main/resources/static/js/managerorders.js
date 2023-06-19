$(document).ready(function() {
    var page = 1;
    var limit = 10;
    var checkbox;
    var selectedOrderIds = [];

    // Hàm để hiển thị danh sách sản phẩm
    function showOrderList(order) {
        var orderList = $('#order-list');
        orderList.empty();
        order.forEach(function(orders) {
            var row = $('<tr>');
            // Tạo checkbox và gán thuộc tính data-id cho hàng
            checkbox = $('<input>').attr('type', 'checkbox').addClass('product-checkbox');
            // Lưu ID vào thuộc tính data-id của hàng
            row.attr('data-id', orders.id);

            // Xử lý sự kiện khi checkbox được chọn/deselected
            checkbox.change(function() {
                if ($(this).is(':checked')) {
                    // Checkbox đã được chọn, lấy ID của hàng
                    var orderId = $(this).closest('tr').data('id');
                    // Lưu orderId vào mảng selectedOrderIds
                    selectedOrderIds.push(orderId);
                } else {
                    // Checkbox đã bị bỏ chọn, xóa ID của hàng khỏi mảng selectedOrderIds (nếu có)
                    var orderId = $(this).closest('tr').data('id');
                    var index = selectedOrderIds.indexOf(orderId);
                    if (index !== -1) {
                        selectedOrderIds.splice(index, 1);
                    }
                }
            });
            row.append($('<td>').html(checkbox));
            row.append($('<td>').text(orders.id));
            row.append($('<td>').text(orders.account_id));
            row.append($('<td>').text(orders.customername));
            row.append($('<td>').text(orders.phonenumber));
            row.append($('<td>').text(orders.productname));
            row.append($('<td>').text(orders.size));
            row.append($('<td>').text(orders.quantity));
            row.append($('<td>').text(orders.homeaddress));
            row.append($('<td>').text(orders.createdDate));
            row.append($('<td>').text(orders.modifiedDate));
            // alert(orders.username);

            orderList.append(row);

        });
    }

    // Hàm để gửi yêu cầu API để lấy danh sách sản phẩm
    function getOrderList() {
        $.ajax({
            url: '/orders',
            method: 'GET',
            data: {
                page: page,
                limit: limit
            },
            success: function(response) {
                showOrderList(response.listResults);

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (page < response.totalpage) {
                    $('#load-more-order').show();

                } else {
                    $('#load-more-order').hide();
                }
                if (page > 1){
                    $('#load-previous-order').show();
                }else{
                    $('#load-previous-order').hide();
                }
            },
            error: function() {
                alert('Error occurred while fetching order list');
            }
        });
    }

    // Gọi hàm getOrderList để hiển thị danh sách sản phẩm ban đầu
    getOrderList();

    // Xử lý sự kiện khi nhấn vào nút "Load More"
    $('#load-more-order').click(function() {
        page++;
        getOrderList();
    });

    // Xử lý sự kiện khi nhấn vào nút "See Previous"
    $('#load-previous-order').click(function() {
        if (page > 1) {
            page--;
            getOrderList();
        }
    });
    // Xử lý sự kiện khi nhấn vào nút "Hide"
    $('#hide-order').click(function(){
        $('#container-orders').hide();
    });
    // Xử lý sự kiện khi nhấn vào "menu-order"
    $('#Order').click(function(){ $('#container-orders').show();});
    // Xử lý sự kiện hiển thị form khi nhấn vào nút "Add Order"
    $('#add-order-btn').click(function(){
        $('#add-order-form').show();
    });
    // Xử lý sự kiện khi nhấn vào nút "Add"
    $('#add-order').click(function() {
        var order = {
            code: $('#order-code').val(),
            name: $('#order-name').val(),

        };

        $.ajax({
            url: '/order',
            method: 'POST',
            data: JSON.stringify(order),
            contentType: 'application/json',
            success: function() {
                getOrderList();
                // Reset các trường input
                $('#order-code').val('');
                $('#order-name').val('');
                alert('Order added successfully');
            },
            error: function() {
                alert('Error occurred while adding the order');
            }
        });
    });
    // Xử lý sự kiện khi nhấn vào nút Cancel
    $('#cancel-add-order').click(function(){
        $('#add-order-form').hide();
    });
    // Xử lý sự kiện khi nhấn vào nút "delete-order"
    $(document).on('click', '.delete-order', function(){
        orderId = $(this).data('id');
        // alert(orderId);
        $.ajax({
            url: '/order',
            method: 'DELETE',
            data: JSON.stringify([orderId]),
            contentType: 'application/json',
            success: function() {
                getOrderList();
                alert('Order deleted successfully');
            },
            error: function() {
                alert('Error occurred while deleting the order');
            }
        });
    });

    $('#delete-order').click(function() {
        if (selectedOrderIds.length === 0){
            alert('You have not selected the order to delete!');
        }else {
            // Gọi hàm xóa mảng sản phẩm
            deleteOrders(selectedOrderIds);
        }
    });
    function deleteOrders() {
        $.ajax({
            url: '/order',
            method: 'DELETE',
            data: JSON.stringify(selectedOrderIds),
            contentType: 'application/json',
            success: function() {
                getOrderList();
                alert('Orders deleted successfully');
                // Xóa danh sách sản phẩm đã chọn sau khi xóa thành công
                selectedOrderIds = [];
            },
            error: function() {
                alert('Error occurred while deleting orders');
            }
        });
    }
});
