import "./card.css";
import "./flip-transition.css";
import "framer-motion"
import { useState } from "react";

// @ts-ignore
function Card({onClick, question, answer, index, length}) {

    const [test, setTest] = useState(true)

    const knowFunc = () => {
        // setTest(!test) and after 2 seconds setTest(!test)

        setTest(!test)
        setTimeout(() => {
            console.log("test")
            setTest(true)
        } , 2000)

    }

    if (test) {
        return (
            <div className="card shadow-[0_10px_0_rgba(0,0,0,0.8)]" onClick={onClick}>
                <div className="card-back flex flex-col border-black border-2 bg-white">
                    <div className={"absolute text-sm left-0 ml-8 text-black font-bold"}>
                        answer
                    </div>
                    <div className={"absolute text-sm right-0 mr-8 text-black font-bold"}>
                        {index} / {length}
                    </div>
                    <h1
                        className={"text-5xl mt-40 font-bold text-center text-black"}>{answer}
                    </h1>
                    <div className={"flex flex-row justify-center items-center mt-32 font-bold"}>
                        <div className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"} onClick={() => setTest(!test)}>
                            Know
                        </div>
                        <div className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"}>
                            Still Learning
                        </div>

                    </div>
                </div>
                <div className="card-front flex flex-col border-black border-2 bg-white">
                    <div className={"absolute text-sm left-0 ml-8 text-black font-bold"}>
                        question
                    </div>
                    <div className={"absolute text-sm right-0 mr-8 text-black font-bold"}>
                        {index} / {length}
                    </div>
                    <h1
                        className={"text-5xl mt-40 font-bold text-center text-black"}>{question}
                    </h1>
                    <div className={"flex flex-row justify-center items-center mt-32 font-bold"}>
                        <div className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"} onClick={knowFunc}>
                            Know
                        </div>
                        <div className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"} onClick={() => console.log("kys")}>
                            Still Learning
                        </div>

                    </div>
                </div>
            </div>
        );

    }
}

export default Card;
