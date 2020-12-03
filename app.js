const loginButton = document.querySelector("#login");
loginButton.addEventListener("click", login);


function login(){
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    

    if(username == "admin", password == "admin"){
        console.log("testa login")
    }
}