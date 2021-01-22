import React, { useState } from 'react';
import ReactMd from 'react-md-file';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

const Personnel = () => {
    return(
        <div className="App">
            {!isMobile && <BrowserView>
            <div style={{display: "flex", flexDirection: "row", margin: 20}}>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20, width: 250, cursor: "pointer"}}
                onClick={() => {
                    window.location.href = "HemanShakeri"
                }}
                >
                    <img style={{borderRadius: 10, height: 250}} src="https://api.dsi.virginia.edu/sites/default/files/styles/square_sm/public/headshots/people/2020-01/Heman_001.png?w=1500" />
                    <div style={{padding: 5}}>
                        <strong>Heman Shakeri</strong>
                        <p>Assistant Professor, School of Data Science | University of Virginia</p>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20, width: 250, cursor: "pointer"}}
                 onMouseClick={() => {
                    
                }}
                >
                    <img style={{borderRadius: 10, height: 250}} src="https://virginiaequitycenter.org/sites/virginiaequitycenter.org/files/styles/people_crop__200x200_/public/Noah%20Beamon.png?itok=NoEZz7aZ" />
                    <div style={{padding: 5}}>
                        <strong>Noah Beamon</strong>
                        <p>Undergraduate Research Assistant | University of Virginia</p>
                    </div>
                </div>
            </div>
            </BrowserView>}
            {isMobile && 
            <MobileView>
                {/* <div style={{display: "flex", flexDirection: "column", margin: 20}}>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20, width: 250, cursor: "pointer"}}
                onClick={() => {
                    window.location.href = "HemanShakeri"
                }}
                >
                    <img style={{borderRadius: 10, height: 250}} src="https://api.dsi.virginia.edu/sites/default/files/styles/square_sm/public/headshots/people/2020-01/Heman_001.png?w=1500" />
                    <div style={{padding: 5}}>
                        <strong>Heman Shakeri</strong>
                        <p>Assistant Professor, School of Data Science | University of Virginia</p>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20, width: 250, cursor: "pointer"}}
                 onMouseClick={() => {
                    
                }}
                >
                    <img style={{borderRadius: 10, height: 250}} src="https://virginiaequitycenter.org/sites/virginiaequitycenter.org/files/styles/people_crop__200x200_/public/Noah%20Beamon.png?itok=NoEZz7aZ" />
                    <div style={{padding: 5}}>
                        <strong>Noah Beamon</strong>
                        <p>Undergraduate Research Assistant | University of Virginia</p>
                    </div>
                </div>
            </div> */}
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <div style={{borderRadius: 10, margin: 20}}
                onClick={() => {
                    window.location.href = "HemanShakeri"
                }}
                >
                    <img style={{borderRadius: 10, height: 250}} src="https://api.dsi.virginia.edu/sites/default/files/styles/square_sm/public/headshots/people/2020-01/Heman_001.png?w=1500"/>
                    <div style={{padding: 5}}>
                        <strong>Heman Shakeri</strong>
                        <p>Assistant Professor, School of Data Science | University of Virginia</p>
                    </div>
                </div>
                <div style={{borderRadius: 10, margin: 20}}
                onClick={() => {
                    
                }}
                >
                    <img style={{borderRadius: 10, height: 250}} src="https://virginiaequitycenter.org/sites/virginiaequitycenter.org/files/styles/people_crop__200x200_/public/Noah%20Beamon.png?itok=NoEZz7aZ"/>
                    <div style={{padding: 5}}>
                        <strong>Noah Beamon</strong>
                        <p>Undergraduate Research Assistant | University of Virginia</p>
                    </div>
                </div>
            </div>
            </MobileView>}
        </div>
    )
}

export default Personnel; 