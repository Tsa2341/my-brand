import { getArticle } from "./services/articlesServices.js";

const blogsEl = document.querySelector(".blogs-container");
const blogEls = document.getElementsByClassName("blog");
const fetchStatus = document.getElementById("fetch-status");

const blogScript = async () => {
  fetchStatus.style.display = "block";

  const articleResponse = await getArticle();
  const blogs = articleResponse.data;
  fetchStatus.style.display = "none";

  blogs.map((blog, index) => {
    const div1 = document.createElement("div");
    div1.classList.add("blog");
    let blogEl = "";

    if (blogs === []) {
      blogEl = `
                  <img id="image" src="../public/blog3.svg" alt="blog image">
                  <p class="blog-date">2022/09/10</p>
                  <h1 id="title" class="blog-title">no blog</h1>
              `;
    } else {
      const newDate = new Date(blog.date).toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
      });
      blogEl = `
                      <img id="image" src="${blog.image}" alt="blog image">
                      <p class="blog-date">${newDate}</p>
                      <h1 id="title" class="blog-title">${blog.title}</h1>
                  `;
    }

    div1.innerHTML = blogEl;
    blogsEl.appendChild(div1);
  });

  //  add event listeners

  for (let i = 0; i < blogEls.length; i++) {
    blogEls[i].addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("current-blog", JSON.stringify(blogs[i]));
      localStorage.setItem("fomPage","../blog.html")
      window.location.assign("../article.html");
    });
  }
};

blogScript();
