import React from 'react';
import YellowBox from "./dragableComponents/YellowBox";
const questionsXanswers = [
    {
        question: "What is the capital of Czechia?",
        answer: "Prague"
    },
    {
        question: "What is the capital of Slovakia?",
        answer: "Bratislava"
    },
    {
        question: "What is the capital of Poland?",
        answer: "Warsaw"
    },
    {
        question: "What is the capital of Germany?",
        answer: "Berlin"
    },
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "What is the capital of Spain?",
        answer: "Madrid"
    }
]
// @ts-ignore
function Match({id, name, subject, date}) {
    return (
        <div className={"flex flex-row justify-center items-center"}>
            <div className={"blobNotes"}>

            </div>
            <div className="container select-none w-[1200px] h-[550px]" id={"mainContainer"}>
                {/*<YellowBox id={"yellow"} left={Math.floor(Math.random() * 50) + "vh"} top={Math.floor(Math.random() * 50) + "vw"} text={"Not today mate"} />*/}
                {/*<YellowBox id={"yellow2"} left={Math.floor(Math.random() * 50) + "vh"} top={Math.floor(Math.random() * 50) + "vw"} text={"AHOJKY Fešáku"}/>*/}
                {/*<YellowBox id={"yellow3"} left={Math.floor(Math.random() * 50) + "vh"} top={Math.floor(Math.random() * 50) + "vw"} text={"JESsus chrissp"}/>*/}

                {
                    questionsXanswers.map((item, index) => {
                        return <>
                            <YellowBox id={"yellow" + index + "question"}
                                       top={Math.floor(Math.random() * 70) + "vh"}
                                       left={Math.floor(Math.random() * 90) + "vw"} text={item.question} myObject={questionsXanswers}/>
                            <YellowBox id={"yellow" + index + "answer"} top={Math.floor(Math.random() * 70) + "vh"}
                                       left={Math.floor(Math.random() * 90) + "vw"} text={item.answer} myObject={questionsXanswers}/>
                        </>

                    })
                }

            </div>
        </div>
    );
}

export default Match;