import React, {useEffect, useState} from 'react';
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {Link} from "react-router-dom";
import ProcviOvNBlob from "./subjects/TestyBlob";
import TestyBlob from "./subjects/TestyBlob";
import {getAuth} from "firebase/auth";
import Navbar from "./Navbar";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}

function Testy() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const [tests, setTests] = useState([])
    const [newTestHTML, setNewTestHTML] = useState(false)

    const getData = () => {
        getNotes().then((data) => {
            // @ts-ignore
            let myData = data[2]["all"]
            let myTests:any[] = []
            let myDataSorted:any[] = []

            // @ts-ignore
            myDataSorted = myData.sort((p1, p2) => (p1.day * 100 + p1.month * 10000 + p1.year * 1000000 < p2.day * 100 + p2.month * 10000 + p2.year * 1000000) ? 1 : (p1.day * 100 + p1.month * 10000 + p1.year * 1000000 > p2.day * 100 + p2.month * 10000 + p2.year * 1000000) ? -1 : 0).reverse()
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
            console.log(myData)
            let counter = 0
            let counter2 = 0
            myDataSorted.forEach(
                (item: any) => {
                    console.log(item)
                    myTests.push(
                        <TestyBlob item={item} />
                    )
                    console.log(item.week)
                    console.log(weekNumber)

                    let dateX = [item.day, item.month, item.year, item.week ]
                    console.log(dateX)

                    if (weekNumber.toString() == dateX[3].toString() && currentYear.toString() == dateX[2].toString()) {
                        counter+=1
                        console.log("this week")
                        console.log(item)
                    }
                    if ((weekNumber+1).toString()  == dateX[3].toString() && currentYear.toString() == dateX[2].toString()) {
                        counter2+=1
                        console.log("next week")
                        console.log(item)
                    }
                    // @ts-ignore
                    document.getElementById("inCurrentWeekTest").innerHTML = counter.toString()
                    // @ts-ignore
                    document.getElementById("inNextWeekTest").innerHTML = counter2.toString()
                }
            )








            // @ts-ignore
            setTests(myTests)


            // let counter = 0
            // let counter2 = 0
            //
            // myTests.forEach(
            //     (item: any) => {
            //         let dateX = item.props.date
            //         let currentDay = new Date().getDate()
            //         let currentMonth = new Date().getMonth() + 1
            //         let currentYear = new Date().getFullYear()
            //         let currentDayInWeek = new Date().getDay()
            //
            //         let currentDate = new Date();
            //         let startDate = new Date(currentDate.getFullYear(), 0, 1);
            //         // @ts-ignore
            //         let days = Math.floor((currentDate - startDate) /
            //             (24 * 60 * 60 * 1000));
            //
            //         let weekNumber = Math.ceil(days / 7);
            //
            //         // Display the calculated result
            //         console.log("Week number of " + currentDate +
            //             " is :   " + weekNumber);
            //         console.log(dateX)
            //
            //         if (weekNumber.toString() == dateX[3].toString() && currentYear.toString() == dateX[2].toString()) {
            //             counter+=1
            //         }
            //         if (currentMonth.toString() == dateX[1].toString() && currentYear.toString() == dateX[2].toString()) {
            //             counter2+=1
            //         }
            //         // @ts-ignore
            //         document.getElementById("inCurrentWeekTest").innerHTML = counter.toString()
            //         // @ts-ignore
            //         document.getElementById("inNextWeekTest").innerHTML = counter2.toString()
            //
            //
            //     }
            // )

        })
    }

    const filterText = function (e: any) {
        console.log(e.target.value)

        // get element in id content and filter it
        const content = document.getElementById("allTests")

        // @ts-ignore
        Array.from(content.children).forEach(
            (item: any) => {
                console.log(item.children[0].textContent)
                if (item.children[0].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                    item.style.display = "flex"
                    // @ts-ignore
                    document.getElementById("noResultsTests").style.display = "none"

                } else {
                    item.style.display = "none"

                    // if all children are hidden, add text "no results"
                    // @ts-ignore
                    if (Array.from(content.children).every((item: any) => item.style.display === "none")) {
                        // @ts-ignore
                        document.getElementById("noResultsTests").style.display = "flex"
                    } else {
                        // @ts-ignore
                        document.getElementById("noResultsTests").style.display = "none"
                    }

                }
            }
        )

    }
    // @ts-ignore
    const submitCreateNewTestForm = () => {
        const inputTheme = document.getElementById("newTestThemeInput") as HTMLInputElement
        const inputSubject = document.getElementById("newTestSubjectInput") as HTMLInputElement
        const inputDate = document.getElementById("newTestDateInput") as HTMLInputElement

        const theme = inputTheme.value
        const subject = inputSubject.value
        const date = inputDate.value

        console.log(theme)
        console.log(subject)
        console.log(date)

        const dateArray = date.split("-")

        const day = dateArray[2]
        const month = dateArray[1]
        const year = dateArray[0]

        let currentDate = new Date();
        console.log(currentDate)
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        console.log(startDate)

        // @ts-ignore
        let newDate = new Date(year, month - 1, day);
        console.log(newDate)

        // @ts-ignore
        let days = Math.floor((newDate - startDate) /
            (24 * 60 * 60 * 1000));

        const week = Math.ceil(days / 7);
        console.log(week)
        let randomId = "T-" + Math.random().toString(36).substr(2, 9)

        getNotes().then((data) => {
            // @ts-ignore
            let myTests = data[2]["all"]

            myTests.push(
                {
                    subject: subject,
                    theme: theme,
                    year: year,
                    month: month,
                    day: day,
                    week: week,
                    zápisy: [],
                    id: randomId
                }
            )
            setDoc(doc(db, "notes", "tests"), {
                all: myTests
            }).then(
                () => {
                    location.reload()
                }
            )


        })





    }


    useEffect(() => {
        getData()
    },[])

    if (localStorage.getItem("isAuth") === "true") {
        return (
            <><Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
                <div className={"flex flex-col w-[96%] mx-auto mt-8 items-center pb-10"}>
                    <div className={"blobNotes"}>

                    </div>
                    <div className={"flex flex-col justify-between items-center p-4 mx-auto"}>
                        <div className={"mb-8"}>
                            <div className={"flex flex-row mb-12"}>
                                <div
                                    className={"w-[180px] h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-xl text-center p-2 mx-2"}>
                                    Počet Testů <br/>
                                    <span className={"text-3xl font-black"}>
                                    {tests.length}
                                </span>
                                </div>
                                <div
                                    className={"w-[180px] h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-xl text-center p-2 mx-2"}>
                                    Tento Týden <br/>
                                    <span id={"inCurrentWeekTest"} className={"text-3xl font-black"}>
                                    0
                                </span>
                                </div>
                                <div
                                    className={"w-[180px] h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-xl text-center p-2 mx-2"}>
                                    Příští týden <br/>
                                    <span id={"inNextWeekTest"} className={"text-3xl font-black"}>
                                    0
                                </span>
                                </div>
                            </div>
                            <div className={"flex flex-row"}>
                                <input type={"text"}
                                       className={"w-[400px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1"}
                                       placeholder={"Název testu"} onInput={filterText}/>
                                <div id={"filter"}
                                     className={"w-[50px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1 cursor-pointer"}>
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
                                                                                                    className={"w-[50px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1 cursor-pointer"}>
                                        {/*Plus*/}
                                        <div
                                            className={"w-[28px] h-[5px] mt-5 bg-black mx-auto rounded-[10px]"}/>
                                        <div
                                            className={"w-[28px] h-[5px] mt-[-5px] bg-black mx-auto rotate-90 rounded-[10px]"}/>


                                    </div>
                                    : ""}{getAuth().currentUser?.email === "jarolimfilip07@gmail.com" ?
                                <div id={"addNewNote"}
                                     className={"w-[50px] h-[50px] rounded-xl border-2 border-black text-center text-2xl font-bold bg-white mx-1 cursor-pointer"}>
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
                        </div>


                        <div id={"allTests"} className={"grid grid-cols-3  gap-y-12 gap-x-[28px]"}>
                            {tests}
                            <div
                                className={"flex flex-col items-center justify-start w-[300px] h-[155px] bg-[rgba(255,255,255,0.1)] border-2 border-black rounded-3xl px-4 pb-6 pt-6 cursor-pointer shadow-[0_19px_0_rgba(0,0,0,0.65)]  text-center"}>
                                {newTestHTML ? <><input type={"text"}
                                                        className={"text-2xl py-1 font-bold mb-2 w-[250px] outline-none border-2 border-black rounded-xl px-4"}
                                                        required={true} placeholder={"Téma"}
                                                        id={"newTestThemeInput"}/>
                                    <div className={"flex "}>
                                        <input type={"text"}
                                               className={"flex justify-center items-center text-center font-semibold rounded-2xl mx-1 border-2 border-black text-[14px] w-[100px] h-[30px] shadow-[0_4px_0_rgba(0,0,0,0.7)] outline-none"}
                                               required={true} placeholder={"Předmět"}
                                               id={"newTestSubjectInput"}/>

                                        <input type={"date"}
                                               className={"flex justify-center items-center text-center font-semibold rounded-2xl mx-1 border-2 border-black text-[14px] w-[150px] h-[30px] shadow-[0_4px_0_rgba(0,0,0,0.7)] outline-none px-2 "}
                                               required={true}
                                               id={"newTestDateInput"}/>

                                    </div>
                                    <div
                                        className={"w-[100px] h-[25px] text-sm border-2 font-bold mt-4 border-black bg-white hover:bg-black hover:text-white text-black transition duration-300 rounded-xl "}
                                        onClick={submitCreateNewTestForm}>
                                        Submit
                                    </div>
                                </> : <div className={""} onClick={() => setNewTestHTML(!newTestHTML)}>
                                    {/*plus icon*/}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>

                                </div>}

                            </div>


                        </div>
                        <div id={"noResultsTests"}
                             className={"font-bold hidden text-center flex flex-col justify-center items-center mx-auto w-full mt-8 "}>
                            <div className={"text-3xl"}>
                                Žédné výsledky
                            </div>
                            <div className={"text-md font-semibold"}>
                                Nebyly nalezeny žádné testy
                            </div>
                        </div>

                    </div>
                </div>
            </>

        )

    } else {
        localStorage.setItem("lastPage", "/notes/testy/")
        location.href = "/login"
        return <div></div>
    }
}

export default Testy;