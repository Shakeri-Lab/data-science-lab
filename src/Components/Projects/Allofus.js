import React, { useState } from 'react';
import ReactMd from 'react-md-file';

const Allofus = () => {
    return(
        <div className="App">
            <div className="content-container">
                <ReactMd fileName="./Allofus.md" />
            </div>
        </div>
    )
}

export default Allofus; 