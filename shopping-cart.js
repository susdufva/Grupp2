let carts = document.querySelectorAll('.add-cart');

let products =[{

    name: "Tacos",
    tag: "tacos",
    price: 100,
    inCart: 0, 
},
{
    name: "Produktnamn",
    tag: "",
    price: 5,
    inCart: 0,
}]

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
//För att veta hur många gånger man lägger till saker i cart
function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    
    //LocalStorage är en string så omvandlade den till siffror 
    productNumbers = parseInt(productNumbers);

    if( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers' , 1)
        document.querySelector('.cart span').textContent = 1;
    }   

    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
   
    if(cartItems != null){

        if(cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart +=1;
    } else {
    product.inCart = 1;

    cartItems = {
        [product.name]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
//Gör så att cart numret inte raderas 
function LoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price); 
    } else{
    localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="trash-outline"></ion-icon>
                <img src="img/${item.tag}.jpg"/>
                <span>${item.name}</span>
            </div>
            <div class="price">
                ${item.price}sek
            </div>    
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                ${item.inCart * item.price}sek
            </div>
            
            `;
        });

        productContainer.innerHTML +=`
            <div class="TotalContainer">
                <h4 class="TotalTitle">
                    Att betala:
                </h4>
                <h4 class="AttBetala">
                    ${cartCost} sek
                </h4>
            </div>
        `
        deleteBtn();
    }
}
/*Delete knapp kolla med Rakib
function deleteBtn() {
    let deleteBtn = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {
            productName = deleteBtn[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));
            
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();  
            LoadCartNumbers();
        })
    }
}
*/
//LoadCartNumbers funktion kommer aldrig att funka om man inta kallar på det så där av 
LoadCartNumbers();
displayCart();