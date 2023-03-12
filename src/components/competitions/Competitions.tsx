import React, {useEffect} from 'react';
import competitionsLogo from "../../assets/img/competitionsLogo.png";

function Competitions() {
    useEffect(
        () => {
            // set title of the page
            document.title = "Competitions"
            // @ts-ignore
            document.querySelector("link[rel*='icon']").setAttribute('href', competitionsLogo);

        }, []
    )
    return (
        <div>
            <div className={"blobCompetitions"}>

            </div>
            Competitions
        </div>
    );
}

export default Competitions;