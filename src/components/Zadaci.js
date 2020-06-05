import React, { useState, useContext } from 'react';
import axios from "axios";
import settings from "../config/settings";
import { AppContext } from "../context/AppContext";

let Zadaci = props => {

    if (!localStorage.getItem("jwt")) {
        props.history.push("/login")
    }

    return (
        <div>
            <h1>Zadaci SCREEN</h1>
        </div>
    )
}

export default Zadaci;