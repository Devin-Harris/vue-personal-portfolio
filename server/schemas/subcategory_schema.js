const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subcategory_schema = new Schema(
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

module.exports = subcategory_schema