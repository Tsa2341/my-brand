export const updateLikes = async ({ id, likes, dislikes }) => {
  const data = {
    likes,
    dislikes,
  };
  try {
    const res = await fetch(
      `https://my-brand-apis.herokuapp.com/api/v1/articles/${id}/likes/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
