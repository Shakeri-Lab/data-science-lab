import React from 'react';
import ReactMd from 'react-md-file';

const Blog = () => {
    return(
        <div className="App">
            <div style={{margin: 20}}>
                <ReactMd fileName="./Blog.md" />
            </div>
        </div>
    )
}

export default Blog; 