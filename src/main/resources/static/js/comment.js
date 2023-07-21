$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var accId = parseInt(urlParams.get('id'));
    var isBannerVisible = false;
    function getcomment(){
        $.ajax({
            url: '/comment',
            method: 'GET',
            data: {
                page: null,
                limit: null
            },
            success: function(response){
                var listcomment = response.listResults;
                var right = $('#right');
                right.empty();
                listcomment.forEach(function(comment){
                    var label2 = $('<label>').addClass('label2');
                    var stringjudge = comment.judge;
                    var result = stringjudge.split(" ");
                    var judgeresult = result[0];
                    for (var i=0; i<judgeresult; i++){
                        var star = $('<img>').attr('src', '/img/star.png').attr('height', '20').attr('width', '20');
                        label2.append($('<span>').append(star));
                    }
                    var content = $('<div>').addClass('content');
                    content.empty();

                    var p = $('<p>').text(comment.content);
                    content.append(p);

                    getacc(right, comment.id, comment.acc_id, label2, content);
                })
            }
        })
    }
    function getacc(right, commentid, accid, label2, content){
        $.ajax({
            url: '/acc',
            method: 'GET',
            data: {
                page: null,
                limit: null
            },
            success: function(response){
                var account = response.listResults;

                // var right = $('#right');
                // right.empty();
                account.forEach(function(acc){
                    if(acc.id === accid){
                        var item = $('<div>').addClass('item').attr('id', commentid);
                        item.empty();

                        var accinfor = $('<div>').addClass('accinfor');
                        accinfor.empty();

                        var image_container = $('<div>').addClass('image-container');
                        image_container.empty();
                        if(acc.picture){
                            var img = $('<img>').attr('src', acc.picture);
                            image_container.append(img);
                        } else{
                            var img = $('<img>').attr('src', '../img/ui_user_icon.png');
                            image_container.append(img);
                        }

                        var labels = $('<div>').addClass('labels');
                        var label1 = $('<label>').addClass('label1').text(acc.customer_name);
                        labels.append(label1, label2);

                        accinfor.append(image_container, labels);

                        item.append(accinfor, content);

                        if(accId){
                            if (accid === accId){
                                var edit_delete = $('<div>').addClass('edit-delete');
                                edit_delete.empty();
                                var button1 = $("<button>", {
                                    text: "Sửa",
                                    type: "button",
                                    class: "edit"
                                });
                                var button2 = $("<button>", {
                                    text: "Xóa",
                                    type: "button",
                                    class: "delete"
                                });
                                edit_delete.append(button1, button2);
                                item.append(edit_delete);
                            }
                        }

                        right.append(item);
                    }

                })
            }
        })
    }
    getcomment();
    $(document).on('click', '.delete', function(){
        var itemId = $(this).closest('.item').attr('id');
        // alert(productId);
        $.ajax({
            url: '/comment',
            method: 'DELETE',
            data: JSON.stringify([itemId]),
            contentType: 'application/json',
            success: function() {
                getcomment();
                // alert('Product deleted successfully');
            },
            error: function() {
                alert('Error occurred while deleting the product');
            }
        });
    })
    $('.menu').on('click', function(event){
        event.preventDefault();
        if (isBannerVisible) {
            $('#left .information-banner').animate({left: '-100%'}, 500);
        } else {
            $('#left .information-banner').animate({left: '0px'}, 500);
        }

        isBannerVisible = !isBannerVisible;
    });
    $('#home').on('click', function(){
        window.location.href='../?id=' + accId;
    });
    $('#comments').on('click', function(){
        getcomment();
    })
    $('#products').on('click', function(){
        window.location.href = '../html/showproducts.html?id=' + accId;
    })
    $('#contact').on('click', function(){
        window.location.href = '../?id=' + accId + '&type=' + encodeURIComponent('contact');

    })
});