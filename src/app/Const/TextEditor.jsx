'use client'; // only in App Router

import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { assignValue, selectTextValue } from '@/src/lib/features/TextEditor/TextEditorSlice';
import { Box, TextField } from '@mui/material';
import prettier from 'prettier/standalone';
import parserHTML from 'prettier/parser-html';
// import { minify } from 'html-minifier'; // Uncomment if you want to use minify

export const TextEditor = (props) => {
    const {html} = props
    const dispatch = useDispatch();
    const editorData = useSelector(selectTextValue);
    // const [html, setHtml] = useState(true); // State to toggle between editor and text area

    // Function to format HTML using prettier
    // const formatHTML = (htmlString) => {
    //     // Uncomment the following line if using minify
    //     // const minified = minify(htmlString, { collapseWhitespace: true, removeComments: true });

    //     return prettier.format(htmlString, {
    //         parser: 'html',
    //         plugins: [parserHTML],
    //         printWidth: 80,
    //         tabWidth: 2,
    //     });
    // };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        dispatch(assignValue(data));
        
    };

    // const formattedHTML = formatHTML(); // Format the current editor data
    // useEffect(()=>{
    //     // if(html === true)
    //     formatHTML(editorData)
    // },[editorData, html])
    return html === true ? (<Box sx={{ display: "flex", width: "100%", border: "1px black solid" }}>
        <TextField
            value={editorData} // Display formatted HTML or raw editor data
            fullWidth
            multiline
            // rows={100} // Adjust the number of visible rows as necessary
             // Handle changes if in text area mode
            onChange={(e)=>{dispatch(assignValue(e.target.value))}}
        />
    </Box>) : (
        <>
            {/*             
            <button onClick={() => setHtml(!html)}>
                Toggle {html ? 'Editor' : 'Text Area'}
            </button> */}

            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
                config={{
                    toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link', '|',
                        'bulletedList', 'numberedList', '|',
                        'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', 'deleteTable', '|',
                        'tableResize',
                        'undo', 'redo'
                    ],
                    table: {
                        contentToolbar: [
                            'tableColumn', 'tableRow', 'mergeTableCells', 'deleteTable', 'tableResize'
                        ],
                    },
                }}
            />

        </>
    );
};

// export default TextEditor;
