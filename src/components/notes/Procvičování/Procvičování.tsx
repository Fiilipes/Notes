import React, {useEffect, useState} from 'react';
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {Link} from "react-router-dom";
import PracticeBlob from "../Blobs/PractiseBlob";
import Navbar from "../../Navbar";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}
const getSS = async () => {
    const data = await getDocs(postCollectionRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}


function Procvičování() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const [procvičování, setProcvičování] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        getNotes().then(
            (data) => {
                // @ts-ignore
                let myData = data[1]["all"]
                setProcvičování(myData)
                console.log(myData)
            }
        )
    }, [])


    if (localStorage.getItem("isAuth") === "true") {
        return (
            <><Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
                <div className={"flex flex-col w-[96%] mx-auto mt-8 items-center"}>
                    <div className={"blobNotes"}>

                    </div>
                    <div className={"flex flex-col justify-between items-center p-4 mx-auto"}>
                        <div className={"mb-12"}>
                            <div className={"flex flex-row"}>
                                <div
                                    className={"w-[150px] h-[75px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-lg  text-center p-2 mx-2"}>
                                    Celkem <br/>
                                    <span className={"text-2xl font-black"}>
                                    1
                                </span>
                                </div>
                                <div
                                    className={"w-[150px] h-[75px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-lg  text-center p-2 mx-2"}>
                                    Splněných <br/>
                                    <span className={"text-2xl font-black"}>
                                    0
                                </span>
                                </div>
                                <div
                                    className={"w-[150px] h-[75px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-lg  text-center p-2 mx-2"}>
                                    Pořadí <br/>
                                    <span className={"text-2xl font-black"}>
                                    1.
                                </span>
                                </div>
                            </div>
                            <div>
                                {procvičování.map((item: any) => {
                                    return (<PracticeBlob item={item}/>);
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </>

        )

    } else {
        localStorage.setItem("lastPage", "/notes/procvičování/")
        location.href = "/login"
        return <div></div>
    }
}

export default Procvičování;