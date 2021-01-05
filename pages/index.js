import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import liff from '@line/liff';
import { useEffect, useState } from 'react'
export default function Home() {
  console.log("new")
  const [state, setState] = useState({})
  useEffect(async () => {
    const { default: liff } = await import("@line/liff");
    await liff.init({
      liffId: "1655538913-PnDo5YK0" // Use own liffId
    })
    const profile = await liff.getProfile()
    console.log(profile)
    setState(profile)

  }, [])
  return (
    <div>
      <h2>Id: {state.userId}</h2>
      <h2>Name: {state.displayName}</h2>
      <img src={state.pictureUrl} style={{ height: 50, width: 50 }} />
      <h2>status {state.statusMessage}</h2>
    </div>
  )
}
