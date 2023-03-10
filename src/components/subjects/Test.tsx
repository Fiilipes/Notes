import React, {useEffect, useState} from 'react';
import MyThreeComponents from "./MyThreeComponents";
import MyComponent from "./MyComponent";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import {Link} from "react-router-dom";
import NoteBlob from "./NoteBlob";
import {getAuth} from "firebase/auth";
import Navbar from "../Navbar";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}
// @ts-ignore
function Test({id, name, subject, date}) {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const [notes, setNotes] = useState([])
    const [filter, setFilter] = useState(false)
    const [zápisyFilter, setZápisyFilter] = useState([])
    const [htmlNotes, setHtmlNotes] = useState([])


    const filterZápis = () => {
        // @ts-ignore
        if (event.target.value!== "") {
            // @ts-ignore
            console.log(event.target.value)
            let myArray:any[] = []
            notes.forEach(
                (item: any) => {
                    // @ts-ignore
                    if (item.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                        console.log(item.name)
                        myArray.push(item)

                    }
                }
            )
            // @ts-ignore
            setZápisyFilter(myArray)

        } else {
            console.log("empty--")
            setZápisyFilter([])
        }
    }

    const chosenNote = () => {
        // @ts-ignore
        let myHelper = event.target.id.split("ZápisFilter-")[1]
        console.log(myHelper)
        getNotes().then((data) => {
            // @ts-ignore
            let myData = data[0]["notes"]
            // @ts-ignore
            let myOtherData = data[2]["all"]
            let myNewData:any[] = []

            console.log(myData)
            myData.forEach(
                (item: any) => {
                    // @ts-ignore
                    if (item.id === myHelper) {
                        console.log(item)
                        // @ts-ignore
                        console.log(htmlNotes)
                        myOtherData.forEach(
                            (item2: any) => {
                                console.log(id)
                                console.log(item2.id)
                                if (item2.id === id) {
                                    console.log(item2.zápisy)
                                    console.log("ss")
                                    if (!item2.zápisy.includes(item.id)) {
                                        item2.zápisy.push(item.id)
                                        setHtmlNotes(item2)

                                    }

                                }
                                myNewData.push(item2)

                            }
                        )
                        setDoc(doc(db, "notes", "tests"), {
                            all: myNewData
                        })
                    }
                }
            )
        })

    }

    useEffect(
        () => {
            getNotes().then((data) => {
                let myData = data
                // @ts-ignore
                setNotes(myData[0]["notes"])
                             console.log("----")
                // @ts-ignore
                myData[2]["all"].forEach(
                    (item: any) => {
                        if (item.id === id) {
                            console.log(item)
                            if (item.zápisy.length > 0) {
                                setHtmlNotes(item)
                            }
                        }
                    }
                )

            })
        },[]
    )

    if (localStorage.getItem("isAuth") === "true") {
        // @ts-ignore
        return (
            <div>
                <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

                <div className={"blobNotes"}>

                </div>
                <div className={"font-lg flex flex-col"}>

                    <div className={"flex flex-row justify-center items-end mb-6 my-4"}>
                        <h1 className={"text-6xl"}>{name}</h1>

                    </div>
                    <div className={"flex flex-row justify-center mb-8 "}>
                        <div className={"w-[110px] h-[40px] text-sm bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                            Test
                        </div>
                        <div className={"w-[110px] h-[40px] text-sm bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                            {subject}
                        </div>
                        <div className={"w-[110px] h-[40px] text-sm bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                            {date.split(",")[0]}.{date.split(",")[1]}. {date.split(",")[2]}
                        </div>
                    </div>
                    <div className={"flex flex-row justify-center"}>
                        <div className={"flex flex-col w-[420px] min-h-[200px] border-2 border-black rounded-[15px] p-4 m-4 pb-16 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                            <h2>
                                Zápisy
                            </h2>
                            <p>
                                Zápisy, které se vážou k tomuto testu
                            </p>
                            {getAuth().currentUser?.email === "jarolimfilip07@gmail.com" ? <div>
                                <div className={"flex flex-row justify-center"}>
                                    <input type="text" className={"w-full h-[40px] border-2 border-black rounded-[15px] p-2 my-2 shadow-[0_7px_0_rgba(0,0,0,0.5)] outline-none font-bold"} placeholder={"Přidejte zápis"} onInput={filterZápis}/>

                                </div>
                                <div>
                                    <div className={"grid grid-cols-2 text-black"}>
                                        {zápisyFilter.length !== 0 ? zápisyFilter.map((item: any) => { return <div className={"flex flex-col justify-center items-center border-2 border-black rounded-[15px] font-semibold p-1 cursor-pointer m-2"} onClick={chosenNote} id={"ZápisFilter-"+item.id}>{item.name}</div> }) : ""}
                                    </div>
                                </div>
                            </div> : "" }


                            <div className={"grid grid-cols-2 gap-y-12 mx-auto mt-8"}>
                                {/*@ts-ignore*/}
                                {htmlNotes.length !== 0 ? htmlNotes.zápisy.map((item: any) => {

// @ts-ignore
                                    return <NoteBlob id={item} subject={
                                    notes.map((item2: any) => {
                                        if (item2.id === item) {
                                            return item2.subject
                                        }
                                    }) }
                                 name={
                                    notes.map(
                                        (item2: any) => {
                                            if (item2.id === item) {
                                                return item2.name
                                            }
                                        }
                                    )
                                } date={
                                    notes.map((item2: any) => {
                                        if (item2.id === item) {
                                            console.log(item2.date)
                                            return item2.date
                                        }
                                    })
                                } test={true}>{
                                    notes.map((item2: any) => {
                                        if (item2.id === item) {
                                            return item2.name
                                        }
                                    })
                                }</NoteBlob> }) : <div></div>}
                            </div>
                        </div>
                        <div className={"flex flex-col w-[420px] min-h-[200px] border-2 border-black rounded-[15px] p-4 m-4 pb-16 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                            <h2>
                                Procvičování
                            </h2>
                            <p>
                                Procvičte si své znalosti potřebné pro tento test
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        );


    } else {
        localStorage.setItem("lastPage", "/notes/testy/"+id)
        location.href = "/login"
        return <div></div>
    }
}

export default Test;
