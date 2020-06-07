import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Zadaci from "./Zadaci";
import Radnici from "./Radnici";
import Sati from "./Sati";
import settings from "../config/settings";

let Home = props => {

    if (!localStorage.getItem("jwt")) {
        props.history.push("/login")
    }

    const [role, setRole] = useState(settings.parseJwt(localStorage.getItem("jwt")).role);

    return (
        <BrowserRouter>

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
                            {
                                role !== "Radnik" &&
                                <li className="nav-item">
                                    <NavLink to="/Radnici" className="nav-link">Radnici</NavLink>
                                </li>
                            }

                            <li className="nav-item">
                                <NavLink to="/Sati" className="nav-link">Sati</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <Switch>
                <Route path="/Zadaci" component={Zadaci} />
                <Route path="/Radnici" component={Radnici} />
                <Route path="/Sati" component={Sati} />
            </Switch>

        </BrowserRouter>
    )
}

export default Home;