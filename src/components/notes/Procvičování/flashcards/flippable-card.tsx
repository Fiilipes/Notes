import './flippable-card.css';
import Card from './card/Card';
import "./card/card.css";
import "./card/flip-transition.css";

// @ts-ignore
import {CSSTransition} from 'react-transition-group';
import {useState} from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
function FlippableCard({question, answer, index, length}) {
    const [showFront, setShowFront] = useState(true);
    const [test, setTest] = useState("")

    const knowFunc = () => {
        // setTest(!test) and after 2 seconds setTest(!test)

        setTest("know")
        setTimeout(() => {
            setTest("")
        } , 1000)

    }
    const stillLearningFunc = () => {
        // setTest(!test) and after 2 seconds setTest(!test)

        setTest("stillLearning")
        setTimeout(() => {
            setTest("")
        } , 1000)

    }
    if (test === "") {

        return (
            <div className="flippable-card-container">
                <CSSTransition
                    in={showFront}
                    timeout={300}
                    classNames='flip'
                >
                    {/*@ts-ignore*/}


                    <div className="card shadow-[0_10px_0_rgba(0,0,0,0.8)]" onClick={() => {
                        setShowFront((v) => !v)
                    }}>
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
                                <div
                                    className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"}
                                    onClick={knowFunc}>
                                    Know
                                </div>
                                <div
                                    className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"}
                                    onClick={stillLearningFunc}>
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
                                <div
                                    className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"}
                                    onClick={knowFunc}>
                                    Know
                                </div>
                                <div
                                    className={"shadow-[0_5px_0_rgba(0,0,0,1)] mx-2 mb-8 w-[200px] text-center text-black text-xl bg-white border-2 border-black rounded-2xl p-2 hover:bg-black hover:text-white transition duration-300"}
                                    onClick={stillLearningFunc}>
                                    Still Learning
                                </div>

                            </div>
                        </div>
                    </div>


                </CSSTransition>
            </div>
        );
    } else if (test === "know") {
        return (
            <motion.div className={"h-[450px] w-[620px] border-black  border-2 rounded-[40px] flex flex-row items-center justify-center bg-white shadow-[0_10px_0_rgba(0,0,0,0.8)]"}
                        initial={{scale: 1}}
                        animate={{scale: 1.04}}
                        transition={{duration: 0.2, type: "spring", stiffness: 200}}

            >
                <h1 className={"text-7xl font-bold text-black drop-shadow-[0_5px_80px_rgba(0,255,50,1)]"}>
                    Know
                </h1>
            </motion.div>
        )
    } else if (test === "stillLearning") {
        return (
            <motion.div className={"h-[450px] w-[620px] border-black  border-2 rounded-[40px] flex flex-row items-center justify-center bg-white shadow-[0_10px_0_rgba(0,0,0,0.8)]"}
                        initial={{scale: 1}}
                        animate={{scale: 1.05, x: -10, y: 20}}
                        transition={{duration: 0.2, type: "spring", stiffness: 100}}

            >
                <h1 className={"text-7xl font-bold text-black drop-shadow-[0_5px_80px_rgba(255,20,0,1)]"}>
                    Still Learning
                </h1>
            </motion.div>
        )
    }
}

export default FlippableCard;
