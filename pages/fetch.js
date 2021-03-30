import { responsiveFontSizes } from '@material-ui/core'
import React from 'react'
import { customAxios } from '../functions/axios'
export default function fetch() {
    const [order, setOrder] = React.useState([])
    React.useEffect(async () => {
        const resp = await customAxios.get("https://b51008d01f25.ngrok.io/api/v1/survey/orders")
        resp.then(data => {
            console.log(data)
        })
    }, [])
    return (
        <div>
            {order.map(item => {
                return <p>{item.id}</p>
            })}
        </div>
    )
}
