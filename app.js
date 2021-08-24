const mongoose = require('mongoose');
const express = require('express');
require('./helpers/config');
const appRouter = require('./routes');

const { PORT, DATABASE_URL } = process.env;

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
