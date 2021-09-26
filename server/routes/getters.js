const router = require("express").Router();

const Categories = require('../models/category_model')
router.route('/project-categories').get((req, res) => {
  Categories.find({}, async (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(response)
  })
})

const SubCategories = require('../models/subcategory_model')
router.route('/project-sub-categories').get((req, res) => {
  SubCategories.find({}, async (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(response)
  })
})

module.exports = router