import { getQuerries } from "./services/querriesServices.js";

const logoutEl = document.getElementById("logout");
const bodyEl = document.querySelector(".body");
const fetchStatus = document.getElementById("fetch-status");

const dashboardQuerriesScript = async () => {
  // get questions and append them to the DOM

  fetchStatus.style.display = "block";

  const res = await getQuerries();
  const data = await res.json();
  let users = data.data;

  fetchStatus.style.display = "none";

  if (users !== []) {
    users.map((user, i, arr) => {
      let queryContainerEl = document.createElement("div");
      let queryNameEl = document.createElement("h1");
      let queryEmailEl = document.createElement("h2");
      let queryDescriptionEl = document.createElement("div");
      let queryDate = document.createElement("p");
      let queryLocation = document.createElement("p");

      queryContainerEl.setAttribute("class", "query-container");
      queryDate.setAttribute("class", "query-date");
      queryNameEl.setAttribute("class", "query-name");
      queryEmailEl.setAttribute("class", "query-email");
      queryDescriptionEl.setAttribute("class", "query-description");
      queryLocation.setAttribute("class", "query-location");

      const lastUser = arr[arr.length - 1 - i];

      const newDate = new Date(lastUser.date).toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      queryNameEl.textContent = lastUser.fullname;
      queryEmailEl.textContent = lastUser.email;
      queryDescriptionEl.textContent = lastUser.description;
      queryDate.textContent = newDate;
      queryLocation.textContent = lastUser.location;

      queryContainerEl.appendChild(queryDate);
      queryContainerEl.appendChild(queryNameEl);
      queryContainerEl.appendChild(queryEmailEl);
      queryContainerEl.appendChild(queryDescriptionEl);
      queryContainerEl.appendChild(queryLocation);

      bodyEl.appendChild(queryContainerEl);
    });
  }

  // add event listeners

  logoutEl.addEventListener("click", (e) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.isLoggedIn = false;

    localStorage.setItem("user", JSON.stringify(user));
  });
};

dashboardQuerriesScript();
