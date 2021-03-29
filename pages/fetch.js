import React from 'react'
import { customAxios } from '../functions/axios'
export default function fetch() {
    React.useEffect(() => {
        customAxios.get("https://63c8ac5f6fd1.ngrok.io/api/v1/survey/orders").then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    })
    return (
        <div>

        </div>
    )
}
