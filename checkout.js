const name = document.getElementById('fnamn');
const lastname = document.getElementById('lnamn');



const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    let messages = []
    if(name.value === '' || name.value == null){
        messages.push('Fyll i namn')
    }
    e.preventDefault()
})