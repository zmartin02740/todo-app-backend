const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Task = require('./models/tasks')
const port = 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const uri = "mongodb+srv://testuser:1234@cluster0.1puli.mongodb.net/todo-app?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err))

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

app.get('/all-tasks', (req, res) => {
  Task.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

app.post('/delete-task', (req, res) => {
  console.log(req.body)
  Task.findByIdAndRemove(req.body._id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

app.get('/delete-completed', (req, res) => {
  Task.deleteMany({ active: false })
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

app.post('/update-active', (req, res) => {
  Task.findByIdAndUpdate(req.body._id, { active: req.body.active })
    .then((result) => {
      result.active = !result.active
      res.send(result)
    })
    .catch((err) => console.log(err))
})

app.post('/update-body', (req, res) => {
  Task.findByIdAndUpdate(req.body._id, { body: req.body.body })
    .then((result) => {
      console.log(result)
      res.send(result)
    })
    .catch((err) => console.log(err))
})
