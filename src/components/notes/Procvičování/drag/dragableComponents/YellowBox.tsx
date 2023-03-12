import React from "react";
import useDragger from "../../../../../hooks/useDragger";
// @ts-ignore

// @ts-ignore
const YellowBox = ({id, left, top, text, myObject}) => {

    useDragger(id, left, top, myObject);

    // @ts-ignore
    return <div id={id} name={text} style={
        // random position
        {
            top: top,
            left: left
        }
    } className="box">

        {text}
    </div>
};

export default YellowBox;
