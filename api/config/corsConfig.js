require('dotenv').config();
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Fallback to '*' if not specified
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

module.exports = cors(corsOptions);