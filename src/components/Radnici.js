import React, { useState, useEffect, useRef } from 'react';
import Radnik from "./Radnik";
import axios from "axios";
import settings from "../config/settings";
import ToastNotify from "./ToastNotify";

let Radnici = props => {

    if (!localStorage.getItem("jwt")) {
        props.history.push("/login")
    }

    const [role, setRole] = useState(settings.parseJwt(localStorage.getItem("jwt")).role);

    const modalClose = useRef(null);
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [userRola, setUserRola] = useState("Radnik");
    const [radnici, setRadnici] = useState([]);
    const [nadredjeniID, setNadredjeniID] = useState("");

    let FetchRadnici = () => {
        axios.get(settings.url + "/api/radnici", { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
            .then(r => {
                setRadnici(r.data);
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        FetchRadnici();
    }, [radnici]);


    let validateFields = () => {
        let validationError = "";
        if (!userName.trim()) {
            validationError += "Unesite username \n";
        }
        else if (userName.length < 6 || userName.length > 15) {
            validationError += "Username mora imati između 6 i 15 znakova \n";
        }
        else if (userName.match(/^\d/) || !userName.match(/^[a-z]+$/)) {
            validationError += "Username ne može početi brojem i mora sadržati samo mala slova \n";
        }

        if (!password.trim()) {
            validationError += "Unesite password \n";
        }
        else if (password.length < 8 || password.length > 25) {
            validationError += "Password mora imati izmešu 8 i 25 znakova \n";
        }
        else if (!password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")) {
            validationError += "Password mroa sadržati barem jednom malo i veliko slovo, broj i specijalni znak (!@#$%^&*) \n";
        }

        if (!email.trim()) {
            validationError += "Unesite email \n";
        }
        else if (!email.includes("@")) {
            validationError += "Email mora sadržati @ \n";
        }

        if (role === "Admin" && userRola == "Radnik" && !nadredjeniID) {
            validationError += "Odaberite nadredjenog \n";
        }

        if (!validationError) {
            return true
        }
        else {
            ToastNotify("warn", validationError);
            return false;
        }

    }

    let registerUser = () => {

        if (!validateFields()) {
            return;
        }

        let userTypeID = 1;
        if (userRola === "Nadredjeni") {
            userTypeID = 2;
        }
        else if (userRola === "Radnik") {
            userTypeID = 3;
        }

        let request = {
            UserName: userName,
            Password: password,
            ConfirmPassword: password,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Address: address,
            City: city,
            Phone: phone,
            Role: role === "Nadredjeni" ? "Radnik" : userRola,
            ApplicationUserID: !nadredjeniID ? null : nadredjeniID,
            UserTypeID: userTypeID
        }

        axios.post(settings.url + "/api/auth/register", request, { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
            .then(r => {
                ToastNotify("success", " Korisnik uspješno registrovan");
                setUsername("");
                setPassword("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setAddress("");
                setCity("");
                setPhone("");
                setUserRola("Radnik");
                setRadnici([]);
                setNadredjeniID("");
                modalClose.current.click();
            })
            .catch(e => {
                ToastNotify("success", "Došlo je do greške");
            })


    }

    return (
        <div>
            <br />
            <h1>Radnici</h1>
            <br />
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Dodaj Novog Radnika</button>
            <br />
            <br />
            <div className="container radnici">
                {radnici.map(item => {
                    return <Radnik key={item.Id} item={item} />
                })}
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Novi radnik</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group col-sm">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            {
                                role !== "Nadredjeni" &&
                                <div className="form-group col-sm">
                                    <label htmlFor="rolaSelect">Rola</label>
                                    <select className="form-control" id="rolaSelect" value={userRola} onChange={e => setUserRola(e.target.value)}>
                                        <option value="Nadredjeni">Nadredjeni</option>
                                        <option value="Radnik">Radnik</option>
                                    </select>
                                </div>
                            }
                            {
                                role === "Admin" && userRola === "Radnik" &&
                                <div className="form-group col-sm">
                                    <label htmlFor="nadredjeni-select">Nadredjeni</label>
                                    <select className="form-control" id="nadredjeni-select" onChange={e => setNadredjeniID(e.target.value)}>
                                        <option value="0"></option>
                                        {radnici.filter(x => x.Type === "Nadredjeni").map(item => {
                                            return <option key={item.Id} value={`${item.Id}`}>{item.FirstName} {item.LastName}</option>
                                        })}
                                    </select>
                                </div>
                            }

                            <div className="form-group col-sm">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="firstName">Ime</label>
                                <input type="firstName" className="form-control" id="firstName" onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="lastName">Prezime</label>
                                <input type="lastName" className="form-control" id="lastName" onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="address">Adresa</label>
                                <input type="text" className="form-control" id="address" onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="city">Grad</label>
                                <input type="text" className="form-control" id="city" onChange={e => setCity(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="phone">Telefon</label>
                                <input type="text" className="form-control" id="phone" onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={modalClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => registerUser()} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Radnici;