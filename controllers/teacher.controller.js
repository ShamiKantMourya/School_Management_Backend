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
    res.status(200).json({
      success: true,
      teacher: teachers,
    });
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
    res.status(201).json({
      success: true,
      teacher: savedTeacher,
      message: "Teacher added successfully",
    });
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
    res.status(200).json({
      success: true,
      teacher: editedTeacher,
      message: "Teacher edited successfully",
    });
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
    res.status(200).json({
      success: true,
      teacher: deletedTeacher,
      message: "Teacher deleted successfully",
    });
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
    res.status(200).json({
      success: true,
      teacher: teacher,
      message: "Teacher found successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
