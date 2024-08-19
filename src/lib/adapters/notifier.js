import { Flip, toast } from "react-toastify";

export function notifyUser({ type, message }) {
    return toast[type](message, {
        theme: "colored",
        transition: Flip,
    })
}

export function notifyError(error) {
    console.error(error);
}