import React, { useState, useEffect } from 'react';
import axios from "axios";
import settings from "../config/settings";
import ToastNotify from "./ToastNotify";
import { confirmAlert } from 'react-confirm-alert';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let Sati = props => {

    if (!localStorage.getItem("jwt")) {
        props.history.push("/login")
    }

    const [zadacidd, setZadaciDD] = useState([]);
    const [radniSati, setRadniSati] = useState([]);
    const [sati, setSati] = useState("");
    const [minuti, setMinuti] = useState("");
    const [zadatakId, setZadatakId] = useState("0");

    let FetchZadaciDropdown = async () => {
        await axios.get(settings.url + "/api/radnisati/zadacidropdown", { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
            .then(r => {
                console.log(r.data)
                setZadaciDD(r.data);
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {

            })
    }

    let FetchRadniSati = async () => {
        await axios.get(settings.url + "/api/radnisati", { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
            .then(r => {
                setRadniSati(r.data);
            })
            .catch(e => {
                console.log(e)
            });
    }

    useEffect(() => {
        FetchRadniSati().then(() => {
            FetchZadaciDropdown();
        });
    }, [radniSati]);

    let saveHours = async () => {
        if (!validateFields()) {
            return;
        }

        let request = {
            ZadatakId: zadatakId,
            Sati: Number(sati),
            Minute: Number(minuti)
        }

        await axios.post(settings.url + "/api/radnisati", request, { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
            .then(r => {
                ToastNotify("success", " Sati uspješno upisani");
                setRadniSati([]);
                setZadatakId("0");
                setSati("");
                setMinuti("");
            })
            .catch(e => {
                ToastNotify("error", " Došlo je do greške");
            })

    }

    let validateFields = () => {

        let valMsg = ""
        if (!zadatakId) {
            valMsg += "Odaberite zadatak za unošenje sati \n";
        }

        if (!sati && !minuti) {
            valMsg += "Odaberite sate ili minute utrošenog vremena \n";
        }

        if (!valMsg) {
            return true;
        }
        else {
            ToastNotify("warn", valMsg);
            return false;
        }
    }

    let handleDelete = (id) => {
        console.log(id)
        confirmAlert({
            message: 'Da li želite da izbrišete sate?',
            buttons: [
                {
                    label: 'Da',
                    onClick: () => {
                        axios.post(settings.url + "/api/radnisati/delete", { Id: id }, { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
                            .then(r => {
                                ToastNotify("success", " Sati uspješno izbrisani");
                                setRadniSati([]);
                            })
                            .catch(e => {
                                ToastNotify("error", " Došlo je do greške");
                            })
                    }
                },
                {
                    label: 'Ne',
                    onClick: () => { }
                }
            ]
        });

    }

    return (
        <div>
            <br />
            <h1>Radni sati</h1>
            <br />

            <div className="container">
                <div className="row">
                    <div className="form-group col-sm">
                        <label htmlFor="zadatak-select">Zadatak</label>
                        <select className="form-control" id="zadatak-select" onChange={e => setZadatakId(e.target.value)}>
                            <option value="0"></option>
                            {zadacidd.map(item => {
                                return <option key={item.Id} value={`${item.Id}`}>{item.Naziv}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group col-sm">
                        <label htmlFor="sati">Utrošeni sati</label>
                        <input type="number" min="0" max="100" pattern="[^0-9]" className="form-control" id="sati" value={sati} onChange={e => setSati(e.target.value)} />
                    </div>
                    <div className="form-group col-sm">
                        <label htmlFor="minuti">Utrošeni minuti</label>
                        <input type="number" min="0" max="59" pattern="\d*" className="form-control" id="minuti" value={minuti} onChange={e => setMinuti(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <button onClick={() => saveHours()} className="btn btn-primary btn-block">Sačuvaj sate</button>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Zadatak</th>
                            <th>User</th>
                            <th>Sati</th>
                            <th>Datum Unosa</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {radniSati.map(item => {
                            return (
                                <tr key={item.Id}>
                                    <td>{item.Zadatak}</td>
                                    <td>{item.User}</td>
                                    <td>{item.Sati}h {item.Minute}m</td>
                                    <td>{item.DatumUnosa}</td>
                                    <td>{item.Aktivan ? <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item.Id)} className="cursor" /> : null} </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sati;