import React, { useEffect } from 'react'
import fire from '../config/fire-config'
export default function data() {
    useEffect(() => {
        fire.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            console.log(idToken)
            // Send token to your backend via HTTPS
            // ...
        }).catch(function (error) {
            // Handle error
        });
    })

    return (
        <div>

        </div>
    )
}
