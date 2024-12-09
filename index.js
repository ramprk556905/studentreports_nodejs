const express = require('express')
const mongoose = require('mongoose')
const {Student, Internals} = require('./models/reports.models.js')
const reportRoutes = require('./routes/report.routes.js')
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/reports',reportRoutes)


app.get('/',(req,res)=>{
    res.send("Hello from Student Report");
})

mongoose.connect('mongodb+srv://ramprk97:admin@reportsdb.xm4vg.mongodb.net/StudentReports?retryWrites=true&w=majority&appName=reportsDB')
  .then(() => {console.log('Connected to the database')
    app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
});
})
  .catch(err => console.error(err));