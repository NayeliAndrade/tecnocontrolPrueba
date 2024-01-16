import { useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const menu = useRef(null);

    const handleClickMenu = () => {
        menu.current.classList.toggle("menu--open");
    }
    return (
        <header className="header">
            <nav className="header__nav">
                <h1 className="header__logo">Tecnocontrol</h1>
                <button type="button" title="open-menu" onClick={handleClickMenu} className="menu__icon-container"><div className="menu__icon"></div></button>
                <ul ref={menu} className="menu">
                    <li>
                        <Link className="menu__link" to={"/"}>Unidades</Link>
                    </li>
                    <li>
                        <Link className="menu__link" to={"/reports"}>Reportes</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
