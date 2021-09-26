const mongoose = require('mongoose')
const subcategory_schema = require('../schemas/subcategory_schema')

const subcategory_model = mongoose.model('project-sub-categories', subcategory_schema)

module.exports = subcategory_model
