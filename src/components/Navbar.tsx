// assets
import logo from '../assets/img/filipesLogo.png';
import logo2 from '../assets/img/ikonaOriginal.png';

// react components
import { useState } from 'react';
import {
    Link
} from "react-router-dom";

// firebase
import { auth, provider } from "../firebase.config";
import { signInWithPopup, signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import notesLogo from "../assets/img/notesLogo.png";
import "./Navbar.scss";

// all links in navbar
const links = [
    { id: 1, label: 'Home', url: '/' },
    { id: 2, label: 'Notes', url: '/notes' },
    { id: 3, label: 'Zápisy', url: '/notes/zápisy' },

];


// @ts-ignore
function Navbar({ isAuth, setIsAuth }) {

    // sign in with google
    const currentUser = getAuth().currentUser;



    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // @ts-ignore
            setPhotoURL(user.photoURL)
            // ...
        } else {
            // User is signed out
            // ...
        }
    })

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

    return (
        <div>
            <header className={"flex justify-between items-center w-11/12 max-w-6xl mx-auto ml-[160px] py-4"}>
                <Link to={"/notes/"} className={"w-[100px]"}>
                    {/*
                        logo
                    */}
                    <img src={notesLogo} alt={"logo"} className={"w-16 h-16]"} />
                </Link>
                <nav className="flex items-center space-x-6 justify-center">
                    {links.map((link) => (
                        <Link
                            key={link.id}
                            to={link.url}
                            className="nav-link text-gray-800 font-semibold hover:text-gray-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center w-[10px]">
                    {isAuth ? (
                        <>
                            <button
                                className="bg-[#f5f5f5] text-black py-2 px-4 rounded-full hover:bg-black hover:text-white border-2 border-black transition-colors duration-300 font-bold"
                                onClick={signOutUser}
                            >
                                Logout
                            </button>
                            {/*<Link to="/profile" className="ml-2 bg-black p-[1px] rounded-full">*/}
                            {/*    /!* @ts-ignore *!/*/}
                            {/*    <img src={*/}
                            {/*        photoURL*/}
                            {/*    } alt={"profile"} className={"w-[36px] h-[36px] rounded-full  "} />                        </Link>*/}

                        </>
                    ) : (
                        <button
                            className="bg-[#f5f5f5] text-black py-2 px-4 rounded-full hover:bg-black hover:text-white border-2 border-black transition-colors duration-300 font-bold"
                            onClick={signInWithGoogle}
                        >
                            Login
                        </button>
                    )}
                </div>

            </header>

        </div>
    )
}
export default Navbar;

