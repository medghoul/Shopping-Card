// open & close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// start when the document is ready

if(document.readyState == "loading"){
document.addEventListener('DOMContentLoaded', start);
     }else {
    start();
}
//----- START-----
function start(){
    addEvents();

}

//------UPDATE & RERENDER------
function update(){
    addEvents();
    updateTotal();

}
//-------ADD EVENTS--------
function addEvents(){
    //remove items from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });
    //change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });
    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem)
        
    });
    // Buy order (paiment)
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);

    //heart animation
  
}
//------- HANDLE EVENTS FUNCTIONS-------
let itemsAdded = []
         // insert produit a la cart
function handle_addCartItem() {  
    let product = this.parentElement;
    let title = product.querySelector(" .product-title").innerHTML;
    let price = product.querySelector(" .product-price").innerHTML;
    let imgSrc = product.querySelector(" .product-img").src;
    //

    let newToAdd = {
        title,
        price,
        imgSrc,
    };
    // handle item is already exist (Alert this produit deja existe)
    if(itemsAdded.find((el) => el.title == newToAdd.title)){
        alert("this Item Is Already Exist!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }
    // Add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

       update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        el=>el.title !=
        this.parentElement.querySelector('.cart-product-title').innerHTML 
        );
    
        update();
    
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // to keep it integer
    update();
}

function handle_buyOrder(){
    if(itemsAdded.length <= 0){
        alert("there is No Order place yet! \ Please Make an order first.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content"); // alert comande successfully
    cartContent.innerHTML='';
    alert ("Your Order is Placed Successfully :)");
    itemsAdded = [];

    update();
}

//----UPDATE & RERENDER function--------

function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(" .total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;


    });

    total = total.toFixed(2);

    totalElement.innerHTML = "$" +total;
}

//--------HTML COMPONENTS----------

function CartBoxComponent(title, price, imgSrc){
    return `
    <div class="cart-box">
                    <img src= ${imgSrc} alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number"  value= "1"  class="cart-quantity">
                    </div>
                       <!--Remove cart-->
                    <i class='bx bxs-trash cart-remove'></i>

                </div> `;
}


// heart animation
const button = document.querySelectorAll(".heart-like-button");
 button.forEach((button)=>{
    
    button.addEventListener("click",()=>{

        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            button.textContent = "Liked";
            
            } else {
            button.classList.add("liked");
            
            }

        
    
    });
 });
    





