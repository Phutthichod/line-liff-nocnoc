import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import liff from '@line/liff';
import { useEffect, useState } from 'react'
export default function Home() {
  console.log("start")
  const [state, setState] = useState({})
  useEffect(async () => {
    const { default: liff } = await import("@line/liff");
    liff
      .init({
        liffId: "1655538913-PnDo5YK0" // Use own liffId
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          const profile = liff.getProfile()
          console.log(profile)
          setState(profile)
        } else {
          liff.login()
        }

      })
      .catch((err) => {
        // Error happens during initialization
        console.log(err.code, err.message);
      });

  }, [])
  return (
    <div>
      <h2>Id: {state.userId}</h2>
      <h5>Name: {state.displayName}</h5>
      <img src={state.pictureUrl} />
      <p>status {state.statusMessage}</p>
    </div>
  )
}
