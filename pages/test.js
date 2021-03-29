import React, { useEffect } from 'react'
import fire from '../config/fire-config'
import { Button } from '@material-ui/core'
import { customAxios } from '../functions/axios'
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1qc2c2bEBpbnN0YWxsZXItYXBwLXNlcnZpY2UtZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJleHAiOjE2MTcwMDAyNjksImlhdCI6MTYxNjk5NjY2OSwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstanNnNmxAaW5zdGFsbGVyLWFwcC1zZXJ2aWNlLWRldi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IlU3NjAxOTJmYzhhN2JlNzllMzE5ZGExNTI1NTI5NjU1NyJ9.cv52J640mc6WuZZ2emxuOC0AgdIM8l5Vrum-TrtJbjyLrlHNUIuKCBF_vAXooq6fNK1N_14MTaf5bgYKvo3twHUiuMAwzCJDFbLTBiAccPcvk_WBPXrdEe3aTQwXYSmtM-Mm9cEbORcLHM2N9xgnTzYjH0HHRpMijZvD5RYvCOz8D8u9yEhMOQ2Bek-KhYOTYhyWxJlrlLrKScQDrB9hB7BgRk-wznie5MjpOTgATebdqhtpt9yZio1jELhocl7BWlWENUqWhr34O-GrPgpkQKau8orlh8Ks1NFWbzRximgYDh0pJfya7vLTEOSOi1GlGrCfflWnVx10eKwX59wosg`
export default function test() {
    const logout = () => {
        fire.auth().signOut().then(res => {
            console.log(res)
        })
    }
    useEffect(() => {
        fire.auth().signInWithCustomToken(token)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user)
                localStorage.setItem("user", JSON.stringify(user))


                fire.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                    console.log(idToken)
                    localStorage.setItem("access_token", idToken)

                }).catch(function (error) {
                    // Handle error
                });


            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ...
            });


    })
    return (
        <div>
            <Button onClick={logout}>logout</Button>
        </div>
    )
}
