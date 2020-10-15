const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Task = require('./models/tasks')
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const uri = "mongodb+srv://testuser:1234@cluster0.1puli.mongodb.net/todo-app?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('hello world')
})

// add a new task
app.post('/add-task', (req, res) => {
  console.log(req.body, 'request')
  const task = new Task({
    body: req.body.body,
    active: req.body.active
  })

  task.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err))
})

// get all tasks
app.get('/all-tasks', (req, res) => {
  Task.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

// delete a task with a given id
app.post('/delete-task', (req, res) => {
  console.log(req.body)
  Task.findByIdAndRemove(req.body._id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

// delete all tasks that are completed by removing all tasks that have active set to false
app.get('/delete-completed', (req, res) => {
  Task.deleteMany({ active: false })
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

// update the active property by setting the boolean to its opposite
app.post('/update-active', (req, res) => {
  Task.findByIdAndUpdate(req.body._id, { active: req.body.active })
    .then((result) => {
      result.active = !result.active
      res.send(result)
    })
    .catch((err) => console.log(err))
})

// update the task body with a new string
app.post('/update-body', (req, res) => {
  Task.findByIdAndUpdate(req.body._id, { body: req.body.body })
    .then((result) => {
      console.log(result)
      res.send(result)
    })
    .catch((err) => console.log(err))
})
