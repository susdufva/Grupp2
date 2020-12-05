let productList = document.querySelector(".product-list");

let adminLoggedIn = false; //Status of admin logged in or logged out. Default is false, logged out.

//Function creating form that admin uses to add new products
let addForm = function() {

    let form = document.createElement("form");  //New form
    form.classList.add("new-product");         //Adds class .new-product
    
    let inputMaker = function(inputId, elementContent){
        let label = document.createElement("label");      //New label
        label.innerText = elementContent;                 //Set label content
        let textInput = document.createElement("input");  //New input

        //Create label attribute 'for'
        let attFor = document.createAttribute("for");
        //Set attribute value
        attFor.value = inputId;
        //Add attribute to label
        label.setAttributeNode(attFor);
        //Create input attribute 'type' and 'id'
        let attType = document.createAttribute("type");
        let attId = document.createAttribute("id");
        //Set attribute value
        attType.value = "text";
        attId.value = inputId;
        //Add atttribute to input
        textInput.setAttributeNode(attType);
        textInput.setAttributeNode(attId);

        //Inserts label and text-input into form
        form.appendChild(label);
        form.appendChild(textInput);
    }

    //Creats labels and inputs to form with id and innertext of the arguements
    inputMaker("new-product__name", "Namn");
    inputMaker("new-product__description", "Beskrivning");
    inputMaker("new-product__price", "Pris");

    let addBtn = document.createElement("button");  //Button for form
    addBtn.innerText = "Lägg till";
    
    form.appendChild(addBtn);

    //Add event listener to new form
    form.addEventListener("submit", function(e){
        e.preventDefault(); //Prevents default submit behavior

        console.log("supposed to create new product from inputs")
        let newProductName = document.querySelector("#new-product__name");                  //New product name
        let newProductDescription = document.querySelector("#new-product__description");    //New product description
        let newProductPrice = document.querySelector("#new-product__price");                //New product price
        
        // Creating new product with form inputs as arguments for function newProduct(name, price, description)
        newProduct(newProductName.value, newProductDescription.value, Number(newProductPrice.value));

        createAdminButtons();

    });


    document.querySelector("main").prepend(form); //Adds form before first child of main

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
    productImg.setAttributeNode(att);                 //Add attribute to image

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

//Pseudo-login-button click-event
document.querySelector(".admin-login").addEventListener("click", function(){

    //Check admin is logged out
    if (adminLoggedIn == false){
    
        //Login input
        let username = prompt("Enter username: ");
        let password = prompt("Enter password: ");

        //Check if login is valid
        if (username=="admin" && password=="admin"){
            document.querySelector(".admin-login").innerText = "Logga ut";      //Changes button text to 'Logga ut'
            addForm(); //Adds form to create products
            adminRights();                                                      //Runs admin rights
            adminLoggedIn = true;                                               //adminLoggedIn switched to true
        } else {
            alert("Wrong username/password");                                   //If login is invalid, alert user
        }

    } else if (adminLoggedIn == true){
        logOut();
    }

});


let adminRights = function() {

    createAdminButtons();
}

//Adds admin 'remove' and 'edit' buttons for existing products
let createAdminButtons = function(){
    //Add buttons for all existing objects if admin is logged out when logging in
    for (let i=0; i<document.querySelectorAll(".product-card").length; i++){

        //Inserts button wrapper to product card
        if (document.querySelectorAll(".product-card")[i].classList.contains("button-wrapper") == false){
            document.querySelectorAll(".product-card")[i].appendChild(adminButtonCreator());
        }
    }
}

//Should remove all admin-buttons, and the form to create new products, and change log out button text
let logOut = function(){
    //Removes form
    document.querySelector(".admin-login").innerHTML = "Logga in som admin";

    document.querySelector(".new-product").remove();

    //Remove all admin buttons from products


    //Set admin logged in status to false
    adminLoggedIn = false;
};

let adminButtonCreator = function(){
    //Creates a div to wrap both buttons
    let btnWrapper = document.createElement("div");
    btnWrapper.classList.add("button-wrapper");

    //Creates button that can remove current product card
    let delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.innerText = "Remove product";
    
    //Adds event to button to remove current product-card
    delBtn.addEventListener("click", function(){
        delBtn.parentNode.parentNode.remove();    
    });
    
    //Add button that can edit product info of the product card containing this edit button
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "Edit product";

    //Adds event to button to set new innerText to product info: name, description, price
    editBtn.addEventListener("click", function(){
        editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-name").innerText = prompt("New name: ");
        editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-description").innerText = prompt("New description: ");
        editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-price").innerText = prompt("New Price: ");
    });


    btnWrapper.appendChild(delBtn);
    btnWrapper.appendChild(editBtn);

    return btnWrapper;

}
