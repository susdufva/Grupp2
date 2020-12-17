const loginForm = document.querySelector("#login");
const dropbtn = document.querySelector(".dropbtn");
let productList = document.querySelector(".product-list");
const body = document.body;
const main = document.querySelector("main");


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

let wrong = document.createElement("p");
wrong.classList.add('wrong');

function logIn(){

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if(username == "admin" && password == "admin"){
        
        document.querySelector(".dropbtn").innerText = "Logga ut";
        adminRights();

        adminLoggedIn = true;   //Sets admin logged in status to true

        //Toggles .dropdown-login for CSS, to display dropdown menu when logged out 
        document.querySelector(".dropdown").classList.toggle("dropdown-login"); 
        
    } else {
        wrong.innerText = "Fel användarnamn eller lösenord"
        var div = document.querySelector(".login-box");
            div.appendChild(wrong);
    }

}

//Psuedo-logout
let logOut = function(){   

    //Removes button that creates new products
    let newProductForm = document.querySelector(".new-product");
    newProductForm.remove();

    //Changes button text to "Logga in"
    document.querySelector(".dropbtn").innerHTML = "Logga in";

    //Removes admin buttons from all products
    let buttonWrappers = document.querySelectorAll(".button-wrapper");
    for (let i=buttonWrappers.length-1; i>=0; i--){
        buttonWrappers[i].remove();
    }

    //Removes image search from all products
    let imgSearchAll = document.querySelectorAll(".search-img");
    for (let i=imgSearchAll.length-1; i>=0; i--){
        imgSearchAll[i].remove();
    }

    document.querySelector(".dropdown").classList.toggle("dropdown-login");     //Toggles .dropdown-login for CSS, to not display dropdown menu when logged out

    adminLoggedIn = false;  //Sets admin logged in status to false
};

//Function creating new product cards from form inputs
let newProductMaker = function(name, description, price) {
   
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

    //Appends 'remove' and 'edit' button to new product
    productCard.appendChild(adminButtonsMaker());

    //Appends Unsplash img search to new product
    productCard.appendChild(imgSearchMaker());

    //Appends product card into product list
    productList.appendChild(productCard);
}


//Function to run admin rights
let adminRights = function() {

    createNewProductBtn();  //Adds button to add new product

    let productCards = document.querySelectorAll(".product-card");

    for (let i=0; i<productCards.length; i++){
        //Adds 'remove' and 'edit' buttons to all products
        productCards[i].appendChild(adminButtonsMaker());
    }

    //Adds img search to all products
    for (i=0; i<productCards.length; i++){
        productCards[i].appendChild(imgSearchMaker());
    }
}

//Create button that adds new products and prepend it into main
function createNewProductBtn(){
    
    let newProductBtn = document.createElement("button");
    newProductBtn.classList.add("new-product");
    newProductBtn.innerText = "Lägg till ny produkt";

    newProductBtn.addEventListener("click", newProductMaker);

    main.prepend(newProductBtn);
}

//Creates admin 'delete' and 'edit' button. Returns div containing new buttons.
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

    //Adds event to button to set new innerText to product info elements: name, description, price
    //1st parent is button wrapper, 1st previous sibling is 'add to cart'-button, 2nd previous sibling is 'product info'-wrapper
    editBtn.addEventListener("click", function(){
        
        //Create form for editing product info
        let form = document.createElement("form");
        form.classList.add("edit-form");

        
        //Create inputs to form
        function inputMaker(placeholder, id){
            
            //New input with 'id' attribute
            let input = document.createElement("input");
            let idAtt = document.createAttribute("id");
            let phAtt = document.createAttribute("placeholder");
            phAtt.value = placeholder;
            input.setAttributeNode(phAtt);
            idAtt.value = id;
            input.setAttributeNode(idAtt);

            form.appendChild(input);
        }

        //Creating new inputs with labels to form
        inputMaker("Ange nytt produktnamn", "new-name");
        inputMaker("Ange ny produktbeskrivning", "new-description");
        inputMaker("Ange nytt pris", "new-price");

        //Create submit button for form
        let submit = document.createElement("button");
        submit.innerText = "Spara";
        form.appendChild(submit);


        //Save edited product info
        form.addEventListener("submit", (e)=>{
            e.preventDefault();

            //Change values of product info innertexts to submitted input values
            productInfoDiv.querySelector(".product-name").innerText = productInfoDiv.querySelector("#new-name").value;
            productInfoDiv.querySelector(".product-description").innerText = productInfoDiv.querySelector("#new-description").value;
            productInfoDiv.querySelector(".product-price").innerText = productInfoDiv.querySelector("#new-price").value;

            //Remove form after submit
            form.remove();
        })

        let productInfoDiv = editBtn.parentNode.previousElementSibling.previousElementSibling;
        productInfoDiv.appendChild(form);

        // editBtn.parentNode.previousElementSibling.previousElementSibling.querySelector(".product-price").innerText = prompt("Pris: ");
    });

    //Appends buttons to button wrapper
    btnWrapper.appendChild(delBtn);
    btnWrapper.appendChild(editBtn);

    /*New button wrapper
    <div class="button-wrapper">
        <button class="delete-btn">Ta bort</button>
        <button class="edit-btn">Redigera</button>
    </div>*/

    return btnWrapper;
}

//Add image feature. Returns form that searches for Unsplash image
function imgSearchMaker(){

    let form = document.createElement("form"); //New form
    form.classList.add("search-img");          //Add class .search-img

    let input = document.createElement("input"); //New input
    input.classList.add("search-input");         //Add class .search-input
    form.appendChild(input);                     //Appends input into form

    let btn = document.createElement("button"); //New button
    btn.innerText = "Sök bild";                 //Add innertext
    form.appendChild(btn);                      //Appends button into form

    /*New form structure
    <form class="add-img">
        <input class="search-input"></input>
        <button>Sök bild</button>
    </form>
    */

    //Adds submit-event to form
    form.addEventListener("submit", function(e){
        //Prevents default submit behaviour
        e.preventDefault();

        //Removes images from previous search
        let imgWrapper = document.querySelector(".img-wrapper");
        if(main.contains(imgWrapper)){
            imgWrapper.remove();
        }

        let searchInput = form.querySelector(".search-input");
        createImages(searchInput.value, form.parentNode); //Passes img search input value into imgSearchMaker-function
        
    });

    return form;
}


const apiKey = "6-3PNroGSJbutp9OVfXlkcHpuVysAesfEXAK4R-9vvc"    //50 requests allowed per hour for this API-key. If 0/50 requests remaining, try to another Unsplash API-key.

//Gets data from Unsplash API and creates 10 (default amount) images into .image-wrapper
async function createImages(search, ancestorNode) {
    let url = `https://api.unsplash.com/search/photos?query=${search}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    //Creates div to wrap images
    let imgWrapper = document.createElement("div");

    imgWrapper.classList.add("img-wrapper");

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

            //Change product picture to this clicked picture
            let image = ancestorNode.querySelector(".product-img")
            console.log(image);
            image.setAttribute("src", src.value);
            image.setAttribute("alt", alt.value);

            //After changing image, close wrapper for suggested images
            ancestorNode.querySelector(".img-wrapper").remove();

            //Clear value from img search input
            ancestorNode.querySelector(".search-input").value = "";
        })

        //Appends image into .img-wrapper
        imgWrapper.appendChild(img);
    }

    ancestorNode.prepend(imgWrapper);
}