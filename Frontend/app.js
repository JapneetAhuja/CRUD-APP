var students = [];

function getValue(id) {
    return document.getElementById(id).value;
}
function setValue(id, val) {
    document.getElementById(id).value = val;
}

window.onload = loadStudents;

// ADD
function addStudent() {

    const s = {
        fname: getValue("fname"),
        lname: getValue("lname"),
        email: getValue("email"),
        course: getValue("course"),
        city: getValue("city"),
        comments: getValue("comments")
    };

    fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(s)
    })
    .then(res => res.json())
    .then(() => {
        loadStudents();
        clearForm();
    })
    .catch(err => console.error(err));
}

// LOAD
function loadStudents() {
    fetch("http://localhost:3000/students")
    .then(res => res.json())
    .then(data => {
        students = data;
        show();
    })
    .catch(err => console.error(err));
}

// SHOW
function show() {

    var table = document.getElementById("table");

    table.innerHTML = `
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Course</th>
    <th>City</th>
    <th>Action</th>
    </tr>`;

    for (var i = 0; i < students.length; i++) {

        table.innerHTML +=
            "<tr>" +
            "<td>" + students[i].id + "</td>" +
            "<td>" + students[i].fname + " " + students[i].lname + "</td>" +
            "<td>" + students[i].email + "</td>" +
            "<td>" + students[i].course + "</td>" +
            "<td>" + students[i].city + "</td>" +
            "<td>" +
            "<button onclick='editStudent(" + i + ")'>Edit</button>" +
            "<button onclick='deleteRow(" + i + ")'>Delete</button>" +
            "</td>" +
            "</tr>";
    }
}

// DELETE
function deleteRow(index) {

    let id = students[index].id;

    fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE"
    })
    .then(() => loadStudents())
    .catch(err => console.error(err));
}

// EDIT
function editStudent(index) {

    setValue("id", students[index].id);
    setValue("fname", students[index].fname);
    setValue("lname", students[index].lname);
    setValue("email", students[index].email);
    setValue("course", students[index].course);
    setValue("city", students[index].city);
    setValue("comments", students[index].comments);
}

// UPDATE
function updateStudent() {

    const id = getValue("id");

    const s = {
        fname: getValue("fname"),
        lname: getValue("lname"),
        email: getValue("email"),
        course: getValue("course"),
        city: getValue("city"),
        comments: getValue("comments")
    };

    fetch(`http://localhost:3000/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(s)
    })
    .then(() => {
        loadStudents();
        clearForm();
    })
    .catch(err => console.error(err));
}

// CLEAR
function clearForm() {

    setValue("id", "");
    setValue("fname", "");
    setValue("lname", "");
    setValue("email", "");
    setValue("course", "");
    setValue("city", "");
    setValue("comments", "");
}