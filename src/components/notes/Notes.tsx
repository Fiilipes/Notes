import React, { useRef, useState, useEffect } from 'react';
import notesLogo from "../../assets/img/notesLogo.png";

import {Link} from "react-router-dom";
import logo from "../../assets/img/filipesLogo.png";
import "./Notes.scss";
import Navbar from "../Navbar";
// @ts-ignore

function Notes({ isAuth, setIsAuth }) {

    useEffect(
        () => {
            // set title of the page
            document.title = "Notes"
            // @ts-ignore
            document.querySelector("link[rel*='icon']").setAttribute('href', notesLogo);

        }, []
    )

    return (
        <div id={"main h-[100vh]"}>

            <div className={"blobNotes"}>

            </div>
            <div className={"text-center mt-8"}>
                <div className={"mb-10"}>
                    <div className={"text-3xl text-gray-700 font-semibold"} >
                        Vítejte na webu
                    </div>
                    <h1 className={"text-[160px] font-black"} id={"gradient"}>
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
                    {/*<div className={"text-center w-[400px]"}>*/}
                    {/*    <Link to={"/notes/testy"} className={"w-300px"}>*/}
                    {/*        <button className={"bg-[#f5f5f5] text-black py-2 px-4 rounded-full hover:bg-black hover:text-white border-2 border-black transition-colors duration-300 font-bold mt-8"}>*/}
                    {/*            Úkoly*/}
                    {/*        </button>*/}
                    {/*    </Link>*/}

                    {/*    <p className={"text-gray-700 text-md mt-4 font-bold "}>*/}
                    {/*        Zde naleznete informace ke všem zadaným úkolům.*/}
                    {/*    </p>*/}

                    {/*</div>*/}
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
