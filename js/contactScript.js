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

const dateFormatter = () => {
    return new Date().toLocaleString('en-GB', {
        year: "numeric",
        month: 'long',
        day: '2-digit',
        weekday: "long",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

const addressFormatter = async () => {
    const location = await locationGetter()

    if (!location) {
        return "No location ( disabled by user)"
    }

    const country = await location.results[0].components.country.trim()
    const province = await location.results[0].components.state.split(' ')[0].trim()
    const district = await location.results[0].components.county.split(' ')[0].trim()
    const town = await location.results[0].components.town.split(' ').join('').trim()

    const address = [country, province, district, town].join('/ ');
    return address;
}

const locationGetter = () => {
    return new Promise((resolve, reject) => {

        const onSuccess = (res) => {
            const { latitude, longitude } = res.coords;

            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=05ccf17adcef455c99dc2fd37a7648a4`)
                .then(data => {
                    data.json().then(resolve)
                }).catch(reject)
        }

        const onError = (err) => {
            // navigator.permissions.query({name:'geolocation'}).then(function(result) {
            //     if (result.state == 'granted') {
            //         report(result.state);
            //     } else if (result.state == 'prompt') {
            //         report(result.state);
            //     } else if (result.state == 'denied') {
            //         report(result.state);
            //     }
            //     result.onchange = function() {
            //         report(result.state);
            //     }
            // });
            resolve(false)
        }

        window.navigator.geolocation.getCurrentPosition(onSuccess,onError)
    })
    
}

const saveMessage = async (name, email, description) => {
    successEl.textContent = "Please wait , sending ..."
    successEl.classList.add('success')
    button.disabled = true;
    
    const prevQueries = localStorage.getItem("queries") ? Object.values(JSON.parse(localStorage.getItem("queries"))) : [];

    localStorage.setItem("queries", JSON.stringify({
        ...[
            ...prevQueries,
            { name, email, description, date: dateFormatter(), location: await addressFormatter() }
        ]
    }));

    successEl.textContent = "sent successfully"
    setTimeout(() => {
        successEl.textContent = ""
        successEl.classList.remove('success')
        emailEl.value = '';
        nameEl.value = '';
        descriptionEl.value = '';
        button.disabled = false
    }, 1500);

    // console.log(JSON.parse(localStorage.getItem("queries")))
}

// add eventlisteners on email and button

emailEl.addEventListener('keyup', (e) => {
    contactEmailValidator();
})

nameEl.addEventListener('click', (e) => {
    contactGeneralValidator();
})

descriptionEl.addEventListener('keyup', (e) => {
    contactGeneralValidator();
})

button.addEventListener('click', (e) => {
    contactGeneralValidator(() => { saveMessage(nameEl.value, emailEl.value, descriptionEl.value) })
})
