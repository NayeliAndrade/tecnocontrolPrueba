import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <nav className="header__nav">
                <h1 className="header__logo">Tecnocontrol</h1>
                <ul className="list">
                    <li>
                        <Link className="list__link" to={"/"}>Unidades</Link>
                    </li>
                    <li>
                        <Link className="list__link" to={"/reports"}>Reportes</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
