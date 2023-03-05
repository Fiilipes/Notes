// react components
import React from 'react';

// three js


// @ts-ignore
const Hero = function ({isAuth, setIsAuth}) {


    return (
        <div className={"w-[90%] mx-auto mt-24 h-[38vh] mb-0 flex flex-row justify-between"}>
            {/*
            welcome text
        */}
            <div className={"flex flex-col text-5xl "}>
                Vítejte na {" "}
                <span className="text-yellow-600 font-semibold text-7xl ">
                Survival Server
            </span> {" "}
                Webu
            </div>
        </div>
    )
}

export default Hero;
