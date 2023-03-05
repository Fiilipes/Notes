import React, { useEffect, useState } from 'react';

function Clock() {
    const quotes = [
        "Believe you can and you're halfway there.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The only way to do great work is to love what you do.",
        "Don't watch the clock; do what it does. Keep going.",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "You are never too old to set another goal or to dream a new dream.",
        "Start where you are. Use what you have. Do what you can.",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful."
    ];
    const [quote, setQuote] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        setQuote(randomQuote);

        const htmlbody = document.querySelector("body")
        // @ts-ignore
        htmlbody.style.backgroundColor = "black";
        // @ts-ignore
        htmlbody.style.overflow = "hidden";
        // @ts-ignore
        document.querySelector("header").style.display = "none";
    }, []);

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            let theDate = new Date().toLocaleTimeString()

            setTime(theDate)
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black h-screen flex flex-col justify-center items-center">
            <div className="text-white font-black text-[250px] flex flex-row ml-[-160px] w-[500px] text-left items-center">
                <div className="flex-1 mr-12">{time.split(":")[0]}</div>
                <div className="flex-1 mr-6">{time.split(":")[1]}</div>
                <div className="flex-1 text-6xl mt-32">{time.split(":")[2]}</div>
            </div>
            <div className="text-white mx-auto w-3/4 text-center mt-8">{quote}</div>
        </div>
    );
}

export default Clock;
