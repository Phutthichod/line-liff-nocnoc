import React from 'react'
// import { getAccessToken } from '../functions/login'
import axios from 'axios'
import customAxios from '../functions/axios'
export default function test() {
    React.useEffect(async () => {
        const { default: liff } = await import("@line/liff");
        await liff.init({
            liffId: "1655538913-PnDo5YK0" // Use own liffId
        })
        // const resp = await axios.get("https://api.line.me/oauth2/v2.1/verify?access_token=" + liff.getAccessToken)
        console.log(liff.getAccessToken())
        const resp = await axios.post("http://localhost:8080/api/v1/survey/auth/login", {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + liff.getAccessToken(),
            }
        })
    })
    return (
        <div>

        </div>
    )
}
