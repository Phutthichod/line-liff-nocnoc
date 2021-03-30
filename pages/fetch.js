import { responsiveFontSizes } from '@material-ui/core'
import React from 'react'
import customAxios from '../functions/axios'

export default function fetch() {

    const onLogout = async () => {
        const { default: liff } = await import("@line/liff");
        await liff.init({
            liffId: "1655538913-PnDo5YK0"
        })
        liff.logout()
    }

    const [order, setOrder] = React.useState([])
    React.useEffect(async () => {
        const resp = await customAxios.get(" https://3bfdfa5d3211.ngrok.io/api/v1/survey/orders")
        console.log("from fetch page start")
        console.log(await resp)
        setOrder(resp.data)
        console.log("from fetch page end")
        // console.log(resp.data)


    }, [])
    return (
        <div>
            {order.map(item => {
                return <p>{item.id}</p>
            })}
            <button onClick={onLogout}>logout</button>
        </div>
    )
}
