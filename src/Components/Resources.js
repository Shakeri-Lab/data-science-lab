import React from 'react';
import ReactMd from 'react-md-file';

const Resources = () => {
    return(
        <div className="App" style={{marginTop: 80}}>
            <div style={{margin: 20}}>
                <ReactMd fileName="./Resources.md" />
            </div>
        </div>
    )
}

export default Resources; 