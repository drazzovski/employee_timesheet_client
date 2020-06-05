import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink } from 'react-router-dom';
import axios from "axios";
import settings from "../config/settings";
import { AppContext } from "../context/AppContext";

let Home = props => {

    if (!localStorage.getItem("jwt")) {
        props.history.push("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <NavLink to="/" className="navbar-brand">Employee Timesheet</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/Zadaci" className="nav-link">Zadaci</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Radnici" className="nav-link">Radnici</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Sati" className="nav-link">Sati</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Home;