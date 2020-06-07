import React, { useState, useContext } from 'react';
import { faWrench, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let Zadatak = props => {

    const { Id, Naziv, Opis, Tip, DatumKreiranja, KreiranOd, Aktivan } = props.item;

    return (
        <div className="profile-card" >
            <div className="row ml-1">
                <div className="col-md-3">
                    <FontAwesomeIcon icon={faWrench} size="7x" />
                </div>
                <div className="ml-3 col-md-8" style={{ flex: 3 }}>
                    <h4>{Naziv}</h4>
                    <details>
                        <summary><i>Opis:</i></summary>
                        <p>{Opis}</p>
                    </details>
                    <small>Tip: {Tip} Datum: {DatumKreiranja}</small> <br />
                    <small><b>Autor:</b> {KreiranOd} <b>Aktivnost:</b> {Aktivan === true ? "Aktivan" : "Završen"}</small>
                </div>
                <div className="col-md-1">
                    <FontAwesomeIcon icon={faPencilAlt} className="cursor" size="2x" onClick={() => props.handleEdit(Id)} />
                </div>
            </div>
        </div>
    )
}

export default Zadatak;