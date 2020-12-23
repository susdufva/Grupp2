
// 
function validateForm () {
    let contactForm = document.forms["myForm"] ["name"].value
    if (contactForm == null || contactForm == "") {
        alert("Du måste fylla i ditt namn");
        return false;
    }
}
