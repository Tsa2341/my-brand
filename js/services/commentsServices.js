export const createComment = async ({ id, fullname, description }) => {
  const data = {
    fullname,
    description,
  };
  try {
    const res = await fetch(
      `https://my-brand-apis.herokuapp.com/api/v1/articles/${id}/comments/`,
      {
        method: "POST",
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
