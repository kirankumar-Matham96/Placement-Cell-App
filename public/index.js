/* API related functions */
const BASE_URL = "http://localhost:3000";

/**
 * To set cookies (to store token in cookies)
 * @param {cookie name} name
 * @param {cookie value} value
 * @param {expiry days} expDays
 */
const setCookie = (name, value, expDays) => {
  const date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * To get cookie
 * @param {cookie name} cookieName
 * @returns String (token)
 */
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

/**
 * To delete cookie
 * @param {cookie name} name
 */
const deleteCookie = (name) => {
  const date = new Date();
  date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=;${expires};path=/`;
};

/**
 * To signup user
 * @param {DOM event} event
 * @returns Boolean
 */
const signUp = async (event) => {
  try {
    const password = event.target.password.value;
    const confirmPassword = event.target["confirm-password"].value;

    if (password != confirmPassword) {
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
      `${BASE_URL}/api/placement-cell/users/signup`,
      options
    );

    if (response.ok) {
      alert("User signed up successfully!");
      event.target.reset();
    }

    return response.ok;
  } catch (error) {
    console.log(error);
  }
};

/**
 * To signin user
 * @param {DOM event} event
 * @returns Boolean
 */
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
      `${BASE_URL}/api/placement-cell/users/signin`,
      options
    );
    const readable = await response.json();

    if (response.ok) {
      setCookie("token", readable.token, 1);
      alert("user signed in successfully!");
      event.target.reset();
      return true;
    } else {
      event.target.reset();
      alert(readable.error);
      return false;
    }
  } catch (error) {
    console.log("signin error => ", error);
  }
};

/**
 * To signout user
 */
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
      `${BASE_URL}/api/placement-cell/users/signout`,
      options
    );
    alert("user logged out successfully!");
  } catch (error) {
    console.log(error);
  }
};

/**
 * To add student
 * @param {DOM event} event
 * @returns Boolean
 */
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
      `${BASE_URL}/api/placement-cell/students/add`,
      options
    );

    if (response.ok) {
      event.target.reset();
      alert("Student added successfully!");
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

/**
 * To get all the students
 * @returns Object - Array
 */
const getStudents = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/placement-cell/students/`,
      options
    );
    const data = await response.json();

    return data.success ? data.students : null;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/**
 * To get all companies
 * @returns Object - Array
 */
const getCompanies = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/placement-cell/companies/`,
      options
    );
    const data = await response.json();

    return data.success ? data.company : null;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/**
 * To get company by id
 * @param {company id} companyId
 * @returns Object
 */
const getCompany = async (companyId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/placement-cell/companies/${companyId}`,
      options
    );
    const data = await response.json();
    return data.success ? data.company : null;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/**
 * To get all interviews
 * @returns Object - Array
 */
const getInterviews = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/placement-cell/interviews/`,
      options
    );
    const data = await response.json();

    return data.success ? data.interview : null;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/**
 * To add interview
 * @param {DOM event} event
 */
const scheduleInterview = async (event) => {
  try {
    const company = await getCompany(event.target["company-options"].value);
    const lastDate = company.interviews.find(
      (interview) =>
        interview.designation === event.target["designation-options"].value
    ).lastDate;
    const studentData = {
      companyId: event.target["company-options"].value,
      date: event.target.date.value,
      position: event.target["designation-options"].value,
      lastDate: lastDate,
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
      `${BASE_URL}/api/placement-cell/interviews/add`,
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

/**
 * To allocate student to an interview
 * @param {DOM event} event
 */
const allocateStudentToAnInterview = async (event) => {
  try {
    const interviewId =
      event.target["interview-options"].value.split("-and-")[1];

    const interviewData = {
      studentId: event.target["student-options"].value,
      companyId: event.target["interview-options"].value.split("-and-")[0],
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(interviewData),
    };

    const response = await fetch(
      `${BASE_URL}/api/placement-cell/interviews/${interviewId}`,
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

/**
 * To update interview result
 * @param {date Object} data
 * @returns Boolean
 */
const updateStudentInterviewStatus = async (data) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${BASE_URL}/api/placement-cell/results/`,
      options
    );

    if (response.ok) {
      alert(`Student result updated successfully!`);
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

/**
 * To get jobs data from an API
 * @returns Object - Array
 */
const getCompaniesListFromOutside = () => {
  try {
    /*
      NOTE: The provided link for jobs is not working.
      Also did not find any API without signin.
      Hence using local data. Feel free to replace
      companies array with any API.
    */
    const companies = [
      {
        companyName: "Google",
        logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F7123025%2Flogo_google_g_icon&psig=AOvVaw27jNI3W7H5YlbV0LlAClcc&ust=1719999004748000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDms9-FiIcDFQAAAAAdAAAAABAE",
        designation: "Software Engineer",
        lastDate: "2024-09-05",
      },
      {
        companyName: "Microsoft",
        logo: "https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80660_960_720.png",
        designation: "Senior Developer",
        lastDate: "2024-09-10",
      },
      {
        companyName: "Apple",
        logo: "https://w7.pngwing.com/pngs/186/863/png-transparent-apple-logo-apple-logo-computer-wallpaper-silhouette.png",
        designation: "Product Manager",
        lastDate: "2024-09-15",
      },
      {
        companyName: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
        designation: "Data Scientist",
        lastDate: "2024-09-20",
      },
      {
        companyName: "Facebook",
        logo: "https://e7.pngegg.com/pngimages/991/568/png-clipart-facebook-logo-computer-icons-facebook-logo-facebook-thumbnail.png",
        designation: "UI/UX Designer",
        lastDate: "2024-09-25",
      },
      {
        companyName: "Netflix",
        logo: "https://i.pinimg.com/736x/1b/54/ef/1b54efef3720f6ac39647fc420d4a6f9.jpg",
        designation: "Backend Developer",
        lastDate: "2024-09-30",
      },
      {
        companyName: "Twitter",
        logo: "https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png",
        designation: "Frontend Developer",
        lastDate: "2024-09-04",
      },
      {
        companyName: "Tesla",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVPG6wZ9fH-GPvC_AwBJMQo47GDdhn2aYWyQ&s",
        designation: "Systems Engineer",
        lastDate: "2024-09-09",
      },
      {
        companyName: "IBM",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr9MF9q-h9p82zkHNBWbEqEPEQ1BgRfz_bGA&s",
        designation: "DevOps Engineer",
        lastDate: "2024-09-14",
      },
      {
        companyName: "Intel",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tA5OFYw3R_pAYfRP5ztmiYM84GVFBsy5WA&s",
        designation: "AI Specialist",
        lastDate: "2024-09-19",
      },
      {
        companyName: "Spotify",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHGhbo0uYyjEH0avlVNPl09KhpVE3AK-1VTA&s",
        designation: "Mobile Developer",
        lastDate: "2024-09-24",
      },
      {
        companyName: "LinkedIn",
        logo: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMy0xMC5wbmc.png",
        designation: "Marketing Specialist",
        lastDate: "2024-09-29",
      },
      {
        companyName: "Adobe",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgji-ic9ZMUeM4RwUxybH2Oxj1lsD7zxiqA&s",
        designation: "Graphics Designer",
        lastDate: "2024-09-03",
      },
      {
        companyName: "Salesforce",
        logo: "https://i.pinimg.com/originals/cc/93/4e/cc934e2161f7c9ef74faad1a8bc56d92.jpg",
        designation: "Cloud Architect",
        lastDate: "2024-09-08",
      },
      {
        companyName: "Uber",
        logo: "https://banner2.cleanpng.com/20180728/vsw/kisspng-logo-uber-brand-logo-uber-5b5c5cc0f1b550.8818960215327797129901.jpg",
        designation: "Operations Manager",
        lastDate: "2024-09-13",
      },
      {
        companyName: "Airbnb",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbVv42pbqy9yWZmsxRmLQLHKXMqpO9JNDS_A&s",
        designation: "Customer Support",
        lastDate: "2024-09-18",
      },
      {
        companyName: "Snapchat",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0d5NU1E-x7SXbG2C34Sc0fwpdFY0nsZgzZw&s",
        designation: "Data Analyst",
        lastDate: "2024-09-23",
      },
      {
        companyName: "Oracle",
        logo: "https://w7.pngwing.com/pngs/898/916/png-transparent-oracle-corporation-logo-computer-software-business-company-logo-miscellaneous-angle-company.png",
        designation: "Database Administrator",
        lastDate: "2024-09-28",
      },
      {
        companyName: "SAP",
        logo: "https://w7.pngwing.com/pngs/25/122/png-transparent-sap-se-business-logo-sap-erp-successfactors-business-blue-text-rectangle.png",
        designation: "Business Analyst",
        lastDate: "2024-09-02",
      },
      {
        companyName: "Zoom",
        logo: "https://w7.pngwing.com/pngs/288/313/png-transparent-zoom-meeting-logo-thumbnail.png",
        designation: "Network Engineer",
        lastDate: "2024-09-07",
      },
      {
        companyName: "Slack",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaab27IkYQ1TnJ41LtoDTb8DfSKnqqNvAw8g&s",
        designation: "Technical Writer",
        lastDate: "2024-09-12",
      },
      {
        companyName: "Square",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Square%2C_Inc._-_Square_logo.svg/800px-Square%2C_Inc._-_Square_logo.svg.png",
        designation: "Financial Analyst",
        lastDate: "2024-09-17",
      },
      {
        companyName: "Stripe",
        logo: "https://w7.pngwing.com/pngs/431/78/png-transparent-stripe-payment-gateway-business-payment-processor-stripe-blue-company-text.png",
        designation: "Security Specialist",
        lastDate: "2024-09-22",
      },
      {
        companyName: "Pinterest",
        logo: "https://image.similarpng.com/thumbnail/2020/05/Pinterest-logo-icon-form-poi-PNG.png",
        designation: "Content Creator",
        lastDate: "2024-09-27",
      },
      {
        companyName: "Reddit",
        logo: "https://i.pinimg.com/736x/ca/d8/26/cad826af5ee95bbc39d3bd498e1a8301.jpg",
        designation: "Community Manager",
        lastDate: "2024-09-01",
      },
      {
        companyName: "GitHub",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5jM-HYt3Q3Po0IcrmAm164xMf7vY5AeNovQ&s",
        designation: "Open Source Advocate",
        lastDate: "2024-09-06",
      },
      {
        companyName: "Yelp",
        logo: "https://i.pinimg.com/originals/2b/8d/54/2b8d547f797c8b4278320541ea7331fa.jpg",
        designation: "SEO Specialist",
        lastDate: "2024-09-11",
      },
      {
        companyName: "Dropbox",
        logo: "https://logoeps.com/wp-content/uploads/2011/05/dropbox-vector-logo.png",
        designation: "Storage Solutions Engineer",
        lastDate: "2024-09-16",
      },
      {
        companyName: "Atlassian",
        logo: "https://static-00.iconduck.com/assets.00/atlassian-icon-2048x2047-5zqlyyxr.png",
        designation: "Agile Coach",
        lastDate: "2024-09-21",
      },
    ];

    return companies;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Add company to inventory(DB)
 * @param {DOM event} event 
 */
const addCompany = async (event) => {
  try {
    const company = JSON.parse(event.target.getAttribute("data-company"));

    const companyData = {
      name: company.companyName,
      interviews: {
        designation: company.designation,
        lastDate: company.lastDate,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(companyData),
    };

    const response = await fetch(
      `${BASE_URL}/api/placement-cell/companies/add`,
      options
    );

    if (response.ok) {
      alert(`Company added to your Inventory successfully!`);
    }
  } catch (error) {
    console.log(error);
  }
};

/* DOM related functions */

/**
 * To display login form and hide other forms and containers
 */
function showLoginForm() {
  if (!loginBtnEl.classList.contains("d-none")) {
    loginBtnEl.classList.add("d-none");
  }
  if (registerBtnEl.classList.contains("d-none")) {
    registerBtnEl.classList.remove("d-none");
  }
  if (!homeContainerEl.classList.contains("d-none")) {
    homeContainerEl.classList.add("d-none");
  }
  if (!registerContainerEl.classList.contains("d-none")) {
    registerContainerEl.classList.add("d-none");
  }
  if (loginContainerEl.classList.contains("d-none")) {
    loginContainerEl.classList.remove("d-none");
  }
}

/**
 * To display Home page and hide other forms and containers
 */
function showHomePage() {
  if (!userAuth()) {
    // show both register and login btns
    if (loginBtnEl.classList.contains("d-none")) {
      loginBtnEl.classList.remove("d-none");
    }
    if (registerBtnEl.classList.contains("d-none")) {
      registerBtnEl.classList.remove("d-none");
    }
  }

  if (homeContainerEl.classList.contains("d-none")) {
    homeContainerEl.classList.remove("d-none");
  }

  if (!studentsContainerEl.classList.contains("d-none")) {
    studentsContainerEl.classList.add("d-none");
  }

  if (!interviewsContainerEl.classList.contains("d-none")) {
    interviewsContainerEl.classList.add("d-none");
  }

  if (!jobsContainerEl.classList.contains("d-none")) {
    jobsContainerEl.classList.add("d-none");
  }

  if (!registerContainerEl.classList.contains("d-none")) {
    registerContainerEl.classList.add("d-none");
  }

  if (!loginContainerEl.classList.contains("d-none")) {
    loginContainerEl.classList.add("d-none");
  }
}

/**
 * To confirm user auth
 */
function userAuth() {
  const isTokenExists = getCookie("token");
  if (!isTokenExists) {
    loggedOut();
    return false;
  }
  loggedIn();
  return true;
}

/**
 * To show or hide elements on logged in
 */
function loggedIn() {
  // hide login btn
  if (!loginBtnEl.classList.contains("d-none")) {
    loginBtnEl.classList.add("d-none");
  }
  // hide register btn
  if (!registerBtnEl.classList.contains("d-none")) {
    registerBtnEl.classList.add("d-none");
  }
  // show logout btn
  if (logoutBtnEl.classList.contains("d-none")) {
    logoutBtnEl.classList.remove("d-none");
  }
}

/**
 * To show or hide elements on logged out
 */
function loggedOut() {
  // show login btn
  if (loginBtnEl.classList.contains("d-none")) {
    loginBtnEl.classList.remove("d-none");
  }
  // show register btn
  if (registerBtnEl.classList.contains("d-none")) {
    registerBtnEl.classList.remove("d-none");
  }
  // hide logout btn
  if (!logoutBtnEl.classList.contains("d-none")) {
    logoutBtnEl.classList.add("d-none");
  }
}

/**
 * To create students list items
 * @param {Students Array} students 
 */
function createStudents(students) {
  studentsListsContainerEl.innerHTML = "";
  students.forEach((student) => {
    const accordionItemEl = document.createElement("div");
    accordionItemEl.classList.add("accordion-item");
    accordionItemEl.innerHTML = `
    <h2 class="accordion-header">
      <button
      class="accordion-button"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#${student._id}"
      aria-expanded="false"
      aria-controls="${student._id}"
      >
      <h5>
        ${student.name}
        </h5>
      </button>
      </h2>
      <div
        id="${student._id}"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <p><strong>Batch:</strong> ${student.batch}</p>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>College:</strong> ${student.college}</p>

          <span><strong>Scores:</strong></span><br/>

          <span><strong>&nbsp;&nbsp;DSA:</strong> ${
            student.scores.DSA
          }</span><br/>

          <span><strong>&nbsp;&nbsp;Web Development:</strong> ${
            student.scores.WebDev
          }</span><br/>

          <span><strong>&nbsp;&nbsp;React:</strong> ${
            student.scores.React
          }</span>
          <br/>
          <br/>
          <p><strong>Status:</strong> ${student.status}</p>
          <div>
          <strong>Interviews Allotted:</strong> ${student.interviews
            .map(
              (item) => `
                <div>
                  <span><strong>&nbsp;&nbsp;CompanyId</strong>: ${
                    item.companyId
                  }</span><br/>
                  <span><strong>&nbsp;&nbsp;Position For</strong>: ${
                    item.position
                  }</span><br/>
                  <span><strong>&nbsp;&nbsp;Date</strong>: ${setDateFormat(
                    item.date
                  )}</span>
                </div>
                <br/>
              `
            )
            .join("")}
          </div>
        </div>
      </div>
        `;

    studentsListsContainerEl.appendChild(accordionItemEl);
  });
}

/**
 * To set date format
 * @param {date String} dateStr 
 * @returns formatted date String
 */
function setDateFormat(dateStr) {
  try {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month =
      dateObj.getMonth() + 1 < 10
        ? "0" + (dateObj.getMonth() + 1)
        : dateObj.getMonth() + 1;
    const date =
      dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();
    let hours = dateObj.getHours();
    const minutes =
      dateObj.getMinutes() < 10
        ? "0" + dateObj.getMinutes()
        : dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? "0" + hours : hours;

    return `${date}-${month}-${year} AT ${hours}:${minutes} ${ampm}`;
  } catch (error) {
    console.log(error);
  }
}

/**
 * To create job list items
 * @param {Companies Array} companies 
 */
function createJobsList(companies) {
  jobsListContainerEl.innerHTML = "";
  companies.forEach((company) => {
    const companyEl = document.createElement("li");
    companyEl.classList.add(
      "bg-light",
      "mt-3",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "p-3",
      "rounded"
    );

    const companyJson = JSON.stringify(company).replace(/"/g, "&quot;");

    companyEl.innerHTML = `
      <div>
        <img src="${company.logo}" alt="${company.companyName}" class="job-company-logo" />
        <h2 class="">${company.companyName}</h2><br/>
        <h5 class="">Open for: ${company.designation}</h5>
      </div>
      <button class="btn btn-primary" data-company='${companyJson}' onclick='addCompany(event)'>Add to inventory</button>
    `;
    jobsListContainerEl.appendChild(companyEl);
  });
}

/**
 * To create and populate options for select tag
 * @param {select tag container to be populated with options} optionsContainerEl 
 * @param {options Array} list 
 */
function createOptions(optionsContainerEl, list) {
  optionsContainerEl.innerHTML = "<option selected>Choose...</option>";
  list.map((item) => {
    const optionEl = document.createElement("option");
    optionEl.value = item._id;
    optionEl.id = item._id;
    optionEl.textContent = item.name;

    if (item.interviewId) {
      optionEl.value = optionEl.value + "-and-" + item.interviewId;
    }

    if (item.position) {
      optionEl.value = item.position;
      optionEl.textContent = item.position;
    }

    if (item.lastDate) {
      optionEl["data-last-date"] = item.lastDate;
    }

    optionsContainerEl.appendChild(optionEl);
  });
}

/**
 * To download the student data in CSV format
 */
async function downloadDataCSV() {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/api/placement-cell/students/download`,
      options
    );

    const { data } = await response.json();

    // Decode the base64-encoded CSV
    const csv = atob(data.csv);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: "text/csv" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const a = document.createElement("a");
    a.href = url;
    a.download = "chrome-extension-output.csv";

    // Append the link to the document
    document.body.appendChild(a);

    // Trigger the download by simulating a click
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

/**
 * To update result of an interview of a student
 * @param {DOM event} event 
 */
async function studentResultChange(event) {
  const data = {
    studentId: event.target.parentElement.parentElement.getAttribute("id"),
    interviewId:
      event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "id"
      ),
    companyId:
      event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "data-company-id"
      ),
    result: event.target.value,
  };

  const response = await updateStudentInterviewStatus(data);
  if (response) {
    // re-render the interviews list
    const interviews = await getInterviews();
    createInterviewList(interviews);
  }
}

/**
 * To create interview list items
 * @param {interviews Array} interviews 
 */
async function createInterviewList(interviews) {
  interviewsListContainerEl.innerHTML = "";
  interviews.forEach((interview) => {
    const accordionItemEl = document.createElement("div");
    accordionItemEl.classList.add("accordion-item");
    accordionItemEl.innerHTML = `
    <h2 class="accordion-header">
      <button
      class="accordion-button"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#${interview._id}"
      aria-expanded="false"
      aria-controls="${interview._id}"
      >
      <h5>
        ${interview.companyId.name} - ${
      interview.position
    } &nbsp;&nbsp;&nbsp;&nbsp; <span class="text-primary">Last Date: ${setDateFormat(
      interview.lastDate
    )} </span>
        </h5>
      </button>
      </h2>
      <div
        id="${interview._id}"
        data-company-id="${interview.companyId._id}"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
        <h5>Students Allotted:</h5>
      ${interview.students
        .map((student) => {
          return `
          <div id="${student._id}">
            <div>
              <span>
                &nbsp;&nbsp;<strong>Student Name: </strong>${student.name}<br/>
              </span>
              <span>
                &nbsp;&nbsp;<strong>Batch: </strong>${student.batch}<br/>
              </span>
              <span>
                &nbsp;&nbsp;<strong>Status: </strong>${student.status}<br/>
              </span>
            </div>
            <div class="input-group mt-3">
            <label class="input-group-text" for="interview-status-options"
              >Result</label
            >
            <select class="form-select interview-result-change" onchange="${(
              event
            ) => studentResultChange(event)}">
              <option selected>Choose...</option>
              <option id="PASS" value="PASS">PASS</option>
              <option id="FAIL" value="FAIL">FAIL</option>
              <option id="On_Hold" value="On Hold">On Hold</option>
              <option id="Did_not_Attempt" value="Didn't Attempt">Didn't Attempt</option>
            </select>
          </div>
          </div>
          <br/>
          `;
        })
        .join("")}
        </div>
      </div>
        `;

    interviewsListContainerEl.appendChild(accordionItemEl);
    const interviewResultStatusEls = document.querySelectorAll(
      ".interview-result-change"
    );

    interviewResultStatusEls.forEach((select) => {
      select.addEventListener("change", (event) => studentResultChange(event));
    });
  });
}

/**
 * To set min and max values for date input
 * @param {last date of an interview} lastDate
 */
function setMinMaxDatesForInterviewSchedule(lastDate = "") {
  // setting min date for interview allocation
  interviewDateEl.min = new Date().toISOString().slice(0, -8);
  // set max (upto interview last date)
  if (lastDate) {
    interviewDateEl.max = new Date(lastDate).toISOString().slice(0, -8);
  }
}

// elements
const homeBtnEl = document.querySelector("#home-link");
const studentsBtnEl = document.querySelector("#students-link");
const interviewsBtnEl = document.querySelector("#interviews-link");
const jobsBtnEl = document.querySelector("#jobs-link");
const registerBtnEl = document.querySelector("#register-btn");
const loginBtnEl = document.querySelector("#login-btn");
const logoutBtnEl = document.querySelector("#logout-btn");
const homeContainerEl = document.querySelector(".home-container");
const studentsContainerEl = document.querySelector(".students-bg-container");
const interviewsContainerEl = document.querySelector(
  ".interviews-bg-container"
);
const jobsContainerEl = document.querySelector(".jobs-bg-container");
const registerContainerEl = document.querySelector(".register-container");
const loginContainerEl = document.querySelector(".login-container");
const registrationFormEl = document.querySelector(".registration-form");
const loginFormEl = document.querySelector(".login-form");
const addStudentFormEl = document.querySelector(
  ".add-new-student-form-container"
);
const showAddStudentBtnEl = document.querySelector("#show-add-student-btn");
const downloadDataBtnEl = document.querySelector("#download");
const studentsListsContainerEl = document.querySelector("#student-accordion");
const addStudentContainerEl = document.querySelector(
  ".add-new-student-container"
);
const showInterviewFormBtnEl = document.querySelector(
  "#show-interview-form-btn"
);
const interviewBGContainerEl = document.querySelector(
  ".add-new-interview-container"
);
const interviewAddingFormEl = document.querySelector(
  ".add-new-interview-form-container"
);
const interviewsListContainerEl = document.querySelector(
  "#interview-accordion"
);
const companyOptionsEl = document.querySelector("#company-options");
const positionOptionsEl = document.querySelector("#designation-options");
const interviewDateEl = document.querySelector("#interview-date");
const showStudentInterviewAllocationFormBtnEl = document.querySelector(
  "#show-allocate-student-to-interview-form-btn"
);
const allocateStudentToAnInterviewContainerEl = document.querySelector(
  ".allocate-student-to-interview-container"
);
const allocateStudentToAnInterviewFormEl = document.querySelector(
  ".allocate-student-to-interview-form-container"
);
const interviewOptionsContainerEl =
  document.querySelector("#interview-options");
const studentOptionsContainerEl = document.querySelector("#student-options");
const jobsListContainerEl = document.querySelector("#jobs-list");

setMinMaxDatesForInterviewSchedule();

/* Event Listeners */

document.addEventListener("DOMContentLoaded", () => {
  userAuth();

  registrationFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await signUp(event);

      if (!response) {
        return;
      }
      // show login form
      showLoginForm();
    } catch (error) {
      console.log(error);
    }
  });

  loginFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const response = await signIn(event);
    if (response && userAuth()) {
      // show home page
      showHomePage();
    }
  });

  logoutBtnEl.addEventListener("click", () => {
    // call logout function
    signOut();
    loggedOut();
    // on success, show home page
    showHomePage();
  });

  addStudentFormEl.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const isStudentAdded = await addStudent(event);

      if (isStudentAdded) {
        // hide form container
        addStudentContainerEl.classList.add("d-none");
        // show showStudentBtn
        showAddStudentBtnEl.classList.remove("d-none");
        // show students list
        studentsListsContainerEl.classList.remove("d-none");
        // re-create students list to update
        const students = await getStudents();
        // populate the students in the accordions
        createStudents(students);
      }
    } catch (error) {
      console.log(error);
    }
  });

  showAddStudentBtnEl.addEventListener("click", () => {
    // show student adding form
    addStudentContainerEl.classList.contains("d-none")
      ? addStudentContainerEl.classList.remove("d-none")
      : null;

    // hide showAddStudentBtn
    showAddStudentBtnEl.classList.add("d-none");

    // hide students list
    studentsListsContainerEl.classList.add("d-none");
  });

  downloadDataBtnEl.addEventListener("click", downloadDataCSV);

  showInterviewFormBtnEl.addEventListener("click", async () => {
    // show form
    interviewBGContainerEl.classList.contains("d-none")
      ? interviewBGContainerEl.classList.remove("d-none")
      : null;

    // hide other form if shown
    !allocateStudentToAnInterviewContainerEl.classList.contains("d-none")
      ? allocateStudentToAnInterviewContainerEl.classList.add("d-none")
      : null;

    // call API to get companies
    const companies = await getCompanies();
    // create Elements here
    createOptions(companyOptionsEl, companies);
  });

  companyOptionsEl.addEventListener("change", async (event) => {
    const companyId = event.target.value;
    const company = await getCompany(companyId);

    const designations = company.interviews.map((interview) => {
      if (new Date(interview.lastDate) > new Date()) {
        return {
          position: interview.designation,
          _id: interview._id,
          lastDate: interview.lastDate,
        };
      }
    });

    // create options list
    createOptions(positionOptionsEl, designations);
  });

  interviewAddingFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    // call function to add interview
    await scheduleInterview(event);
    // hide section
    interviewBGContainerEl.classList.add("d-none");
    // show updated interviews list
    const interviews = await getInterviews();
    createInterviewList(interviews);
  });

  showStudentInterviewAllocationFormBtnEl.addEventListener(
    "click",
    async () => {
      // show form
      allocateStudentToAnInterviewContainerEl.classList.contains("d-none")
        ? allocateStudentToAnInterviewContainerEl.classList.remove("d-none")
        : null;

      // hide other form
      !interviewBGContainerEl.classList.contains("d-none")
        ? interviewBGContainerEl.classList.add("d-none")
        : null;

      const interviews = await getInterviews();
      // needs value, _id, name
      const companiesList = interviews
        .filter((item) => new Date(item.date) >= new Date())
        .map((item) => {
          return {
            name: `${item.companyId.name} - ${item.position}`,
            _id: item.companyId._id,
            interviewId: item._id,
          };
        });

      // populate interview options
      createOptions(interviewOptionsContainerEl, companiesList);

      // get students and populate options
      createOptions(studentOptionsContainerEl, await getStudents());
    }
  );

  allocateStudentToAnInterviewFormEl.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();
      // post allocate interview form
      await allocateStudentToAnInterview(event);
      allocateStudentToAnInterviewContainerEl.classList.add("d-none");
      // show updated interviews list
      const interviews = await getInterviews();
      createInterviewList(interviews);
    }
  );

  homeBtnEl.addEventListener("click", () => {
    showHomePage();
  });

  studentsBtnEl.addEventListener("click", async () => {
    if (!userAuth()) {
      alert("Please login!");
      showLoginForm();
      return;
    }

    try {
      const students = await getStudents();
      // populate the students in the accordions
      createStudents(students);
    } catch (error) {
      console.log(error);
    }

    if (!addStudentContainerEl.classList.contains("d-none")) {
      addStudentContainerEl.classList.add("d-none");
    }

    if (showAddStudentBtnEl.classList.contains("d-none")) {
      showAddStudentBtnEl.classList.remove("d-none");
    }

    if (studentsListsContainerEl.classList.contains("d-none")) {
      studentsListsContainerEl.classList.remove("d-none");
    }

    if (!homeContainerEl.classList.contains("d-none")) {
      homeContainerEl.classList.add("d-none");
    }

    if (studentsContainerEl.classList.contains("d-none")) {
      studentsContainerEl.classList.remove("d-none");
    }

    if (!interviewsContainerEl.classList.contains("d-none")) {
      interviewsContainerEl.classList.add("d-none");
    }

    if (!jobsContainerEl.classList.contains("d-none")) {
      jobsContainerEl.classList.add("d-none");
    }
  });

  interviewsBtnEl.addEventListener("click", async () => {
    if (!userAuth()) {
      alert("Please login!");
      showLoginForm();
      return;
    }
    if (!homeContainerEl.classList.contains("d-none")) {
      homeContainerEl.classList.add("d-none");
    }

    if (!studentsContainerEl.classList.contains("d-none")) {
      studentsContainerEl.classList.add("d-none");
    }

    if (!jobsContainerEl.classList.contains("d-none")) {
      jobsContainerEl.classList.add("d-none");
    }

    if (interviewsContainerEl.classList.contains("d-none")) {
      interviewsContainerEl.classList.remove("d-none");
    }
    const interviews = await getInterviews();
    createInterviewList(interviews);
  });

  jobsBtnEl.addEventListener("click", () => {
    if (!userAuth()) {
      alert("Please login!");
      showLoginForm();
      return;
    }
    if (!homeContainerEl.classList.contains("d-none")) {
      homeContainerEl.classList.add("d-none");
    }

    if (!studentsContainerEl.classList.contains("d-none")) {
      studentsContainerEl.classList.add("d-none");
    }

    if (!interviewsContainerEl.classList.contains("d-none")) {
      interviewsContainerEl.classList.add("d-none");
    }

    if (jobsContainerEl.classList.contains("d-none")) {
      jobsContainerEl.classList.remove("d-none");
    }
    const companies = getCompaniesListFromOutside();
    createJobsList(companies);
  });

  registerBtnEl.addEventListener("click", () => {
    if (!homeContainerEl.classList.contains("d-none")) {
      homeContainerEl.classList.add("d-none");
    }

    if (!registerBtnEl.classList.contains("d-none")) {
      registerBtnEl.classList.add("d-none");
    }
    if (loginBtnEl.classList.contains("d-none")) {
      loginBtnEl.classList.remove("d-none");
    }
    // show register form
    if (registerContainerEl.classList.contains("d-none")) {
      registerContainerEl.classList.remove("d-none");
    }
    if (!loginContainerEl.classList.contains("d-none")) {
      loginContainerEl.classList.add("d-none");
    }
    // after submission, it should be hidden (go to register function to handle it)
  });

  loginBtnEl.addEventListener("click", () => {
    showLoginForm();
  });
});
