var settings = {
    url: "http://localhost:5000",
    jsonHeader: {
        "Content-Type": "application/json"
    },
    setStorage: (name, value) => {
        localStorage.setItem(name, value);
    },
    getStorage: (name) => {
        return localStorage.getItem(name);
    }
}

export default settings;