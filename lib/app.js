const express = require('express');
const app = express();

app.use(express.json());
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
