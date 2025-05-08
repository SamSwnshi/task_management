import {Router} from "express";
import { createTask, deleteTask, getTask, updateTask } from '../controllers/task.controller.js';
import auth from "../middleware/auth.middleware.js"
const task = Router();

task.get('/',auth,getTask)
task.post('/create',auth,createTask)
task.put('/update/:id',auth,updateTask)
task.delete('/delete/:id',auth,deleteTask)

export default task;