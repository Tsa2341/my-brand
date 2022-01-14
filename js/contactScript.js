import { emailValidator, spaceValidator } from "./modules/validators.js";

const nameEl = document.getElementById('name')
const emailEl = document.getElementById('email')
const descriptionEl = document.getElementById('description')
const emailValidatorEl = document.getElementById('email-validator')
const generalValidatorEl = document.getElementById('general-validator')
const button = document.getElementById('button');

//  create validating function and other functions

const contactEmailValidator = async () => {
    await emailValidator(emailEl.value)
        .then((msg) => {
            emailValidatorEl.innerText = msg;
            emailValidatorEl.classList.remove('email-validator');
            button.disabled = false;
        }).catch((msg) => {
            emailValidatorEl.innerText = msg;
            emailValidatorEl.classList.add('email-validator');
            button.disabled = true;
        })
    
}

const contactGeneralValidator = (func) => {

    spaceValidator(nameEl.value, emailEl.value, descriptionEl.value) ?
        (
            generalValidatorEl.innerText = "",
            generalValidatorEl.classList.remove('general-validator'),
            button.disabled = false,
            func()
        )
        :
        (
            generalValidatorEl.innerText = " All fields must be field ",
            generalValidatorEl.classList.add('general-validator'),
            button.disabled = true
        )
        
}

const saveMessage = (name, email, description) => {

    const prevQueries = localStorage.getItem("queries") ? Object.values(JSON.parse(localStorage.getItem("queries"))) : [];


    localStorage.setItem("queries", JSON.stringify({
        ...[
            ...prevQueries,
            { name, email, description }
        ]
    }));

    console.log(JSON.parse(localStorage.getItem("queries")))
}

// add eventlisteners on email and button

emailEl.addEventListener('keyup', (e) => {
    contactEmailValidator();
})

button.addEventListener('click', (e) => {
    contactGeneralValidator(() => { saveMessage(nameEl.value, emailEl.value, descriptionEl.value) })
})


// unsubscribe from all listeners

window.onbeforeunload = (e) => {
    emailEl.removeEventListener('keyup', (e) => {
        contactEmailValidator();
    })
    
    button.removeEventListener('click', (e) => {
        contactGeneralValidator(saveMessage( nameEl.value, emailEl.value, descriptionEl.value))
    })
}