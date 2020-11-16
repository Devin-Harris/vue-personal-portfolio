async function findDatabaseCollections(collection) {
  try {
    const result = await client.db("portfolio").collection(collection).find({}).toArray()

    if (result) {
      console.log(`collection:`)
    } else {
      console.log(`No listings`)
    }

    const data = Array.from(result)
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}


const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || "3000"

const { MongoClient } = require('mongodb')
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURI(process.env.PASS)}@cluster0.fvr3j.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
const client = new MongoClient(uri)


app.listen(port, async () => {
  console.log(`Listening on port ${port}`)
  await client.connect()
})

app.use(express.static('portfolio/dist'))
app.use(express.json())
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Pass to next layer of middleware
  next()
})

app.post('/api', (req, res) => {
  const data = req.body
  res.end()
})

app.get('/project-categories', async (req, res) => {
  const data = await findDatabaseCollections("project-categories")
  res.json(data)
})

app.get('/project-sub-categories', async (req, res) => {
  const data = await findDatabaseCollections("project-sub-categories")
  res.json(data)
})

app.patch('/api', (req, res) => {
  const data = req.body
  res.end()
})

app.delete('/api', (req, res) => {
  const data = req.body
  res.end()
})