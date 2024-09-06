import axios from 'axios';
import { notifyUser, notifyError } from '../adapters/notifier';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
    (response) => {
        // If the request is successful, return the response
        return response;
    },
    (error) => {
        // This function is called if the request fails
        notifyUser({
            type: "error",
            message: "Erro ao fazer requisição" 
        })
        notifyError(error);

        // You can also return a rejected promise to handle it in catch
        return Promise.reject(error);
    }
);

export default api;