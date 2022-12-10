const express = require('express');

const { PORT } = require('./configs/keys');

const app = express();

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Works.'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});