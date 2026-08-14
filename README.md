# Student Management System

A basic Student Management System with attendance tracking built using Node.js, Express.js, JavaScript, HTML/CSS, and MySQL.

## Features

- Add, view, edit, and delete students
- Store student details such as roll number, name, email, course, and    semester
- Select subjects for attendance
- Mark students as Present or Absent
- Save attendance by date
- View attendance history

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MySQL
- MySQL2
- dotenv
- CORS

## Project Structure

basic_student_maneegement_system/
│
├── public/
│   └── index.html
│
├── .gitignore
├── database.sql
├── package.json
├── package-lock.json
├── README.md
└── server.js

## Database Setup

The project uses MySQL with a database named `student_db`.

The `database.sql` file creates:

- `students`
- `subjects`
- `attendance`

It also adds the basic subjects used by the project.

### Setup

1. Open MySQL Workbench.
2. Open `database.sql`.
3. Execute the SQL script.
4. Create a `.env` file in the project folder.
5. Add your MySQL password:

DB_PASSWORD=YOUR_MYSQL_PASSWORD

The `.env` file is excluded from GitHub.

## Installation

Clone the repository and install the required packages:

git clone YOUR_GITHUB_REPOSITORY_URL

cd basic_student_maneegement_system

npm install

## Run the Project

Start the server:

node server.js

Open the application in your browser:

http://localhost:3000

## Project Purpose

This project was created to practice:

- Full-stack web development
- CRUD operations
- REST APIs
- MySQL database integration
- Frontend-backend communication
- Student and attendance management

## Author

**Pradeep Yadav**

Student Management System developed for learning and portfolio purposes.