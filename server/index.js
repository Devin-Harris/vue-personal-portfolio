const axios = require('axios')
const dotenv = require('dotenv').config()

const express = require('express')
const app = express()

const nodemailer = require("nodemailer")
const mailGun = require("nodemailer-mailgun-transport")
const mongoose = require('mongoose')
const Schema = mongoose.Schema
var history = require('connect-history-api-fallback')

const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json({ limit: '1000mb' }))
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: false }))


// Mongoose methods
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
      description: String,
      live_site: String,
      code: String
    }],
  }
)
const SubCategories = mongoose.model('project-sub-categories', sub_category_schema)


// Express endpoints setup
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
  console.log(`Route ${req.originalUrl} received`)
  // Pass to next layer of middleware
  next()
})

app.get('/', (req, res) => {
  res.send('Connected')
})

app.get('/project-categories', (req, res) => {
  Categories.find({}, async (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(response)
  })
})

app.get('/project-sub-categories', (req, res) => {
  SubCategories.find({}, async (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(response)
  })
})

app.post('/add-project', async (req, res) => {
  // Check for correct security key
  if (req.body.projectKey === process.env.PASS) {
    // Make insert to images of document if no sub categories or insert to projects of sub category if sub category

    // If sub categories find sub category in DB
    if (req.body.projectSubCategory) {

      // Check if project already exists
      const subCat = await SubCategories.find({
        sub_category_name: req.body.projectSubCategory,
        projects: {
          name: req.body.projectName,
          display_image: req.body.projectImages[0],
          description: req.body.projectDesc,
          live_site: req.body.projectSite,
          code: req.body.projectCode
        }
      })
      if (subCat.length > 0)
        res.send({ message: 'Project already exists', status: 400 })
      else
        SubCategories.updateOne(
          { sub_category_name: req.body.projectSubCategory },
          {
            $push: {
              projects: {
                name: req.body.projectName,
                display_image: req.body.projectImages[0],
                description: req.body.projectDesc,
                live_site: req.body.projectSite,
                code: req.body.projectCode
              }
            }
          },
          async (err, response) => {
            if (err) {
              res.send({ message: 'Project has NOT successfully been created', status: 400 })
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
            res.send({ message: 'Project has NOT successfully been created', status: 400 })
            return
          }
          res.send({ message: 'Project has successfully been created', status: 200 })
        })
    }
  } else {
    res.send({ message: 'Project has NOT successfully been created', status: 400 })
  }
})

app.post('/edit-project', async (req, res) => {
  // Check for correct security key
  if (req.body.projectKey !== process.env.PASS) {
    res.send({ message: 'Project has NOT successfully been updated', status: 400 })
    return
  }

  // If sub categories find sub category in DB
  if (req.body.projectSubCategory) {
    const subCategory = await SubCategories.find({ sub_category_name: req.body.projectSubCategory })
    const project = subCategory[0].projects.find(project => project._id == req.body.projectId)

    // If project exists in subcategory, update project in sub category
    if (project) {
      project.name = req.body.projectName
      project.description = req.body.projectDesc
      project.display_image = req.body.projectImages[0]
      project.live_site = req.body.projectSite
      project.code = req.body.projectCode

      const updatedProjects = subCategory[0].projects.map(project => {
        if (project._id === req.body.projectId) {
          return {
            name: project.name,
            display_image: project.display_image,
            description: project.description,
            _id: req.body.projectId,
            live_site: req.body.projectSite,
            code: req.body.projectCode,
          }
        } else {
          return project
        }
      })

      // Update project in subcategory
      SubCategories.updateOne({ sub_category_name: req.body.projectSubCategory },
        {
          projects: updatedProjects
        },
        async (err, response) => {
          if (err) {
            res.send({ message: 'Project has NOT successfully been updated', status: 400 })
            return
          }
          res.send({ message: 'Project has successfully been updated', status: 200 })
        })

    }
    // If project doesnt exist in subcategory, add project to sub category and remove from subcategory it originated from
    else {
      // Remove from subcategory
      SubCategories.updateOne({ sub_category_name: req.body.originSubCategory },
        {
          $pull: {
            projects: {
              _id: req.body.projectId
            }
          }
        },
        async (err, response) => {
          if (err) {
            res.send({ message: 'Project has NOT successfully been updated', status: 400 })
            return
          }
          res.send({ message: 'Project has successfully been updated', status: 200 })
        }
      )

      // Add to new subcategory
      SubCategories.updateOne({ sub_category_name: req.body.projectSubCategory },
        {
          $push: {
            projects: {
              name: req.body.projectName,
              description: req.body.projectDesc,
              display_image: req.body.projectImages[0],
              live_site: req.body.projectSite,
              code: req.body.projectCode
            }
          }
        },
        async (err, response) => {
          if (err) {
            res.send({ message: 'Project has NOT successfully been updated', status: 400 })
            return
          }
          res.send({ message: 'Project has successfully been updated', status: 200 })
        }
      )
    }


  } else {
    const { projectImages } = req.body
    await Categories.findOneAndUpdate({ _id: req.body.projectCategory._id }, { images: projectImages }, async (err, response) => {
      if (err) {
        res.send({ message: 'Project has NOT successfully been updated', status: 400 })
        return
      }
      res.send({ message: 'Project has successfully been updated', status: 200 })
    })
  }

})

app.post('/reorder-project', async (req, res) => {
  // Check if security key is valid
  if (req.body.projectKey !== process.env.PASS) {
    res.send({ message: 'Incorrect Password. Project NOT updated.', status: 400 })
    return
  }

  let hasError = false

  // Reset categories to match order of req categories
  Categories.deleteMany({}, (err) => {
    if (err)
      hasError = true
    else
      console.log('Successfully deleted all categories')
  })

  const categories = req.body.categories
  Categories.insertMany(categories, (err) => {
    if (err)
      hasError = true
    else
      console.log('Successfully added all categories')
  })

  // Reset sub categories to match order of req sub categories
  SubCategories.deleteMany({}, (err) => {
    if (err)
      hasError = true
    else
      console.log('Successfully deleted all sub categories')
  })

  const subCategories = req.body.subCategories
  SubCategories.insertMany(subCategories, (err) => {
    if (err)
      hasError = true
    else
      console.log('Successfully added all sub categories')
  })

  // Reset selected sub category projects to match order of req selected sub category projects
  SubCategories.updateOne({ sub_category_name: req.body.selectedSubCategory.sub_category_name }, { $set: { projects: req.body.selectedSubCategory.projects } }, (err) => {
    if (err)
      hasError = true
    else
      console.log('Successfully updated selected sub category projects')
  })


  if (hasError)
    res.send({ message: 'Project has NOT successfully been updated', status: 400 })
  else
    res.send({ message: 'Project has successfully been updated', status: 200 })
})

app.post('/verify-password', async (req, res) => {
  // Check if security key is valid
  if (req.body.password !== process.env.PASS) {
    res.status(400).send({ message: 'Incorrect Password.', status: 400 })
  } else {
    res.status(200).send({ message: 'Correct Password.', status: 200 })
  }
})

// Node Mailer methods
app.post('/form-submission', async (req, res) => {
  const { email, message, firstName, lastName } = req.body

  let name = null
  if (firstName && lastName)
    name = firstName + ' ' + lastName

  let fromEmail = email
  if (name)
    fromEmail = `${name} <${email}>`

  const auth = {
    auth: {
      api_key: process.env.MAIL_GUN_API_KEY,
      domain: process.env.MAIL_GUN_DOMAIN
    }
  }
  let transporter = nodemailer.createTransport(mailGun(auth))

  var mailOptions = {
    from: fromEmail,
    to: process.env.EMAIL,
    subject: 'Sending Email using Node.js',
    text: message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ status: 400, message: { title: 'Oh no!', subTitle: 'There was an error sending your message.' } })
    } else {
      res.send({ status: 200, message: { title: 'Message sent!', subTitle: 'I will try to respond as soon as possible.' } })
    }
  })

})


