import React from 'react';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let Radnik = props => {

    const { Id, FirstName, LastName, Address, City, Phone, Email, BirthDate, Type, UserName } = props.item;

    return (
        <div className="profile-card">
            <div className="row ml-1">
                <div>
                    <FontAwesomeIcon icon={faUser} size="7x" />
                </div>
                <div className="ml-3">
                    <h4>{FirstName} {LastName}</h4>
                    <p>Adresa: {Address} {City}</p>
                    <small>Tel: {Phone} Email: {Email} DOB: {BirthDate}</small> <br />
                    <small><b>Username:</b> {UserName} <b>Role:</b> {Type}</small>
                </div>
            </div>
        </div>
    )
}

export default Radnik;