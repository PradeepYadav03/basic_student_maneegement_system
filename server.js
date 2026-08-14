require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "student_db"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        return;
    }
    console.log("MySQL connected successfully!");
});

app.get("/students", (req, res) => {
    db.query("SELECT * FROM students ORDER BY roll_no", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post("/students", (req, res) => {
    const { roll_no, name, email, course, semester } = req.body;

    if (!roll_no || !name) {
        return res.status(400).json({ error: "Roll number and name are required." });
    }

    const sql = `
        INSERT INTO students (roll_no, name, email, course, semester)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [roll_no, name, email || null, course || null, semester || null],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.code === "ER_DUP_ENTRY"
                        ? "Roll number already exists."
                        : err.message
                });
            }

            res.json({
                message: "Student added successfully",
                student_id: result.insertId
            });
        }
    );
});

app.put("/students/:id", (req, res) => {
    const { roll_no, name, email, course, semester } = req.body;

    const sql = `
        UPDATE students
        SET roll_no=?, name=?, email=?, course=?, semester=?
        WHERE student_id=?
    `;

    db.query(sql,
        [roll_no, name, email || null, course || null, semester || null, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Student updated successfully" });
        }
    );
});

app.delete("/students/:id", (req, res) => {
    db.query(
        "DELETE FROM students WHERE student_id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!result.affectedRows) {
                return res.status(404).json({ error: "Student not found." });
            }
            res.json({ message: "Student deleted successfully" });
        }
    );
});

app.get("/subjects", (req, res) => {
    db.query("SELECT * FROM subjects ORDER BY subject_name", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post("/attendance", (req, res) => {
    const { student_id, subject_id, attendance_date, status } = req.body;

    if (!student_id || !subject_id || !attendance_date || !status) {
        return res.status(400).json({ error: "All attendance fields are required." });
    }

    const sql = `
        INSERT INTO attendance
        (student_id, subject_id, attendance_date, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql,
        [student_id, subject_id, attendance_date, status],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.code === "ER_DUP_ENTRY"
                        ? "Attendance already exists for this student, subject and date."
                        : err.message
                });
            }

            res.json({
                message: "Attendance saved successfully",
                attendance_id: result.insertId
            });
        }
    );
});

app.get("/attendance", (req, res) => {
    const sql = `
        SELECT
            a.attendance_id,
            s.roll_no,
            s.name,
            sub.subject_name,
            a.attendance_date,
            a.status
        FROM attendance a
        JOIN students s ON a.student_id = s.student_id
        JOIN subjects sub ON a.subject_id = sub.subject_id
        ORDER BY a.attendance_date DESC, s.roll_no
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
