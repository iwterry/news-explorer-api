const mongoose = require('mongoose');

const {
  DATABASE_URL = 'mongodb://localhost:27017/news_explorer_api_dev',
} = process.env;

mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.error(err));
