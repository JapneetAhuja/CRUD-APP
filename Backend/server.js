const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500", 
}));
app.use(express.json());

let students = [];

// GET all
app.get("/students", (req, res) => {
    res.json(students);
});

// ADD
app.post("/students", (req, res) => {
    const student = {
        ...req.body,id: Date.now() // auto id
    };
    students.push(student);
    res.json(student);
});

// UPDATE
app.put("/students/:id", (req, res) => {
    const id = req.params.id;

    students = students.map(s =>
        s.id == id ? { ...req.body, id: s.id } : s
    );

    res.json({ message: "Updated" });
});

// DELETE
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;

    students = students.filter(s => s.id != id);

    res.json({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});