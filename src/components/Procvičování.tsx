import React, {useEffect, useState} from 'react';
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {Link} from "react-router-dom";
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

    const [procvičování, setProcvičování] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        getSS().then((data) => {
            // @ts-ignore
            let myData = data[3]["users"]
            console.log(myData)
            setUsers(myData)
        })
    }, [])


    if (localStorage.getItem("isAuth") === "true") {
        return (
            <div className={"flex flex-col w-[96%] mx-auto mt-8 items-center"}>
                procvičování
                <div >
                    {users.map((user:any) => { return <div className={"flex flex-row items-center font-bold text-xl  my-4 w-[300px]"}>
                        <div className={"bg-white border-black border-2 flex flex-row p-2 rounded-2xl shadow-[0_5px_0_rgba(0,0,0,0.5)] mx-1"}>
                            <img src={user.avatar} className={"w-8 h-8 rounded-full mr-2"} alt={""} />
                            {user.username}
                        </div>
                        <div className={"bg-white border-black border-2 w-[48px] text-center mx-1 p-2 rounded-2xl shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                            {user.notesCoins}
                        </div>
                    </div> })}
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