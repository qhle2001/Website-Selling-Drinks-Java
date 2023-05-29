const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const comment = document.querySelector('#list-comment')
const commentItem = document.querySelectorAll('#list-comment .item')
const user = document.getElementById('user')
var translateY = 0
var count = commentItem.length
var imgs = ["../img/bg2.png", "../img/bg3.png",
                        "../img/bg4.png", "../img/bg5.png"];
var element = document.getElementById("banner");

var sanpham = document.getElementById("Sản-phẩm");
var myListproducts = document.getElementById("myListproducts");

document.addEventListener("DOMContentLoaded", function() {

    sanpham.addEventListener("mouseover", function() {
        myListproducts.style.display = "block";
    });

    sanpham.addEventListener("mouseout", function() {
        myListproducts.style.display = "none";
    });
});

var index = 1;
function changeBackground(){
    element.style.backgroundImage = "url('" + imgs[index] + "')";
    index++;
    if(index == 4){
        index = 0;
    }
}
setInterval(changeBackground, 5000);

next.addEventListener('click', function (event) {
    event.preventDefault()
    if (count == 1) {
        // Xem hết bình luận
        return false
    }
    translateY += -400
    comment.style.transform = `translateY(${translateY}px)`
    count--
})

prev.addEventListener('click', function (event) {
    event.preventDefault()
    if (count == 3) {
        // Xem hết bình luận
        return false
    }
    translateY += 400
    comment.style.transform = `translateY(${translateY}px)`
    count++
})