import { emailValidator, spaceValidator } from "./modules/validators.js";

const nameEl = document.getElementById('name')
const emailEl = document.getElementById('email')
const descriptionEl = document.getElementById('description')
const emailValidatorEl = document.getElementById('email-validator')
const generalValidatorEl = document.getElementById('general-validator')
const successEl = document.getElementById('success')
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

const contactGeneralValidator = (func = ()=>{}) => {
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

    successEl.textContent = "sent successfully"
    successEl.classList.add('success')
    button.disabled = true;
    setTimeout(() => {
        successEl.textContent = ""
        successEl.classList.remove('success')
        button.disabled = false
    }, 1500);

    console.log(JSON.parse(localStorage.getItem("queries")))
}

// add eventlisteners on email and button

emailEl.addEventListener('keyup', (e) => {
    contactEmailValidator();
})

nameEl.addEventListener('click', (e) => {
    contactGeneralValidator();
})

descriptionEl.addEventListener('change', (e) => {
    contactGeneralValidator();
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