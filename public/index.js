const signUp = async (event) => {
  try {
    const password = event.target.password.value;
    const confirmPassword = event.target["confirm-password"].value;

    if (password != confirmPassword) {
      console.log("error: password and confirm password doesn't match!");
      alert("error: password and confirm password doesn't match!");
      return;
    }

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "http://localhost:3000/api/placement-cell/users/signup",
      options
    );
    const readable = await response.json();

    event.target.reset();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (event) => {
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;

    const data = {
      email,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "http://localhost:3000/api/placement-cell/users/signin",
      options
    );
    const readable = await response.json();
    console.log({ readable });
    console.log(readable.token);

    localStorage.setItem("token", readable.token);

    event.target.reset();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const signOut = async () => {
  localStorage.removeItem("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "http://localhost:3000/api/placement-cell/users/signout",
    options
  );
};
