const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/studentModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post('/student', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/student', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/student/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const students = await Student.findById(id, req.body);
    if (!students) {
      res.status(404).json( {message: 'Destroy' });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.put('/student/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const students = await Student.findByIdAndUpdate(id, req.body);
    if (!students) {
      res.status(404).json( {message: 'Destroy' });
    }
    const updatedStudent = await Student.findById(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


app.delete('/student/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const students = await Student.findByIdAndDelete(id, req.body);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

mongoose.connect('mongodb+srv://admin:admin@studentapi.ozzlq0i.mongodb.net/students?retryWrites=true&w=majority')
  .then(() => {
    app.listen('3000', () => {
      console.log('App is running.');
    })
  })
  .catch(() => console.log('Failed to connect to MongoDB.'))