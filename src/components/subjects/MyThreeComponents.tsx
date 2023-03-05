import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'



// @ts-ignore
function MyThrrComponents({content}) {

    return (
        <div className={"flex flex-row justify-evenly"}>
            <div className={"bg-[#ddd] p-6 rounded-xl w-[400px] h-[300px]"}>
                <EditorContent
                    name={"editorsThree"}
                    editor={useEditor({content: content[0], extensions: [StarterKit],})}
                    className={"mx-auto"}
                />
            </div>
            <div className={"bg-[#ddd] p-6 rounded-xl w-[400px] h-[300px]"}>
                <EditorContent
                    name={"editorsThree"}
                    editor={useEditor({content: content[1], extensions: [StarterKit],})}
                    className={"mx-auto"}

                />
            </div>
            <div className={"bg-[#ddd] p-6 rounded-xl w-[400px] h-[300px]"}>
                <EditorContent
                    name={"editorsThree"}
                    editor={useEditor({content: content[2], extensions: [StarterKit],})}
                    className={"mx-auto"}

                />
            </div>

        </div>
    );
}


export default MyThrrComponents
