import React, { useEffect } from 'react'
import fire from '../config/fire-config'
const token = `
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1qc2c2bEBpbnN0YWxsZXItYXBwLXNlcnZpY2UtZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJleHAiOjE2MTY3NDY5ODYsImlhdCI6MTYxNjc0MzM4Niwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstanNnNmxAaW5zdGFsbGVyLWFwcC1zZXJ2aWNlLWRldi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjEyMzQ1NiJ9.dUWTtQ9TQ93M-wOgEReryw-xbGQu16In63G3ddgSrQDogLprCszOwWVRwzuecUaMh60_waeAiWD1q9QxlH-_jRn4TKlioh6OOLHfQpWQeJjuhT5jSfLZD9ffc6dlN9nwk9HGUxCEPLPdYV549s4rOy63TuzO7our1Tjf4y8WTZlpi-aOO_qxY_PuHmweLKOrVYzsGQVbAc5Gkip9VE-gRJGM29Ytw3n2t0m59hxN4awAR4tSPY6J5nN1nBrTqV8Dxg4ZHsx9Kppq8mm8KcCi-nFtkQ_w_mcOwqiUQRKO2_16OWRwOeuB0u4y-eMREiSTRgEpyX4L3zirb9PLqGyPzA
`
export default function test() {
    useEffect(() => {
        fire.auth().signInWithCustomToken(token)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user)
                localStorage.setItem("user", JSON.stringify(user))


                fire.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                    console.log(idToken)
                    // Send token to your backend via HTTPS
                    // ...
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

        </div>
    )
}
