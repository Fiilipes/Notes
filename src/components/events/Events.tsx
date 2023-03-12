import React, {useEffect} from 'react';
import eventsLogo from "../../assets/img/eventsLogo.png";


function Events() {
    useEffect(
        () => {
            // set title of the page
            document.title = "Events"
            // @ts-ignore
            document.querySelector("link[rel*='icon']").setAttribute('href', eventsLogo);

        }, []
    )
    return (
        <div>
            <div className={"blobSS"}>

            </div>
            Events
        </div>
    );
}

export default Events;