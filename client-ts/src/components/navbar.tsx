import { useState, useEffect } from "react";
import avatar from "../assets/avatar.png";

function PopUp(id: string, setState: Function) {
    let popUpMenu = document.getElementById(id);

    if (popUpMenu !== null && popUpMenu.style.display === "none") {
        setState(true);
    } else {
        setState(false);
    }
}

function handleClickOutside(
    idPopUpMenu: string,
    idMenu: string,
    setState: Function
) {
    useEffect(() => {
        function handleClickOutsideList(event: any) {
            const popUpMenu = document.getElementById(idPopUpMenu);
            const Menu = document.getElementById(idMenu);
            if (
                Menu &&
                popUpMenu &&
                !popUpMenu.contains(event.target) &&
                !Menu.contains(event.target)
            ) {
                setState(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutsideList);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideList);
        };
    }, []);
}

function Navbar() {
    const [popUpList, setPopUpList] = useState<boolean>(false);
    const [popUpAvatar, setPopUpAvatar] = useState<boolean>(false);
    const [popUpMenu, setPopUpMenu] = useState<boolean>(false);

    function showPopupListProjectMenu() {
        PopUp("popUplistProjectMenu", setPopUpList);
    }
    handleClickOutside("popUplistProjectMenu", "listProjectMenu", setPopUpList);

    function showPopupAvatar() {
        PopUp("popUpAvatarMenu", setPopUpAvatar);
    }
    handleClickOutside("popUpAvatarMenu", "avatarMenu", setPopUpAvatar);

    function showPopupMenu() {
        PopUp("popUpMenu", setPopUpMenu);
    }
    handleClickOutside("popUpMenu", "Menu", setPopUpMenu);

    return (
        <nav>
            <a className="navbar-brand" href="/">
                Cloud Project
            </a>

            <ul className="navbar-menu-container">
                <li>
                    <a className="navbar-menu" href="/">
                        Home
                    </a>
                </li>

                <li>
                    <a className="navbar-menu" href="#">
                        Contact
                    </a>
                    <a className="navbar-menu" href="#">
                        About
                    </a>
                </li>

                <li className="navbar-popup-menu-hamburger">
                    <a
                        id="Menu"
                        className="navbar-menu-Menu"
                        onClick={showPopupMenu}
                        href="javascript:void(0)"
                    >
                        Menu
                    </a>

                    <ul
                        className="navbar-popup-menu-Menu"
                        id="popUpMenu"
                        style={{ display: popUpMenu ? "block" : "none" }}
                    >
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">Contact</a>
                        </li>
                        <li>
                            <a href="/">About</a>
                        </li>
                        <li>
                            <a href="/login">Login</a>
                        </li>
                    </ul>
                </li>

                <li className="navbar-popup-menu-container">
                    <img
                        id="avatarMenu"
                        className="navbar-avatar"
                        onClick={showPopupAvatar}
                        src={avatar}
                        alt=""
                    />
                    <ul
                        className="navbar-popup-menu-avatarmenu"
                        id="popUpAvatarMenu"
                        style={{ display: popUpAvatar ? "block" : "none" }}
                    >
                        <li>
                            <a href="/">Profile</a>
                        </li>
                        <li>
                            <a href="/">Setting</a>
                        </li>
                        <li className="navbar-popup-menu-avatarmenu-signout">
                            <a href="/">Sign out</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
