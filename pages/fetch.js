import { responsiveFontSizes } from '@material-ui/core'
import React from 'react'
import customAxios from '../functions/axios'
export default function fetch() {
    const [order, setOrder] = React.useState([])
    React.useEffect(async () => {
        const resp = await customAxios.get("https://b51008d01f25.ngrok.io/api/v1/survey/orders")
        console.log("from fetch page", await resp)
        // console.log(resp.data)
    }, [])
    return (
        <div>
            {order.map(item => {
                return <p>{item.id}</p>
            })}
        </div>
    )
}
