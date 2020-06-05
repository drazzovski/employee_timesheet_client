import React, { useState, useContext } from 'react';
import axios from "axios";
import settings from "../config/settings";
import { AppContext } from "../context/AppContext";

let Radnici = props => {

    if (!localStorage.getItem("jwt")) {
        props.history.push("/login")
    }

    return (
        <div>
            <h1>Radnici SCREEN</h1>
        </div>
    )
}

export default Radnici;