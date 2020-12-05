//Variable declarations
let productList = document.querySelector(".product-list");

let adminLoggedIn = false; //Status of admin logged in or logged out. Default is false, logged out.


//Creates form that admin uses to add new products
let addForm = function() {

    //Creating new element nodes:

    //<form class="new-product"></form>
    let form = document.createElement("form");
    form.classList.add("new-product");
     
    //Creates label and input elements and appends them into form
    let inputMaker = function(elementContent, attributeValue){

        //<label for="attributeValue">elementContent</label>
        let label = document.createElement("label");      //New label element
        label.innerText = elementContent;                 //Sets innertext
        let attFor = document.createAttribute("for");     //New attribute
        attFor.value = attributeValue;                    //Sets attribute value
        label.setAttributeNode(attFor);                   //Adds 'for' attribute to label element

        //<input type="text" id="attributeValue">
        let textInput = document.createElement("input");  //New input element
        let attType = document.createAttribute("type");   //New attribute
        let attId = document.createAttribute("id");       //New attribute
        attType.value = "text";                           //Sets attribute value
        attId.value = attributeValue;                     //Sets attribute value
        textInput.setAttributeNode(attType);              //Adds 'type' attribute to input element
        textInput.setAttributeNode(attId);                //Adds 'type' attribute to input element

        //Appends new label and input into form
        form.appendChild(label);
        form.appendChild(textInput);

    }

    //Makes labels & inputs and appends into form with inputMaker 
    inputMaker("Namn", "new-product__name");
    inputMaker("Beskrivning", "new-product__description");
    inputMaker("Pris", "new-product__price");

    //Creates button
    //<button>Lägg till</button>
    let addBtn = document.createElement("button");         //New button element
    addBtn.innerText = "Lägg till";                        //Sets innertext
    
    //Appends new button into form
    form.appendChild(addBtn);

    /*New form:
    <form class="new-product">
        <label for="new-product__name">Namn</label>
        <input id="new-product__name">
        <label for="new-product__description">Beskrivning</label>
        <input id="new-product__description">
        <label for="new-product__price">Pris</label>
        <input id="new-product__price">
        <button>Lägg till</button>
    </form>*/

    //Adds event listener to the form
    form.addEventListener("submit", function(e){
        e.preventDefault(); //Prevents default submit behavior

        let newProductName = document.querySelector("#new-product__name");                  //New product name
        let newProductDescription = document.querySelector("#new-product__description");    //New product description
        let newProductPrice = document.querySelector("#new-product__price");                //New product price
        
        //Creates new products using form input values as arguments for function newProduct(name, price, description)
        newProduct(newProductName.value, newProductDescription.value, Number(newProductPrice.value));

        //Adds admin buttons to the products created by newProduct
        createAdminButtons();  

    });

    //Prepends new form in main
    document.querySelector("main").prepend(form); 

}


//Function creating new product cards from form inputs
let newProduct = function(name, description, price) {
   
    //Creates product card div to wrap product content
    //<div class ="product-card"></div>
    let productCard = document.createElement("div");  //New div element
    productCard.classList.add("product-card");        //Adds class .product-card

    //Creates image
    //<img class ="product-img" alt="Produktbild">
    let productImg = document.createElement("img");   //New image element
    productImg.classList.add("product-img");          //Adds class .product-img
    let att = document.createAttribute("alt");        //New attribute
    att.value = "Produktbild";                        //Sets attribute value
    productImg.setAttributeNode(att);                 //Adds 'alt' attribute to image

    //Creates product info div to wrap product info
    //<div class="product-info"></div>
    let productInfo = document.createElement("div");  //New div element
    productInfo.classList.add("product-info");        //Adds class .product-info

    //Creates span for product name
    //<span class="product-name">name<span>
    let productName = document.createElement("span"); //New span
    productName.classList.add("product-name");        //Adds class .product-name
    productName.innerText = name;                     //Sets innertext from input value
    
    //Creates span for product description
    //<span class="product-description">description<span>
    let productDescription = document.createElement("span"); //New span
    productDescription.classList.add("product-description"); //Adds class .product-description
    productDescription.innerText = description;              //Sets innertext from input value

    //Creates span for product price
    //<span class="product-price">price<span>
    let productPrice = document.createElement("span");  //New span
    productPrice.classList.add("product-price");        //Adds class .product-price 
    productPrice.innerText = price;                     //Sets innertext from input value

    //Creates 'add to cart'-button
    //<button class="add-cart">Lägg till i kundvagn></button>
    let addToCart = document.createElement("button");   //New button
    addToCart.classList.add("add-cart");                //Adds class .add-cart
    addToCart.innerText = "Lägg till i kundvagn";       //Adds button text

    //Appends image into product card
    productCard.appendChild(productImg);

    //Appends spans to the product info wrapper
    productInfo.appendChild(productName);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productPrice);

    //Appends product info wrapper into the product card
    productCard.appendChild(productInfo);

    //Appends 'add to cart'-button to the product card
    productCard.appendChild(addToCart);

    /*New product card:
    <div class="product-card">
        <img class ="product-img" alt="Produktbild">
        <div class="product-info">
            <span class="product-name">name<span>
            <span class="product-description">description<span>
            <span class="product-price">price<span>
        </div>
        <button>Lägg till i kundvagn</button>
    </div>*/

    //Appends product card into product list
    productList.appendChild(productCard);

}


//Pseudo-login-button click-event
document.querySelector(".admin-login").addEventListener("click", function(){

    if (adminLoggedIn == false){        //If logged out,
        logIn();                        //log in

    } else if (adminLoggedIn == true){  //If logged in,
        logOut();                       //log out
    }

});


//Function to run admin rights
let adminRights = function() {
    addForm();              //Adds form to create products
    createAdminButtons();   //Adds admin buttons to products
}


//Adds admin 'remove' and 'edit' buttons for existing products
let createAdminButtons = function(){
    //Add buttons for all existing objects if admin is logged out when logging in
    for (let i=0; i<document.querySelectorAll(".product-card").length; i++){

        //Inserts button wrapper to product card if item doesn't have a button wrapper already
        if (!document.querySelectorAll(".product-card")[i].contains(document.querySelectorAll(".button-wrapper")[i])){
            document.querySelectorAll(".product-card")[i].appendChild(adminButtonCreator());
        }
    }
}

let logIn = function(){
    //Login input
    let username = prompt("Enter username: ");
    let password = prompt("Enter password: ");

    //Check if login is valid
    if (username=="admin" && password=="admin"){
        document.querySelector(".admin-login").innerText = "Logga ut";      //Changes button text to 'Logga ut'
        adminRights();                                                      //Runs admin rights
        adminLoggedIn = true;                                               //adminLoggedIn switched to true
    } else {
        alert("Wrong username/password");                                   //If login is invalid, alert user
    }
}

//Should remove all admin-buttons, and the form to create new products, and change log out button text
let logOut = function(){
    //Removes form
    document.querySelector(".admin-login").innerHTML = "Logga in som admin";
    document.querySelector(".new-product").remove();

    //Remove all admin buttons from products
    for (let i=document.querySelectorAll(".button-wrapper").length - 1; i>=0; i--){
        document.querySelectorAll(".button-wrapper")[i].remove();
    }

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
