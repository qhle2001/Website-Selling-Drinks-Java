$(document).ready(function() {
    var page = 1;
    var limit = 10;
    var checkbox;
    var selectedCategoryIds = [];

    // Hàm để hiển thị danh sách sản phẩm
    function showCategoryList(category) {
        var categoryList = $('#category-list');
        categoryList.empty();

        category.forEach(function(category) {
            var row = $('<tr>');
            // Tạo checkbox và gán thuộc tính data-id cho hàng
            checkbox = $('<input>').attr('type', 'checkbox').addClass('category-checkbox');
            // Lưu ID vào thuộc tính data-id của hàng
            row.attr('data-id', category.id);

            // Xử lý sự kiện khi checkbox được chọn/deselected
            checkbox.change(function() {
                if ($(this).is(':checked')) {
                    // Checkbox đã được chọn, lấy ID của hàng
                    var categoryId = $(this).closest('tr').data('id');
                    // Lưu categoryId vào mảng selectedCategoryIds
                    selectedCategoryIds.push(categoryId);
                } else {
                    // Checkbox đã bị bỏ chọn, xóa ID của hàng khỏi mảng selectedCategoryIds (nếu có)
                    var categoryId = $(this).closest('tr').data('id');
                    var index = selectedCategoryIds.indexOf(categoryId);
                    if (index !== -1) {
                        selectedCategoryIds.splice(index, 1);
                    }
                }
            });
            row.append($('<td>').html(checkbox));
            row.append($('<td>').text(category.id));
            row.append($('<td>').text(category.code));
            row.append($('<td>').text(category.name))
            row.append($('<td>').text(category.createdDate));
            row.append($('<td>').text(category.modifiedDate));
            row.append(
                $('<td>').append(
                    $('<button>').text('Edit').addClass('edit-category').data('id', category.id),
                    $('<button>').text('Delete').addClass('delete-category').data('id', category.id)
                )
            );

            categoryList.append(row);

        });
    }

    // Hàm để gửi yêu cầu API để lấy danh sách sản phẩm
    function getCategoryList() {
        $.ajax({
            url: '/category',
            method: 'GET',
            data: {
                page: page,
                limit: limit
            },
            success: function(response) {
                showCategoryList(response.listResults);

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (page < response.totalpage) {
                    $('#load-more-category').show();

                } else {
                    $('#load-more-category').hide();
                }
                if (page > 1){
                    $('#load-previous-category').show();
                }else{
                    $('#load-previous-category').hide();
                }
            },
            error: function() {
                alert('Error occurred while fetching category list');
            }
        });
    }

    // Gọi hàm getCategoryList để hiển thị danh sách sản phẩm ban đầu
    getCategoryList();

    // Xử lý sự kiện khi nhấn vào nút "Load More"
    $('#load-more-category').click(function() {
        page++;
        getCategoryList();
    });

    // Xử lý sự kiện khi nhấn vào nút "See Previous"
    $('#load-previous-category').click(function() {
        if (page > 1) {
            page--;
            getCategoryList();
        }
    });
    // Xử lý sự kiện khi nhấn vào nút "Hide"
    $('#hide-category').click(function(){
        $('#container-category').hide();
    });
    // Xử lý sự kiện khi nhấn vào "menu-category"
    $('#Category').click(function(){ $('#container-category').show();});
    // Xử lý sự kiện hiển thị form khi nhấn vào nút "Add Category"
    $('#add-category-btn').click(function(){
        $('#add-category-form').show();
    });
    // Xử lý sự kiện khi nhấn vào nút "Add"
    $('#add-category').click(function() {
        var category = {
            code: $('#category-code').val(),
            name: $('#category-name').val(),

        };

        $.ajax({
            url: '/category',
            method: 'POST',
            data: JSON.stringify(category),
            contentType: 'application/json',
            success: function() {
                getCategoryList();
                // Reset các trường input
                $('#category-code').val('');
                $('#category-name').val('');
                alert('Category added successfully');
            },
            error: function() {
                alert('Error occurred while adding the category');
            }
        });
    });
    // Xử lý sự kiện khi nhấn vào nút Cancel
    $('#cancel-add-category').click(function(){
        $('#add-category-form').hide();
    });
    // Xử lý sự kiện khi nhấn vào nút "delete-category"
    $(document).on('click', '.delete-category', function(){
        categoryId = $(this).data('id');
        // alert(categoryId);
        $.ajax({
            url: '/category',
            method: 'DELETE',
            data: JSON.stringify([categoryId]),
            contentType: 'application/json',
            success: function() {
                getCategoryList();
                alert('Category deleted successfully');
            },
            error: function() {
                alert('Error occurred while deleting the category');
            }
        });
    });

    $('#delete-category').click(function() {
        if (selectedCategoryIds.length === 0){
            alert('You have not selected the category to delete!');
        }else {
            // Gọi hàm xóa mảng sản phẩm
            deleteCategorys(selectedCategoryIds);
        }
    });
    function deleteCategorys() {
        $.ajax({
            url: '/category',
            method: 'DELETE',
            data: JSON.stringify(selectedCategoryIds),
            contentType: 'application/json',
            success: function() {
                getCategoryList();
                alert('Categorys deleted successfully');
                // Xóa danh sách sản phẩm đã chọn sau khi xóa thành công
                selectedCategoryIds = [];
            },
            error: function() {
                alert('Error occurred while deleting categorys');
            }
        });
    }
});
