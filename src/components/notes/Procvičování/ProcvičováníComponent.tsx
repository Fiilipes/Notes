import React, {useEffect, useState} from 'react';
import MyComponent from "../MyComponent";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {Link} from "react-router-dom";
import NoteBlob from "../Blobs/NoteBlob";
import {getAuth} from "firebase/auth";
import Navbar from "../../Navbar";
import notesLogo from "../../../assets/img/notesLogo.png";
import PinkBox from './drag/dragableComponents/PinkBox';
import YellowBox from './drag/dragableComponents/YellowBox';
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}




// @ts-ignore
function Test({id, name, subject, date}) {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))


    if (localStorage.getItem("isAuth") === "true") {
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        return (
            <div>
                <div className={"blobNotes"}>

                </div>

                <div>
                    {name}
                    {subject}
                    {date}
                </div>
                <Link to={"/notes/procvičování/"+id+"/flashcards"}>Flashcards</Link>
                <Link to={"/notes/procvičování/"+id+"/match"}>Match</Link>

            </div>
        );


    } else {
        localStorage.setItem("lastPage", "/notes/procvičování/"+id)
        location.href = "/login"
        return <div></div>
    }
}

export default Test;
