const bar=document.querySelector("#bar");
const nav=document.getElementById("navbar");
const close=document.querySelector("#close");
var mainimg = document.querySelector("#mainImg");
var small_img = document.querySelectorAll(".small-img");
let pbtn2=document.querySelector("#p-batn2");
let addToCart=document.getElementsByClassName("add-to-cart");
let cart=document.querySelector('.Cart');
let shopingicon=document.querySelector('.shoping');
let price=document.getElementsByClassName('price');
let closeCart=document.getElementById("close-cart");







bar.addEventListener('click',()=>{
    nav.classList.add('active');
})

close.addEventListener('click',()=>{
    nav.classList.remove('active');
})
shopingicon.addEventListener('click',()=>{
 cart.classList.toggle('activecart')
})
closeCart.addEventListener('click',()=>{
  cart.classList.remove('activecart')
})

small_img.forEach((img) => {
  img.addEventListener("click",()=>{
    mainimg.src=img.src;
  })
});

function Ready(){

    var  removeCartButton=document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButton.length; i++) {
        const button= removeCartButton[i];
        console.log(button);
        button.addEventListener('click',removeCartIteam)
    }


    var quantityInput=document.getElementsByClassName("cart-quantity");
      for (var i = 0; i < quantityInput.length; i++) {
        var input=quantityInput[i];
        input.addEventListener("change",quantityChanged);
}
  var addToCart=document.getElementsByClassName("add-to-cart");
    for (var i = 0; i < addToCart.length; i++) {
   var button=addToCart[i];
   button.addEventListener("click",addCartClicked)
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonclicked);
};

function addCartClicked(event){
  var button=event.target;
  var shopProducts=button.parentElement;
      var title=shopProducts.getElementsByClassName("title-product")[0].innerText;
          var price=shopProducts.getElementsByClassName("price")[0].innerText;
          var productImage=shopProducts.getElementsByClassName("img")[0].src;
          addProductToCart(title,price,productImage);
          updatetotal();
  };


  function addProductToCart(title,price,productImg){
    var cartShopBox=document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems=document.getElementsByClassName('cart-content')[0]
    var cartItemNames=cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerHTML==title){
            alert("you have already add this iteam to cart");
            return;
        }
      
    }
    
    var cartBoxContent=`
                <img src="${productImg}" alt="" class="cart-img" />
                  <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input
                      type="number"
                      name=""
                      id=""
                      value="1"
                      class="cart-quantity"
                      min="1"
                    />
                  </div>
                  <i class="fa-solid fa-trash cart-remove"></i>
    `;
    
    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartIteam)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged)
    }
    




function quantityChanged(event){
  var input=event.target
  if((isNaN(input.value) || input.value<=0)){
      input.value=1;
  }
  updatetotal();
}


function buyButtonclicked(){
  alert(`your order has been placed`);
  let counter=document.querySelector('.counter');
  counter.innerText=0;
  var cartcontent=document.getElementsByClassName('cart-content')[0];
  while(cartcontent.hasChildNodes()){
      cartcontent.removeChild(cartcontent.firstChild);
  }
  updatetotal();
}

function updatetotal(){
  var cartcontent=document.getElementsByClassName("cart-content")[0];
  var cartBoxes=cartcontent.getElementsByClassName("cart-box")
  var total=0;
  for(i=0;i<cartBoxes.length;i++){
      var cartBox=cartBoxes[i]
      var priceElement=cartBox.getElementsByClassName("cart-price")[0];
      var  quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
      var price=parseFloat(priceElement.innerText.replace("$",""));
      var quantity=quantityElement.value;
          total=total+(price*quantity);
          changenotificition(cartBoxes.length)
      }
      document.getElementsByClassName("total-price")[0].innerText='$'+total;
  
      function changenotificition(length){
        let counter=document.querySelector('.counter');
        counter.innerText=length;
      }
}


function removeCartIteam(event){
  var buttonOnClick=event.target;
  buttonOnClick.parentElement.remove();
  updatetotal();
  
};

Ready();


console.log(cart);