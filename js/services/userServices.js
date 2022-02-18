export const register = async (username, email, password) => {
  const user = await fetch(
    "https://my-brand-apis.herokuapp.com/api/v1/user/register/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }
  );
  return user.json();
};

export const login = async (username, email, password) => {
  try {
    const user = await fetch(
      "https://my-brand-apis.herokuapp.com/api/v1/user/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );
    return user;
  } catch (error) {
    throw error;
  }
};
