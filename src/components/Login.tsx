import React from 'react';
import { auth, provider } from "../firebase.config";
import { signInWithPopup, signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import {useNavigate} from "react-router-dom";
// @ts-ignore
function Login({isAuth, setIsAuth}) {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(
            (result) => {
                localStorage.setItem("isAuth", "true")
                setIsAuth(true)
                // @ts-ignore
                location.href = localStorage.getItem("lastPage")
                // profile picture
                // @ts-ignore
            }
        )
    }
    const signOutUser = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("isAuth")
            setIsAuth(false)

        })
    }
    return (
        <div>
            <h1>Login</h1>
            <p>Přihlašte se pro pokračování</p>

            {!isAuth ? (
                <div className={"flex flex-row justify-between w-[75%] mx-auto"} onClick={signInWithGoogle} >
                    Login
                </div>
            ) : (
                <div className={"flex flex-row justify-between w-[75%] mx-auto"} onClick={signOutUser} >
                    Logout
                </div>
            )
            }

        </div>
    );
}

export default Login;