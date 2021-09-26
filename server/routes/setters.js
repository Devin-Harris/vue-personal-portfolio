const router = require("express").Router();
const ftp = require("basic-ftp")
const formidable = require('formidable')
const fs = require('fs')

async function createFTPConnection() {
  const client = new ftp.Client()
  client.ftp.verbose = false
  await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    secure: true,
    secureOptions: { "rejectUnauthorized": false }
  })
  return client
}
async function uploadImage(image, folder) {
  const client = await createFTPConnection()
  const stream = fs.createReadStream(image.path)
  await client.uploadFrom(stream, folder + '/' + image.name)
  client.close()
}
async function removeFile(dataPath) {
  const client = await createFTPConnection()
  const paths = dataPath.split('/')
  await client.remove(paths[paths.length - 1])
  client.close()
}

router.route('/upload/:folder/:key').post(async (req, res) => {
  if (req.params.key !== process.env.PASS) {
    res.send({ message: 'Unsuccessfully uploaded an image', status: 400 })
    return
  }
  try {
    new formidable.IncomingForm().parse(req)
      .on('file', async (name, file) => {
        await uploadImage(file, req.params.folder)
        res.status(200).send({ ok: true, message: 'Successfully uploaded an image', path: '/' + req.params.folder + '/' + name })
      })
      .on('error', (err) => {
        throw err
      })
  } catch (error) {
    res.status(400).send({ ok: false, message: 'Unsuccessfully uploaded an image', error })
  }
})

const Categories = require('../models/category_model')
const SubCategories = require('../models/subcategory_model')
router.route('/add-project').post(async (req, res) => {
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
                display_image: req.body.displayImage ? req.body.displayImage : req.body.projectImages[0],
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
router.route('/edit-project').post(async (req, res) => {
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
      project.display_image = req.body.displayImage ? req.body.displayImage : req.body.projectImages[0]
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
router.route('/reorder-project').post(async (req, res) => {
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
router.route('/verify-password').post(async (req, res) => {
  // Check if security key is valid
  if (req.body.password !== process.env.PASS) {
    res.status(400).send({ message: 'Incorrect Password.', status: 400 })
  } else {
    res.status(200).send({ message: 'Correct Password.', status: 200 })
  }
})

module.exports = router