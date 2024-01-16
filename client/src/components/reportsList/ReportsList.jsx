import axios from "axios";
import { useEffect, useState } from "react";

const ReportsList = () => {
    const [reports, setReports] = useState([]);

    const getReportsFromOwnBackend = async () => {
        const response = await axios.get("http://localhost:4000/getAllEvents");
        setReports(response.data);
    }

    useEffect(() => {
        getReportsFromOwnBackend();
    }, [])

    return (

        <section className="units-list">
            {reports.map((report) => (
                <article className="card" key={crypto.randomUUID()}>
                    <header>
                    </header>
                    <div className='card__main'>
                        <span className='card__pill'><i className='card__icon'>🚐</i>{report.NAME_DEVICE}</span>
                        <p className='card__pill'><i className='card__icon'>☁</i> {report.DESC_MSG}</p>
                        <span className='card__pill'><i className='card__icon'>🧭</i>{report.UBICACION}</span>
                        <span className='card__pill'><i className='card__icon'>🌩</i>{report.VEL}</span>
                    </div>
                </article>
            ))}

        </section >
    );
}

export default ReportsList;
