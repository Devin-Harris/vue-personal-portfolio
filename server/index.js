const axios = require('axios')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.PASS}@cluster0.fvr3j.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (error) {
  if (error)
    console.log(error)
  else
    console.log('Connected to DB')
})

var category_schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    display_image: String,
    subCategories: [],
    images: []
  }
)
const Categories = mongoose.model('project-categories', category_schema)

var sub_category_schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    category_name: String,
    sub_category_name: String,
    display_image: String,
    projects: [{
      name: String,
      display_image: String,
      description: String
    }],
  }
)
const SubCategories = mongoose.model('project-sub-categories', sub_category_schema)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })

app.use(express.static('server_html'))

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.get('/', (req, res) => {
  console.log('Route / recieved')
  res.send('Connected')
})

app.get('/project-categories', (req, res) => {
  console.log('Route / recieved')
  Categories.find({}, async (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(response)
  })
})

app.get('/project-sub-categories', (req, res) => {
  console.log('Route / recieved')
  SubCategories.find({}, async (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(response)
  })
})

app.post('/add-project', async (req, res) => {
  console.log('Route / recieved')
  // Check for correct security key
  if (req.body.projectKey === process.env.PASS) {
    // Make insert to images of document if no sub categories or insert to projects of sub category if sub category

    // If sub categories find sub category in DB
    if (req.body.projectSubCategory) {

      // Check if project already exists
      if (SubCategories.find({
        sub_category_name: req.body.projectSubCategory,
        projects: {
          name: req.body.projectName,
          display_image: req.body.projectImages[0],
          description: req.body.projectDesc
        }
      }))
        res.send({ message: 'Project already exists', status: 400 })
      else
        SubCategories.updateOne(
          { sub_category_name: req.body.projectSubCategory },
          {
            $push: {
              projects: {
                name: req.body.projectName,
                display_image: req.body.projectImages[0],
                description: req.body.projectDesc
              }
            }
          },
          async (err, response) => {
            if (err) {
              console.log(err)
              res.send(err)
              return
            }
            res.send({ message: 'Project has successfully been created', status: 200 })
          })
    }
    // Else find category in DB and append to images
    else {

      // Check if project already exists
      const category = await Categories.find({ _id: req.body.projectCategory._id })
      if (category[0].images.some(image => req.body.projectImages.includes(image))) {
        res.send({ message: 'Project already exists', status: 400 })
      }
      else
        Categories.updateOne({ _id: req.body.projectCategory._id }, { $push: { images: req.body.projectImages } }, async (err, response) => {
          if (err) {
            console.log(err)
            res.send(err)
            return
          }
          res.send({ message: 'Project has successfully been created', status: 200 })
        })
    }
  } else {
    res.send({ message: 'Project has NOT successfully been created', status: 400 })
  }
})