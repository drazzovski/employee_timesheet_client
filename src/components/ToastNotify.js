import { toast } from "react-toastify";

let ToastNotify = (title, msg) => {
    toast.configure();
    toast[title](msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
    });
}

export default ToastNotify;