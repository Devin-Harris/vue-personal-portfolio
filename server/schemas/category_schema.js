const mongoose = require('mongoose')
const Schema = mongoose.Schema

const category_schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    display_image: String,
    subCategories: [],
    images: []
  }
)

module.exports = category_schema