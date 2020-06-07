var settings = {
    url: "http://localhost:5000",
    jsonHeader: {
        "Content-Type": "application/json"
    },
    authHeader: (jwt) => {
        return {
            Authorization: "Bearer " + jwt
        }
    },
    parseJwt: (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    },
    setStorage: (name, value) => {
        localStorage.setItem(name, value);
    },
    getStorage: (name) => {
        return localStorage.getItem(name);
    }
}

export default settings;