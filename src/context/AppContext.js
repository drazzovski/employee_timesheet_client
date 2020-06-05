import React, { createContext, Component } from "react";

export const AppContext = createContext();

class AppContextProvider extends Component {

    state = {
        user: null
    }

    setUser = (user) => {
        this.setUser({ user: user })
    }

    render() {
        return (
            <AppContext.Provider value={{ ...this.state, setUser: this.setUser }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default AppContextProvider;