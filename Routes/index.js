import express from "express";
import { testResponse } from "../Controllers/testController.js";

const router = express.Router();

router.get("/test", testResponse);

export default router;
