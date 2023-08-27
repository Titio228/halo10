import "./Dead.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Dead() {
  const [lastname, setLastName] = useState("");
  const [displayAllPerson, setDisplayAllPerson] = useState([]);
  const [displayListEmpty, setDisplayListEmpty] = useState(false);

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const url = `http://192.168.1.45:5000/users/${lastname}`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.length > 0) {
          setDisplayAllPerson(response.data);
          setDisplayListEmpty(false);
        } else {
          setDisplayAllPerson(response.data);
          setDisplayListEmpty(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [lastname]);
  return (
    <div className="dead">
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Name"
        value={lastname}
        onChange={handleChangeLastName}
      />
      <table className="Table-users">
        <tr>
          <td className="Td-title">Name</td>
          <td className="Td-title">Firstname</td>
          <td className="Td-title">Birthday</td>
          <td className="Td-title">Dead</td>
          <td className="Td-title">Gender</td>
        </tr>
        {displayAllPerson.map((user) => (
          <tr key={user.id}>
            <td className="Td-item">{user.lastname}</td>
            <td className="Td-item">{user.firstname}</td>
            <td className="Td-item">{formatDate(user.birthday)}</td>
            <td className="Td-item">{formatDate(user.dead)}</td>
            <td className="Td-item">{user.sex}</td>
          </tr>
        ))}
      </table>
      <div
        className={displayListEmpty ? "displayListEmpty" : "hiddenListEmpty"}
      >
        <p>List Empty</p>
      </div>
    </div>
  );
}
