import React, { useRef, useState, useEffect } from 'react';
import notesLogo from "../assets/img/notesLogo.png";

import {Link} from "react-router-dom";
import logo from "../assets/img/filipesLogo.png";
import "./Notes.scss";
// @ts-ignore

function Notes({ isAuth, setIsAuth }) {

    const myRef = useRef(null)

    // @ts-ignore
    const executeScroll = () => myRef.current.scrollIntoView()

    return (
        <div id={"main h-[100vh]"}>
            <div className={"blob"}>

            </div>
            {/*<div>*/}
            {/*    <Link to={"/notes/zápisy"} className={"w-300px"}>*/}
            {/*        Zápisy*/}
            {/*    </Link>*/}
            {/*</div>*/}
            <div className={"text-center mt-8"}>
                <div className={"mb-40"}>
                    <div className={"text-3xl text-gray-700 font-semibold"} >
                        Vítejte na webu
                    </div>
                    <h1 className={"text-9xl font-black"} id={"gradient"}>
                        Notes
                    </h1>
                </div>
                <div className={"flex flex-row justify-between w-[75%] mx-auto"}>
                    {/*get started*/}
                    <div className={"text-center w-[400px]"}>
                        <Link to={"/notes/zápisy"} className={"w-300px"}>
                            <button className={"bg-[#f5f5f5] text-black py-2 px-4 rounded-full hover:bg-black hover:text-white border-2 border-black transition-colors duration-300 font-bold mt-8"}>
                                Zápisy
                            </button>
                        </Link>

                        <p className={"text-gray-700 text-md mt-4 font-bold "}>
                            Zde jsou uloženy všechny zápisy, k nim potřebné přílohy a odkazy na další materiály.
                        </p>

                    </div>
                    <div className={"text-center w-[400px]"}>
                        <Link to={"/notes/testy"} className={"w-300px"}>
                            <button className={"bg-[#f5f5f5] text-black py-2 px-4 rounded-full hover:bg-black hover:text-white border-2 border-black transition-colors duration-300 font-bold mt-8"}>
                                Testy
                            </button>
                        </Link>

                        <p className={"text-gray-700 text-md mt-4 font-bold "}>
                            Zde naleznete informace ke všem nadcházejícím testům.
                        </p>

                    </div>
                    <div className={"text-center w-[400px]"}>
                        <Link to={"/notes/procvičování"} className={"w-300px"}>
                            <button className={"bg-[#f5f5f5] text-black py-2 px-4 rounded-full hover:bg-black hover:text-white border-2 border-black transition-colors duration-300 font-bold mt-8"}>
                                Procvičování
                            </button>
                        </Link>

                        <p className={"text-gray-700 text-md mt-4 font-bold "}>
                            Zde naleznete procvičovací materiály k všem zápisům.
                        </p>

                    </div>
                </div>
            </div>



        </div>
    )
}

export default Notes;
