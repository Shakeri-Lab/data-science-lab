import React from 'react';
import ReactMd from 'react-md-file';
import "./Contact.css"; 

const Contact = () => {
    return(
        <div className="App">
            <div style={{margin: 20}}>
                <ReactMd fileName="./Contact.md" />
            </div>
        </div>
    )
}

export default Contact; 