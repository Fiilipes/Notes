import './App.css'
import './index.css'
import React, {useEffect, useState} from "react";

import {BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate} from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Notes from "./components/notes/Notes";
import Zápisy from "./components/notes/Zápisy/Zápisy";
import Profile from "./components/Profile";
import Zápis from "./components/notes/Zápisy/Zápis";
import Testy from "./components/notes/Testy/Testy";
import Procvičování from "./components/notes/Procvičování/Procvičování";

import Login from "./components/Login";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "./firebase.config";
import Test from "./components/notes/Testy/Test";
import TestView from "./components/TestView";
import Events from "./components/events/Events";
import Competitions from "./components/competitions/Competitions";
import ProcvičováníComponent from './components/notes/Procvičování/ProcvičováníComponent';
import Flashcard from "./components/notes/Procvičování/flashcards/Flashcard";
import FlippableCard from './components/notes/Procvičování/flashcards/flippable-card';
import Match from "./components/notes/Procvičování/drag/Match";
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
    const [helperNameArray2, setHelperNameArray2] = useState([])
    const [helperSubjectArray2, setHelperSubjectArray2] = useState([])
    const [helperDateArray2, setHelperDateArray2] = useState([])

    const [helperIdArray3, setHelperIdArray3] = useState([])
    const [helperNameArray3, setHelperNameArray3] = useState([])
    const [helperSubjectArray3, setHelperSubjectArray3] = useState([])
    const [helperDateArray3, setHelperDateArray3] = useState([])


    const handleLoad = () => {
        getNotes().then((data) => {
            // @ts-ignore
            let myData = data[0]["notes"]
            let myIdArray:any[] = []
            let myNameArray:any[] = []
            let mySubjectArray:any[] = []
            let myDateArray:any[] = []

            // @ts-ignore
            let myData2 = data[2]["all"]
            let myIdArray2:any[] = []
            let myNameArray2:any[] = []
            let mySubjectArray2:any[] = []
            let myDateArray2:any[] = []

            // @ts-ignore
            let myData3 = data[1]["all"]
            let myIdArray3:any[] = []
            let myNameArray3:any[] = []
            let mySubjectArray3:any[] = []
            let myDateArray3:any[] = []


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
                    myNameArray2.push(
                        `${item.theme}`
                    )
                    mySubjectArray2.push(
                        `${item.subject}`
                    )
                    myDateArray2.push(
                        `${item.day},${item.month},${item.year}`
                    )
                }
            )
            myData3.forEach(
                (item: any) => {
                    myIdArray3.push(
                        `${item.id}`
                    )
                    myNameArray3.push(
                        `${item.name}`
                    )
                    mySubjectArray3.push(
                        `${item.subject}`
                    )
                    myDateArray3.push(
                        `${item.date}`
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
            // @ts-ignore
            setHelperNameArray2(myNameArray2)
            // @ts-ignore
            setHelperSubjectArray2(mySubjectArray2)
            // @ts-ignore
            setHelperDateArray2(myDateArray2)
            // @ts-ignore
            setHelperIdArray3(myIdArray3)
            // @ts-ignore
            setHelperNameArray3(myNameArray3)
            // @ts-ignore
            setHelperSubjectArray3(mySubjectArray3)
            // @ts-ignore
            setHelperDateArray3(myDateArray3)


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
            {/*@ts-ignore*/}
            <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />


            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route path="/notes" element={<Notes isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route path={"/events"} element={<Events />} />
                <Route path={"/competitions"} element={<Competitions />} />
                <Route path={"/notes/zápisy"} element={<Zápisy/>} />
                <Route path={"/notes/Testy"} element={<Testy />} />
                <Route path={"/notes/procvičování"} element={<Procvičování />} />
                <Route path={"/login"} element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route path={"/profile"} element={<Profile />} />

                {helperIdArray.map((item: any, index: any) => {
                    console.log("item")
                    console.log(item)
                    return (
                        <Route path={`/notes/zápisy/${item}`} element={<Zápis id={item} name={helperNameArray[index]} subject={helperSubjectArray[index]} date={helperDateArray[index]} isAuth={isAuth} setIsAuth={setIsAuth} />} />
                    )
                })}
                {helperIdArray2.map((item: any, index: any) => {
                    console.log("item")
                    console.log(item)
                    return (
                        <Route path={`/notes/testy/${item}`} element={<Test id={item} name={helperNameArray2[index]} subject={helperSubjectArray2[index]} date={helperDateArray2[index]} />} />
                    )
                })
                }
                {helperIdArray3.map((item: any, index: any) => {
                    console.log("item")
                    console.log(item)
                    return (
                        <Route path={`/notes/procvičování/${item}`} element={<ProcvičováníComponent id={item} name={helperNameArray3[index]} subject={helperSubjectArray3[index]} date={helperDateArray3[index]} />} />
                    )
                })
                }
                {helperIdArray3.map((item: any, index: any) => {
                        console.log("item")
                        console.log(item)
                        return (
                            <Route path={`/notes/procvičování/${item}/flashcards`} element={<Flashcard id={item} name={helperNameArray3[index]} subject={helperSubjectArray3[index]} date={helperDateArray3[index]} />} />
                        )
                    })
                }
                {helperIdArray3.map((item: any, index: any) => {
                        console.log("item")
                        console.log(item)
                        return (
                            <Route path={`/notes/procvičování/${item}/match`} element={<Match id={item} name={helperNameArray3[index]} subject={helperSubjectArray3[index]} date={helperDateArray3[index]} />} />
                        )
                    })
                }
            </Routes>
        </>
    )
}

export default App