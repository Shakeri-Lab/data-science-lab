import React from 'react'
import './App.css';
//import * as ReactBootstrap from "react-bootstrap"; 
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import Projects from "./Components/Projects";
import Publications from "./Components/Publications";
import Personnel from "./Components/Personnel";
import Teachingandlectures from "./Components/Teachingandlectures";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"; 

//projects
import Allofus from "./Components/Projects/Allofus"; 
import Wastewater from "./Components/Projects/Wastewater"; 
import Wastewatertracker from "./Components/Projects/Wastewatertracker"; 

//publications
import Multiplex from "./Components/Publications/Multiplex";

//teaching
import MaterialA from "./Components/Teaching/MaterialA"

//personnel
import HemanShakeri from "./Components/Personnel/HemanShakeri"; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

function App() {
  return (
    // <div className="page-container">
    <div style={{overflow: "hidden"}} className="page-container">
      <div className="content-wrap">
      <Router>
      <Navbar />
        <Switch>
          {/*Projects*/}
          <Route path="/Wastewater" component={Wastewater}>
            <Wastewater />
          </Route>
          <Route path="/Wastewatertracker" component={Wastewatertracker}>
            <Wastewatertracker />
          </Route>
          <Route path="/Allofus" component={Allofus}>
            <Allofus />
          </Route>
          {/*Publications*/}
          <Route path="/Multiplex" component={Multiplex}>
            <Multiplex />
          </Route>
          {/*Teaching/Lectures*/}
          <Route path="/MaterialA" component={MaterialA}>
            <MaterialA />
          </Route>
          {/*Personnel*/}
          <Route path="/HemanShakeri" component={HemanShakeri}>
            <HemanShakeri />
          </Route>
          {/*Tabs*/}
          <Route path="/Contact" component={Contact}>
            <Contact />
          </Route>
          <Route path="/Blog" component={Blog}>
            <Blog />
          </Route>
          <Route path="/Teachingandlectures" component={Teachingandlectures}>
            <Teachingandlectures />
          </Route>
          <Route path="/Publications" component={Publications}>
            <Publications />
          </Route>
          <Route path="/Projects" component={Projects}>
            <Projects />
          </Route>
          <Route path="/People" component={Personnel}>
            <Personnel />
          </Route>
          <Route path="/" component={Home}>
            <Home />
          </Route>
        </Switch>
    </Router>
    </div>
    <Footer />
     </div>
  );
}

export default App;