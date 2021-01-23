import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import MarkdownPath from "./Multiplex.md"

const Multiplex = () => {
    var[text, setText] = useState(null)
    useEffect(() => {
        fetch(MarkdownPath).then((response) => response.text()).then((text) => {
            setText(text); 
          })
      }, []);

    return(
        <div className="App">
            <div style={{margin: 20, textAlign: "left"}}>
                <ReactMarkdown source={text} />
            </div>
        </div>
    )
}

export default Multiplex; 