import axios from 'axios'
import fire from '../config/fire-config'

const axiosCustom = axios.create({
    baseURL: ""
});

axiosCustom.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token")
    config.headers.Authorization = `Bearer ${token}`;

    return config;
},
    error => {
        Promise.reject(error);
    }
);
axiosCustom.interceptors.response.use(response => {
    // console.log(response)
    return response;
}, function (error) {
    const status = error.response ? error.response.status : null
    const originalRequest = error.config;
    return { test: "data" }

});
export default axiosCustom