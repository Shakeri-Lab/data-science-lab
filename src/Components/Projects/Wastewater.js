import React, { useState } from 'react';
import ReactMd from 'react-md-file';

const Wastewater = () => {
    return(
        <div className="App">
            <div className="content-container">
                <ReactMd fileName="./Wastewater.md" />
            </div>
        </div>
    )
}

export default Wastewater; 