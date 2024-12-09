const express = require("express");
const {Student, Internals} = require('../models/reports.models.js');
const router = express.Router();
const {getStudent,getStudents,enterStudent,updateStudent,enterMarks,getMark,updateMarks,getStudentDetails} = require('../controllers/report.controller.js')


router.get('/:id',getStudent)
router.get('/',getStudents)
router.post('/',enterStudent)
router.put('/:id',updateStudent)
router.post('/:id/marks',enterMarks)
router.get('/:id/marks',getMark)
router.put('/:id/marks',updateMarks)
router.get('/studentReport/:id',getStudentDetails)






module.exports = router;