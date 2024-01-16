import express from "express";
import eventsController from "../controllers/eventsController.js";

const router = express.Router();

//Rutas 
router.get("/getAllEvents", eventsController.getAllEvents);
router.post("/createEvents", eventsController.createEvents);
router.get('/getByIdEvents/:id', eventsController.getByIdEvents);


export default router;