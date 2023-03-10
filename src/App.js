import React, { Component } from 'react';
import './App.css';
import MoneyConverter from './MoneyConverter';
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from './Component/Home';
import About from './Component/About';



class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="MoneyConverter" element={<MoneyConverter />} />
            <Route path="About" element={<About />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
