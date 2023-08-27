import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Dead from "../dead/Dead";
import Product from "../product/Product";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Connection from "../login/connection/Connection";
import Inscription from "../login/inscription/Inscription";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Organized from "../admin/organizeSubscription/OrganizedSubscription";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list_dead" element={<Dead />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />}>
          <Route path="/login/connection" element={<Connection />} />
          <Route path="/login/inscription" element={<Inscription />} />
        </Route>
        <Route path="/organized" element={<Organized />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
