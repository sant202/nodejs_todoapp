import  express from "express";
import { deleteTask, getMytask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticate } from "../middlewares/auth.js";


const router = express.Router();

router.post("/new", isAuthenticate ,newTask)
router.get("/my", isAuthenticate ,getMytask);

router.route("/:id").put(isAuthenticate,updateTask).delete(isAuthenticate, deleteTask);

export default router;