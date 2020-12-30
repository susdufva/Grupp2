const loginForm = document.querySelector("#login");
const dropbtn = document.querySelector(".dropbtn");
const body = document.body;
const main = document.querySelector("main");

let adminLoggedIn = false;

//Product constructor
function Product (name, src, description, price, inCart){
    this.name = name;
    this.src = src;
    this.description = description; 
    this.price = price;
    this.inCart = inCart;
}

//Array storing product objects
let products =[
    new Product ("Frukosttallrik", "/img/table-2600954_640.jpg", "Kallskuret", 100, 0),
    new Product ("Pannkakor", "/img/berries-1869421_640.jpg", "Amerikanska pannkakor", 50, 0),
    new Product ("Äppelpaj", "/img/apple-pie-5479993_640.jpg", "Knäckbakad paj", 120, 0),
    new Product ("Pasta", "/img/noodle-1303003_640.jpg", "Olika pastarätter", 160, 0),
    new Product ("Hamburgare", "/img/hamburger-494706_640.jpg", "Höggrevsburgare", 200, 0),
    new Product ("Croissant", "/img/bread-4077812_640.jpg", "Franskt bakverk", 30, 0),
    new Product ("Pizza", "/img/pizza-3007395_640.jpg", "Surdegspizza", 180, 0),
    new Product ("Chokladpraliner", "/img/chocolates-1737503_640.jpg", "Hemmagjorda praliner", 45, 0),
    new Product ("Churros", "/img/churros-2188871_640.jpg", "Friterad sockrig deg", 75, 0),
    new Product ("Chiligryta","/img/food-1209007_640.jpg", "Het indonesisk gryta", 175, 0)
];

if (localStorage.getItem("savedProducts") !== null){
    updateDOMProductList()
}

//Takes data from local storage to update DOM product list
function updateDOMProductList(){
    
    //First, remove previous product list from DOM
    document.querySelector(".product-list").remove();

    //Create new product list in DOM
    let newDOMProductList = document.createElement("section");      //New element
    newDOMProductList.classList.add("product-list");                //Add class .product-list
    main.appendChild(newDOMProductList);                            //Append to main

    if (localStorage.getItem("savedProducts") === null){
    localStorage.setItem("savedProducts", JSON.stringify(products));
    }

    //Get product data from localStorage and add products to DOM product list
    let productList = localStorage.getItem("savedProducts");
    productList = JSON.parse(productList);
    for (i=0; i<productList.length; i++){
        let newProductCard = document.createElement("div");
        newProductCard.classList.add("product-card");
        newProductCard.innerHTML = `
            <img class="product-img" src="${productList[i].img}" alt="productpic">
            <div class="product-info">
                <div class="product-name">${productList[i].name}</div>
                <div class="product-description">${productList[i].description}</div>
                <div class="product-price"><span class="product-price__value">${productList[i].price}</span> <span class="product-price__currency">SEK</span></div>
            </div>
        `;

        //Creates 'add to cart'-button to product card
        let cartBtn = document.createElement("button");   //New button
        cartBtn.classList.add("add-cart");                //Adds class .add-cart
        cartBtn.innerText = "Lägg till i kundvagn";       //Sets innertext
        cartBtn.addEventListener('click', () =>{          //Adds click event

            //Add product to cart
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);
            
        }); 
        newProductCard.appendChild(cartBtn);              //Appends button to new product card

        newDOMProductList.appendChild(newProductCard);
    }
}

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
    let newProductBtn = document.querySelector(".new-product");
    newProductBtn.remove();

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

    //Remove edit form from products
    let editForms = document.querySelectorAll(".edit-form");
    for (let i=editForms.length-1; i>=0; i--){
        editForms[i].remove();
    }

    let saveChangesBtn = document.querySelector(".save-changes");
    saveChangesBtn.remove();

    document.querySelector(".dropdown").classList.toggle("dropdown-login");     //Toggles .dropdown-login for CSS, to not display dropdown menu when logged out

    adminLoggedIn = false;  //Sets admin logged in status to false
};

//Function creating new product card from button click
let newProductMaker = function() {
   

    let productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img class="product-img" src="" alt="productpic">
        <div class="product-info">
            <div class="product-name">Namn</div>
            <div class="product-description">Beskrivning</div>
            <div class="product-price"><span class="product-price__value">0</span><span class="product-price__currency"> SEK</span></div>
        </div>
    `;

    //Creates 'add to cart'-button to product card
    let cartBtn = document.createElement("button");   //New button
    cartBtn.classList.add("add-cart");                //Adds class .add-cart
    cartBtn.innerText = "Lägg till i kundvagn";       //Sets innertext
    cartBtn.addEventListener('click', () =>{          //Adds click event

        //Add product to cart
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        
    }); 
    productCard.appendChild(cartBtn);              //Appends button to new product card


    //Appends 'remove' and 'edit' button to new product
    productCard.appendChild(adminButtonsMaker());

    //Appends Unsplash img search to new product
    productCard.appendChild(imgSearchMaker());

    //Appends product card into product list
    let productList = document.querySelector(".product-list");
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

    createSaveChangesBtn(); //Adds button to save product changes
}

function createSaveChangesBtn(){
    let saveBtn = document.createElement("button");
    saveBtn.classList.add("save-changes");
    saveBtn.innerText = "Spara ändringar";

    saveBtn.addEventListener("click", saveChanges);

    main.append(saveBtn);
}

function saveChanges(){
    console.log("Saves product page data, making it ready for a DOM blueprint")
    
    //Array to store products
    let savedProducts = [];

    //Constructor for products
    function SavedProduct(img, name, description, price){
        this.img = img;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    //Get data from products in DOM
    let products = document.querySelectorAll(".product-card");

    for (i=0; i<products.length; i++){        
        let img = products[i].querySelector(".product-img").getAttribute("src");
        let name = products[i].querySelector(".product-name").innerText;
        let description = products[i].querySelector(".product-description").innerText;
        let price = products[i].querySelector(".product-price").firstElementChild.innerText;

        let savedProduct = new SavedProduct(img, name, description, price);
        console.log(savedProduct);
        savedProducts.push(savedProduct);
    }

    console.log(savedProducts);

    localStorage.setItem("savedProducts", JSON.stringify(savedProducts));
    
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
            productInfoDiv.querySelector(".product-price").firstElementChild.innerText = productInfoDiv.querySelector("#new-price").value;

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