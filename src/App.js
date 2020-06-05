import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import AppContextProvider from "./context/AppContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Zadaci from "./components/Zadaci";
import Radnici from "./components/Radnici";
import Sati from "./components/Sati";


function App() {
  return (

    <BrowserRouter>
      <AppContextProvider>
        <div className="App">
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
          <Route path="/Zadaci" component={Zadaci} />
          <Route path="/Radnici" component={Radnici} />
          <Route path="/Sati" component={Sati} />
        </div>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
