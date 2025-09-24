import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import MainRoutes from "./routes/index.js";

const server = express();
const PORT = process.env.PORT || 9000;

server.use(helmet());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use(express.json());
server.use(morgan("dev"));
server.use("/api", MainRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
