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
            console.log(myData)
            myData.forEach(
                (item: any) => {
                    console.log(item)
                    myTests.push(
                        <Link to={"/notes/testy/"+item.id} className={"flex flex-col items-center justify-start w-[400px] h-[160px] bg-white border-2 border-black rounded-3xl px-4 py-6 cursor-pointer shadow-[0_25px_0_rgba(0,0,0,1)] hover:translate-y-2 transition duration-300 text-center"}>
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
                        </Link>
                    )
                }
            )
            // @ts-ignore
            setTests(myTests)
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
                                <span id={"inCurrentMonth"} className={"text-3xl font-black"}>
                                    0
                                </span>
                            </div>
                            <div className={"w-[200px] h-[85px] shadow-[0_10px_0_rgba(0,0,0,0.8)] bg-[white] border-2 border-black  rounded-3xl font-bold text-2xl text-center p-2 mx-2"}>
                                Příští týden <br/>
                                <span id={"inCurrentWeek"} className={"text-3xl font-black"}>
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