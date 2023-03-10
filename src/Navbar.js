import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="navbar-container">
        <h2>WORLDWIDE</h2>
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/MoneyConverter" className="navbar-link">Money Converter</Link>
        </li>
        <li>
          <Link to="/About" className="navbar-link">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
