const express = require("express");

const {
  getAllStudents,
  addStudent,
  editStudent,
  deleteStudent,
  getStudentByName,
} = require("../controllers/student.controller");

const router = express.Router();

router.route("/").get(getAllStudents);
router.route("/").post(addStudent);
router.route("/:studentId").post(editStudent);
router.route("/:studentId").delete(deleteStudent);
router.route("/:studentName").get(getStudentByName);

module.exports = router;
