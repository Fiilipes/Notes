import React, {useEffect, useState} from 'react';
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {auth, db} from "../../../firebase.config";
import {Link} from "react-router-dom";
import PracticeBlob from "../Blobs/PractiseBlob";
import Navbar from "../../Navbar";
import notesLogo from "../../../assets/img/notesLogo.png";
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


    const addNotesCoins = (amount : number) => {
        getSS().then(
            (data) => {
                // @ts-ignore
                let myUsers = data[2]["all"]
                console.log(myUsers)
                let found = false;
                myUsers.forEach((user: any) => {
                    // @ts-ignore
                    if (user.uid === auth.currentUser.uid) {
                        console.log(user.email)
                        user.ssCoins += amount;
                        found = true;
                    }
                })

                if (!found) {
                    myUsers.push({
                        // @ts-ignore
                        uid: auth.currentUser.uid,
                        // @ts-ignore
                        email: auth.currentUser.email,
                        // @ts-ignore
                        avatar: auth.currentUser.photoURL,
                        ssCoins: 0,
                        // @ts-ignore
                        username: auth.currentUser.displayName,
                        verified: false,

                    })
                }

                setDoc(
                    doc(db, "ssbot", "users"),
                    {
                        all: myUsers
                    }
                )

            }
        )
    }

    useEffect(() => {
        // set title of the page
        document.title = "Notes | Procvičování"
        // @ts-ignore
        document.querySelector("link[rel*='icon']").setAttribute('href', notesLogo);

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
                <div onClick={() => addNotesCoins(15)}>
                    click me
                </div>
                </div>

        )

    } else {
        localStorage.setItem("lastPage", "/notes/procvičování/")
        location.href = "/login"
        return <div></div>
    }
}

export default Procvičování;