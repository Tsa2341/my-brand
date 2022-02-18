import {
  getArticle,
  saveArticle,
  updateArticle,
} from "./services/articlesServices.js";
// window.onload = () => {

const postEl = document.getElementById("post");
const titleEl = document.getElementById("title");
const imageEl = document.getElementById("image");
const descriptionEl = document.getElementById("textarea");
const backArrowEl = document.getElementById("back-arrow");
const successEl = document.getElementById("general-success");

const titleError = document.getElementById("title-error");
const descriptionError = document.getElementById("description-error");
const imageError = document.getElementById("image-error");

const fileButton = document.getElementById("file");
const imagePreview = document.getElementById("image-preview");

const addUpdateScript = async () => {
  //    if it is updating blog pass the previous data into their fields

  let customButtonFile = null; /// checkes if their is an incoming image
  const currentBlog = localStorage.getItem("current-blog")
    ? JSON.parse(localStorage.getItem("current-blog"))
    : "";

  if (currentBlog && currentBlog !== "") {
    titleEl.value = currentBlog.title;
    descriptionEl.value = currentBlog.description;
    imagePreview.setAttribute("src", currentBlog.image);
    customButtonFile = currentBlog.image;
  }

  // some helper functions

  const isImageValid = (img) => {
    if (img && img.name) {
      let fileExt = img.name.split(".");
      let fileFormat = fileExt[fileExt.length - 1].toLowerCase();

      if (
        fileFormat === "jpg" ||
        fileFormat === "gif" ||
        fileFormat === "png" ||
        fileFormat === "jpeg"
      ) {
        return true;
      } else {
        return `${fileFormat} is not an image`;
      }
    } else {
      if (customButtonFile) {
        return true;
      } else {
        return ` image required`;
      }
    }
  };

  const getImageUrl = () => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;

      reader.readAsDataURL(fileButton.files[0]);
    });
  };

  const postValidator = () => {
    imagePreview.src === window.location.href
      ? (imageError.classList.add("error"),
        (imageError.textContent = "Image is required"),
        (postEl.style.border = "1px solid red"))
      : isImageValid(fileButton.files[0]) === true
      ? (imageError.classList.remove("error"),
        (imageError.textContent = ""),
        (postEl.style.border = "none"))
      : (imageError.classList.add("error"),
        (imageError.textContent = isImageValid(fileButton.files[0])),
        (postEl.style.border = "1px solid red"));

    descriptionEl.value === ""
      ? (descriptionError.classList.add("error"),
        (descriptionError.textContent = "Description is required"),
        (postEl.style.border = "1px solid red"))
      : (descriptionError.classList.remove("error"),
        (descriptionError.textContent = ""),
        (postEl.style.border = "none"));

    titleEl.value === ""
      ? (titleError.classList.add("error"),
        (titleError.textContent = "Title is required"),
        (postEl.style.border = "1px solid red"))
      : (titleError.classList.remove("error"),
        (titleError.textContent = ""),
        (postEl.style.border = "none"));
  };

  const postBlog = async () => {
    successEl.textContent = "Saving your blog . . .";
    successEl.classList.add("success");
    postEl.disabled = true;
    postEl.style.border = "none";

    if (currentBlog) {
      // will runn if we are updating
      try {
        const res = await updateArticle(
          currentBlog._id,
          titleEl.value,
          descriptionEl.value,
          fileButton
        );
        const data = await res.json();

        if (res.status !== 201) {
          successEl.classList.add("success");
          successEl.textContent = data.message;
          return;
        }
      } catch (error) {
        successEl.classList.add("success");
        successEl.textContent = error.message || error;
        postEl.disabled = false;
        return;
      }
    } else {
      // will run if we are creating an article

      try {
        const res = await saveArticle(
          titleEl.value,
          descriptionEl.value,
          fileButton
        );
      } catch (error) {
        successEl.classList.add("success");
        successEl.textContent = error.message || error;
        postEl.disabled = false;
        return;
      }
    }

    if (currentBlog) {
      successEl.textContent = "Updated blog successfully";
    } else {
      successEl.textContent = "Saved blog successfully";
    }
    successEl.classList.add("success");

    setTimeout(() => {
      successEl.textContent = "";
      successEl.classList.remove("success");
      postEl.disabled = false;
      if (confirm("Do you wish to be redirected to dashboard")) {
        window.location.href = "../dashboard.html";
      }
    }, 1000);
  };

  //  add event listeners

  fileButton.addEventListener("change", () => {
    getImageUrl()
      .then((data) => {
        imagePreview.setAttribute("src", data);
        postValidator();
      })
      .catch((data) => {
        postValidator();
      });
  });

  postEl.addEventListener("click", (e) => {
    postValidator();
    if (
      titleError.textContent === "" &&
      descriptionError.textContent === "" &&
      imageError.textContent === ""
    ) {
      postBlog();
    }
  });

  backArrowEl.addEventListener("click", (e) => {
    window.history.back();
  });
};

addUpdateScript();
// }
