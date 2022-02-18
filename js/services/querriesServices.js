export const getQuerries = async () => {
  try {
    const res = await fetch(
      "https://my-brand-apis.herokuapp.com/api/v1/querries/",
      {
        method: "GEt",
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

export const saveQuerry = async (form, location, date) => {
  const formData = new FormData(form);
  formData.append("location", location);

  try {
    const res = await fetch(
      "https://my-brand-apis.herokuapp.com/api/v1/querries/",
      {
        method: "POST",
        body: formData,
      }
    );

    return res;
  } catch (error) {
    throw error.message || error;
  }
};
