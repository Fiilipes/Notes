
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import NoteBlob from "./subjects/NoteBlob";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {getAuth} from "firebase/auth";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}

export default () => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const [filterVisible, setFilterVisible] = useState(false)
    const [addNoteVisible, setAddNoteVisible] = useState(false)
    const [notesArr, setNotesArr] = useState([])
    const [chartNoteVisible, setChartNoteVisible] = useState(false)



    const filterText = function (e: any) {
        console.log(e.target.value)

        // get element in id content and filter it
        const content = document.getElementById("workspace")

        // @ts-ignore
        Array.from(content.children).forEach(
            (item: any) => {
                console.log(item.children[0].textContent)

                if (item.children[0].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                    item.style.display = "block"
                    // @ts-ignore
                    document.getElementById("noResultsZápisy").style.display = "none"
                } else {
                    item.style.display = "none"
                    // @ts-ignore
                    if (Array.from(content.children).every((item: any) => item.style.display === "none")) {
                        // @ts-ignore
                        document.getElementById("noResultsZápisy").style.display = "flex"
                    } else {
                        // @ts-ignore
                        document.getElementById("noResultsZápisy").style.display = "none"
                    }
                }


            }
        )

    }

    const filterSubject = function (e: any) {
        console.log(e.target.checked)
        console.log(e.target.name)
        let otherChecked = document.querySelectorAll("input:checked")

        console.log(otherChecked)
        otherChecked.forEach(
            (item: any) => {
                console.log(item.name)

            }
        )

        if (otherChecked.length !== 0) {
            // get element in id content and filter it
            const content = document.getElementById("workspace")

            // @ts-ignore
            Array.from(content.children).forEach(
                (item: any) => {
                    console.log(item.children[1].textContent)
                    let stop = false
                    otherChecked.forEach(
                        (item2: any) => {
                            if (item.children[1].textContent.toLowerCase().includes(item2.name.toLowerCase())) {
                                item.style.display = "block"
                                stop = true
                            } else {
                                if (!stop) {
                                    item.style.display = "none"
                                }
                            }
                        }
                    )

                }
            )

        } else {
            const content = document.getElementById("workspace")
            // @ts-ignore
            Array.from(content.children).forEach(
                (item: any) => {
                    item.style.display = "block"
                })
        }
    }


    const handleLoad = () => {
        console.log("loaded")
        let myData
        let myDataSorted
        let myTests: any[]
        getNotes().then((data) => {
            // @ts-ignore
            myData = data[0]["notes"]
            // @ts-ignore
            myTests = data[2]["all"]
            console.log(myData)
            let myNewArray: JSX.Element[] = []

            // @ts-ignore
            myDataSorted = myData.sort((p1, p2) => (p1.date[0] * 100 + p1.date[1] * 10000 + p1.date[2] * 1000000  < p2.date[0] * 100 + p2.date[1] * 10000 + p2.date[2] * 1000000) ? 1 : (p1.date[0] * 100 + p1.date[1] * 10000 + p1.date[2] * 1000000 > p2.date[0] * 100 + p2.date[1] * 10000 + p2.date[2] * 1000000) ? -1 : 0)

            myDataSorted.forEach(
                (item: any) => {
                    console.log(item)

                    myNewArray.push(
                        <NoteBlob name={item.name} subject={item.subject} date={item.date} id={item.id} test={
                            myTests.find((item2: any) => {
                                return item2.zápisy.includes(item.id)
                            })

                        } key={item.id}/>
                    )
                    console.log(myNewArray)


                    // @ts-ignore
                    setNotesArr(myNewArray)
                    let counter = 0
                    let counter2 = 0

                    myNewArray.forEach(
                        (item: any) => {
                            let dateX = item.props.date
                            let currentDay = new Date().getDate()
                            let currentMonth = new Date().getMonth() + 1
                            let currentYear = new Date().getFullYear()
                            let currentDayInWeek = new Date().getDay()

                            let currentDate = new Date();
                            let startDate = new Date(currentDate.getFullYear(), 0, 1);
                            // @ts-ignore
                            let days = Math.floor((currentDate - startDate) /
                                (24 * 60 * 60 * 1000));

                            let weekNumber = Math.ceil(days / 7);

                            // Display the calculated result
                            console.log("Week number of " + currentDate +
                                " is :   " + weekNumber);


                            if (weekNumber.toString() == dateX[3].toString() && currentYear.toString() == dateX[2].toString()) {
                                counter+=1
                            }
                            if (currentMonth.toString() == dateX[1].toString() && currentYear.toString() == dateX[2].toString()) {
                                counter2+=1
                            }
                            // @ts-ignore
                            document.getElementById("inCurrentWeek").innerHTML = counter.toString()
                            // @ts-ignore
                            document.getElementById("inCurrentMonth").innerHTML = counter2.toString()


                        }
                    )
                }
            )
        })

    }



    useEffect(
        () => {
            // get items from firestore
            handleLoad()
        }, []
    )


    // @ts-ignore
    if (localStorage.getItem("isAuth") === "true") {
        return (
            <><Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
                <div className={"flex flex-col w-[96%] mx-auto mt-8"}>
                    <div className={"blobNotes"}>

                    </div>

                    <div id={"content"} className={"flex flex-col justify-between items-center p-4 mx-auto"}>
                        <div className={"flex flex-col items-center"}>
                            <div className={"mb-12"}>
                                <div className={"flex flex-row"}>
                                    <div
                                        className={"w-[180px] h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-xl text-center p-2 mx-2"}>
                                        Počet Zápisů <br/>
                                        <span className={"text-3xl font-black"}>
                                        {notesArr.length}
                                    </span>
                                    </div>
                                    <div
                                        className={"w-[180px] h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-xl text-center p-2 mx-2"}>
                                        Tento Měsíc <br/>
                                        <span id={"inCurrentMonth"} className={"text-3xl font-black"}>
                                        0
                                    </span>
                                    </div>
                                    <div
                                        className={"w-[180px] h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-xl text-center p-2 mx-2"}>
                                        Tento Týden <br/>
                                        <span id={"inCurrentWeek"} className={"text-3xl font-black"}>
                                        0
                                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className={"flex flex-row"}>
                                <input type={"text"} onInput={filterText}
                                       className={"w-[400px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1"}
                                       placeholder={"Název zápisu"}/>
                                <div id={"filter"}
                                     className={"w-[50px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1 cursor-pointer"}
                                     onClick={() => {
                                         setFilterVisible(!filterVisible);
                                         setAddNoteVisible(false);
                                     }}>
                                    {/*Arrow aiming down without the arrow*/}
                                    {/*Line*/}
                                    <div
                                        className={"w-[29px] h-[5px] mt-3 bg-black mx-auto rounded-[10px]"}/>
                                    <div
                                        className={"w-[23px] h-[4.5px] mt-1 bg-black mx-auto rounded-[10px]"}/>
                                    <div
                                        className={"w-[17px] h-[4px] mt-1 bg-black mx-auto rounded-[10px]"}/>


                                </div>
                                {getAuth().currentUser?.email === "jarolimfilip07@gmail.com" ? <div id={"addNewNote"}
                                                                                                    className={"w-[50px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1 cursor-pointer"}
                                                                                                    onClick={() => setChartNoteVisible(!chartNoteVisible)}>
                                        {/*Plus*/}
                                        <div
                                            className={"w-[28px] h-[5px] mt-5 bg-black mx-auto rounded-[10px]"}/>
                                        <div
                                            className={"w-[28px] h-[5px] mt-[-5px] bg-black mx-auto rotate-90 rounded-[10px]"}/>


                                    </div>
                                    : ""}{getAuth().currentUser?.email === "jarolimfilip07@gmail.com" ?
                                <div id={"addNewNote"}
                                     className={"w-[50px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1 cursor-pointer"}
                                     onClick={() => setChartNoteVisible(!chartNoteVisible)}>
                                    {/*EDIT*/}

                                    <div
                                        className={"w-[28px] h-[5px] mt-[17px] bg-black mx-auto rotate-90 rounded-[10px]"}/>
                                    <div
                                        className={"w-[24px] h-[4.7px] ml-5 bg-black mx-auto rotate-90 rounded-[10px]"}/>
                                    <div
                                        className={"w-[20px] h-[5px] mr-[21px] bg-black mx-auto rotate-90 rounded-[10px]"}/>


                                </div>
                                : ""}
                            </div>
                            <div
                                className={`absolute mt-[60px] bg-[rgba(0,0,0,0.95)] w-[500px] h-[400px] z-10 mx-auto text-white text-xl font-bold p-4 rounded-[20px] select-none ${filterVisible ? "" : "hidden"}`}>
                                <h2 className={"text-white mb-2"}>Předmět</h2>
                                <div className={"flex flex-row"}>
                                    <div className={"flex flex-col mx-2"}>
                                        <input type={"checkbox"} className={"w-[20px] h-[20px] cursor-pointer"}
                                               id={"checkbox1"} onChange={filterSubject} name={"dějepis"}/>
                                        <label htmlFor={"checkbox1"}
                                               className={"text-white text-sm font-semibold cursor-pointer"}>Dějepis</label>
                                    </div>
                                    <div className={"flex flex-col mx-2"}>
                                        <input type={"checkbox"} className={"w-[20px] h-[20px] cursor-pointer"}
                                               id={"checkbox2"} onChange={filterSubject} name={"čeština"}/>
                                        <label htmlFor={"checkbox2"}
                                               className={"text-white text-sm font-semibold cursor-pointer"}>Čeština</label>
                                    </div>
                                    <div className={"flex flex-col mx-2"}>
                                        <input type={"checkbox"} className={"w-[20px] h-[20px] cursor-pointer"}
                                               id={"checkbox3"} onChange={filterSubject} name={"biologie"}/>
                                        <label htmlFor={"checkbox3"}
                                               className={"text-white text-sm font-semibold cursor-pointer"}>Biologie</label>
                                    </div>
                                    <div className={"flex flex-col mx-2"}>
                                        <input type={"checkbox"} className={"w-[20px] h-[20px] cursor-pointer"}
                                               id={"checkbox4"} onChange={filterSubject} name={"chemie"}/>
                                        <label htmlFor={"checkbox4"}
                                               className={"text-white text-sm font-semibold cursor-pointer"}>Chemie</label>
                                    </div>
                                    <div className={"flex flex-col mx-2"}>
                                        <input type={"checkbox"} className={"w-[20px] h-[20px] cursor-pointer"}
                                               id={"checkbox5"} onChange={filterSubject} name={"zsv"}/>
                                        <label htmlFor={"checkbox5"}
                                               className={"text-white text-sm font-semibold cursor-pointer"}>ZSV</label>
                                    </div>
                                    <div className={"flex flex-col mx-2"}>
                                        <input type={"checkbox"} className={"w-[20px] h-[20px] cursor-pointer"}
                                               id={"checkbox6"} onChange={filterSubject} name={"zeměpis"}/>
                                        <label htmlFor={"checkbox6"}
                                               className={"text-white text-sm font-semibold cursor-pointer"}>Zeměpis</label>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={"flex flex-col mt-12"}>
                            <div id={"workspace"} className={"grid grid-cols-6 gap-y-12 mb-[50px]"}>
                                {chartNoteVisible ? <div
                                    className={"w-[160px] h-[100px] bg-[rgba(255,255,255,0.5)] transition duration-300  text-black border-2 border-black font-bold text-xl rounded-[20px] p-4 text-center mx-3  shadow-[0_30px_0_rgba(0,0,0,1)] opacity-[0.95] "}>
                                    <input type={"text"}
                                           className={"h-[30px] w-[120px] px-3 border-2 border-black rounded-xl mt-[8px] text-lg text-black outline-none"}
                                           id={"inputTémaZápisy"} placeholder={"Téma"} required={true}/>
                                    <div
                                        className={"flex flex-row w-[130px] justify-between absolute ml-[-6px] mt-[45px] text-white text-[10px] font-bold"}>
                                        {/*Emoji*/}
                                        <div className={"flex flex-row items-center justify-between w-[inherit]"}>
                                            <input type={"text"} id={"inputSubjectZápisy"}
                                                   className={"w-[80px] h-[20px] my-1 px-1 rounded-md outline-none text-black"}
                                                   required={true} placeholder={"Předmět"}/>

                                            <div className={"flex flex-row items-center justify-between"}>

                                                <div
                                                    className={"bg-[#75f] mx-[1.5px] rounded-[10px] w-[30px] h-[13.5px] text-center flex justify-center items-center px-3 cursor-pointer"}
                                                    onClick={() => {
                                                        // add new note to firestore
                                                        console.log("add note");
                                                        const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                                        console.log(randomId);
                                                        const currentDay = new Date().getDate();
                                                        const currentMonth = new Date().getMonth() + 1;
                                                        const currentYear = new Date().getFullYear();
                                                        let currentDate = new Date();
                                                        let startDate = new Date(currentDate.getFullYear(), 0, 1);
                                                        // @ts-ignore
                                                        let days = Math.floor((currentDate - startDate) /
                                                            (24 * 60 * 60 * 1000));

                                                        let weekNumber = Math.ceil(days / 7);

                                                        // Display the calculated result
                                                        console.log("Week number of " + currentDate +
                                                            " is :   " + weekNumber);


                                                        const name = document.getElementById("inputTémaZápisy") as HTMLInputElement;
                                                        const subject = document.getElementById("inputSubjectZápisy") as HTMLInputElement;
                                                        if (name.value === "" || subject.value === "") {
                                                            alert("Vyplňte všechny údaje");
                                                        } else {
                                                            getNotes().then((data) => {
                                                                // @ts-ignore
                                                                const notes = data[0]["notes"];
                                                                // @ts-ignore
                                                                setDoc(doc(db, "notes", "notes"), {
                                                                    notes: [...notes, {
                                                                        name: name.value,
                                                                        subject: subject.value,
                                                                        editorArray: ["editorOne"],
                                                                        editorTextArray: [`<h1>${name.value}</h1>`],
                                                                        editorInputValueArray: ["1"],
                                                                        id: "Z-" + randomId,
                                                                        date: [
                                                                            currentDay, currentMonth, currentYear, weekNumber
                                                                        ],
                                                                        zápisy: []
                                                                    }
                                                                    ]
                                                                }).then(
                                                                    () => {
                                                                        location.reload();
                                                                    }
                                                                );

                                                            });

                                                        }


                                                    }}>
                                                    Add
                                                </div>


                                            </div>
                                        </div>


                                    </div>

                                </div> : ""}
                                {notesArr.map((item) => {
                                    return item;
                                })}
                            </div>
                            <div id={"noResultsZápisy"}
                                 className={"font-bold hidden text-center flex flex-col justify-center items-center mx-auto w-full mt-8 "}>
                                <div className={"text-3xl"}>
                                    Žédné výsledky
                                </div>
                                <div className={"text-md font-semibold"}>
                                    Nebyly nalezeny žádné zápisy
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </>
        )


    } else {
        localStorage.setItem("lastPage", "/notes/zápisy/")
        location.href = "/login"
        return <div></div>
    }


}
