const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes"); // Import user routes

dotenv.config();

const app = express();

// ✅ Middleware to parse JSON requests safely
app.use(express.json());

// ✅ Handle Invalid JSON Errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON input" });
  }
  next();
});

// ✅ Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// ✅ Use the user routes under `/api/users`
app.use("/api/users", userRoutes);

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });
