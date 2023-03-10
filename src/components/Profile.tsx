import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, getAdditionalUserInfo, signInAnonymously} from "firebase/auth";
import {auth} from "../firebase.config";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase.config";
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
function Profile() {
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    const [name, setName] = useState("Notes user");
    const [email, setEmail] = useState("notesuser@gmail.com");
    const  [verificationCode, setVerificationCode] = useState("")
    const [verified, setVerified] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // @ts-ignore
            setPhotoURL(user.photoURL)
            // @ts-ignore
            setName(user.displayName)
            // @ts-ignore
            setEmail(user.email)
            // ...
        } else {
            // User is signed out
            // ...
        }
    })


    const verify = () => {
        const code = Math.floor(Math.random() * 1000000)
        // @ts-ignore
        document.getElementById("verificationCode").innerHTML = "Your verification code is: " + code
        getSS().then((data) => {
            let myData = data;
            // @ts-ignore
            console.log(myData[3]["users"])
            // @ts-ignore
            console.log(auth.currentUser.uid)

            let stopSign = false

            // @ts-ignore
            let myVerification = myData[3]["users"]

            myVerification.forEach(
                (item : any) => {
                    // @ts-ignore
                    if (item.uid === auth.currentUser.uid && !stopSign) {
                        // @ts-ignore
                        item.email = auth.currentUser.email
                        // @ts-ignore
                        item.username = auth.currentUser.displayName
// @ts-ignore
                        item.code = code
                        // @ts-ignore
                        item.avatar = auth.currentUser.photoURL
                        item.ssCoins = 0
                        stopSign = true
                    }
                }
            )
            if (!stopSign) {
                // @ts-ignore
                myVerification.push({uid: auth.currentUser.uid, email: auth.currentUser.email, username: auth.currentUser.displayName, avatar: auth.currentUser.photoURL,ssCoins: 0, code: code})
            }

            setDoc(doc(db, "ssbot", "verification"), {
                users: myVerification
            })

            // get users username by uid



        })
    }

    useEffect(
        () => {
            getSS().then((data) => {
                let myData = data;
                // @ts-ignore
                console.log(myData[3]["users"])
                // @ts-ignore
                myData[3]["users"].forEach(
                    (item : any) => {
                        // @ts-ignore
                        if (item.uid === auth.currentUser.uid) {
                            // @ts-ignore
                            setVerified(true)
                        }
                    }
                )
            })
        },[]
    )

        onSnapshot(doc(db, "ssbot", "verification"), (doc) => {
        console.log("ddd")
        // @ts-ignore
        let myData = doc.data()

        // @ts-ignore
        myData.users.forEach(
            (item : any) => {
                // @ts-ignore
                if (item.uid === auth.currentUser.uid && item.code === verificationCode) {
                    setVerified(true)
                }
            }
        )


    })



    if (localStorage.getItem("isAuth") === "true") {
        return (
            <div className={"flex flex-row justify-center w-[96%] mx-auto mt-8 items-center pb-10"}>

                <div className={"flex flex-col mx-6 justify-start items-center border-2 border-black rounded-3xl w-[300px]  h-[400px] shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                    <div className={"text-2xl font-black bg-black text-white w-[320px] mt-[-10px] rounded-[inherit] p-4 shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                        Account info
                    </div>
                    <div className={"flex flex-col w-[96%] mx-auto mt-14 items-center"}>
                        <img src={photoURL} alt={"profile picture"} className={"w-32 h-32 rounded-2xl"}/>
                        <h1 className={"text-2xl mt-4"}>{name}</h1>
                        <div className={"text-md font-bold "}>{email}</div>
                    </div>

                </div>
                <div className={"flex flex-col mx-6 justify-start items-center border-2 border-black rounded-3xl w-[300px]  h-[400px] shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                    <div className={"text-2xl font-black bg-black text-white w-[320px] mt-[-10px] rounded-[inherit] p-4  shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                        Discord Verification
                    </div>

                    <div className={"flex flex-col justify-center items-center"}>
                        <button onClick={verify} className={"bg-[#7289da] text-white p-2 rounded-md mt-4 font-bold shadow-[0_5px_0_rgba(114,137,218,0.5)]"}>
                            Verify through discord
                        </button>
                        <div id={"verificationCode"} className={"text-center mt-4 text-[#7289da] font-bold"}>
                            {verificationCode !== "" ?<div> Your verification code is: <div className={"font-black text-8xl"}>verificationCode</div></div> : <div></div>}
                        </div>
                        <div>
                            {verified ? "You are verified" : "You are not verified"}
                        </div>
                    </div>

                </div>

            </div>

        )

    } else {
        localStorage.setItem("lastPage", "/profile")
        location.href = "/login"
        return <div></div>
    }

}

export default Profile;