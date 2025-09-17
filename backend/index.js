const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require("./config/sequelize");

// Import routes
const userRoutes = require("./routes/userroutes");
const adminroutes = require("./routes/adminroutes");



const app = express();
app.use(cors());
app.use(express.json());


// Default route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Use user routes
app.use("/api", userRoutes);
app.use("/api/admin", adminroutes);


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

