import React, {useEffect, useState} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import MyThreeComponents from "./MyThreeComponents";
import MyComponent from "./MyComponent";
import {getAuth, onAuthStateChanged, getAdditionalUserInfo, signInAnonymously} from "firebase/auth";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import {Link} from "react-router-dom";
import NoteBlob from "./NoteBlob";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}
// fullscreen setup
import "../Zápis.scss"
import Navbar from "../Navbar";


// @ts-ignore
function Zápis({id, name, subject, date}) {
    const handle = useFullScreenHandle();
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    console.log(id)
    const [myComponents, setMyComponents] = useState([]);
    const [test, setTest] = useState([])
    const [fullScreen, setFullScreen] = useState(false)


    const handleAddMyComponent = () => {

        // @ts-ignore
        let myValue = document.getElementById("myNumber").value;
        console.log("my value")
        console.log(myValue)

        // @ts-ignore
        setMyComponents([...myComponents, <MyComponent key={myComponents.length} content={"ahoj"} number={myValue} />]);

    }

    const handleAddThreeMyComponents = () => {
        // @ts-ignore
        setMyComponents([...myComponents, <MyThreeComponents key={myComponents.length} content={["text", "text", "text"]} />])
    }

    const handleSave = () => {
        // Save content to local storage
        // @ts-ignore
        // localStorage.setItem("content", document.getElementById("main").innerHTML);

        // @ts-ignore
        const text : any = document.getElementById(id);
        console.log("my text")
        console.log(text.innerHTML)
        const htmlString = text.innerHTML;

        const editorArray: string[] = [];
        const editorHelperArray = [];

        const regex = /name="(editorOne|editorsTwo|editorsThree|editorsFour)"/g;
        let match;
        let helper = 0;
        let helper02 = 0
        let helper002 = 0;
        while ((match = regex.exec(htmlString)) !== null) {
            if (match[1] === "editorsFour" && helper002 === 0) {
                editorArray.push(match[1]);
                helper002 = 3;
            } else if (match[1] === "editorsFour" && helper002 !== 0) {
                helper002 -= 1;
                if (helper002 < 0) {
                    helper002 = 0;
                }
            } else if (match[1] === "editorsThree" && helper === 0) {
                editorArray.push(match[1]);
                helper = 3;
            } else if (match[1] === "editorsThree" && helper !== 0) {
                helper -= 1;
                if (helper < 0) {
                    helper = 0;
                }
            } else if (match[1] === "editorsTwo" && helper02 === 0) {
                editorArray.push(match[1]);
                helper02 = 2;
            } else if (match[1] === "editorsTwo" && helper02 !== 0) {
                helper02 -= 1;
                if (helper02 < 0) {
                    helper02 = 0;
                }
            } else {
                editorArray.push(match[1]);
                helper -= 1;
                if (helper < 0) {
                    helper = 0;
                }
            }
        }

        while ((match = regex.exec(htmlString)) !== null) {
            editorHelperArray.push(match[1]);
        }

        console.log(editorArray); // Output: ["editorOne", "editorOne", "editorOne", "editorOne", "editorsThree"]

        localStorage.setItem(`/notes/zápisy/${id}-editors`, JSON.stringify(editorArray));

        const editorInputValuesArray: string[] = [];
        const regex3 = /value="(1|2|3|4)"/g;
        let match3;
        let helper3 = 0;
        let helper03 = 0;
        let helper003 = 0;

        while ((match3 = regex3.exec(htmlString)) !== null) {
            console.log(match3[1])
            if (match3[1] === "4" && helper003 === 0) {
                editorInputValuesArray.push(match3[1]);
                helper003 = 3;
            } else if (match3[1] === "4" && helper003 !== 0) {
                helper003 -= 1;
                if (helper003 < 0) {
                    helper003 = 0;
                }
            }else if (match3[1] === "3" && helper3 === 0) {
                editorInputValuesArray.push(match3[1]);
                helper3 = 2;
            } else if (match3[1] === "3" && helper3 !== 0) {
                helper3 -= 1;
                if (helper3 < 0) {
                    helper3 = 0;
                }
            } else if (match3[1] === "2" && helper03 === 0) {
                editorInputValuesArray.push(match3[1]);
                helper03 = 1;
            } else if (match3[1] === "2" && helper03 !== 0) {
                helper03 -= 1;
                if (helper03 < 0) {
                    helper03 = 0;
                }
            } else if (match3[1] === "1") {
                editorInputValuesArray.push(match3[1]);
                helper3 -= 1;
                if (helper3 < 0) {
                    helper3 = 0;
                }
            }
        }







        let editorContentArray: string[] = [];

        const regex2 = /<div name="(editorOne|editorsTwo|editorsThree|editorsFour)" value="(1|2|3|4)" class="mx-auto">(.|\n)*?<\/div>/g;
        let helperIndex = 0;
        let helperIndex2 = 0;
        let helperIndex02 = 0;
        let helperIndex002 = 0;
        let helperArr = [];
        let match2;
        while ((match2 = regex2.exec(htmlString)) !== null) {
            let myMatch = match2[0];
            // replace everything between < > which is a div with nothing
            myMatch = myMatch.replace(/<div contenteditable=\"true\" translate=\"no\" class=\"ProseMirror\" tabindex=\"0\">/, "").replace(/<div name=\"(editorsFour|editorsThree|editorsTwo|editorOne)\" value=\"(1|2|3|4)\" class=\"mx-auto\">/, "").replace(/<\/div>/g, "");
            if (editorHelperArray[helperIndex] === "editorsFour") {
                console.log("ahojkyyy")
                helperIndex002 += 1;
                helperArr.push(myMatch);
                if (helperIndex002 === 4) {
                    // @ts-ignore
                    editorContentArray.push(helperArr.toString());
                    helperIndex002 = 0;
                    helperArr = [];
                    console.log("helperArr")
                }
            }else if (editorHelperArray[helperIndex] === "editorsThree") {
                console.log("ahojkyyy")
                helperIndex2 += 1;
                helperArr.push(myMatch);
                if (helperIndex2 === 3) {
                    // @ts-ignore
                    editorContentArray.push(helperArr.toString());
                    helperIndex2 = 0;
                    helperArr = [];
                    console.log("helperArr")
                }
            } else if (editorHelperArray[helperIndex] === "editorsTwo") {
                console.log("ahojkyyy")
                helperIndex02 += 1;
                helperArr.push(myMatch);
                if (helperIndex02 === 2) {
                    // @ts-ignore
                    editorContentArray.push(helperArr.toString());
                    helperIndex02 = 0;
                    helperArr = [];
                    console.log("helperArr")
                }
            }
            else {
                editorContentArray.push(
                    myMatch
                )

            }

            helperIndex += 1

        }

        console.log(editorContentArray); // Output: ["<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorsThree">content</div>"]
        console.log(editorInputValuesArray)
        localStorage.setItem(`/notes/zápisy/${id}-text`, JSON.stringify(editorContentArray));

        getNotes().then((data) => {
            // @ts-ignore
            console.log(data[0]["notes"])
            console.log("myNotes :::::")
            // @ts-ignore
            let myData = data[0]["notes"]
            // @ts-ignore
            myData.forEach((item, index) => {
                if (item.id === id) {
                    myData[index]["editorArray"] = editorArray;
                    myData[index]["editorTextArray"] = editorContentArray;
                    myData[index]["editorInputValueArray"] = editorInputValuesArray;

                }
            })

            setDoc(doc(db, "notes", "notes"), {
                notes: myData
            })
            console.log("set")

        })

    }

    const handleLoad = () => {
        // clear the state
        // @ts-ignore
        document.getElementById(id).innerHTML = ""


        // console.log("from local storage")
        // console.log(localStorage.getItem(`/notes/zápisy/${id}-text`))
        // // @ts-ignore
        // let loadedContent = Array.from(JSON.parse(localStorage.getItem(`/notes/zápisy/${id}-editors`)));

        let newComponents: JSX.Element[] = [];

        // @ts-ignore
        // loadedContent.forEach((item, index) => {
        //     if (item === 'editorOne') {
        //         newComponents.push(<MyComponent key={newComponents.length} content={
        //             // @ts-ignore
        //             JSON.parse(localStorage.getItem(`/notes/zápisy/${id}-text`))[index]
        //         } />);
        //     } else if (item === 'editorsThree') {
        //         newComponents.push(<MyThreeComponents key={newComponents.length} content={
        //             // @ts-ignore
        //             Array.from(JSON.parse(localStorage.getItem(`/notes/zápisy/${id}-text`))[index])
        //         } />);
        //     }
        // });


        getNotes().then((data) => {
            // @ts-ignore
            let myData = data[0]["notes"]

            console.log("myData")
            console.log(myData)
            myData.forEach((item: { id: any; }, index: string | number) => {
                if (item.id === id) {
                    console.log("myData[index]")
                    console.log(myData[index])

                    let loadedEditors = myData[index]["editorArray"];
                    let loadedText = myData[index]["editorTextArray"];
                    let loadedInputValues = myData[index]["editorInputValueArray"];

                    console.log("loadedEditors")
                    console.log(loadedEditors)
                    console.log("loadedText")
                    console.log(loadedText)
                    console.log("loadedInputValues")
                    console.log(loadedInputValues)

                    loadedEditors.forEach((item: string, index: number) => {
                        console.log(loadedInputValues[index])
                        console.log(item)
                        if (item === "editorOne") {
                            // @ts-ignore
                            newComponents.push(<MyComponent key={newComponents.length} content={loadedText[index]} number={loadedInputValues[index]} />);
                        } else {
                            // @ts-ignore
                            newComponents.push(<MyComponent key={newComponents.length} content={loadedText[index].split(",")} number={loadedInputValues[index]} />);
                        }


                    })

                    // @ts-ignore
                    setMyComponents([...myComponents, ...newComponents]);

                }
            })
        })


        // Set the state with the new components
        // @ts-ignore
    }

    const handleClear = () => {
        // @ts-ignore
        document.getElementById(id).innerHTML = ""
    }

    useEffect(() => {
        handleLoad()
        try {
            // @ts-ignore
            document.getElementById("myNumber").value = 1;
        } catch (e) {
            console.log("not admin")
        }
        getNotes().then((data) => {
                // @ts-ignore
                let myData = data[2]["all"]
                myData.forEach(
                    (item: any) => {
                        if (item.zápisy.includes(id.toString())) {
                            // @ts-ignore
                            console.log("aahoooooooooooooj")
                            return (
                                // @ts-ignore
                                setTest([item.id, item.theme])
                            )
                        }
                    }
                )

            }
        )
    }, []);
    if (localStorage.getItem("isAuth") === "true") {
        // @ts-ignore
        return (

            <div>
                <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

                <div className={"blobNotes"}>

                </div>




                <div className={"font-lg flex flex-col"}>
                    <div className={"flex flex-row justify-center items-end my-4 mb-6"}>
                        <h1 className={"text-6xl"}>{name}</h1>
                    </div>


                    <div className={"flex flex-row justify-center mb-16"}>
                        <div className={"w-[110px] h-[40px] text-[16px] bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                                Zápis
                        </div>
                        <div className={"w-[110px] h-[40px] text-[16px] bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                                {subject}
                        </div>
                        <div className={"w-[110px] h-[40px] text-[16px] bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_5px_0_rgba(0,0,0,0.5)]"}>
                                {date.split(",")[0]}.{date.split(",")[1]}. {date.split(",")[2]}
                        </div>
                    </div>



                    <div className={"absolute w-[200px] h-[100px] font-bold text-black top-[330px] right-0 z-20 cursor-pointer select-none"} onClick={handle.enter}>
                        Full Screen
                    </div>
                    {
                        /*
                        IMPORTANT PART OF THE CODE
                        DO NOT DELETE

                        ----------------------
                        Notes &copy; 2023
                        Made by Filipes
                        ----------------------


                         */
                    }
                    <FullScreen handle={handle}>
                        <div id={id} className={`TEXTFIELD mx-auto p-6 pb-16 rounded-2xl w-[96%] min-h-[300px] bg-[#ddd] mb-24 ${
                            getAuth().currentUser?.email !== "jarolimfilip07@gmail.com" ? "select-none" : ""
                        } `} >

                            {myComponents.map(component => component)}

                        </div>
                    </FullScreen>

                    {getAuth().currentUser?.email === "jarolimfilip07@gmail.com" ?         <div className={"flex flex-row justify-center my-5"}>
                            <button  onClick={handleAddMyComponent} className={"w-30 h-10 px-4 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-200 ease-in-out mx-1"}>Add
                            </button>
                            <input type="number" id="myNumber" name="myNumber" min="1" max="4" className={"w-12 select-none pl-2 outline-none text-black font-bold border-2 border-black rounded-xl text-xl"} >

                            </input>

                            <button onClick={handleSave} className={"w-20 h-10 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-200 ease-in-out mx-1"}>Save</button>
                            <button onClick={handleLoad} className={"w-20 h-10 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-200 ease-in-out mx-1"}>Load</button>
                            <button onClick={handleClear} className={"w-20 h-10 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-200 ease-in-out mx-1"}>Clear</button>
                        </div>
                        : ""}


                </div>

                <div className={"flex flex-row justify-center mb-16"}>
                    <div className={"flex flex-col w-[420px] min-h-[200px] border-2 border-black rounded-[15px] p-4 m-4 pb-16 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                        <h2>
                            Zápisy
                        </h2>
                        <p>
                            Zápisy související s tímto tématem
                        </p>
                        <div className={"flex flex-row justify-center"}>
                        {/*    <input type="text" className={"w-full h-[40px] border-2 border-black rounded-[15px] p-2 my-2 shadow-[0_7px_0_rgba(0,0,0,0.5)] outline-none font-bold"} placeholder={"Přidejte zápis"} onInput={filterZápis}/>*/}

                        </div>
                        <div>
                            {/*<div className={"grid grid-cols-2 gap-4 text-black"}>*/}
                            {/*    {zápisyFilter.length !== 0 ? zápisyFilter.map((item: any) => { return <div className={"flex flex-col justify-center items-center border-2 border-black rounded-[15px] font-semibold p-1 cursor-pointer m-2"} onClick={chosenNote} id={"ZápisFilter-"+item.id}>{item.name}</div> }) : ""}*/}
                            {/*</div>*/}
                        </div>
                        <div className={"grid grid-cols-2 gap-y-12 mx-auto mt-8"}>
                            d
                        </div>
                    </div>
                    <div className={"flex flex-col w-[420px] min-h-[200px] border-2 border-black rounded-[15px] p-4 m-4 pb-16 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                        <h2>
                            Test
                        </h2>
                        <p>
                            Test, který se týká tohoto tématu
                        </p>
                        <div className={"flex flex-row justify-center mt-6"}>
                            {/*<input type="text" className={"w-full h-[40px] border-2 border-black rounded-[15px] p-2 my-2 shadow-[0_7px_0_rgba(0,0,0,0.5)] outline-none font-bold"} placeholder={"Přidejte test"} onInput={filterTest}/>*/}

                            {
                                test.length !== 0 ?
                                    <Link to={"/notes/testy/"+test[0]} className={"w-[80%] text-center border-2 border-black rounded-xl shadow-[0_7px_0_rgba(0,0,0,0.5)] p-2 font-bold"}>
                                        <h3>
                                            {test[1]}
                                        </h3>
                                    </Link>
                                    : <div className={"text-sm font-bold flex flex-row items-center justify-center mt-10"}>
                                        K tomuto tématu zatím není přiřazen žádný test.
                                    </div>
                            }
                        </div>




                    </div>
                    <div className={"flex flex-col w-[420px] min-h-[200px] border-2 border-black rounded-[15px] p-4 m-4 pb-16 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                        <h2>
                            Procvičování
                        </h2>
                        <p>
                            Procvičte si své znalosti z tohoto zápisu
                        </p>
                    </div>


            </div>
            <div className={"text-center font-semibold text-sm mb-4 text-gray-600"}>
                Made by Filipes | 2023 Notes &copy;
            </div>
        </div>

        );


    } else {
        localStorage.setItem("lastPage", "/notes/zápisy/"+id)
        location.href = "/login"
        return <div></div>
    }
}

export default Zápis;
