/*$(document).ready(function() {
    $('.cart-btn-focus').click(function() {
        $('.cart_list').toggleClass('active');
        $('i.cart-btn').toggleClass('active');
    });
});*/

/*const deactive_cart=document.querySelector(".cart_list");
document.addEventListener("click", function(event){
    if(event.target.closest(".cart-btn-focus"))
    {
        deactive_cart.classList.add("active");
        return;
    }
    deactive_cart.classList.add("deactive");
})*/

/*
    Demo for this article:
    http://blustemy.io/detecting-a-click-outside-an-element-in-javascript/
*/

document.addEventListener("click", (evt) => {
    //const deactive_cart = document.getElementById("cart-btn-click");
    const deactive_cart_menu = document.getElementById("cart_list_focus");
    const deactive_cart_item = document.getElementById("cart-item");
        if (event.target.closest(".cart-btn-focus")) {
            deactive_cart_menu.style.display="block";
            deactive_cart_item.style.backgroundColor="rgb(243, 241, 241)";
            return;
        }
        deactive_cart_menu.style.display="none";
        deactive_cart_item.style.background="none";
});

document.addEventListener("click", (evt) => {
    //const deactive_heart = document.getElementById("heart-btn-click");
    const deactive_heart_menu = document.getElementById("heart_list_focus");
    const deactive_heart_item = document.getElementById("heart-item");
    if (event.target.closest(".heart-btn-focus")) {
        deactive_heart_menu.style.display="block";
        deactive_heart_item.style.backgroundColor="rgb(243, 241, 241)";
        return;
    }
    deactive_heart_menu.style.display="none";
    deactive_heart_item.style.background="none";
});

document.addEventListener("click", (evt) => {
    const deactive_authe_menu = document.getElementById("option-show-auth");
    if (event.target.closest(".container-name-user")) {
        deactive_authe_menu.style.display="block";
        return;
    }
    deactive_authe_menu.style.display="none";
});