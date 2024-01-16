//Punto de entrada 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventsRoutes from "./routes/eventsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Uso de las routes
app.use("/", eventsRoutes);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
