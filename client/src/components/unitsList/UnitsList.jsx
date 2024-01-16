import "./unitsList.css";
import { useOutletContext } from 'react-router-dom';

const UnitsList = () => {
    const { dataUnits, setUnitSelected } = useOutletContext();
    //función para manejar el evento del click y ubicar a que unidad se le esta haciendo click
    const handleClick = (unit) => {
        setUnitSelected(unit);
    }

    return (
        //Componente de las unidades
        <section className="units-list">
            <h2 className="units-list__title">Presione la carta de una unidad</h2>
            <p className="units-list__paragraph">Podrás ver su último evento</p>
            {dataUnits.map((unit) => (
                <article className="card" onClick={() => handleClick(unit)} key={unit.IDGPS}>
                    <header>
                    </header>
                    <div className='card__main'>
                        <span className='card__pill'><i className='card__icon'>👥</i>{unit.NOMBRE_GRUPO}</span>
                        <span className='card__pill'><i className='card__icon'>🚐</i> {unit.NOMBRE_UNIDAD}</span>
                        <span className='card__pill'><i className='card__icon'>🚗</i>{unit.PLACAS}</span>
                        <span className='card__pill'><i className='card__icon'>📆</i><time dateTime={unit.ANO}>{unit.ANO}</time></span>
                    </div>
                </article>
            ))
            }
        </section >
    );
}

export default UnitsList;
