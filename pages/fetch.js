import { responsiveFontSizes } from '@material-ui/core'
import React from 'react'
import { customAxios } from '../functions/axios'
export default function fetch() {
    const [order, setOrder] = useState([])
    React.useEffect(() => {
        customAxios.get("https://3edec48878c4.ngrok.io/api/v1/survey/orders").then(res => {
            console.log(res)
            if (responsiveFontSizes.status === 200) {
                setOrder(res.data)
            }

        }).catch(err => {
            console.log(err)
        })
    })
    return (
        <div>
            {order.map(item => {
                return <p>{item.id}</p>
            })}
        </div>
    )
}
