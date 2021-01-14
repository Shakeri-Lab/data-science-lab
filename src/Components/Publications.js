import React, { useState } from 'react';
import "./Publications.css"; 
import { MdSubtitles } from "react-icons/md";
import { IoIosJournal, IoIosCalendar, IoMdSearch } from "react-icons/io";
import PublicationsJSON from "./Publications.json"; 

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
            <p style={{margin: 20}}>Click an item in the list to open the publication content or
            <strong
            style={{color: "#0693e3", cursor: "pointer"}}
            onClick={() => {
                setFilterOpen(true); 
            }}
            > filter publications.</strong>
            </p>
            {filterOpen && <strong style={{color: "#0693e3", cursor: "pointer"}} 
                onClick={() => {
                    setFilterOpen(false); 
                }}
            >X Close Filter</strong>}
            {!filterOpen && <div className = "content-results-container-b">
                    {/* <strong style={{fontSize: 25, marginBottom: 10}}>Publications</strong> */}
                    <div>
                        {PublicationsJSON.filter((val)=>{
                            return val; 
                        }).map((val, key)=>{
                            return (
                            <div style={{borderRadius: "5px", cursor: "pointer"}} className = "list-element"
                            onClick = {() => {
                                window.location.href=val.url;  
                            }}
                            >
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                        <div style={{width: 1000}}>
                                            <strong>{val.title}</strong>
                                            <p style={{fontStyle: "italic"}}>Published in {val.journal}, {val.year}</p>
                                            <p>{val.description}</p>
                                        </div>
                                        <div style={{justifyContent: "center", width: 500}}>
                                            <img style={{width: 250, height: 150, borderRadius: 5, marginLeft: 20}} src={val.imageUrl}/>
                                        </div>    
                                    </div>
                            </div>)
                        })}
                    </div>
                </div>}
            {filterOpen && <div className = "content-search-container">
                <div className = "content-results-container">
                    <strong style={{fontSize: 25, marginBottom: 10}}>Publications</strong>
                        <div className="scroll-container">
                            {PublicationsJSON.filter((val)=>{
                                if (inputTitle == "" && inputJournal == "" && inputYear == "" && inputDescription == "") {
                                    return val; 
                                }else if (val.title.toLowerCase().includes(inputTitle.toLowerCase()) && val.journal.toLowerCase().includes(inputJournal.toLowerCase()) && val.year.toLowerCase().includes(inputYear.toLowerCase()) && val.description.toLowerCase().includes(inputDescription.toLowerCase())) {
                                    return val; 
                                }
                            }).map((val, key)=>{
                                return (
                                <div style={{borderRadius: "5px", cursor: "pointer"}} className = "list-element"
                                onClick = {() => {
                                    window.location.href=val.url;  
                                }}
                                >
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                        <div style={{width: 1000}}>
                                            <strong>{val.title}</strong>
                                            <p style={{fontStyle: "italic"}}>Published in {val.journal}, {val.year}</p>
                                            <p>{val.description}</p>
                                        </div>
                                        <div style={{justifyContent: "center", width: 500}}>
                                            <img style={{width: 250, height: 150, borderRadius: 5, marginLeft: 20}} src={val.imageUrl}/>
                                        </div>    
                                    </div>
                                </div>)
                            })}
                        </div>
                </div>

                <div className = "content-filter-container">
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
                                <i className="fa fa-user prefix"><IoIosCalendar/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="YYYY" value={inputYear}
                            onChange={event => setInputYear(event.target.value)}
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
                                setInputYear("");
                                setInputDescription("");
                                setButtonColor("rgba(46, 61, 130, 1)");
                            }}
                            >
                                <strong style={{color: "white"}}>Clear</strong>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Publications; 