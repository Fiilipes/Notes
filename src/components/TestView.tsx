import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {auth, provider} from "../firebase.config";
const links = [
    { id: 1, label: 'Home', url: '/' },
    { id: 2, label: 'Notes', url: '/notes' },
    { id: 3, label: 'Zápisy', url: '/notes/zápisy' },
    { id: 4, label: 'Testy', url: '/notes/testy' },
    { id: 5, label: 'Procvičování', url: '/notes/procvičování' },

];
// @ts-ignore
function HeaderView({isAuth, setIsAuth}) {
    const location = useLocation();
    console.log(location.pathname);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(
            (result) => {
                localStorage.setItem("isAuth", "true")
                setIsAuth(true)


                // profile picture
                // @ts-ignore
            }
        )
    }



    // sign out
    const signOutUser = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("isAuth")
            setIsAuth(false)

        })
    }
    if (location.pathname === "/") {
            return (
                <div className="header">
                    <div>
                        {links.map((link) => {
                            return (
                                <Link to={link.url} key={link.id}>
                                    <span className="header__link">{link.label}</span>
                                </Link>
                            )
                        })}

                    </div>
                </div>
            )
    } else {
        return <span>Notes</span>
    }


}


export default HeaderView;