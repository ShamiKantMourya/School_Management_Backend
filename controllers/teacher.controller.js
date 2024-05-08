const mongoose = require("mongoose");
const fs = require("fs");

const jsonData = fs.readFileSync("./data/teacher.json");
const teacherData = JSON.parse(jsonData);
const Teacher = require("../models/teacher.model");

const seedTeacherDatabase = async () => {
  try {
    for (const teacher of teacherData) {
      const newTeacher = new Teacher(teacher);
      await newTeacher.save();
      console.log(`Teacher ${teacher.name} seeded`);
    }
    console.log("Teacher database seeded successfully");
  } catch (error) {
    console.log("Error seeding teacher database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedTeacherDatabase();

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    if (teachers) {
      res.status(200).json({
        success: true,
        teacher: teachers,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No teachers found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const teacher = req.body;
    const newTeacher = new Teacher(teacher);
    const savedTeacher = await newTeacher.save();
    if (savedTeacher) {
      res.status(201).json({
        success: true,
        teacher: savedTeacher,
        message: "Teacher added successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while adding teacher",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const data = req.body;
    const editedTeacher = await Teacher.findByIdAndUpdate(teacherId, data, {
      new: true,
    });
    if (editedTeacher) {
      res.status(200).json({
        success: true,
        teacher: editedTeacher,
        message: "Teacher edited successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while editing teacher",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (deletedTeacher) {
      res.status(200).json({
        success: true,
        teacher: deletedTeacher,
        message: "Teacher deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while deleting teacher",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTeacherByName = async (req, res) => {
  try {
    const teacherName = req.params.teacherName;
    const teacher = await Teacher.findOne({ name: teacherName });
    if (teacher) {
      res.status(200).json({
        success: true,
        teacher: teacher,
        message: "Teacher found successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while finding teacher",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
