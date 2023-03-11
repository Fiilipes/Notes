import React, { useState, useEffect } from 'react';
import {motion, useAnimation} from "framer-motion"
import notesLogo from "../assets/img/notesLogo.png"
import ssLogo from "../assets/img/ikonaOriginal.png"
import eventsLogo from "../assets/img/eventsLogo.png"
import competitionsLogo from "../assets/img/competitionsLogo.png"
import TypingAnimation from "./subjects/TypingAnimation";
import {useNavigate} from "react-router-dom";

// @ts-ignore
function Home({isAuth, setIsAuth}) {
    const animationControls = useAnimation();


    async function sequence() {
        await animationControls.start({ scale:1, transition: { duration: 0.5, ease: "easeInOut" } });
        await animationControls.start({ scale:0, transition: { delay:0.4, duration: 0.5, ease: "easeInOut" } });
        return
    }
    // @ts-ignore
    const navigate = useNavigate();

    useEffect(() => {

        // hide scroll bar




        // set title of the page
        document.title = "Survival Server"
        // @ts-ignore
        document.querySelector("link[rel*='icon']").setAttribute('href', ssLogo);
        sequence().then(r => console.log("done"));




    },[])
    return(
        <div className={"flex flex-col p-8 items-center justify-center overflow-hidden h-[100vh]"}>
            <motion.div className={"blobNotes"}
                        initial={{opacity: 0}}
                        animate={{opacity:1}}
                        transition={{delay: 1.5, duration:0.5, ease: "easeInOut"}}

            >

            </motion.div>
            <motion.div className={"blobSS mt-10 ml-48"}
                        initial={{opacity: 0}}
                        animate={{opacity:1}}
                        transition={{delay: 1.5, duration:0.5, ease: "easeInOut"}}
            >
            </motion.div>

            <TypingAnimation textToBeWritten={"Survival Server"} className={"text-7xl font-bold top-20 absolute text-center"} delay={0.5}/>


            <motion.div
                className={"w-[100px] h-[100px] bg-black absolute rounded-full"}
                initial={{scale: 40}}
                animate={animationControls}

            >
            </motion.div>
            <motion.div
                className={"w-[100px] h-[100px] bg-black absolute"}
                initial={{scale: 1, borderRadius: "50%"}}
                animate={{x:300, borderRadius: "0%"}}
                transition={{delay: 1.5, duration:0.4, ease: "easeInOut"}}
            >
            </motion.div>

            <motion.img
                src={notesLogo}
                className={"w-[100px] h-[100px] absolute cursor-pointer"}
                initial={{scale: 0,x: 300, y: 0, borderRadius: "50%"}}
                animate={{scale:1.8, borderRadius: "0%"}}
                transition={{delay: 1.85, duration:0.25}}
                onClick={() => navigate("/notes")}

            ></motion.img>
            <TypingAnimation textToBeWritten={"Notes"} className={"text-3xl font-bold absolute text-center"} displacementX={"300px"} displacementY={"120px"} delay={2}/>

            <motion.div
                className={"w-[100px] h-[100px] bg-black absolute"}
                initial={{scale: 1, borderRadius: "50%"}}
                animate={{x:-300, borderRadius: "0%"}}
                transition={{delay: 1.5, duration:0.4, ease: "easeInOut"}}

            >
            </motion.div>

            <motion.img
                src={eventsLogo}
                className={"w-[100px] h-[100px] absolute cursor-pointer"}
                initial={{scale: 0,x: -300, y: 0, borderRadius: "50%"}}
                animate={{scale:1.8, borderRadius: "0%"}}
                transition={{delay: 1.85, duration:0.25}}
                onClick={() => navigate("/events")}
            ></motion.img>
            <TypingAnimation textToBeWritten={"Events"} className={"text-3xl font-bold absolute text-center"} displacementX={"-300px"} displacementY={"120px"} delay={2}/>



        </div>
    )
}

export default Home;