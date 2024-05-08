const express = require("express");

const router = express.Router();

const {
  getAllTeachers,
  addTeacher,
  editTeacher,
  deleteTeacher,
  getTeacherByName,
} = require("../controllers/teacher.controller");

router.route("/").get(getAllTeachers);
router.route("/").post(addTeacher);
router.route("/:teacherId").post(editTeacher);
router.route("/:teacherId").delete(deleteTeacher);
router.route("/:teacherName").get(getTeacherByName);

module.exports = router;
