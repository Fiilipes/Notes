import React, {useEffect, useState} from 'react';
import MyThreeComponents from "./MyThreeComponents";
import MyComponent from "./MyComponent";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}
// @ts-ignore
function Test({id}) {

    if (localStorage.getItem("isAuth") === "true") {
        return (
            <div>
                <div className={"blob"}>

                </div>
                {id}
            </div>
        );


    } else {
        localStorage.setItem("lastPage", "/notes/testy/"+id)
        location.href = "/login"
        return <div></div>
    }
}

export default Test;
