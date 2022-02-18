export const getArticle = () =>
  fetch("https://my-brand-apis.herokuapp.com/api/v1/articles/", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => err);

export const getOneArticle = (id) =>
  fetch(`https://my-brand-apis.herokuapp.com/api/v1/articles/${id}`, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => err);

export const saveArticle = async (title, description, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image.files[0]);
  try {
    const res = await fetch(
      "https://my-brand-apis.herokuapp.com/api/v1/articles/",
      {
        method: "POST",
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("user")).token}`,
        },
        body: formData,
      }
    );

    return res;
  } catch (error) {
    throw error.message;
  }
};

export const updateArticle = async (id, title, description, image) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image.files[0]) {
      formData.append("image", image.files[0]);
    }

    const res = await fetch(
      `https://my-brand-apis.herokuapp.com/api/v1/articles/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("user")).token}`,
        },
        body: formData,
      }
    );
    return res;
  } catch (error) {
    throw error.message || error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const res = await fetch(
      `https://my-brand-apis.herokuapp.com/api/v1/articles/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("user")).token}`,
        },
      }
    );
    return res;
  } catch (error) {
    throw error.message || error;
  }
};
