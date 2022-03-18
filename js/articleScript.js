// import { spaceValidator } from "./modules/validators";
import { getOneArticle } from "./services/articlesServices.js";
import { createComment } from "./services/commentsServices.js";
import { updateLikes } from "./services/likesServices.js";

const backArrow = document.getElementById("back-arrow");
const titleEl = document.getElementById("title");
const descriptionEl = document.getElementById("description");
const imageEl = document.getElementById("image");
const saveCommentEl = document.getElementById("save-comment");
const textareaEl = document.getElementById("textarea");
const fullnameEl = document.getElementById("fullname");
const commentWrapperEl = document.getElementById("comment-wrapper");
const generalError = document.getElementById("general-error");
const likeBtn = document.getElementById("like-btn");
const disLikeBtn = document.getElementById("dislike-btn");
const likeNum = document.getElementById("like-num");
const disLikeNum = document.getElementById("dislike-num");
const fetchStatus = document.getElementById("fetch-status");

const prevPage = localStorage.getItem("fomPage", "../blog.html");

const articleScript = async () => {
  fetchStatus.style.display = "block";
  saveCommentEl.disabled = false;
  document.body.scrollTop = -1;

  const currentBlog = JSON.parse(localStorage.getItem("current-blog"));
  fetchStatus.style.display = "none";

  titleEl.textContent = currentBlog.title;
  descriptionEl.innerHTML = currentBlog.description;
  imageEl.setAttribute("src", currentBlog.image);
  likeNum.textContent = currentBlog.likes;
  disLikeNum.textContent = currentBlog.dislikes;

  let comments = currentBlog.comments;

  comments.forEach((comment) => {
    let div = document.createElement("div");
    div.setAttribute("class", "comment");
    div.setAttribute("id", comment._id);

    const newDate = new Date(comment.date).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const commentNode = `
                    <p><strong>By</strong>: ${comment.fullname}</p>
                    <h4>${comment.description}</h4>
                    <p><strong>On</strong>: ${newDate}</p>
                `;

    div.innerHTML = commentNode;
    commentWrapperEl.append(div);
  });

  // add event Listeners

  backArrow.addEventListener("click", (e) => {
    window.location.href = prevPage;
  });

  likeBtn.addEventListener("click", async (e) => {
    likeNum.textContent++;

    const res = await updateLikes({
      id: currentBlog._id,
      likes: likeNum.textContent,
    });
    const data = await res.json();

    if (res.status === 200) {
      const prevBlogs = { ...JSON.parse(localStorage.getItem("current-blog")) };
      prevBlogs.likes = data.data.likes;
      localStorage.setItem("current-blog", JSON.stringify(prevBlogs));
      generalError.textContent = "";
      generalError.classList.remove("error");
    } else {
      generalError.textContent = data.message;
      generalError.classList.add("error");
    }
  });

  disLikeBtn.addEventListener("click", async (e) => {
    disLikeNum.textContent++;

    const res = await updateLikes({
      id: currentBlog._id,
      dislikes: disLikeNum.textContent,
    });
    const data = await res.json();

    if (res.status === 200) {
      const prevBlogs = { ...JSON.parse(localStorage.getItem("current-blog")) };
      prevBlogs.dislikes = data.data.dislikes;
      localStorage.setItem("current-blog", JSON.stringify(prevBlogs));
      generalError.textContent = "";
      generalError.classList.remove("error");
    } else {
      generalError.textContent = data.message;
      generalError.classList.add("error");
    }
  });

  saveCommentEl.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      saveCommentEl.disabled = true;

      if ((textareaEl.value !== "", fullnameEl.value !== "")) {
        generalError.textContent = "Saving comment...";
        generalError.classList.add("error");

        const res = await createComment({
          id: currentBlog._id,
          fullname: fullnameEl.value,
          description: textareaEl.value,
        });
        const data = await res.json();

        if (res.status !== 200) {
          generalError.textContent = data.message;
          generalError.classList.add("error");
        } else {
          const article = await getOneArticle(currentBlog._id);
          localStorage.setItem(
            "current-blog",
            JSON.stringify(await article.data)
          );
          window.location.reload();
        }
      } else {
        if (textareaEl.value !== "")
          generalError.textContent = "Please enter your comment";
        if (fullnameEl.value !== "")
          generalError.textContent = "Please enter your fullname";
        generalError.classList.add("error");
      }
    } catch (error) {
      generalError.textContent = error.message.replace(/[',",`]/gi,"");
      generalError.classList.add("error");
      setTimeout(() => {
        generalError.textContent = "";
        generalError.classList.remove("error");
      }, 2000)
    }
  });
};

articleScript();


