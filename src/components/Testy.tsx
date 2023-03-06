import React from 'react';
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebase.config";

function Testy() {
    if (localStorage.getItem("isAuth") === "true") {
        return (
            <div className={"flex flex-col w-[96%] mx-auto mt-8"}>
                Testy
            </div>
        )

    } else {
        localStorage.setItem("lastPage", "/notes/testy/")
        location.href = "/login"
        return <div></div>
    }
}

export default Testy;