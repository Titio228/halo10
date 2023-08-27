import "./Product.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
export default function Product() {
  const [displayAllSubscription, setDisplayAllSubscription] = useState([]);
  const [displayListEmpty, setDisplayListEmpty] = useState(false);

  const split = (line) => {
    console.log(line.split("\n"));
    return line.split("\n");
  };

  useEffect(() => {
    const url = `http://192.168.1.45:5000/subscriptions`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.length > 0) {
          setDisplayAllSubscription(response.data);
          setDisplayListEmpty(false);
        } else {
          setDisplayAllSubscription(response.data);
          setDisplayListEmpty(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="product">
      <div className="title-subscription">
        <h3>Subscription</h3>
      </div>
      <div className="subscriptions">
        {displayAllSubscription.map((e) => (
          <div key={e.id} className="card1">
            <h3>{e.price}€/month</h3>
            {split(e.all_avantages).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ))}
      </div>
      <div
        className={displayListEmpty ? "displayListEmpty" : "hiddenListEmpty"}
      >
        <p>List Empty</p>
      </div>
    </div>
  );
}
