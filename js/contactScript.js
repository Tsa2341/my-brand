import { saveQuerry } from "./services/querriesServices.js";

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const descriptionEl = document.getElementById("description");
const fullnameValidatorEl = document.getElementById("fullname-validator");
const emailValidatorEl = document.getElementById("email-validator");
const generalValidatorEl = document.getElementById("general-validator");
const successEl = document.getElementById("success");
const button = document.getElementById("button");
const form = document.querySelector("form");

const contactScript = async () => {
  const dateFormatter = () => {
    return new Date().toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const addressFormatter = async () => {
    const location = await locationGetter();

    if (!location) {
      return "No location ( disabled by user)";
    }

    const country = await location.results[0].components.country.trim();
    const province = await location.results[0].components.state
      .split(" ")[0]
      .trim();
    const district = await location.results[0].components.county
      .split(" ")[0]
      .trim();
    //   const town = await location.results[0].components.town
    //     .split(" ")
    //     .join("")
    //     .trim();

    const address = [country, province, district].join("/ ");
    return address;
  };

  const locationGetter = () => {
    return new Promise((resolve, reject) => {
      const onSuccess = (res) => {
        const { latitude, longitude } = res.coords;

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=05ccf17adcef455c99dc2fd37a7648a4`
        )
          .then((data) => {
            data.json().then(resolve);
          })
          .catch(reject);
      };

      const onError = (err) => {
        resolve(false);
      };

      window.navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
  };

  const clearError = () => {
    fullnameValidatorEl.textContent = "";
    emailValidatorEl.textContent = "";
    generalValidatorEl.textContent = "";
    successEl.textContent = "";
  };

  const saveMessage = async () => {
    clearError();
    try {
      successEl.textContent = "sending your Querry...";
      successEl.style.opacity = 1;
      button.disabled = true;

      const res = await saveQuerry(form, await addressFormatter());
      const data = await res.json();

      if (res.status === 201) {
        generalValidatorEl.textContent = "";
        emailValidatorEl.textContent = "";
        fullnameValidatorEl.textContent = "";
        successEl.textContent = "sent successfully";
        successEl.style.opacity = 1;
        setTimeout(() => {
          successEl.textContent = "";
          successEl.style.opacity = 0;
          emailEl.value = "";
          nameEl.value = "";
          descriptionEl.value = "";
          button.disabled = false;
        }, 1500);
      } else {
        if (/fullname/.test(data.message)) {
          fullnameValidatorEl.textContent = data.message;
        } else if (/email/.test(data.message)) {
          emailValidatorEl.textContent = data.message;
        } else {
          generalValidatorEl.textContent = data.message;
        }
        successEl.textContent = "";
        successEl.style.opacity = 0;
        button.disabled = false;
      }
    } catch (error) {
      console.warn(error);
      generalValidatorEl.textContent = error.message || error;
    }

  };

  button.addEventListener("click", (e) => {
    saveMessage(nameEl.value, emailEl.value, descriptionEl.value);
  });
};

contactScript();
