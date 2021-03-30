import { responsiveFontSizes } from '@material-ui/core'
import React from 'react'
import { customAxios } from '../functions/axios'
export default function fetch() {
    const [order, setOrder] = React.useState([])
    React.useEffect(() => {
        customAxios.get("https://3edec48878c4.ngrok.io/api/v1/survey/orders").then(res => {
            console.log(res)
            if (res.status === 200) {
                setOrder(res.data)
            }

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
