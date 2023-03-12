import React from 'react';
import FlippableCard from "./flippable-card";

// @ts-ignore
function Flashcard({id, name, subject, date}) {
    return (
        <div className={"flex flex-row justify-center items-center"}>
            <div className={"blobNotes"}>

            </div>
            {/* @ts-ignore*/}
            <FlippableCard question={"Kolik je hodin?"} answer={"17"} index={1} length={10}/>
        </div>
    );
}

export default Flashcard;