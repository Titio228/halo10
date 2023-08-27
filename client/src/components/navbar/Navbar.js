import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const [displayNavbarAdmin, setDisplayNavbarAdmin] = useState(true);
  const [clickArrow, setClickArrow] = useState(false);

  const handleClickArrow = (e) => {
    setClickArrow(!clickArrow);
  };

  return (
    <div className="navbar">
      <div
        className={
          clickArrow
            ? "link-container displayNavbar"
            : "link-container hiddenNavbar"
        }
      >
        <NavLink to="/" activeClassName="active" className="link-navbar">
          Home
        </NavLink>
        <NavLink
          to="/list_dead"
          activeClassName="active"
          className="link-navbar"
        >
          List Dead
        </NavLink>
        <NavLink to="/product" activeClassName="active" className="link-navbar">
          Products
        </NavLink>
        <NavLink to="/contact" activeClassName="active" className="link-navbar">
          Contact
        </NavLink>
        <NavLink
          to="/login"
          activeClassName="active"
          className={
            user.login ? "link-navbar connected" : "link-navbar disconnected"
          }
        >
          Login
        </NavLink>
      </div>
      <div className="arrow-container">
        <i
          className={
            clickArrow
              ? "fa-solid fa-arrow-turn-up"
              : "fa-solid fa-arrow-turn-down"
          }
          onClick={handleClickArrow}
        ></i>
      </div>
      <div
        className={
          displayNavbarAdmin ? "display-navbar-admin" : "hidden-navbar-admin"
        }
      >
        <NavLink
          to="/organized"
          activeClassName="active"
          className="navbarAdmin"
        >
          Admin Organized
        </NavLink>
      </div>
    </div>
  );
}
