import db from "../config/dbConfig.js";

// Funciones del CRUD
//Obtener todos los eventos 
const getAllEvents = (req, res) => {
    const sql = "SELECT * FROM eventsLists";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: err });
        return res.json(result);
    });
};

//Almacenar los eventos 
const createEvents = (req, res) => {
    console.log(req.body)
    const {
        NAME_DEVICE,
        DESC_MSG,
        DIR,
        IGNICION,
        NOMBRE_GRUPO,
        DT_MSG,
        ID_MSG,
        LON,
        LAT,
        ODOMETRO_KMS,
        UBICACION,
        VEL
    } = req.body;

    const sql = "INSERT INTO eventsLists (`NAME_DEVICE`, `DESC_MSG`, `DIR`,`IGNICION`, `NOMBRE_GRUPO`, `DT_MSG`,`ID_MSG`, `LON`,`LAT`,`ODOMETRO_KMS`,`UBICACION`,`VEL` ) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?)";
    const values = [
        NAME_DEVICE,
        DESC_MSG,
        DIR,
        IGNICION,
        NOMBRE_GRUPO,
        DT_MSG,
        ID_MSG,
        LON,
        LAT,
        ODOMETRO_KMS,
        UBICACION,
        VEL
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ message: "Error interno del servidor" });
        return res.status(201).json(result);
    });
};

//Obtener los eventos de acuerdo al ID 
const getByIdEvents = (req, res) => {
    const sql = "SELECT * FROM eventsLists WHERE ID=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error interno del servidor" });
        return res.status(200).json(result);
    });
};


export default {
    getAllEvents,
    createEvents,
    getByIdEvents
};
