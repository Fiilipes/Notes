import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// @ts-ignore
function MyComponent({content, number}) {


    if (number == 1) {
        return (
            <div className={"py-4"}>
                <EditorContent
                    name={"editorOne"}
                    value={number.toString()}
                    editor={useEditor({content: content, extensions: [StarterKit],})}
                    className={"mx-auto"}
                />
            </div>
        );
    } else if (number == 2) {
        return (
            <div className={"flex flex-row justify-evenly py-4"}>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[650px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsTwo"}
                        value={number.toString()}
                        editor={useEditor({content: content[0], extensions: [StarterKit],})}
                        className={"mx-auto"}
                    />
                </div>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[650px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsTwo"}
                        value={number.toString()}
                        editor={useEditor({content: content[1], extensions: [StarterKit],})}
                        className={"mx-auto"}
                    />
                </div>
            </div>
        );
    } else if (number == 3) {
        return (
            <div className={"flex flex-row justify-evenly py-4"}>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[400px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsThree"}
                        value={number.toString()}


                        editor={useEditor({content: content[0], extensions: [StarterKit],})}
                        className={"mx-auto"}
                    />
                </div>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[400px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsThree"}
                        value={number.toString()}

                        editor={useEditor({content: content[1], extensions: [StarterKit],})}
                        className={"mx-auto"}

                    />
                </div>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[400px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsThree"}
                        value={number.toString()}

                        editor={useEditor({content: content[2], extensions: [StarterKit],})}
                        className={"mx-auto"}

                    />
                </div>

            </div>
        )
    } else if (number == 4) {
        return (
            <div className={"flex flex-row justify-evenly py-4"}>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[250px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsFour"}
                        value={number.toString()}


                        editor={useEditor({content: content[0], extensions: [StarterKit],})}
                        className={"mx-auto"}
                    />
                </div>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[250px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsFour"}
                        value={number.toString()}

                        editor={useEditor({content: content[1], extensions: [StarterKit],})}
                        className={"mx-auto"}

                    />
                </div>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[250px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsFour"}
                        value={number.toString()}

                        editor={useEditor({content: content[2], extensions: [StarterKit],})}
                        className={"mx-auto"}

                    />
                </div>
                <div className={"bg-[#ccc] p-6 rounded-xl w-[250px] min-h-[80px] shadow-[0_10px_0_rgba(0,0,0,0.5)]"}>
                    <EditorContent
                        name={"editorsFour"}
                        value={number.toString()}

                        editor={useEditor({content: content[3], extensions: [StarterKit],})}
                        className={"mx-auto"}

                    />
                </div>

            </div>
        )
    }

}


export default MyComponent
