const app = require('./app');

const { DEFAULT_PORT } = require('./configs/keys.shared');

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
