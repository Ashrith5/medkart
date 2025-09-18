const express = require('express');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/userModel')
const sequelize = require("./config/sequelize");
const router = require('./routes/userroutes');
const sellerRoutes = require('./routes/sellerRoutes');
const path = require("path"); // ✅ add this

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", router);
app.use('/api/seller', sellerRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 8080;

sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connection established");
    return sequelize.sync({ force:false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
