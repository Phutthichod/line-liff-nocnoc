import React from 'react'
import fire from '../config/fire-config';
import { useEffect, useState } from 'react'
const db = fire.firestore()
export default function index({ data }) {
    const [name, setName] = useState("")
    const addNewUser = () => {
        db
            .collection('blog')
            .doc(data.userId).set({
                ...data, name
            });
    }
    useEffect(() => {

    }, [])
    // db
    //     .collection('blog')
    //     .doc("test")
    // .set({
    //     title: "test",
    //     content: "test",
    // });


    return (
        <div>
            <input onChange={(e) => {
                setName(e.target.value)
            }} /><button onClick={addNewUser}>create new Name</button>
        </div>
    )
}
