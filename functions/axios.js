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
    return response;
}, async function (error) {
    const status = error.response ? error.response.status : null
    const originalRequest = error.config;
    try {
        if (401 === status && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { default: liff } = await import("@line/liff");
                await liff.init({
                    liffId: "1655538913-PnDo5YK0"
                })
                if (liff.isLoggedIn()) {
                    const resp = await axios.post("https://3bfdfa5d3211.ngrok.io/api/v1/survey/login", {}, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + liff.getAccessToken(),
                        }
                    })
                    const token = resp.data.access_token

                    return fire.auth().signInWithCustomToken(token)
                        .then((userCredential) => {
                            // Signed in
                            return fire.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                                console.log(idToken)
                                localStorage.setItem("access_token", idToken)
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken;
                                return axiosCustom(originalRequest)
                            }).catch(function (error) {
                                return Promise.reject(error);
                            });


                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.log(errorCode, errorMessage)
                            return Promise.reject(error);
                        });
                } else {
                    liff.login()
                }
            } catch (err) {
                return Promise.reject(error);
            }

        } else {
            return Promise.reject(error);
        }
    } catch (error) { }
    return Promise.reject(error);
});
export default axiosCustom