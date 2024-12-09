const {Student, Internals} = require("../models/reports.models.js");
const mongoose = require('mongoose');

const getStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const student = await Student.findById(id);

            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ message: `Student with id ${id} not found` });
            }
        } else {
            res.status(400).json({ message: "ID is required" }); // 400 for bad request
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 for server errors
    }
};

const getStudents =  async (req,res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

const enterStudent = async(req,res) =>{
    try{
        const student = await Student.create(req.body);
        res.status(200).json(student);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const updateStudent = async(req,res)=> {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({ message:`Student with id ${id} not found`});
            
        }
        const student = await Student.findByIdAndUpdate(id,req.body);
        const updatedStudent = await Student.findById(id);
            res.status(200).json(updatedStudent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const enterMarks = async(req, res) =>{
    try {
        const { id } = req.params;
        const student = await Student.findById(id)
        if(!student){
            return res.status(404).json({ message: `Student with id ${id} not found`});
        }
        const marksData = {
            studentId : id,
            ...req.body
        };
        const marks = await Internals.create(marksData);
        res.status(201).json(marks); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMark = async(req,res) =>{
    try {
        const { id } = req.params;
        const student = await Student.findById(id)
        if(!student){
            return res.status(404).json({ message: `Student with id ${id} not found`});
        }
        const {studentId} = id;
        const marks = await Internals.findOne(studentId);
        res.status(200).json(marks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMarks = async(req,res)=>{
    try {
        const { id } = req.params;
        const student = await Student.findById(id)
        if(!student){
            return res.status(404).json({ message: `Student with id ${id} not found`});
        }
        const {studentId} = id;
        const marks = await Internals.findOneAndUpdate(studentId, req.body);
        const updatedMarks = await Internals.findOne(studentId);
        res.status(200).json(updatedMarks);        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getStudentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Student.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $lookup: { from: "internals", localField: "_id", foreignField: "studentId", as: "internals" } },
            { $project: { _id: 1, 
                name: 1, 
                rollNum: 1, 
                "internals._id": 1, 
                "internals.subject1": 1,
                 "internals.subject2": 1,
                 "internals.subject3": 1,
                 "internals.subject4": 1,
                 "internals.subject5": 1, 
                 "internals.subject6": 1 } }
        ]);
        if (result.length === 0) {
            return res.status(404).json({ message: `Student with id ${id} not found` });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





module.exports = {
    getStudent,
    getStudents,
    enterStudent,
    updateStudent,
    enterMarks,
    getMark,
    updateMarks,
    getStudentDetails
    
}