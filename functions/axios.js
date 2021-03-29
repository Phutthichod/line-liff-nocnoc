import axios from 'axios'

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token")
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        window.location = '/index'
    } else {
        return Promise.reject(error);
    }
});
export const customAxios = axios