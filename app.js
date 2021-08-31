const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

require('./helpers/config'); // provides defaults for env variables for non-dev environments
const appRouter = require('./routes');

const { PORT, DATABASE_URL } = process.env;

const app = express();

mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  // eslint-disable-next-line no-console
  .then(() => console.log('mongodb connected'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));

app.use(appRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('server listening'));
