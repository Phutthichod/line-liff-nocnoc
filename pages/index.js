import Link from 'next/link'
import { useEffect, useState } from 'react'
import CreateName from './createNewName'
import fire from '../config/fire-config'
import { useRouter } from 'next/router'
const db = fire.firestore()

export default function Home() {
  // console.log("new")
  const router = useRouter()
  const [profileUser, setProfileUser] = useState({})
  const [liff, setLiff] = useState(null)
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(false)
  const [isNewUser, setIsNewUser] = useState(true)
  const [name, setName] = useState("")

  const onChangeName = (name) => {
    setName(name)
  }
  const addNewUserInFirebase = () => {
    db
      .collection('user')
      .doc(profileUser.userId).set({
        name
      }).then(() => {
        console.log("success")
        setProfileUser({ ...profileUser, name })
        setIsNewUser(false)
      }).catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
  const addOrGetUserInFirebaseAndSetUserState = async (profile) => {
    console.log("addOrGetUserInFirebaseAndSetUserState")
    var docRef = db.collection("user").doc(profile.userId);
    docRef.get().then(function (doc) {
      console.log(doc.data())
      if (doc.exists) {
        setProfileUser({ ...profile, ...doc.data() })
        setIsNewUser(false)
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
  const importLineLIFF = async (liff) => {
    setLiff(liff)
  }
  const initLineLiff = async (liff, liffId) => {
    await liff.init({
      liffId // Use own liffId
    })
  }
  const gotoLogin = (liff) => {
    liff.login()
  }
  const checkIsLoginLine = async (liff) => {
    const profile = await liff.getProfile()
    setProfileUser({ ...profile })
    if (!liff.isLoggedIn()) {
      gotoLogin(liff)
    } else {
      await addOrGetUserInFirebaseAndSetUserState(profile)
    }
  }

  useEffect(async () => {
    const { default: liff } = await import("@line/liff");
    await importLineLIFF(liff)
    await initLineLiff(liff, "1655538913-PnDo5YK0")
    await checkIsLoginLine(liff)
  }, [router])
  return (
    <div>
      { loading ? <h3>loading .... </h3> :
        <>
          {
            isNewUser ? <CreateName onChangeName={onChangeName} onSubmit={addNewUserInFirebase} /> :
              <div>
                <h2>Id: {profileUser.userId}</h2>
                <h2>NameLine: {profileUser.displayName}</h2>
                <h2>NameNocnoc: {profileUser.name}</h2>
                <img src={profileUser.pictureUrl} style={{ height: 50, width: 50 }} />
                <h2>status {profileUser.statusMessage}</h2>
                <button onClick={() => {
                  liff.logout()
                  liff.login()
                }}>Logout</button>
              </div>

          }
        </>
      }
    </div>
  )
}
