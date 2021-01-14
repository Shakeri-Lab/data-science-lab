import React, { useState } from 'react';
import "./Projects.css"; 
import { MdSubtitles } from "react-icons/md";
import { IoIosCalendar, IoMdSearch } from "react-icons/io";
import { BiHash } from "react-icons/bi";
import ProjectsJSON from "./Projects.json"; 

const Projects = () => {
    const[inputTitle, setInputTitle] = useState("");
    const[inputDescription, setInputDescription] = useState("");
    const[inputTags, setInputTags] = useState("");

    const[buttonColor, setButtonColor] = useState("rgba(46, 61, 130, 1)");

    const[filterOpen, setFilterOpen] = useState(false); 

    return(
        <div className="App">
            <h1 style={{margin: 20}}><strong>Projects</strong></h1>
            <p style={{margin: 20}}>Click an item in the list to open the project content or  
            <strong
            style={{color: "#0693e3", cursor: "pointer"}}
            onClick={() => {
                setFilterOpen(true); 
            }}
            > filter projects.</strong></p>
            {filterOpen && <strong style={{color: "#0693e3", cursor: "pointer"}} 
                onClick={() => {
                    setFilterOpen(false); 
                }}
            >X Close Filter</strong>}
            {!filterOpen && <div className = "content-results-container-b">
                    {/* <strong style={{fontSize: 25, marginBottom: 10}}>Projects</strong> */}
                        <div>
                            {ProjectsJSON.filter((val)=>{
                                return val; 
                            }).map((val, key)=>{
                                return (
                                <div style={{borderRadius: "5px", cursor: "pointer"}} className = "list-element"
                                onClick = {() => {
                                    window.location.href=val.url;  
                                }}
                                >
                                        <strong>{val.title}</strong>
                                        <p>{val.description}</p>
                                        <p>tags: {val.tags}</p>
                                </div>)
                            })}
                        </div>
                </div>

            }
            {filterOpen && <div className = "content-search-container">
                <div className = "content-results-container">
                    <strong style={{fontSize: 25, marginBottom: 10}}>Projects</strong>
                        <div className="scroll-container">
                            {ProjectsJSON.filter((val)=>{
                                if (inputTitle == "" && inputTags == "" && inputDescription == "") {
                                    return val; 
                                }else if (val.title.toLowerCase().includes(inputTitle.toLowerCase()) && val.tags.toLowerCase().includes(inputTags.toLowerCase()) && val.description.toLowerCase().includes(inputDescription.toLowerCase())) {
                                    return val; 
                                }
                            }).map((val, key)=>{
                                return (
                                <div style={{borderRadius: "5px", cursor: "pointer"}} className = "list-element"
                                onClick = {() => {
                                    window.location.href=val.url;  
                                }}
                                >
                                        <strong>{val.title}</strong>
                                        <p>{val.description}</p>
                                        <p>tags: {val.tags}</p>
                                </div>)
                            })}
                        </div>
                </div>

                <div className = "content-filter-container">
                    <strong style={{fontSize: 25}}>Filter Projects</strong>
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
                       <p>Tags</p>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-user prefix"><BiHash/></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="tag" value={inputTags}
                            onChange={event => setInputTags(event.target.value)}
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
                                setInputTags("");
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

export default Projects; 