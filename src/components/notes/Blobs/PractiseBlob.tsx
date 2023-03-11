import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

// @ts-ignore
function PracticeBlob({item}) {



    // @ts-ignore
    return (
        <Link to={`/notes/procvičování/${item.id}`} className={"w-[160px] h-[100px] bg-white transition duration-300  text-black border-2 border-black font-bold text-xl rounded-[20px] p-4 text-center mx-3 cursor-pointer shadow-[0_30px_0_rgba(0,0,0,1)] hover:translate-y-2"}>
            {item.name}
        </Link>

    );
}

export default PracticeBlob;