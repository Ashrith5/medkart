const express = require('express');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/userModel')
const sequelize=require("./config/sequelize");
const router = require('./routes/userroutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",router);
app.get('/', (req, res) => {
  res.send('Backend is running');
});
const PORT = process.env.PORT || 8080;

sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connection established");
     return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
