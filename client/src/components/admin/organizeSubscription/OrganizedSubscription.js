import "./OrganizedSubscription.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrganizedSubscription() {
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessagePrice, setErrorMessagePrice] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorBorder, setErrorBorder] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [inputCount, setInputCount] = useState(1);
  const [displayList, setDisplayList] = useState([]);
  const [inputList, setInputList] = useState([
    {
      id: 0,
      value: "",
    },
  ]);
  const subscriptionList = [];
  const data = {
    price: price,
    sold: sold,
    inputList: inputList,
  };

  const handleChangePrice = (e) => {
    if (e.target.value >= 0) {
      setPrice(e.target.value);
      setErrorMessagePrice(false);
    } else {
      setErrorMessagePrice(true);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value > 0 && e.target.value < 6) {
      const value = e.target.value;
      setInputValue(value);
      setInputCount(value);

      const newInputList = Array.from(
        { length: parseInt(value) },
        (_, index) => ({
          id: index + 1,
          value: "",
        })
      );
      setInputList(newInputList);
    }
  };

  const handleInputDelete = (id) => {
    if (inputCount > 1) {
      const updatedInputList = inputList.filter((input) => input.id !== id);
      setInputList(updatedInputList);
      setInputCount(inputCount - 1);
    }
  };

  const handleInputValueChange = (id, newValue) => {
    const updatedInputList = inputList.map((input) =>
      input.id === id ? { ...input, value: newValue } : input
    );
    setErrorBorder(false);
    setErrorMessage(false);
    setInputList(updatedInputList);
  };

  const handleClickSave = (e) => {

    if (price >= 0 && price !== "") {
      const url = `http://192.168.1.45:5000/create_subscriptions`;
      axios
        .post(url, data)
        .then((response) => {
          if (response.status === 200) {
            setSuccessMessage(true);
            setErrorMessage(false);
          } else {
            setSuccessMessage(false);
            setErrorMessage(true);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      setErrorMessagePrice(true);
    }
  };

  useEffect(() => {
    const url = `http://192.168.1.45:5000/subscriptions`;
    axios
      .get(url)
      .then((response) => {
        for (let item of response.data) {
          subscriptionList.push(item);
          setDisplayList(subscriptionList);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [successMessage]);

  const handleDeleteSubscription = (price) => {
    const dataIdSelected = {
      price: price,
    };
    const url = `http://192.168.1.45:5000/delete_subscriptions`;
    axios
      .post(url, dataIdSelected)
      .then((response) => {
        if (response.ok) {
          console.log("subscriptions deleted");
        } else {
          console.log("subscriptions error");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="organizedSubscription">
      <h1>Organize subscription</h1>
      <form>
        <h1>Create subscription</h1>
        <div className="price">
          <label htmlFor="price">Price : </label>
          <input
            type="number"
            onChange={handleChangePrice}
            value={price}
            min="1"
          />
          <span>euro(s)</span>
        </div>
        <span className={errorMessagePrice ? "errorMessage" : "message-hidden"}>
          Montant inférieur à 0 !
        </span>
        <div className="avantage">
          <label htmlFor="numberAvantage">
            How many avantages do you want ?
          </label>
          <input
            type="number"
            max="5"
            min="1"
            onChange={handleInputChange}
            value={inputCount}
          />
          <span>(max 5)</span>
        </div>
        {inputList.map((input) => (
          <div key={input.id} className="listInput">
            <input
              type="text"
              value={input.value}
              placeholder={`Yout avanatge`}
              onChange={(e) => handleInputValueChange(input.id, e.target.value)}
              className={errorBorder ? "error-border" : ""}
              required
            />
            <button onClick={() => handleInputDelete(input.id)}>Delete</button>
          </div>
        ))}
        <button type="submit" onClick={handleClickSave}>
          Save
        </button>
        <span className={successMessage ? "successMessage" : "message-hidden"}>
          Successful
        </span>
        <span className={errorMessage ? "errorMessage" : "message-hidden"}>
          Failed
        </span>
      </form>
      <div className="bottom">
        <form>
          <h1>Delete subscription</h1>
          <div className="displaySubscription">
            <h3>Subscription : </h3>
            {displayList.map((list) => (
              <div key={list.id} className="subDelete">
                <h4>{list.price} euro(s)</h4>
                <button onClick={(e) => handleDeleteSubscription(list.price)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </form>
        <form>
          <h1>Update subscription</h1>
        </form>
      </div>
    </div>
  );
}
