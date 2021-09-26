const axios = require('axios')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const nodemailer = require("nodemailer")
const mailGun = require("nodemailer-mailgun-transport")
const mongoose = require('mongoose')

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

// Express Routing Setup
app.get('/', (req, res) => {
  res.send('Connected')
})

// Routes
const router = express.Router();
const getters = require("./routes/getters");
const setters = require("./routes/setters");
const mutators = require("./routes/mutators");
app.use(router.use('/', getters))
app.use(router.use('/', setters))
app.use(router.use('/', mutators))

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


