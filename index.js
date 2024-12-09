const express = require('express');
const mongoose = require('mongoose');
const { Student, Internals } = require('./models/reports.models.js');
const reportRoutes = require('./routes/report.routes.js');
const dotenv = require('dotenv'); // Add dotenv
const app = express();

dotenv.config(); // Load variables from .env file

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send("Hello from Student Report");
});

// Use MONGO_URI and PORT from .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
