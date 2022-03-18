
const ulEl = document.getElementsByTagName("ul");

const li = document.createElement("li");
const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

let link = '';
let page = '';

if (user && user.isLoggedIn) {
    link = "dashboard.html"
    page = "Dashboard"
} else {
    link = "signin.html"
    page = "Signin"
}
li.innerHTML = `<a href="./${link}">${page}</a>`

ulEl[0].prepend(li);