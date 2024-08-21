import express from "express";
import { registerEmp, getAllEmp, updateEmp, deleteEmp } from "../controller/employee.controller.js";
import { isAuthenticated } from "../middleware/employee.middleware.js";

const router = express.Router();

router.route("/registeremp").post( registerEmp);
router.route("/getemp").get(isAuthenticated, getAllEmp);
router.route("/updateemp/:id").put( updateEmp);
router.route("/deleteemp/:id").delete(deleteEmp);

export default router;
