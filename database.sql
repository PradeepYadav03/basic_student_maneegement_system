CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    course VARCHAR(100),
    semester INT
);

CREATE TABLE IF NOT EXISTS subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present','Absent') NOT NULL,
    UNIQUE KEY unique_attendance (student_id, subject_id, attendance_date),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- Add your basic subjects here if the subjects table is empty.
INSERT INTO subjects (subject_name)
SELECT 'Python Programming'
WHERE NOT EXISTS (SELECT 1 FROM subjects WHERE subject_name='Python Programming');

INSERT INTO subjects (subject_name)
SELECT 'Database Management System'
WHERE NOT EXISTS (SELECT 1 FROM subjects WHERE subject_name='Database Management System');

INSERT INTO subjects (subject_name)
SELECT 'Web Development'
WHERE NOT EXISTS (SELECT 1 FROM subjects WHERE subject_name='Web Development');
