const mongoose = require("mongoose");
const fs = require("fs");

const jsonData = fs.readFileSync("./data/student.json");
const studentData = JSON.parse(jsonData);

const Student = require("../models/student.model");

const seedStudentDatabase = async () => {
  try {
    for (const student of studentData) {
      const newStudent = new Student(student);
      await newStudent.save();
      console.log(`Student ${student.name} seeded`);
    }
    console.log("Student database seeded successfully");
  } catch (error) {
    console.log("Error seeding student database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedStudentDatabase();

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (students) {
      res.status(200).json({
        success: true,
        student: students,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No students found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const student = req.body;
    const newStudent = new Student(student);
    const savedStudent = await newStudent.save();
    if (savedStudent) {
      res.status(201).json({
        success: true,
        student: savedStudent,
        message: "Student added successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while adding student",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const data = req.body;
    const editedStudent = await Student.findByIdAndUpdate(studentId, data, {
      new: true,
    });
    if (editedStudent) {
      res.status(200).json({
        success: true,
        student: editedStudent,
        message: "Student edited successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while editing student",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (deletedStudent) {
      res.status(200).json({
        success: true,
        student: deletedStudent,
        message: "Student deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while deleting student",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStudentByName = async (req, res) => {
  try {
    const studentName = req.params.studentName;
    const student = await Student.findOne({ name: studentName });
    if (student) {
      res.status(200).json({
        success: true,
        student: student,
        message: "Student found successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while finding student",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
