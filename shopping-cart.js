let carts = document.querySelectorAll('.add-cart');
//Malins kort 
let products =[]

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers();
    })
}
//För att veta hur många gånger man lägger till saker i cart
function cartNumbers(){
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
}
//Gör så att cart numret inte raderas 
function LoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
//LoadCartNumbers funktion kommer aldrig att funka om man inta kallar på det så där av 
LoadCartNumbers();
