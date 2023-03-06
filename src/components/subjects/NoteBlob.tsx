import React from 'react';
import {Link} from "react-router-dom";

// @ts-ignore
function NoteBlob({name, subject, id, date}) {
    return (
        <Link to={`/notes/zápisy/${id}`} className={"w-[160px] h-[100px] bg-white transition duration-300  text-black border-2 border-black font-bold text-xl rounded-[20px] p-4 text-center mx-3 cursor-pointer shadow-[0_30px_0_rgba(0,0,0,1)] hover:translate-y-2"}>
            <div className={"h-[20px] mt-[8px] text-lg"}>
                {name}
            </div>
            <div className={"absolute ml-[-6px] mt-[54px] text-white text-[10px] font-bold"}>
                {/*Emoji*/}
                {">"} {subject}
            </div>

        </Link>

    );
}

export default NoteBlob;