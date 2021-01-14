import React, { useState } from 'react';
import ReactMd from 'react-md-file';

const HemanShakeri = () => {
    return(
        <div className="App">
            <div className="content-container">
                <ReactMd fileName="./HemanShakeri.md" />
            </div>
        </div>
    )
}

export default HemanShakeri; 