require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");

const server = express();

// Middleware
server.use(helmet());
server.use(cors({ origin: "*", credentials: true }));
server.use(express.json());
server.use(morgan("dev"));

// API Routes
server.use("/api/auth", authRoutes);
server.use("/api/categories", categoryRoutes);
server.use("/api/products", productRoutes);
server.use("/api/cart", cartRoutes);
server.use("/api/address", addressRoutes);

server.get("/", (req, res) => res.send("E-commerce API running 🚀"));

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
