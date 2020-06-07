import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AppContextProvider from "./context/AppContext";
import Login from "./components/Login";
import Home from "./components/Home";


function App() {
  return (

    <BrowserRouter>
      <AppContextProvider>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />

          </Switch>

        </div>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
