const mongoose = require('mongoose');
const express = require('express');
const appRouter = require('./routes');

const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://localhost:27017/news_explorer_api_dev',
} = process.env;

const app = express();

mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.error(err));

app.use(appRouter);

app.listen(PORT, () => console.log('server listening'));
