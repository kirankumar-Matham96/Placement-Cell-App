const setCookie = (name, value, expDays) => {
  const date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (cookieName) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return "";
};

const deleteCookie = (name) => {
  const date = new Date();
  date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=;${expires};path=/`;
};

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
    setCookie("token", readable.token, 1);
    event.target.reset();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const signOut = async () => {
  try {
    deleteCookie("token");
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
  } catch (error) {
    console.log(error);
  }
};

// TODO: create all the routes necessary
// TODO: complete the UI
// TODO: Test it
// TODO: Add comments
// TODO: Add Readme

const addStudent = async (event) => {
  try {
    const studentData = {
      batch: event.target["student-batch"].value,
      name: event.target["student-name"].value,
      email: event.target["student-email"].value,
      college: event.target["student-college"].value,
      scores: {
        DSA: event.target.DSA.value,
        WebDev: event.target["Web Development"].value,
        React: event.target.React.value,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(studentData),
    };
    const response = await fetch(
      "http://localhost:3000/api/placement-cell/students/add",
      options
    );

    if (response.ok) {
      event.target.reset();
      alert("Student added successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};

const getStudents = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const response = await fetch(
      "http://localhost:3000/api/placement-cell/students/",
      options
    );
    const data = await response.json();

    return data.success ? data.students : null;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getCompanies = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const response = await fetch(
      "http://localhost:3000/api/placement-cell/companies/",
      options
    );
    const data = await response.json();

    return data.success ? data.company : null;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getInterviews = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const response = await fetch(
      "http://localhost:3000/api/placement-cell/interviews/",
      options
    );
    const data = await response.json();

    return data.success ? data.interview : null;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const scheduleInterview = async (event) => {
  try {
    const studentData = {
      companyId: event.target["company-options"].value,
      date: event.target.date.value,
      position: event.target.position.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(studentData),
    };
    const response = await fetch(
      "http://localhost:3000/api/placement-cell/interviews/add",
      options
    );
    if (response.ok) {
      event.target.reset();
      alert("Interview scheduled successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};

const allocateStudentToAnInterview = async (event) => {
  try {
    const interviewId =
      event.target["interview-options"].value.split("-and-")[1];

    const interviewData = {
      studentId: event.target["student-options"].value,
      companyId: event.target["interview-options"].value.split("-and-")[0],
    };

    console.log({ interviewId, interviewData });
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(interviewData),
    };

    console.log(
      `http://localhost:3000/api/placement-cell/interviews/${interviewId}`
    );

    const response = await fetch(
      `http://localhost:3000/api/placement-cell/interviews/${interviewId}`,
      options
    );

    if (response.ok) {
      event.target.reset();
      alert(`Student allocated to Interview successfully!`);
    }
  } catch (error) {
    console.log(error);
  }
};
