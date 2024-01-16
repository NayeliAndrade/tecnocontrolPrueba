import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import Map from "../map/Map";
import PropTypes from 'prop-types';
import { EVENTS_URL } from "../../constants";

const EventsList = ({ unitSelected }) => {
    //Hook manejo del último evento
    const [lastEvent, setLastEvent] = useState({});

    //Almacenar ultimo evento en la base de datos
    const uploadDataEvents = async (lastEvent) => {
        await axios.post("http://localhost:4000/createEvents", lastEvent)
    }
    //Función asíncrona para realizar las peticiones de los eventos
    const getEventsFromUnit = async (unit) => {
        if (!unit) return;
        try {
            const dtfin = new Date();
            const dtini = new Date(dtfin);

            dtini.setHours(dtini.getHours() - 9);

            const response = await axios.get(EVENTS_URL, {
                method: "GET",
                params: {
                    dtfin,
                    dtini,
                    idgps: unit.IDGPS
                },
                headers: {
                    "Tcv-Client-Id": import.meta.env.VITE_TCV_CLIENT_ID
                }
            })
            //Validación y filtración de evento
            if (Array.isArray(response.data)) {
                const dataSorted = response.data.sort((eventA, eventB) => eventA.DTMSG - eventB.DTMSG);

                await uploadDataEvents(dataSorted.at(-1));
                setLastEvent(dataSorted.at(-1));
            }
            //Manejo del error
        } catch (err) {
            if (import.meta.env.MODE === "development") {
                console.log(err)
            }
        }
    };

    //Se vuelve a cambiar si hay un cambio
    const latLng = useMemo(() => (
        {
            lat: lastEvent.LAT,
            lon: lastEvent.LON
        }
    ), [lastEvent]);

    useEffect(() => {
        getEventsFromUnit(unitSelected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitSelected]);

    //Cada 5 minutos realizara una petición, solo si hay un cambio lo realizara
    useEffect(() => {
        const TIME = 1000 * 60 * 5;
        const idxInterval = setInterval(() => {
            getEventsFromUnit(unitSelected);
        }, TIME);

        return () => clearInterval(idxInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitSelected]);

    //Renderiza el componente del mapa
    return (
        <section style={{ flex: 1 }}>
            <Map latLng={latLng} />
        </section>
    );
}

EventsList.propTypes = {
    unitSelected: PropTypes.object
};
export default EventsList;
