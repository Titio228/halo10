import "./Inscription.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const data = {
    lastName: lastName,
    firstName: firstName,
    birthday: birthday,
    email: email,
    phone: phone,
    sex: gender,
    password: password,
    confirmPassword: confirmPassword,
  };

  const handleChangeLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleChangeFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleChangeBirthday = (e) => {
    e.preventDefault();
    setBirthday(e.target.value);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangePhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  const handleChangeGender = (e) => {
    e.preventDefault();
    setGender(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.1.45:5000/inscription", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/login/connection");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="inscription">
      <div className="registration-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleChangeFirstName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleChangeLastName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Birthday</label>
            <input
              type="date"
              id="birthdate"
              value={birthday}
              onChange={handleChangeBirthday}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handleChangePhone}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={handleChangeGender}
              required
            >
              <option value="">Selection</option>
              <option value="male">Man</option>
              <option value="female">Woman</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
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
