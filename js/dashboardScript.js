import { getArticle, deleteArticle } from "./services/articlesServices.js";

const logoutEl = document.getElementById("logout");
const blogContainer = document.getElementById("blog-container");
const blogBox = document.getElementsByClassName("blog-box");
const titleEls = document.getElementsByClassName("title-el");
const editEls = document.getElementsByClassName("edit");
const deleteEls = document.getElementsByClassName("delete");
const addButtonEl = document.getElementById("add-button");
const fetchStatus = document.getElementById("fetch-status");

//  adding event listener that does not need to wait for articles  fetch

logoutEl.addEventListener("click", (e) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.isLoggedIn = false;
  user.token = "";

  localStorage.setItem("user", JSON.stringify(user));
});

addButtonEl.addEventListener("click", (e) => {
  localStorage.removeItem("current-blog");
  window.location.assign("../add-update.html");
});

//   initializing our file main Function
const dashboardScript = async () => {
  fetchStatus.style.display = "block";
  const blogs = await getArticle().then((data) => data.data);
  fetchStatus.style.display = "none";

  blogs.map((blog) => {
    const div = document.createElement("div");
    div.setAttribute("class", "blog-box");
    div.setAttribute("id", blog._id);

    const node = `
                <div>
                <p class="title-el">${blog.title}</p>
                </div>
                <img src="./public/edit icon.svg" alt="edit icon" class="edit">
                <img src="./public/bin.svg" alt="delete icon" class="delete">
            `;

    div.innerHTML = node;
    blogContainer.appendChild(div);
  });

  //  add all eventlisteners
  for (let i = 0; i < blogBox.length; i++) {
    titleEls[i].addEventListener("click", (e) => {
      localStorage.setItem("current-blog", JSON.stringify(blogs[i]));
      localStorage.setItem("fomPage", "../dashboard.html");
      window.location.assign("../article.html");
    });

    editEls[i].addEventListener("click", (e) => {
      localStorage.setItem("current-blog", JSON.stringify(blogs[i]));
      window.location.assign("../add-update.html");
    });

    deleteEls[i].addEventListener("click", async (e) => {
      if (confirm("Do you wish to delete this blog?")) {
        await deleteArticle(blogs[i]._id);
        window.location.reload();
      }
    });
  }
};

// calling our file main function
dashboardScript();
