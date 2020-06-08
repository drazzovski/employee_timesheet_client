import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import settings from "../config/settings";
import Zadatak from "./Zadatak";
import ToastNotify from "./ToastNotify";
import { confirmAlert } from 'react-confirm-alert';

let Zadaci = props => {

    if (!localStorage.getItem("jwt")) {
        props.history.push("/login")
    }
    const [role, setRole] = useState(settings.parseJwt(localStorage.getItem("jwt")).role);

    const [zadaci, setZadaci] = useState([]);
    const [Id, setId] = useState(null);
    const [naziv, setNaziv] = useState("");
    const [opis, setOpis] = useState("");
    const [tip, setTip] = useState("1");

    const [isEdit, setIsEdit] = useState(false);
    const [load, setLoad] = useState(true);

    let FetchData = async () => {
        if (load) {
            setLoad(false);
            await axios.get(settings.url + "/api/zadaci", { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
                .then(r => {
                    setZadaci(r.data);
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    useEffect(() => {
        FetchData();
    }, [zadaci]);

    const modalClose = useRef(null);
    const modalOpen = useRef(null);

    let addZadatak = () => {

        if (!naziv.trim()) {
            ToastNotify("warn", " Unesite naziv");
            return;
        }

        let request = {
            Id: Id,
            Naziv: naziv,
            Opis: opis,
            Tip: tip,
            IsEdit: isEdit
        }

        axios.post(settings.url + "/api/zadaci", request, { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
            .then(r => {
                ToastNotify("success", " Zadatak uspješno " + (!isEdit ? "kreiran" : "izmenjen"));
                setLoad(true);
                setZadaci([]);
                setId(null);
                setNaziv("");
                setOpis("");
                setTip("1");
                setIsEdit(false);
                modalClose.current.click();
            })
            .catch(e => {
                ToastNotify("error", " Došlo je do greške");
            })

    }

    let editZadatak = id => {

        let zadatak = zadaci.find(x => x.Id === id);
        setId(id);
        setNaziv(zadatak.Naziv);
        setOpis(zadatak.Opis);
        setTip(zadatak.Tip === "Aktivnost" ? "2" : "1");
        setIsEdit(true);
        modalOpen.current.click();
    }

    let handleFinish = id => {
        confirmAlert({
            message: 'Da li želite da završite zadatak?',
            buttons: [
                {
                    label: 'Da',
                    onClick: () => {
                        axios.post(settings.url + "/api/zadaci/deactivate", { Id: id }, { headers: { ...settings.jsonHeader, ...settings.authHeader(localStorage.getItem("jwt")) } })
                            .then(r => {
                                ToastNotify("success", "Zadatak uspješno završen");
                                setZadaci([]);
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

    let modalCloseCall = e => {
        e.preventDefault();
    }

    return (
        <div>
            <br />
            <h1>Zadaci</h1>
            <br />
            {
                role !== "Radnik" &&
                <button onMouseEnter={() => setIsEdit(false)} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" ref={modalOpen}>Dodaj Novi Zadatak</button>
            }
            <br />
            <br />
            <div className="container radnici">
                {zadaci.map(item => {
                    return <Zadatak key={item.Id} item={item} handleEdit={editZadatak} Rola={role} handleFinish={handleFinish} />
                })}
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Novi zadatak</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group col-sm">
                                <label htmlFor="naziv">Naziv</label>
                                <input type="text" className="form-control" id="naziv" value={naziv} onChange={e => setNaziv(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="opis">Opis</label>
                                <textarea type="text" className="form-control" id="opis" value={opis} onChange={e => setOpis(e.target.value)} />
                            </div>
                            <div className="form-group col-sm">
                                <label htmlFor="tipSelect">Tip</label>
                                <select className="form-control" id="tipSelect" value={tip} onChange={e => setTip(e.target.value)}>
                                    <option value="1">Projekat</option>
                                    <option value="2">Aktivnost</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => modalCloseCall(e)} ref={modalClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => addZadatak()} > Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Zadaci;