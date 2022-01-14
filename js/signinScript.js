import { emailValidator, passwordValidator } from "./modules/validators.js";


const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const emailValidatorEl = document.getElementById('email-validator')
const passwordValidatorEl = document.getElementById('password-validator')
const button = document.getElementById('button')


//  validation function or other functions


const signinEmailValidator = (func1 = () => { }) => {
    emailValidator(emailInput.value)
        .then((msg) => {
            emailValidatorEl.innerText = msg;
            emailValidatorEl.classList.remove('email-validator');
            button.disabled = false;
            func1();
        }).catch((msg) => {
            emailValidatorEl.innerText = msg;
            emailValidatorEl.classList.add('email-validator');
            button.disabled = true;
        })
    
}

const signinPasswordValidator = (func2 = () => { }) => {
    passwordValidator(passwordInput.value)
        .then((msg) => {
            passwordValidatorEl.innerText = msg;
            passwordValidatorEl.classList.remove('password-validator');
            button.disabled = false;
            func2();
        }).catch((msg) => {
            passwordValidatorEl.innerText = msg;
            passwordValidatorEl.classList.add('password-validator');
            button.disabled = true;
        })
    
}

const userValidator = (func3 = () => { }) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    // func3();
    if (user === null) {
        localStorage.setItem('user', JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
            isLoggedIn: true
        }))
        window.location.assign("../dashboard.html")
    } else {
        if (user.email === emailInput.value && user.password === passwordInput.value) {
            const user = JSON.parse(localStorage.getItem('user'));
            user.isLoggedIn = true;
            localStorage.setItem('user',JSON.stringify(user));
            window.location.assign("../dashboard.html");
        } else {
            if (user.email !== emailInput.value) {
                emailValidatorEl.innerText = "user email not correct \n re-enter last used";
                emailValidatorEl.classList.add('email-validator');
                button.disabled = true;
            } else {
                emailValidatorEl.innerText = '';
                emailValidatorEl.classList.remove('email-validator');
                button.disabled = false;
            }

            if (user.password !== passwordInput.value) {
                console.log("what the hell")
                passwordValidatorEl.innerText = "user password not correct \n re-enter last used";
                passwordValidatorEl.classList.add('password-validator');
                button.disabled = true;
            } else {
                passwordValidatorEl.innerText = '';
                passwordValidatorEl.classList.remove('password-validator');
                button.disabled = false;
            }
        }
    }
}


//  add eventlisteners on elements


emailInput.addEventListener('keyup', (e) => {
    signinEmailValidator();
})


passwordInput.addEventListener('keyup', (e) => {
    signinPasswordValidator();
})

button.addEventListener('click', (e) => {
    e.preventDefault();

    userValidator(() => signinPasswordValidator(signinEmailValidator()));
    
})
    
    

//  removes all eventlisteners on elements


window.onbeforeunload = (e) => {
    emailInput.addEventListener('keyup', (e) => {
        signinEmailValidator();
    })
    
    
    passwordInput.addEventListener('keyup', (e) => {
        signinPasswordValidator();
    })
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
    
        userValidator(() => signinPasswordValidator(signinEmailValidator()));
        
    })
}
