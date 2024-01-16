import { useState, useEffect } from 'react';
import axios from 'axios';

//custom hook para realizar la petición de unidades 

const useApiData = (apiEndpoint) => {
    const [data, setData] = useState([]); //USESTATE MANEJO DE TODA LA INFORMACION
    const [loading, setLoading] = useState(true); // USESTATE DEL LOADING
    const [error, setError] = useState(null); //USESTATE ERROR

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint, {
                    headers: {
                        'Accept': 'application/json',
                        'Tcv-Client-Id': import.meta.env.VITE_TCV_CLIENT_ID,
                    },
                });

                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [apiEndpoint]);

    return { data, loading, error };
};

export default useApiData;
