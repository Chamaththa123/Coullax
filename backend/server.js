const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const bookReviewRoutes = require("./routes/bookReviewRoutes");
const userRoutes = require("./routes/userRoutes");

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow only one specific domain
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/reviews", bookReviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
