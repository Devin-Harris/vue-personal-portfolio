const mongoose = require('mongoose')
const category_schema = require('../schemas/category_schema')

const category_model = mongoose.model('project-categories', category_schema)

module.exports = category_model
