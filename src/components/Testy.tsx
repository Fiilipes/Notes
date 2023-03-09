import React, {useEffect, useState} from 'react';
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {Link} from "react-router-dom";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}

function Testy() {

    const [tests, setTests] = useState([])

    const getData = () => {
        getNotes().then((data) => {
            // @ts-ignore
            let myData = data[1]["all"]
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
                        <Link to={"/notes/testy/"+item.id} className={"flex flex-col items-center justify-start w-[400px] h-[160px] bg-white border-2 border-black rounded-3xl px-4 pb-6 pt-3 cursor-pointer shadow-[0_25px_0_rgba(0,0,0,1)] hover:translate-y-2 transition duration-300 text-center"}>
                            <div className={"text-2xl font-bold mb-4"}>
                                {item.theme}
                            </div>

                            <div className={"flex "}>
                                <span className={"flex justify-center items-center text-center font-semibold rounded-2xl mx-1 border-2 border-black w-[120px] h-[35px] shadow-[0_5px_0_rgba(0,0,0,0.7)]  "}>
                                    {item.subject}
                                </span>
                                <span className={"flex justify-center items-center text-center font-semibold rounded-2xl mx-1 border-2 border-black w-[120px] h-[35px] shadow-[0_5px_0_rgba(0,0,0,0.7)]  "}>
                                    {item.day}.{item.month} {item.year}
                                </span>
                            </div>
                            <div className={"bg-[#35f] text-white font-bold mx-[1.5px] mt-5 rounded-[10px] w-fit text-sm h-[35px] text-center flex justify-center items-center px-3 py-1"}>
                                {item.zápisy.length > 1 ? item.zápisy.length + " zápisy" : ( item.zápisy.length > 0 ? item.zápisy.length + " zápis" : "Žádné zápisy" )}
                            </div>
                        </Link>
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

    useEffect(() => {
        getData()
    },[])

    if (localStorage.getItem("isAuth") === "true") {
        return (
            <div className={"flex flex-col w-[96%] mx-auto mt-8 items-center"}>
                <div className={"blob"}>

                </div>
                <div className={"flex flex-col justify-between items-center p-4 mx-auto"}>
                    <div className={"mb-12"}>
                        <div className={"flex flex-row"}>
                            <div className={"w-[200px] h-[85px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-2xl text-center p-2 mx-2"}>
                                Počet Testů <br/>
                                <span className={"text-3xl font-black"}>
                                    {tests.length}
                                </span>
                            </div>
                            <div className={"w-[200px] h-[85px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-2xl text-center p-2 mx-2"}>
                                Tento Týden <br/>
                                <span id={"inCurrentWeekTest"} className={"text-3xl font-black"}>
                                    0
                                </span>
                            </div>
                            <div className={"w-[200px] h-[85px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-2xl text-center p-2 mx-2"}>
                                Příští týden <br/>
                                <span id={"inNextWeekTest"} className={"text-3xl font-black"}>
                                    0
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className={"grid grid-cols-3  gap-y-12 gap-x-[50px]"}>
                        {tests}
                    </div>

                </div>
            </div>

        )

    } else {
        localStorage.setItem("lastPage", "/notes/testy/")
        location.href = "/login"
        return <div></div>
    }
}

export default Testy;