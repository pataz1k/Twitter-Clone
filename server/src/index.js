require('dotenv').config();
const { app } = require('./app');

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`));
}

module.exports = app;
