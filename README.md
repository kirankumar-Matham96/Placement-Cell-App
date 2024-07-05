# Placement Cell App (NODE-Repository-REST-API + UI)

An application to represent job placement cell. Backend built with the repository-API pattern. Simple frontend build with html, css, js and bootstrap for the interaction.

## Table of Contents

- [Backend Features](#backend-features)
- [Frontend Features](#frontend-features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Backend Features

- User (for employees only)

  - Sign up
  - Sign in
  - Sign out

- Company

  - Add
  - Get by id
  - Get all
  - Update
  - Delete

- Students

  - Add
  - Get by id
  - Get all
  - Update
  - Delete

- Interviews

  - Schedule interview
  - Allocate student to an interview

- Result

  - Add
  - Get by id
  - Get all
  - Update
  - Delete

## Frontend Features

1. Home/landing tab

   - In the landing page you can see the welcome message.
   - It includes Register and Login buttons.
   - Includes students, interviews and jobs nav links.
   - Without signin, user cannot visit these links.

2. Students tab

   - Shows the list of students.
   - The list item can expand to show the student details if exists any.
   - There are buttons to add a new student to the list and download all students data as CSV file.

3. Interviews tab

   - Shows the list of interviews available.
   - The list item can expand to show the interview details and students details allocated to it.
   - There are buttons to schedule a new interview to the list and allocate students to it.
     NOTE: If there are no interview options in the form options, you can add one from the Jobs tab.

4. Jobs tab
   - Shows list of jobs available and the required details.
   - Each job item contains a button that will add the job details to the DB. Once the job is added to the db, you can see the job name and designation in the schedule interview form options.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirankumar-Matham96/Placement-Cell-App.git

   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

- Create a `.env` file in the root directory and add the following:
  ```bash
    PORT=3000
    DB_URL=<db_url>
    JWT_SECRET=<secret>
  ```

4. Start the application:

- if dev:

```bash
npm run dev
```

- if production

```bash
 npm run start
```

5. Open your browser and navigate to `http://localhost:3000`

6. Open index.html from the public folder using live server to interact with UI.

#### NOTE: steps to follow in order

- If the file opened without live server, it will not work and throws cors error.
- Register
- Login
- Add Company from the Jobs tab (if not options will not be populated in the other tabs)
- Add student details in students tab (if not options will not be populated in the other tabs)
- Schedule an interview from the interviews tab
- Allocate the student to an interview
- See the list of students and details in Students tab
- See the list of interviews in Interviews yab

## Project Structure

    POST AWAY - II/
    ├── src/
    │ ├── config/
    │ │ └── db.config.js
    │ ├── features/
    │ │ ├── companies/
    │ │ | ├── company.controller.js
    │ │ | ├── company.repository.js
    │ │ | ├── company.routes.js
    │ │ | └── company.schema.js
    │ │ ├── interviews/
    │ │ | ├── interview.controller.js
    │ │ | ├── interview.repository.js
    │ │ | ├── interview.routes.js
    │ │ | └── interview.schema.js
    │ │ ├── results/
    │ │ | ├── result.controller.js
    │ │ | ├── result.repository.js
    │ │ | ├── result.routes.js
    │ │ | └── result.schema.js
    │ │ ├── student/
    │ │ | ├── student.controller.js
    │ │ | ├── student.repository.js
    │ │ | ├── student.routes.js
    │ │ | └── student.schema.js
    │ │ └── users/
    │ │   ├── user.controller.js
    │ │   ├── user.repository.js
    │ │   ├── user.routes.js
    │ │   └── user.schema.js
    | └── middlewares/
    │   ├── auth.middleware.js
    │   ├── downloadHandler.middleware.js
    │   ├── errorHandling.middleware.js
    │   └── unknownPathHandler.middleware.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── server.js

## API Endpoints

### User Routes

- `POST /api/placement-cell/users/signup`: Register a new user
- `POST /api/placement-cell/users/signin`: Login a user
- `GET /api/placement-cell/users/signout`: Logout a user

### Student Routes

- `POST /api/placement-cell/students/add`: Add a student
- `GET /api/placement-cell/students/`: Get all students
- `GET /api/placement-cell/students/<student_id>`: Get a student by id
- `PUT /api/placement-cell/students/<student_id>`: Update a student by id
- `DELETE /api/placement-cell/students/<student_id>`: Delete a student by id

### Company Routes

- `POST /api/placement-cell/companies/add`: Add a company
- `GET /api/placement-cell/companies/`: Get all companies
- `GET /api/placement-cell/companies/<company_id>`: Get a company by id
- `PUT /api/placement-cell/companies/<company_id>`: Update a company by id
- `DELETE /api/placement-cell/companies/<company_id>`: Delete a company by id

### Interview Routes

- `POST /api/placement-cell/interviews/add`: Schedule an interview
- `GET /api/placement-cell/interviews/`: Get all interviews
- `GET /api/placement-cell/interviews/<interview_id>`: Get an interview by id
- `PUT /api/placement-cell/interviews/<interview_id>`: Update an interview by id
- `DELETE /api/placement-cell/interviews/<interview_id>`: Delete an interview by id

### Result Routes

- `POST /api/placement-cell/results/add`: Add a result
- `GET /api/placement-cell/results/`: Get all results
- `GET /api/placement-cell/results/<result_id>`: Get a result by id
- `PUT /api/placement-cell/results/<result_id>`: Update a result by id
- `DELETE /api/placement-cell/results/<result_id>`: Delete a result by id

## Technologies Used

- Node.js
- Express
- MongoDB (DataBase)
- mongoose
- bcrypt
- dotenv
- jsonwebtoken
- cookie-parser
- cors
- export-to-csv
- REST Full API

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
