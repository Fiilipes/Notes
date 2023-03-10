import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

// @ts-ignore
function TestyBlob({item}) {




    // @ts-ignore
    return (
        <Link to={"/notes/testy/"+item.id} className={"flex flex-col items-center justify-start w-[280px] h-[125px] bg-white border-2 border-black rounded-3xl px-4 pb-6 pt-4 cursor-pointer shadow-[0_25px_0_rgba(0,0,0,1)] hover:translate-y-2 transition duration-300 text-center"}>
            <div className={"text-[25px] font-bold mb-2"}>
                {item.theme}
            </div>

            <div className={"flex "}>
                                <span className={"flex justify-center items-center text-center font-semibold rounded-2xl mx-1 border-2 border-black text-[13px] w-[100px] h-[30px] shadow-[0_4px_0_rgba(0,0,0,0.7)]  "}>
                                    {item.subject}
                                </span>
                <span className={"flex justify-center items-center text-center font-semibold rounded-2xl mx-1 border-2 border-black text-[13px] w-[100px] h-[30px] shadow-[0_4px_0_rgba(0,0,0,0.7)]  "}>
                                    {item.day}.{item.month}. {item.year}
                                </span>
            </div>
            <div className={"flex flex-row justify-end w-[inherit] pr-4 absolute mt-[92px] z-30"}>
                <div className={"bg-[#35f] text-white font-bold mx-[1.5px] mt-5 rounded-[10px] w-fit text-[9px] h-[14px] text-center flex justify-center items-center px-3 py-1 "}>
                    {item.zápisy.length > 1 ? item.zápisy.length + " zápisy" : ( item.zápisy.length > 0 ? item.zápisy.length + " zápis" : "Žádné zápisy" )}
                </div>
                <div className={"bg-[#84f] text-white font-bold mx-[1.5px] mt-5 rounded-[10px] w-fit text-[9px] h-[14px] text-center flex justify-center items-center px-3 py-1"}>
                    2 Procvičování
                </div>
            </div>
        </Link>


    );
}

export default TestyBlob