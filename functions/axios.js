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
                    fetch("https://3edec48878c4.ngrok.io/api/v1/survey/login", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + liff.getAccessToken(),
                        }
                    }).then(res => res.json()).then(resp => {
                        console.log(resp)
                        fire.auth().signInWithCustomToken(resp.access_token)
                            .then((userCredential) => {
                                // Signed in
                                fire.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                                    console.log(idToken)
                                    localStorage.setItem("access_token", idToken)
                                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken;
                                    return axiosCustom(originalRequest)
                                }).catch(function (error) {
                                    // Handle error
                                    console.log(error)
                                    // window.location.href("/")
                                });


                            })
                            .catch((error) => {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                console.log(errorCode, errorMessage)
                                // window.location.href("/")
                                // ...
                            });
                    })
                } else {
                    window.location.href("/")
                }
            } catch (err) {

            }
        }
    } catch (error) { }
    return Promise.reject(error);
});
export const customAxios = axiosCustom