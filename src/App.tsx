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
import Testy from "./components/Testy";

import Login from "./components/Login";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "./firebase.config";
import Test from "./components/subjects/Test";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}




function App() {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const [helperIdArray, setHelperIdArray] = useState([])
    const [helperNameArray, setHelperNameArray] = useState([])
    const [helperSubjectArray, setHelperSubjectArray] = useState([])
    const [helperDateArray, setHelperDateArray] = useState([])

    const [helperIdArray2, setHelperIdArray2] = useState([])

    const handleLoad = () => {
        getNotes().then((data) => {
            // @ts-ignore
            let myData = data[0]["notes"]
            let myIdArray:any[] = []
            let myNameArray:any[] = []
            let mySubjectArray:any[] = []
            let myDateArray:any[] = []

            // @ts-ignore
            let myData2 = data[1]["all"]
            let myIdArray2:any[] = []

            myData.forEach(
                (item: any) => {
                    myIdArray.push(
                            `${item.id}`
                    )
                    myNameArray.push(
                        `${item.name}`
                    )
                    mySubjectArray.push(
                        `${item.subject}`
                    )
                    myDateArray.push(
                        `${item.date}`
                    )
                }
            )
            myData2.forEach(
                (item: any) => {
                    myIdArray2.push(
                        `${item.id}`
                    )
                }
            )
            // @ts-ignore
            setHelperIdArray(myIdArray)
            // @ts-ignore
            setHelperNameArray(myNameArray)
            // @ts-ignore
            setHelperSubjectArray(mySubjectArray)
            // @ts-ignore
            setHelperDateArray(myDateArray)
            // @ts-ignore
            setHelperIdArray2(myIdArray2)
        })
    }
    useEffect(
        () => {
            // get items from firestore
            handleLoad()

        }, []
    )

    // @ts-ignore
    return (
        <>
            <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />


            <Routes>
                <Route  path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route  path="/notes" element={<Notes isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route path={"/notes/zápisy"} element={<Zápisy/>} />
                <Route path={"/notes/testy"} element={<Testy />} />
                <Route path={"/login"} element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />

                {helperIdArray.map((item: any, index: any) => {
                    console.log("item")
                    console.log(item)
                    return (
                        <Route path={`/notes/zápisy/${item}`} element={<Zápis id={item} name={helperNameArray[index]} subject={helperSubjectArray[index]} date={helperDateArray[index]} />} />
                    )
                })}
                {helperIdArray2.map((item: any, index: any) => {
                    console.log("item")
                    console.log(item)
                    return (
                        <Route path={`/notes/testy/${item}`} element={<Test id={item} />} />
                    )
                })
                }
            </Routes>
        </>
    )
}

export default App