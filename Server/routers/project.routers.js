import express from "express";
import { registerProject, getAllProjects, updateProject, deleteProject } from "../controller/project.controller.js";

const router = express.Router();

router.route("/registerproject").post(registerProject);
router.route("/getallprojects").get(getAllProjects);
router.route("/updateproject/:id").put(updateProject);
router.route("/deleteproject/:id").delete(deleteProject);

export default router;
