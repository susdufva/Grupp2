//Form variables
const NEW_PRODUCT = document.querySelector("#new-product");                             //New product form
const NEW_PRODUCT_NAME = document.querySelector("#new-product__name");                  //New product name
const NEW_PRODUCT_PRICE = document.querySelector("#new-product__price");                //New product price
const NEW_PRODUCT_DESCRIPTION = document.querySelector("#new-product__description");    //New product description

let productList = document.querySelector(".product-list");

let adminLoggedIn = false; //Status of admin logged in or logged out. Default is false, logged out.

//Function creating form that admin uses to add new products
let addForm = function() {

    
}


//Function creating new product elements from form inputs
let newProduct = function(name, description, price) {
   
    //Creating new product card
    let productCard = document.createElement("div");  //Div-card to wrap product content
    productCard.classList.add("product-card");        //Adds class .product-card

    //Creates image
    let productImg = document.createElement("img");   
    productImg.classList.add("product-img");          //Adds class .product-img
    let att = document.createAttribute("alt");        //Create alt attribute
    att.value = "Produktbild";                        //Set attribute
    productImg.setAttributeNode(att);                     //Add attribute to image

    let productInfo = document.createElement("div");  //Div to wrap product info
    productInfo.classList.add("product-info");        //Adds class .product-info

    //Creates span, class and content
    let productName = document.createElement("span"); //Span for product name
    productName.classList.add("product-name");        //Adds class .product-name
    productName.innerText = name;                     //Adds content 'name' from input

    let productDescription = document.createElement("span"); //Span for product description
    productDescription.classList.add("product-description"); //Adds class .product-description
    productDescription.innerText = description;              //Adds content 'description' from input

    let productPrice = document.createElement("span");  //Span for product price
    productPrice.classList.add("product-price");        //Adds class .product-price 
    productPrice.innerText = price;                     //Adds content 'price' from input

    //Creates 'add to cart'-button
    let addToCart = document.createElement("button");
    addToCart.classList.add("add-cart");                //Adds class .add-cart
    addToCart.innerText = "Lägg till i kundvagn";       //Adds button text


    //Inserts spans to the product info wrapper
    productInfo.appendChild(productName);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productPrice);

    //Inserts image into product card
    productCard.appendChild(productImg);

    //Inserts product info wrapper into the product card
    productCard.appendChild(productInfo);

    productCard.appendChild(addToCart);

    //Inserts card into product list
    productList.appendChild(productCard);

}

//Adds submit event to NEW_PRODUCT form
NEW_PRODUCT.addEventListener("submit", function(e){
    e.preventDefault();     //Prevents default submit behavior

    //Creating new product with form inputs as arguments for function newProduct(name, price, description)
    newProduct(NEW_PRODUCT_NAME.value, NEW_PRODUCT_DESCRIPTION.value, Number(NEW_PRODUCT_PRICE.value));
});

//Pseudo-login-button click-event
document.querySelector(".admin-login").addEventListener("click", function(){

    //Check admin is logged out
    if (adminLoggedIn == false){
    
        //Login input
        let username = prompt("Enter username: ");
        let password = prompt("Enter password: ");

        //Check if login is valid
        if (username=="admin" && password=="admin"){
            adminLoggedIn = true;                                               //adminLoggedIn switched to true
            document.querySelector(".admin-login").innerText = "Logga ut";      //Changes button text to 'Logga ut'
            adminRights();                                                      //Runs admin rights
        } else {
            alert("Wrong username/password");                                   //If login is invalid, alert user
        }

    } else if (adminLoggedIn == true){
        adminLoggedIn = false;
        document.querySelector(".admin-login").innerHTML = "Logga in som admin";
    }

});

//Function to enable admin rights. Should create buttons to remove and edit products in product list. Should also create form to create new products.
let adminRights = function() {
    for (i=0; i<document.querySelectorAll(".product-card").length; i++){

        //Creates a div to wrap both buttons
        let btnWrapper = document.createElement("div");
        btnWrapper.classList.add("button-wrapper");
        document.querySelectorAll(".product-card")[i].appendChild(btnWrapper);

        //Add button that can remove current element
        let delBtn = document.createElement("button");
        delBtn.classList.add("delete-btn");
        let delBtnContent = document.createTextNode("Remove product");
        delBtn.appendChild(delBtnContent);
        
        //Removes current .product-card
        delBtn.addEventListener("click", function(){
            delBtn.parentNode.parentNode.remove();      
        });
        
        document.querySelectorAll(".button-wrapper")[i].appendChild(delBtn);

        //Add button that can edit product info of the product card containing this edit button
        let editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        let editBtnContent = document.createTextNode("Edit product");
        editBtn.appendChild(editBtnContent);

        //Sets new innerText to product info: name, description, price
        editBtn.addEventListener("click", function(){
            editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-name").innerText = prompt("New name: ");
            editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-description").innerText = prompt("New description: ");
            editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-price").innerText = prompt("New Price: ");
        });

        document.querySelectorAll(".button-wrapper")[i].appendChild(editBtn);
    }

}