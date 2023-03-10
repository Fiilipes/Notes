import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

// @ts-ignore
function NoteBlob({name, subject, id, date, test}) {

    const [isTest, setIsTest] = useState(false)

    useEffect(() => {
        if (test) {
            setIsTest(true)

            console.log(name)
        }
    },[])


    // @ts-ignore
    return (
        <Link to={`/notes/zápisy/${id}`} className={"w-[160px] h-[100px] bg-white transition duration-300  text-black border-2 border-black font-bold text-xl rounded-[20px] p-4 text-center mx-3 cursor-pointer shadow-[0_30px_0_rgba(0,0,0,1)] hover:translate-y-2"}>
            <div className={"h-[20px] mt-[8px] text-lg"}>
                {name}
            </div>
            <div className={"flex flex-row w-[130px] justify-between absolute ml-[-6px] mt-[54px] text-white text-[10px] font-bold"}>
                {/*Emoji*/}
                <div className={"flex flex-row items-center justify-between w-[inherit]"}>
                    <div>
                        {subject}
                    </div>
                    <div className={"flex flex-row items-center justify-between"}>
                        {/*{*/}
                        {/*    date[0]*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    date[1]*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    date[2]*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    date[3]*/}
                        {/*}*/}
                        {/*<br/>*/}
                        {/*{*/}
                        {/*    // current date*/}
                        {/*    new Date().getFullYear()*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    new Date().getMonth() + 1*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    new Date().getDate()*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    // get current week*/}

                        {/*    // @ts-ignore*/}
                        {/*    Math.ceil((Math.floor(((new Date()) - (new Date((new Date()).getFullYear(), 0, 1))) /*/}
                        {/*    (24 * 60 * 60 * 1000))) / 7)*/}

                        {/*}*/}
                        {
                            // @ts-ignore
                            Math.ceil((Math.floor(((new Date()) - (new Date((new Date()).getFullYear(), 0, 1))) /
                                (24 * 60 * 60 * 1000))) / 7) === date[3] && new Date().getDate() <= date[0] + 1 ? <div className={"bg-[#35f] mx-[1.5px] rounded-[10px] w-[30px] h-[13.5px] text-center flex justify-center items-center px-3"}>
                                New
                            </div> : ""
                        }
                        {
                            isTest ? <div className={"bg-[#f35] mx-[1.5px] rounded-[10px] w-[13.5px] h-[13.5px] text-center flex justify-center items-center px-"}>
                                !
                            </div> : ""
                        }



                        <div className={"bg-[#598] mx-[1.5px] rounded-[10px] w-[13.5px] h-[13.5px] text-center flex justify-center items-center px-"}>
                            $
                        </div>


                    </div>
                </div>


            </div>

        </Link>

    );
}

export default NoteBlob;