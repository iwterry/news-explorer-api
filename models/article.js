const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    max: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: validator.isURL,
  },
  image: {
    type: String,
    required: true,
    validate: validator.isURL,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
  },
});

articleSchema.statics.validateUniqueArticlePerOwner = function validate({ owner, link }) {
  return this.findOne({ owner, link })
    .then((article) => article === null);
};

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
