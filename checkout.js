function displayCartCO(){
    let COItems = localStorage.getItem("productsInCart");
    COItems = JSON.parse(COItems);

    let productContainerCO = document.querySelector(".checkout-cart");
    let cartCost = localStorage.getItem('totalCost');

    if(COItems && productContainerCO) {
        productContainerCO.innerHTML = '';
        Object.values(COItems).map((item, checkout) =>{
            productContainerCO.innerHTML += `
            <div class="cartCO"> 
                <h4>Cart</h4>
                <img src="img/${item.tag}.jpg"/>
                <span>${item.name}</span>
                <h4> 
                    ${cartCost} sek
                </h4>
            </div>    `;
        });
    }
}
displayCartCO();        