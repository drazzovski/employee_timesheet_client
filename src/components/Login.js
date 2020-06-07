import React, { useState } from 'react';
import axios from "axios";
import settings from "../config/settings";

let Login = props => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let loginUser = e => {
        e.preventDefault();

        let request = {
            UserName: userName,
            Password: password
        }

        axios.post(settings.url + "/api/auth/login", request, settings.jsonHeader)
            .then(r => {
                settings.setStorage("jwt", r.data.Message);
                props.history.push("/Zadaci")
            })
            .catch(e => {
                console.log(e)
            })

    }

    return (
        <div className="container login-sc">
            <form onSubmit={e => loginUser(e)}>
                <div className="form-group col-sm">
                    <label htmlFor="username">User Name</label>
                    <input className="form-control" id="username" aria-describedby="userNameHelp" onChange={e => setUserName(e.target.value)} />
                    <small id="userNameHelp" className="form-text text-muted">Enter your user name and password</small>
                </div>
                <div className="form-group col-sm">
                    <label htmlFor="passLogIn">Password</label>
                    <input type="password" className="form-control" id="passLogIn" onChange={e => setPassword(e.target.value)} />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    )
}

export default Login;