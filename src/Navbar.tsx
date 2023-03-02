import logo from "./imgs/logo.png";
import avatar from "./imgs/avatar.png";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [darken, setDarken] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            window.pageYOffset !== 0 ? setDarken(true) : setDarken(false);
        };
    });

    return (
        <nav className={darken ? "darken" : ""}>
            <a href="/">
                <img className="logo" src={logo}></img>
            </a>
            <img className="avatar" src={avatar}></img>
        </nav>
    );
};

export default Navbar;
