import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// @ts-ignore
function MyComponent({content}) {

    return (
        <div>
            <EditorContent
                name={"editorOne"}
                editor={useEditor({content: content, extensions: [StarterKit],})}
                className={"mx-auto"}
            />
        </div>
    );
}


export default MyComponent
