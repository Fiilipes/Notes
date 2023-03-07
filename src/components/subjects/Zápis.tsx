import React, {useEffect, useState} from 'react';
import MyThreeComponents from "./MyThreeComponents";
import MyComponent from "./MyComponent";
import { getFirestore, onSnapshot } from "firebase/firestore";
import {collection, getDocs, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
const postCollectionRef = collection(db, "ssbot");
const notesRef = collection(db, "notes");
const getNotes = async () => {
    const data = await getDocs(notesRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id} ))
}
// @ts-ignore
function Zápis({id, name, subject, date}) {
    console.log(id)
    const [myComponents, setMyComponents] = useState([]);


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

        const regex = /name="(editorOne|editorsThree)"/g;
        let match;
        let helper = 0;
        while ((match = regex.exec(htmlString)) !== null) {
            if (match[1] === "editorsThree" && helper === 0) {
                editorArray.push(match[1]);
                helper = 1;
            } else if (match[1] === "editorsThree" && helper === 1) {
                console.log("--")
            } else {
                editorArray.push(match[1]);
                helper = 0;
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

        while ((match3 = regex3.exec(htmlString)) !== null) {
            editorInputValuesArray.push(match3[1]);
        }







        let editorContentArray: string[] = [];

        const regex2 = /<div name="(editorOne|editorsThree)" value="(1|2|3|4)" class="mx-auto">(.|\n)*?<\/div>/g;
        let helperIndex = 0;
        let helperIndex2 = 0;
        let helperArr = [];
        let match2;
        while ((match2 = regex2.exec(htmlString)) !== null) {
            let myMatch = match2[0];
            // replace everything between < > which is a div with nothing
            myMatch = myMatch.replace(/<div contenteditable=\"true\" translate=\"no\" class=\"ProseMirror\" tabindex=\"0\">/, "").replace(/<div name=\"(editorsThree|editorOne)\" class=\"mx-auto\">/, "").replace(/<\/div>/g, "");

            if (editorHelperArray[helperIndex] === "editorsThree") {
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
            } else {
                editorContentArray.push(
                    myMatch
                )

            }

            helperIndex += 1

        }

        console.log(editorContentArray); // Output: ["<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorOne">content</div>", "<div class="ProseMirror" contenteditable="true" name="editorsThree">content</div>"]

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
                        if (item === 'editorOne') {
                            newComponents.push(<MyComponent key={newComponents.length} content={loadedText[index]} number={loadedInputValues[index]} />);
                        } else if (item === 'editorsThree') {
                            newComponents.push(<MyThreeComponents key={newComponents.length} content={Array.from(loadedText[index].split(","))} />);
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
        // @ts-ignore
        document.getElementById("myNumber").value = 1;
    }, []);
    if (localStorage.getItem("isAuth") === "true") {
        return (
            <div>
                <div className={"blob"}>

                </div>




                <div className={"font-lg flex flex-col"}>
                    <div className={"flex flex-row justify-center mb-4"}>
                        <h1>{name}</h1>
                    </div>
                    <div className={"flex flex-row justify-center"}>
                        <div className={"w-[150px] h-[60px] bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                            {subject}
                        </div>
                        <div className={"w-[150px] h-[60px] bg-white border-2 border-black rounded-[15px] font-bold text-lg flex justify-center items-center mx-2 shadow-[0_7px_0_rgba(0,0,0,0.5)]"}>
                            {date.split(",")[0]}.{date.split(",")[1]} {date.split(",")[2]}
                        </div>
                    </div>

                    <div className={"flex flex-row justify-center my-5"}>
                        <button  onClick={handleAddMyComponent} className={"w-30 h-10 px-4 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-100 ease-in-out mx-1"}>Add
                        </button>
                        <input type="number" id="myNumber" name="myNumber" min="1" max="4" className={"w-12 select-none pl-2 outline-none text-black font-bold border-2 border-black rounded-xl text-xl"} >

                        </input>

                        <button onClick={handleAddThreeMyComponents} className={"w-20 h-10 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-100 ease-in-out mx-1"}>Three</button>
                        <button onClick={handleSave} className={"w-20 h-10 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-100 ease-in-out mx-1"}>Save</button>
                        <button onClick={handleLoad} className={"w-20 h-10 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-100 ease-in-out mx-1"}>Load</button>
                        <button onClick={handleClear} className={"w-20 h-10 bg-white border-2 border-black hover:bg-black text-black hover:text-white font-bold text-xl rounded-[10px] transition duration-100 ease-in-out mx-1"}>Clear</button>
                    </div>

                    <div id={id} className={"mx-auto p-6 rounded-2xl w-[96%]"}>
                        {myComponents.map(component => component)}
                    </div>
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
