import React, { useState } from 'react';
import { MdSubtitles } from "react-icons/md";
import { IoIosJournal, IoIosCalendar, IoMdSearch } from "react-icons/io";
import PublicationsJSON from "./Publications.json"; 

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

const Publications = () => {
    const[inputTitle, setInputTitle] = useState("");
    const[inputJournal, setInputJournal] = useState("");
    const[inputYear, setInputYear] = useState("");
    const[inputDescription, setInputDescription] = useState("");

    const[buttonColor, setButtonColor] = useState("rgba(46, 61, 130, 1)");

    const[filterOpen, setFilterOpen] = useState(false); 

    return(
        <div className="App">
            <h1 style={{margin: 20}}><strong>Publications</strong></h1>
            <p style={{margin: 20}}>Click an item in the list to open the project content or  
            <strong
            style={{color: "#0693e3", cursor: "pointer"}}
            onClick={() => {
                setFilterOpen(true); 
            }}
            > filter publications.</strong></p>
            {filterOpen && <strong style={{color: "#0693e3", cursor: "pointer"}} 
                onClick={() => {
                    setFilterOpen(false); 
                }}
            >X Close Filter</strong>}
            {!isMobile && <BrowserView>
            {!filterOpen && <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20}}>
                    {/* <strong style={{fontSize: 25, marginBottom: 10}}>Projects</strong> */}
                        <div>
                            {PublicationsJSON.filter((val)=>{
                                return val; 
                            }).map((val, key)=>{
                                return (
                                <div style={{borderRadius: 10, cursor: "pointer", backgroundColor: "white", margin: 20, padding: 20}}
                                onClick = {() => {
                                    window.location.href=val.url;  
                                }}
                                >
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                        <div style={{width: 1000}}>
                                            <strong>{val.title}</strong>
                                            <p><i>{val.journal}</i>, {val.year}</p>
                                            <p>{val.description}</p>
                                        </div>
                                        <div style={{justifyContent: "center", width: 500}}>
                                            <img style={{width: 250, height: 150, borderRadius: 5}} src={val.imageUrl}/>
                                        </div>    
                                    </div>
                                </div>)
                            })}
                        </div>
                </div>

            }
            {filterOpen && <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, padding: 20, margin: 20, height: "100vh", width: "60vw"}}>
                    <strong style={{fontSize: 25, marginBottom: 10}}>Publications</strong>
                        <div style={{overflowY: "scroll", height: "90vh"}}>
                            {PublicationsJSON.filter((val)=>{
                                if (inputTitle == "" && inputJournal == "" && inputYear =="" && inputDescription == "") {
                                    return val; 
                                }else if (val.title.toLowerCase().includes(inputTitle.toLowerCase()) && val.year.toLowerCase().includes(inputYear.toLowerCase()) && val.journal.toLowerCase().includes(inputJournal.toLowerCase()) && val.description.toLowerCase().includes(inputDescription.toLowerCase())) {
                                    return val; 
                                }
                            }).map((val, key)=>{
                                return (
                                <div style={{borderRadius: 10, cursor: "pointer", backgroundColor: "white", margin: 20, padding: 20}}
                                onClick = {() => {
                                    window.location.href=val.url;  
                                }}
                                >
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                        <div style={{width: 1000}}>
                                            <strong>{val.title}</strong>
                                            <p><i>{val.journal}</i>, {val.year}</p>
                                            <p>{val.description}</p>
                                        </div>
                                        <div style={{justifyContent: "center", width: "40vw"}}>
                                            <img style={{width: 250, height: 150, borderRadius: 5, marginLeft: 20}} src={val.imageUrl}/>
                                        </div>    
                                    </div>
                                </div>)
                            })}
                        </div>
                </div>

                <div style={{height: "100vh", width: 400, borderRadius: 10, backgroundColor: "whitesmoke", padding: 20, margin: 20, display: "flex", flexDirection: "column"}}>
                    <strong style={{fontSize: 25}}>Filter Publications</strong>
                    <div style={{margin: 20}}>
                        <p>Title</p>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><MdSubtitles/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="title" value={inputTitle}
                            onChange={event => setInputTitle(event.target.value)}
                            />
                        </div>
                    </div>
                   <div style={{margin: 20}}>
                       <p>Keywords</p>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><IoMdSearch/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="description" value={inputDescription}
                            onChange={event => setInputDescription(event.target.value)}
                            />
                        </div>
                   </div>
                   <div style={{margin: 20}}>
                       <p>Journal</p>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><IoIosJournal/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="journal" value={inputJournal}
                            onChange={event => setInputJournal(event.target.value)}
                            />
                        </div>
                   </div>
                   <div style={{margin: 20}}>
                       <p>Year</p>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><IoIosJournal/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="YYYY" value={inputYear}
                            onChange={event => setInputYear(event.target.value)}
                            />
                        </div>
                   </div>
                   <div className="button" style={{backgroundColor: buttonColor, cursor: "pointer", borderRadius: 5, margin: 20}}
                            onMouseOver={() =>{
                                setButtonColor("rgba(46, 61, 130, 0.8)");
                            }}
                            onMouseLeave={() =>{
                                setButtonColor("rgba(46, 61, 130, 1)");
                            }}
                            onClick={() =>{
                                setInputTitle("");
                                setInputJournal("");
                                setInputDescription("");
                                setInputYear("");
                                setButtonColor("rgba(46, 61, 130, 1)");
                            }}
                            >
                                <strong style={{color: "white"}}>Clear</strong>
                    </div>
                </div>
            </div>}</BrowserView>}
            {isMobile && <MobileView>
            {!filterOpen && <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20}}>
                    {/* <strong style={{fontSize: 25, marginBottom: 10}}>Projects</strong> */}
                        <div>
                            {PublicationsJSON.filter((val)=>{
                                return val; 
                            }).map((val, key)=>{
                                return (
                                <div style={{borderRadius: 10, cursor: "pointer", backgroundColor: "white", margin: 20, padding: 20}}
                                onClick = {() => {
                                    window.location.href=val.url;  
                                }}
                                >
                                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                        <img style={{width: 250, height: 150, borderRadius: 5, margin: 10, justifyContent: "center", alignItems: "center"}} src={val.imageUrl}/>
                                        <strong>{val.title}</strong>
                                        <p><i>{val.journal}</i>, {val.year}</p>
                                        <p>{val.description}</p>
                                    </div>
                                </div>)
                            })}
                        </div>
                </div>

            }
            {filterOpen && <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{width: "90vw", borderRadius: 10, backgroundColor: "whitesmoke", padding: 20, margin: 20, display: "flex", flexDirection: "column"}}>
                    <strong style={{fontSize: 25}}>Filter Publications</strong>
                    <div style={{margin: 20}}>
                        <p>Title</p>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><MdSubtitles/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="title" value={inputTitle}
                            onChange={event => setInputTitle(event.target.value)}
                            />
                        </div>
                    </div>
                   <div style={{margin: 20}}>
                       <p>Keywords</p>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><IoMdSearch/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="description" value={inputDescription}
                            onChange={event => setInputDescription(event.target.value)}
                            />
                        </div>
                   </div>
                   <div style={{margin: 20}}>
                       <p>Journal</p>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><IoIosJournal/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="journal" value={inputJournal}
                            onChange={event => setInputJournal(event.target.value)}
                            />
                        </div>
                   </div>
                   <div style={{margin: 20}}>
                       <p>Year</p>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><IoIosJournal/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="YYYY" value={inputYear}
                            onChange={event => setInputYear(event.target.value)}
                            />
                        </div>
                   </div>
                   <div className="button" style={{backgroundColor: buttonColor, cursor: "pointer", borderRadius: 5, margin: 20}}
                            onMouseOver={() =>{
                                setButtonColor("rgba(46, 61, 130, 0.8)");
                            }}
                            onMouseLeave={() =>{
                                setButtonColor("rgba(46, 61, 130, 1)");
                            }}
                            onClick={() =>{
                                setInputTitle("");
                                setInputJournal("");
                                setInputDescription("");
                                setInputYear("");
                                setButtonColor("rgba(46, 61, 130, 1)");
                            }}
                            >
                                <strong style={{color: "white"}}>Clear</strong>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, padding: 20, margin: 20, height: "50vh", width: "90vw"}}>
                    <strong style={{fontSize: 25, marginBottom: 10}}>Publications</strong>
                        <div style={{overflowY: "scroll", height: "80vh"}}>
                            {PublicationsJSON.filter((val)=>{
                                if (inputTitle == "" && inputJournal == "" && inputYear == "" && inputDescription == "") {
                                    return val; 
                                }else if (val.title.toLowerCase().includes(inputTitle.toLowerCase()) && val.journal.toLowerCase().includes(inputJournal.toLowerCase()) && val.year.toLowerCase().includes(inputYear.toLowerCase()) && val.description.toLowerCase().includes(inputDescription.toLowerCase())) {
                                    return val; 
                                }
                            }).map((val, key)=>{
                                return (
                                <div style={{borderRadius: 10, cursor: "pointer", backgroundColor: "white", margin: 20, padding: 20}}
                                onClick = {() => {
                                    window.location.href=val.url;  
                                }}
                                >
                                       <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                        <img style={{width: 250, height: 150, borderRadius: 5, margin: 10, justifyContent: "center", alignItems: "center"}} src={val.imageUrl}/>
                                        <strong>{val.title}</strong>
                                        <p><i>{val.journal}</i>, {val.year}</p>
                                        <p>{val.description}</p>
                                    </div>
                                </div>)
                            })}
                        </div>
                </div>

              
            </div>}</MobileView>}
        </div>
    )
}

export default Publications; 