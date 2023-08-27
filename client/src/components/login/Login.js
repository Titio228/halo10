import "./Login.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [clickConnection, setClickConnection] = useState(true);
  const [clickInscription, setClickInscription] = useState(true);

  const handleClickConnection = () => {
    setClickConnection(true);
    setClickInscription(false);
  };

  const handleClickInscription = () => {
    setClickConnection(false);
    setClickInscription(true);
  };

  const handleClickBack = () => {
    setClickConnection(true);
    setClickInscription(true);
  };

  return (
    <div className="login">
      <div className="back">
        <NavLink to="/login">
          <i class="fa-solid fa-backward-step" onClick={handleClickBack}></i>
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink
          to="/login/connection"
          className={clickConnection ? "link-login" : "link-hidden-connection"}
          onClick={handleClickConnection}
        >
          Connection
        </NavLink>
        <NavLink
          to="/login/inscription"
          className={
            clickInscription ? "link-login" : "link-hidden-inscription"
          }
          onClick={handleClickInscription}
        >
          Inscription
        </NavLink>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
