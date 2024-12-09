const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the Internals Schema
const internalsSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subject1: { type: Number, required: true },
    subject2: { type: Number, required: true },
    subject3: { type: Number, required: true },
    subject4: { type: Number, required: true },
    subject5: { type: Number, required: true },
    subject6: { type: Number, required: true },
});

// Define the Student Schema
const studentSchema = new Schema({
    name: { type: String, maxlength: 100 },
    rollNum: { type: String, unique: true, required: true },
    dept: { type: String, maxlength: 100, required: true },
    email: { type: String, unique: true, required: true, index: true },
    regnNum: { type: Number, unique: true, required: true },
    dob: { type: Date, required: true },
    internals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Internals' }]
});

// Create Models
const Internals = mongoose.model('Internals', internalsSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { Student, Internals };
