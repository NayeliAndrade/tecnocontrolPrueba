import L from "leaflet";
import { useRef } from "react";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import PropTypes from 'prop-types';

const Map = ({ latLng }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const map = L.map(mapRef.current);

        map.setView([19.4326, -99.1332], 10);

        const myAPIKey = import.meta.env.VITE_API_KEY;

        const isRetina = L.Browser.retina;

        const baseUrl =
            "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
        const retinaUrl =
            "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";


        L.tileLayer(isRetina ? retinaUrl : baseUrl, {
            attribution:
                'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
            apiKey: myAPIKey,
            maxZoom: 20,
            id: "osm-bright",
        }).addTo(map);

        // Longitud y latitud de acuerdo al endpoint
        const { lat, lon } = latLng;

        // Validación para crear en pantalla el marcador
        if (lat && lon) {
            const icon = L.icon({
                iconUrl: "/marker.png",
                iconSize: [25, 41]
            })
            const marker = L.marker([lat, lon], { icon });

            const popupContent = `<p>Latitud: ${lat}</p><p>Longitud: ${lon}</p>`;

            marker.bindPopup(popupContent);
            marker.addTo(map);
        }

        return () => {
            map.off();
            map.remove();
        }
    }, [latLng]);

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: 500,
            }}
        ></div>
    );
};

Map.propTypes = {
    latLng: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number
    })
};

export default Map;