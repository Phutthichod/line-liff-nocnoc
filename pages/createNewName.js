import React from 'react'
import fire from '../config/fire-config';
export default function index({ onChangeName, onSubmit }) {
    return (
        <div>
            <input onChange={(e) => {
                onChangeName(e.target.value)
            }} /><button onClick={onSubmit}>create new Name</button>
        </div>
    )
}
