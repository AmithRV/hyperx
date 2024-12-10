const { Schema, mongoose } = require('mongoose');

const categorySchema = new Schema({
  label: {
    type: String,
    require: [true, 'Please provide a name'],
  },
});

const Category =
  mongoose.models.categories || mongoose.model('categories', categorySchema);
export default Category;
