import { emailValidator, passwordValidator } from "./modules/validators.js";
import { login, register } from "./services/userServices.js";

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameValidatorEl = document.getElementById("username-validator");
const emailValidatorEl = document.getElementById("email-validator");
const passwordValidatorEl = document.getElementById("password-validator");
const generalValidatorEl = document.getElementById("general-validator");
const button = document.getElementById("button");

const clearError = () => {
  usernameValidatorEl.style.display = "none";
  emailValidatorEl.style.display = "none";
  passwordValidatorEl.style.display = "none";
  generalValidatorEl.style.display = "none";
};

const signinScript = async () => {
  button.addEventListener("click", async (e) => {
    try {
      e.preventDefault();

      clearError();

      generalValidatorEl.classList.add("loading");
      generalValidatorEl.textContent = "Loading...";

      const res = await login(
        usernameInput.value,
        emailInput.value,
        passwordInput.value
      );
      const data = await res.json();

      generalValidatorEl.classList.remove("loading");
      generalValidatorEl.textContent = "";

      if (res.status !== 200) {
        if (/email/gi.test(data.message)) {
          emailValidatorEl.style.display = "block";
          emailValidatorEl.textContent = data.message;
          return;
        } else if (/password/gi.test(data.message)) {
          passwordValidatorEl.style.display = "block";
          passwordValidatorEl.textContent = data.message;
          return;
        } else if (/username/gi.test(data.message)) {
          usernameValidatorEl.style.display = "block";
          usernameValidatorEl.textContent = data.message;
          return;
        } else {
          generalValidatorEl.style.display = "block";
          generalValidatorEl.textContent = data.message;
          return;
        }
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: `Bearer ${data.accessToken}`,
          isLoggedIn: true,
        })
      );
      window.location.assign("../dashboard.html");
    } catch (err) {
      generalValidatorEl.style.display = "block";
      generalValidatorEl.textContent = (err.message || err).replace(/[',",`]/gi,"");
    }
  });
};

signinScript();


