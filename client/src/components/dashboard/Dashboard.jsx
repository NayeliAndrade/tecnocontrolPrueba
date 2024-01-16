import { useState } from "react";
import EventsList from "../eventsList/EventsList";
import useApiData from "../../hook/useApiUnits";
import "./dashboard.css"
import { UNITS_URL as apiEndpoint } from "../../constants/index.js"
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    //Uso de custom hook para realizar la petición al endpoint
    const { data: dataUnits, loading, error } = useApiData(apiEndpoint);

    //Hook de unidad selecionada
    const [unitSelected, setUnitSelected] = useState({});

    //Loading para esperar la información
    if (loading) {
        return <p>Cargando...</p>;
    }

    //MANEJO DEL ERROR 
    if (error) {
        console.log(error);
        return <p>Ocurrió un error al cargar los datos</p>;
    }

    return (
        <main className="dashboard">
            <Outlet context={{
                dataUnits: dataUnits,
                setUnitSelected: setUnitSelected
            }} />
            <EventsList unitSelected={unitSelected} />
        </main>
    );
};

export default Dashboard;
