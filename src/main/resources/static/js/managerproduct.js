$(document).ready(function() {
    var page = 1;
    var limit = 10;
    var checkbox;
    var selectedProductIds = [];

    // Hàm để hiển thị danh sách sản phẩm
    function showProductList(products) {
        var productList = $('#product-list');
        productList.empty();

        products.forEach(function(product) {
            var row = $('<tr>');
            // Tạo checkbox và gán thuộc tính data-id cho hàng
            checkbox = $('<input>').attr('type', 'checkbox').addClass('product-checkbox');
            // Lưu ID vào thuộc tính data-id của hàng
            row.attr('data-id', product.id);

            // Xử lý sự kiện khi checkbox được chọn/deselected
            checkbox.change(function() {
                if ($(this).is(':checked')) {
                    // Checkbox đã được chọn, lấy ID của hàng
                    var productId = $(this).closest('tr').data('id');
                    // Lưu productId vào mảng selectedProductIds
                    selectedProductIds.push(productId);
                } else {
                    // Checkbox đã bị bỏ chọn, xóa ID của hàng khỏi mảng selectedProductIds (nếu có)
                    var productId = $(this).closest('tr').data('id');
                    var index = selectedProductIds.indexOf(productId);
                    if (index !== -1) {
                        selectedProductIds.splice(index, 1);
                    }
                }
            });
            row.append($('<td>').html(checkbox));
            row.append($('<td>').text(product.id));
            row.append($('<td>').text(product.title));
            row.append($('<td>').text(product.size));
            row.append($('<td>').text(product.categoryCode));
            row.append($('<td>').text(product.createdDate));
            row.append($('<td>').text(product.modifiedDate));
            row.append(
                $('<td>').append(
                    $('<button>').text('Edit').addClass('edit-product').data('id', product.id),
                    $('<button>').text('Delete').addClass('delete-product').data('id', product.id)
                )
            );

            productList.append(row);

        });
    }

    // Hàm để gửi yêu cầu API để lấy danh sách sản phẩm
    function getProductList() {
        $.ajax({
            url: '/product',
            method: 'GET',
            data: {
                page: page,
                limit: limit
            },
            success: function(response) {
                showProductList(response.listResults);

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (page < response.totalpage) {
                    $('#load-more').show();

                } else {
                    $('#load-more').hide();
                }
                if (page > 1){
                    $('#load-previous').show();
                }else{
                    $('#load-previous').hide();
                }
            },
            error: function() {
                alert('Error occurred while fetching product list');
            }
        });
    }

    // Gọi hàm getProductList để hiển thị danh sách sản phẩm ban đầu
    getProductList();

    // Xử lý sự kiện khi nhấn vào nút "Load More"
    $('#load-more').click(function() {
        page++;
        getProductList();
    });

    // Xử lý sự kiện khi nhấn vào nút "See Previous"
    $('#load-previous').click(function() {
        if (page > 1) {
            page--;
            getProductList();
        }
    });
    // Xử lý sự kiện khi nhấn vào nút "Hide"
    $('#hide-product').click(function(){
        $('#container-product').hide();
    });
    // Xử lý sự kiện khi nhấn vào "menu-product"
    $('#Product').click(function(){ $('#container-product').show();});
    // Xử lý sự kiện hiển thị form khi nhấn vào nút "Add Product"
    $('#add-product-btn').click(function(){
        $('#add-product-form').show();
    });
    // Xử lý sự kiện khi nhấn vào nút "Add"
    $('#add-product').click(function() {
        var product = {
            title: $('#product-title').val(),
            size: $('#product-size').val(),
            categoryCode: $('#product-categoryCode').val()

        };

        $.ajax({
            url: '/product',
            method: 'POST',
            data: JSON.stringify(product),
            contentType: 'application/json',
            success: function() {
                getProductList();
                // Reset các trường input
                $('#product-title').val('');
                $('#product-size').val('');
                $('#product-categoryCode').val('');
                alert('Product added successfully');
            },
            error: function() {
                alert('Error occurred while adding the product');
            }
        });
    });
    // Xử lý sự kiện khi nhấn vào nút Cancel
    $('#cancel-add-product').click(function(){
       $('#add-product-form').hide();
    });
    var productId;
    // Xử lý sự kiện khi nhấn vào nút "Edit"
    $(document).on('click', '.edit-product', function() {
        productId = $(this).data('id');
        // alert(productId);

        // Gửi yêu cầu AJAX để lấy thông tin sản phẩm theo ID
        $.ajax({
            url: '/product/' + productId,
            method: 'GET',
            success: function(response) {
                // Điền thông tin sản phẩm vào form Add Product
                $('#edit-product-id').val(productId);
                $('#edit-product-title').val(response.title);
                $('#edit-product-size').val(response.size);
                $('#edit-product-categoryCode').val(response.categoryCode);
                // Hiển thị form edit Product
                $('#edit-product-form').show();
            },
            error: function() {
                alert('Error occurred while fetching product details');
            }
        });
    });
    // Xử lý sự kiện khi nhấn vào nút "Update"
    $('#update-product').click(function() {
        var product = {
            title: $('#edit-product-title').val(),
            size: $('#edit-product-size').val(),
            categoryCode: $('#edit-product-categoryCode').val()
        };
        // Gửi yêu cầu AJAX để cập nhật thông tin sản phẩm
        $.ajax({
            url: '/product/' + productId,
            method: 'PUT',
            data: JSON.stringify(product),
            contentType: 'application/json',
            success: function() {
                // Thực hiện các thao tác cần thiết sau khi cập nhật thành công
                // Ví dụ: hiển thị thông báo, làm mới danh sách sản phẩm, ẩn form chỉnh sửa, v.v.
                // alert('Product updated successfully');
                getProductList();
                // Reset các trường input
                $('#edit-product-id').val('');
                $('#edit-product-title').val('');
                $('#edit-product-size').val('');
                $('#edit-product-categoryCode').val('');
                alert('Product updated successfully');
                // $('#edit-product-form').hide();
            },
            error: function() {
                alert('Error occurred while updating the product');
            }
        });
    });
    $('#cancel-edit').click(function (){
        $('#edit-product-form').hide();
    });
    $(document).on('click', '.delete-product', function(){
       productId = $(this).data('id');
       // alert(productId);
        $.ajax({
            url: '/product',
            method: 'DELETE',
            data: JSON.stringify([productId]),
            contentType: 'application/json',
            success: function() {
                getProductList();
                alert('Product deleted successfully');
            },
            error: function() {
                alert('Error occurred while deleting the product');
            }
        });
    });

    $('#delete-product').click(function() {
        if (selectedProductIds.length === 0){
            alert('You have not selected the product to delete!');
        }else {
            // Gọi hàm xóa mảng sản phẩm
            deleteProducts(selectedProductIds);

            // Xóa tất cả các ID đã chọn trong mảng selectedProductIds
            // selectedProductIds = [];
        }
    });
    function deleteProducts() {
        $.ajax({
            url: '/product',
            method: 'DELETE',
            data: JSON.stringify(selectedProductIds),
            contentType: 'application/json',
            success: function() {
                getProductList();
                alert('Products deleted successfully');
                // Xóa danh sách sản phẩm đã chọn sau khi xóa thành công
                selectedProductIds = [];
            },
            error: function() {
                alert('Error occurred while deleting products');
            }
        });
    }
});
