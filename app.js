const loginForm = document.querySelector("#login");
const dropbtn = document.querySelector(".dropbtn");
let productList = document.querySelector(".product-list");


let adminLoggedIn = false; 

//Adds login function to login form
loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    if (adminLoggedIn == false){        //If logged out,
        logIn();                        //log in
    }

});

//Adds logout function to logout button
dropbtn.addEventListener("click", function(){
    if (adminLoggedIn == true){         //If logged in,
        logOut();                       //log out
    }
});


function logIn(){
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if(username == "admin" && password == "admin"){
        console.log("testa login")
        
        document.querySelector(".dropbtn").innerText = "Logga ut";
        adminRights();

        adminLoggedIn = true;   //Sets admin logged in status to true

        document.querySelector(".dropdown").classList.toggle("dropdown-login"); //Toggles .dropdown-login for CSS, to display dropdown menu when logged out
        
    } else {
        let wrong = document.createElement("p");
        wrong.innerText = "Fel användarnamn eller lösenord"
        var div = document.querySelector(".login-box");
        div.appendChild(wrong);
    }

}

//Psuedo-logout
let logOut = function(){

    //Removes admin-related elemnts on logout, if such element exists
    if (document.querySelectorAll(".new-product").length>0){
        document.querySelector(".new-product").remove();
    }
    
    if (document.querySelectorAll(".img-wrapper").length>0){
        document.querySelector(".img-wrapper").remove();
    }

    if (document.querySelectorAll(".new-img").length>0){
        document.querySelector(".new-img").remove();
    }

    //Changes button text to "Logga in"
    document.querySelector(".dropbtn").innerHTML = "Logga in";          

    //Removes admin buttons from all products
    for (let i=document.querySelectorAll(".button-wrapper").length - 1; i>=0; i--){
        document.querySelectorAll(".button-wrapper")[i].remove();
    }

    document.querySelector(".dropdown").classList.toggle("dropdown-login");     //Toggles .dropdown-login for CSS, to not display dropdown menu when logged out

    adminLoggedIn = false;  //Sets admin logged in status to false
};


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
        addAdminButtons();  

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
    addToCart.innerText = "Lägg till i kundvagn";       //Sets innertext
    addToCart.addEventListener('click', () =>{          //Adds eventlistener
            cartNumbers();
    });

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


//Function to run admin rights
let adminRights = function() {
    addForm();              //Adds form to create products
    addAdminButtons();      //Adds admin buttons to products
    document.querySelector("main").prepend(imgSearchMaker());   //Add image search in main
}


//Adds admin 'remove' and 'edit' buttons for existing products
let addAdminButtons = function(){
    //Adds admin buttons for current product cards when admin logs in
    for (let i=0; i<document.querySelectorAll(".product-card").length; i++){

        //Inserts button wrapper for admin buttons to product card only if product card doesn't contain such button wrapper already
        if (!document.querySelectorAll(".product-card")[i].contains(document.querySelectorAll(".button-wrapper")[i])){
            document.querySelectorAll(".product-card")[i].appendChild(adminButtonsMaker());
        }
    }
}


//Creates admin buttons
let adminButtonsMaker = function(){

    //Creates a div to wrap both buttons
    //<div class="button-wrapper"></div>
    let btnWrapper = document.createElement("div");             //New div element
    btnWrapper.classList.add("button-wrapper");                 //Adds class .button-wrapper

    //Button to remove current product card
    //<button class="delete-btn">Ta bort</button>
    let delBtn = document.createElement("button");              //New div element
    delBtn.classList.add("delete-btn");                         //Adds class .delete-btn
    delBtn.innerText = "Ta bort";                               //Sets innertext
    
    //Adds event to button to remove current product-card
    delBtn.addEventListener("click", function(){
        delBtn.parentNode.parentNode.remove();                  //1st parent is button wrapper, 2nd parent is product-card
    });
    
    //Button to edit product info of current product card
    //<button class="edit-btn">Redigera</button>
    let editBtn = document.createElement("button");             //New div element
    editBtn.classList.add("edit-btn");                          //Adds class .edit-btn
    editBtn.innerText = "Redigera";                             //Sets innertext

    //Form to add/change image of current product card
    let imgForm = document.createElement("form");
    imgForm.classList.add(".img-form");

    //Input to img form
    let imgUrl = document.createElement("input");
    imgUrl.classList.add("img-url");
    let placeholder = document.createAttribute("placeholder");
    placeholder.value = "Ange URL";
    imgUrl.setAttributeNode(placeholder);
    
    imgForm.appendChild(imgUrl);

    // Button to add or change image of current product card
    // <button class="img-btn">Ändra bild</button>
    let imgBtn = document.createElement("button");
    imgBtn.classList.add("img-btn");
    imgBtn.innerText ="Ändra bild";
    

    imgForm.appendChild(imgBtn)

    imgForm.addEventListener("submit", function(e){

        e.preventDefault();

        let currentImg = imgBtn.parentNode.parentNode.parentNode.firstElementChild; //Img of current card
        console.log(currentImg);

        currentImg.setAttribute("src", imgUrl.value);
        // currentImg.setAttribute("src", imgSuggest());

        imgUrl.value = "";

        console.log("Clicking this button should change img of current product card to img of url input");
    });

    //Adds event to button to set new innerText to product info elements: name, description, price
    //1st parent is button wrapper, 1st previous sibling is 'add to cart'-button, 2nd previous sibling is 'product info'-wrapper
    editBtn.addEventListener("click", function(){
        editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-name").innerText = prompt("Produktnamn: ");
        editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-description").innerText = prompt("Produktbeskrivning: ");
        editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-price").innerText = prompt("Pris: ");
    });

    //Appends buttons to button wrapper
    btnWrapper.appendChild(delBtn);
    btnWrapper.appendChild(editBtn);
    btnWrapper.appendChild(imgForm);

    /*New button wrapper
    <div class="button-wrapper">
        <button class="delete-btn">Ta bort</button>
        <button class="edit-btn">Redigera</button>
    </div>*/

    return btnWrapper;
}

//-------------------------
//Add image feature

function imgSearchMaker(){

    //<form class="add-img"></form>
    let form = document.createElement("form"); //New form
    form.classList.add("new-img");             //Add class .new-img

    //<input class="search-input"></input> (default type is 'text')
    let input = document.createElement("input"); //New input
    input.classList.add("search-input");          //Add class .search-input
    form.appendChild(input);                     //Appends input into form

    //<button></button>
    let btn = document.createElement("button"); //New button
    btn.innerText = "Sök bild";
    form.appendChild(btn);                      //Appends button into form

    /*New form structure
    <form class="add-img">
        <input class="search-input"></input>
        <button>Sök bild</button>
    </form>
    */


    //Adds submit-event to form
    form.addEventListener("submit", function(e){
        e.preventDefault();             //Prevents default submit behaviour
        
        let searchInput = form.querySelector(".search-input").value;

        removeImages(); //Removes images from last search

        createImages(searchInput); //Uses query input value as argument in imgSearchMaker-function
        
    });

    return form;

}

function removeImages(){

    if(document.querySelector("main").contains(document.querySelector(".img-wrapper"))){
        document.querySelector(".img-wrapper").remove();
    }
    // for(i=document.querySelectorAll(".img-suggestion").length; i>=document.querySelectorAll(".img-suggestion").length; i--){

    //     if(document.querySelectorAll(".img-suggestion").length>0){                //Check first if there are at least one element with class .img-suggestion
    //         document.querySelectorAll(".img-suggestion")[i-1].remove();           //Remove element with class .img-suggestion
    //     }
    // }
}



const apiKey = "6-3PNroGSJbutp9OVfXlkcHpuVysAesfEXAK4R-9vvc"    //50 requests allowed per hour for this API-key. If 0/50 requests remaining, try to another Unsplash API-key.

//Gets data from Unsplash API and creates 10 (default amount) images into .image-wrapper
async function createImages(search) {
    let url = `https://api.unsplash.com/search/photos?query=${search}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    //Creates div to wrap images
    let imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");
    // document.body.appendChild(imgWrapper);

    for (i=0; i<data.results.length; i++){
        console.log(data.results[i].urls.small);

        let img = document.createElement("img");     //New img
        img.classList.add("img-suggestion");         //Adds class .img-suggestion

        //Sets img src
        let src = document.createAttribute("src");   //New attribute
        src.value = data.results[i].urls.small;      //Adds img src

        //Sets img alt
        let alt = document.createAttribute("alt");   //New attribute
        alt.value = data.results[i].alt_description; //Adds img alt

        //Adds 'src' and 'alt' attributes to img
        img.setAttributeNode(src);
        img.setAttributeNode(alt);

        /*New img
        <img src=src.value alt=alt.value>
        */

        //Clicking on an image makes it the new product image
        img.addEventListener("click", function(e){
            // imgSuggest();
        })

        //Appends image into .img-wrapper
        imgWrapper.appendChild(img);

    }

    document.querySelector("main").prepend(imgWrapper);

}