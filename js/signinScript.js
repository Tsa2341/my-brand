import { emailValidator, passwordValidator } from "./modules/validators.js";


const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const emailValidatorEl = document.getElementById('email-validator')
const passwordValidatorEl = document.getElementById('password-validator')
const button = document.getElementById('button')

const signinEmailValidator = async (func = ()=>{}) => {
    await emailValidator(emailInput.value)
        .then((msg) => {
            emailValidatorEl.innerText = msg;
            emailValidatorEl.classList.remove('email-validator');
            button.disabled = false;
            func();
        }).catch((msg) => {
            // console.log("email catch")
            emailValidatorEl.innerText = msg;
            emailValidatorEl.classList.add('email-validator');
            button.disabled = true;
        })
    
}

const signinPasswordValidator = async (func = () => { }) => {
    console.log(passwordInput.value)
    await passwordValidator(passwordInput.value)
        .then((msg) => {
            // console.log("password then")
            passwordValidatorEl.innerText = msg;
            passwordValidatorEl.classList.remove('password-validator');
            button.disabled = false;
            func();
        }).catch((msg) => {
            // console.log("password catch")
            passwordValidatorEl.innerText = msg;
            passwordValidatorEl.classList.add('password-validator');
            button.disabled = true;
        })
    
}

emailInput.addEventListener('keyup', (e) => {
    signinEmailValidator();
})


passwordInput.addEventListener('keyup', (e) => {
    signinPasswordValidator();
})

button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("email input value = ", emailInput, "password input value = ", passwordInput)

    signinEmailValidator(() => signinPasswordValidator(() => window.location.assign("../dashboard.html")));

})

window.onbeforeunload = (e) => {
    emailInput.addEventListener('keyup', (e) => {
        signinEmailValidator();
    })
    
    
    passwordInput.addEventListener('keyup', (e) => {
        signinPasswordValidator();
    })
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("email input value = ", emailInput, "password input value = ", passwordInput)
    
        signinEmailValidator(() => signinPasswordValidator(() => window.location.assign("../dashboard.html")));
    
    })
}
