import Link from 'next/link'
import { useEffect, useState } from 'react'
import CreateName from './createNewName'
import fire from '../config/fire-config'
import liff from '@line/liff/dist/lib'
const db = fire.firestore()

export default function Home() {
  console.log("new")
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(true)
  const [name, setName] = useState("")

  const onChangeName = (name) => {
    console.log("setname")
    setName(name)
  }
  const addNewUser = () => {
    // loadData()
    console.log(state, name)
    db
      .collection('user')
      .doc(state.userId).set({
        ...state, name
      }).then(() => {
        console.log("success")
        setState({ name, ...state })
        setIsNewUser(false)
      }).catch(function (error) {
        console.error("Error writing document: ", error);
      });


  }

  const loadData = async () => {
    const data = await liff.getProfile()
    // console.log(data)
    setState(data)
    var docRef = db.collection("user").doc(data.userId);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("have", doc.data())
        // console.log("Document data:", doc.data());
        setState({ ...data, ...doc.data() })
        setIsNewUser(false)
        setLoading(false)
      } else {
        console.log("not have")
        setIsNewUser(true)
        setLoading(false)
        // router.push("/createName")
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
  useEffect(async () => {
    const { default: liff } = await import("@line/liff");
    await liff.init({
      liffId: "1655538913-PnDo5YK0" // Use own liffId
    })

    if (liff.isLoggedIn()) {

      loadData()
    } else {
      liff.login()
    }


  }, [])
  return (
    <div>
      { loading ? <h3>loading .... </h3> :
        <>
          {
            isNewUser ? <CreateName onChangeName={onChangeName} onSubmit={addNewUser} /> :
              <div>
                <Link href="/createName">go to new name</Link>
                <h2>Id: {state.userId}</h2>
                <h2>NameLine: {state.displayName}</h2>
                <h2>NameNocnoc: {state.name}</h2>
                <img src={state.pictureUrl} style={{ height: 50, width: 50 }} />
                <h2>status {state.statusMessage}</h2>
              </div>
              <button onClick={()=>{
                liff.logout()
              }}>Logout</button>
          }
        </>
      }
    </div>
  )
}
