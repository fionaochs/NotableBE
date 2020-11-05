const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/api/v1/health', require('./routes/health'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
