import './App.css'
import './index.css'
import React, {useEffect, useState} from "react";

import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import Zápisy from "./components/Zápisy";
import Biologie from "./components/subjects/Biologie";
import Clock from "./components/Clock";
import Zápis from "./components/subjects/Zápis";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "./firebase.config";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}




function App() {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const [helperArray, setHelperArray] = useState([])

    const handleLoad = () => {
        getNotes().then((data) => {
            // @ts-ignore
            let myData = data[0]["notes"]
            let myNewArray: string[] = []

            myData.forEach(
                (item: any) => {
                    myNewArray.push(
                        `${item.id}`
                    )
                }
            )
            // @ts-ignore
            setHelperArray(myNewArray)
        })
    }
    useEffect(
        () => {
            // get items from firestore
            handleLoad()
        }, []
    )

    return (
        <>
            <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />


            <Routes>
                <Route  path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route  path="/notes" element={<Notes isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route path={"/notes/zápisy"} element={<Zápisy/>} />
                <Route path={"/clock"} element={<Clock />} />
                <Route path={"/notes/zápisy/biologie"} element={<Biologie isAuth={isAuth} setIsAuth={setIsAuth} />} />
                {helperArray.map((item, index) => {
                    console.log("item")
                    console.log(item)
                    return (
                        <Route path={`/notes/zápisy/${item}`} element={<Zápis id={item} />} />
                    )
                })}
            </Routes>
        </>
    )
}

export default App