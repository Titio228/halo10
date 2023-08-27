import "./Connection.css";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../../store/redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Connection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.1.45:5000/connection", data)
      .then((response) => {
        if (response.data === "success") {
          const login = { login: true };
          dispatch(setUser(login));
          navigate("/");
        } else {
          const login = { login: false };
          dispatch(setUser(login));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="connection">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail Addres</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Go !
          </button>
        </form>
      </div>
    </div>
  );
}
