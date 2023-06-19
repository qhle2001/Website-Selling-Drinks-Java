$(document).ready(function() {
    var page = 1;
    var limit = 10;
    var checkbox;
    var selectedCommentIds = [];

    // Hàm để hiển thị danh sách sản phẩm
    function showCommentList(comment) {
        var commentList = $('#comment-list');
        commentList.empty();

        comment.forEach(function (comment) {
            var row = $('<tr>');
            // Tạo checkbox và gán thuộc tính data-id cho hàng
            checkbox = $('<input>').attr('type', 'checkbox').addClass('comment-checkbox');
            // Lưu ID vào thuộc tính data-id của hàng
            row.attr('data-id', comment.id);

            // Xử lý sự kiện khi checkbox được chọn/deselected
            checkbox.change(function () {
                if ($(this).is(':checked')) {
                    // Checkbox đã được chọn, lấy ID của hàng
                    var commentId = $(this).closest('tr').data('id');
                    // Lưu commentId vào mảng selectedCommentIds
                    selectedCommentIds.push(commentId);
                } else {
                    // Checkbox đã bị bỏ chọn, xóa ID của hàng khỏi mảng selectedCommentIds (nếu có)
                    var commentId = $(this).closest('tr').data('id');
                    var index = selectedCommentIds.indexOf(commentId);
                    if (index !== -1) {
                        selectedCommentIds.splice(index, 1);
                    }
                }
            });
            row.append($('<td>').html(checkbox));
            row.append($('<td>').text(comment.id));
            row.append($('<td>').text(comment.acc_id));
            row.append($('<td>').text(comment.content));
            row.append($('<td>').text(comment.judge));
            row.append($('<td>').text(comment.createdDate));
            row.append($('<td>').text(comment.modifiedDate));
            row.append(
                $('<td>').append(
                    $('<button>').text('Delete').addClass('delete-comment').data('id', comment.id)
                )
            );

            commentList.append(row);

        });
    }

    // Hàm để gửi yêu cầu API để lấy danh sách sản phẩm
    function getCommentList() {
        $.ajax({
            url: '/comment',
            method: 'GET',
            data: {
                page: page,
                limit: limit
            },
            success: function (response) {
                showCommentList(response.listResults);

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (page < response.totalpage) {
                    $('#load-more-comment').show();

                } else {
                    $('#load-more-comment').hide();
                }
                if (page > 1) {
                    $('#load-previous-comment').show();
                } else {
                    $('#load-previous-comment').hide();
                }
            },
            error: function () {
                alert('Error occurred while fetching comment list');
            }
        });
    }

    // Gọi hàm getCommentList để hiển thị danh sách sản phẩm ban đầu
    getCommentList();

    // Xử lý sự kiện khi nhấn vào nút "Load More"
    $('#load-more-comment').click(function () {
        page++;
        getCommentList();
    });

    // Xử lý sự kiện khi nhấn vào nút "See Previous"
    $('#load-previous-comment').click(function () {
        if (page > 1) {
            page--;
            getCommentList();
        }
    });
    // Xử lý sự kiện khi nhấn vào nút "Hide"
    $('#hide-comment').click(function () {
        $('#container-comment').hide();
    });
    // Xử lý sự kiện khi nhấn vào "menu-comment"
    $('#Comment').click(function () {
        $('#container-comment').show();
    });
    // Xử lý sự kiện khi nhấn vào nút "delete-comment"
    $(document).on('click', '.delete-comment', function(){
        commentId = $(this).data('id');
        // alert(commentId);
        $.ajax({
            url: '/comment',
            method: 'DELETE',
            data: JSON.stringify([commentId]),
            contentType: 'application/json',
            success: function() {
                getCommentList();
                alert('Comment deleted successfully');
            },
            error: function() {
                alert('Error occurred while deleting the comment');
            }
        });
    });

    $('#delete-comment').click(function() {
        if (selectedCommentIds.length === 0){
            alert('You have not selected the comment to delete!');
        }else {
            // Gọi hàm xóa mảng sản phẩm
            deleteComments(selectedCommentIds);
        }
    });
    function deleteComments() {
        $.ajax({
            url: '/comment',
            method: 'DELETE',
            data: JSON.stringify(selectedCommentIds),
            contentType: 'application/json',
            success: function() {
                getCommentList();
                alert('Comments deleted successfully');
                // Xóa danh sách sản phẩm đã chọn sau khi xóa thành công
                selectedCommentIds = [];
            },
            error: function() {
                alert('Error occurred while deleting comments');
            }
        });
    }
});