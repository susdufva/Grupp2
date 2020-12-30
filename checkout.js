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
                <img class="imgCO" src="img/${item.tag}.jpg"/>
                <span class="nameCO">${item.name}</span>
            </div>    
            `;
        });
        
        productContainerCO.innerHTML +=`
            <div class="TotalContainerCO">
                <h4 class="TotalTitleCO">
                    Att betala:
                </h4>
                <h4 class="AttBetalaCO">
                    ${cartCost} sek
                </h4>
            </div>
        `;
    }
}

function checkout () {
    let checkoutForm = document.forms["checkoutForm"] ["fname"].value
    if (checkoutForm == null || contactForm == "") {
        alert("Du måste fylla i ditt namn");
        return false;
    }
}


displayCartCO();

