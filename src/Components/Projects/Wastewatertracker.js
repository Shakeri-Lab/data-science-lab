import React, { useState, useRef, useCallback, useEffect } from 'react';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapGL, {NavigationControl, Marker, Popup, Layer, Source} from "react-map-gl";
import { BsFillCircleFill, BsFillBarChartFill } from "react-icons/bs";
import { GiWaterRecycling } from "react-icons/gi";
import { BiLineChart } from "react-icons/bi";
import { RiInformationLine } from "react-icons/ri";
import axios from "axios";

//regions
import CharlottesvilleLimits from './Charlottesville.json';
import ChesapeakeLimits from './Chesapeake.json';
import NorfolkLimits from './Norfolk.json';
import PortsmouthLimits from './Portsmouth.json';
import SuffolkLimits from './Suffolk.json';
import VaBeachLimits from './VaBeach.json';
import HamptonLimits from './Hampton.json'; 
import NewportNewsLimits from './NewportNews.json'; 

// import Data2 from './Data2.json';
import './Wastewatertracker.css';
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Line, Label } from "recharts"; 
import { chartData1a, chartData2a, chartData3a, chartData4a } from "./ChartData.js"; 
import Switch from "react-switch";

var dateFormat = require("dateformat");

const Wastewatertracker = () => {
    //automated data collection from vdh
    let[list1b, setList1b] = useState([])
    let[list3b, setList3b] = useState([])
    let[list4b, setList4b] = useState([])

    useEffect(() => {
        axios
        .get(
          `https://data.virginia.gov/resource/bre9-aqqr.json?locality=Charlottesville`
        )
        .then(res => {
          const values = Object.values(res.data);
         // alert(JSON.stringify(values))
         setList1b(values);
        });
    }, [])

    useEffect(() => {
        axios
        .get(
          `https://data.virginia.gov/resource/bre9-aqqr.json?locality=Portsmouth`
        )
        .then(res => {
          const values = Object.values(res.data);
         // alert(JSON.stringify(values))
         setList3b(values);
        });
    }, [])

    useEffect(() => {
        axios
        .get(
          `https://data.virginia.gov/resource/bre9-aqqr.json?locality=Newport%20News`
        )
        .then(res => {
          const values = Object.values(res.data);
         // alert(JSON.stringify(values))
         setList4b(values);
        });
    }, [])

    const object = list1b
    const object3b = list3b
    const object4b = list4b

    var i;
    for (i = 0; i < object.length; i++){
      var x = object[i].report_date
      object[i].report_date = new Date(x)
    }

    object.sort((a, b) => a.report_date - b.report_date)
    var chartData1b = []
    var chartData2b = chartData1b

    var j;
    for (j = 1; j < object.length; j++){
      var x = object[j].total_cases - object[j-1].total_cases
      chartData1b.push({"date": dateFormat(object[j].report_date, "mmm dd, yyyy"), "cases reported": x, "predicted cases": 0})
    }

    var k;
    for (k = 0; k < object3b.length; k++){
      var x = object3b[k].report_date
      object3b[k].report_date = new Date(x)
    }

    object3b.sort((a, b) => a.report_date - b.report_date)
    var chartData3b = []

    var l;
    for (l = 1; l < object3b.length; l++){
      var x = object3b[l].total_cases - object3b[l-1].total_cases
      chartData3b.push({"date": dateFormat(object3b[l].report_date, "mmm dd, yyyy"), "cases reported": x, "predicted cases": 0})
    }

    var m;
    for (m = 0; m < object4b.length; m++){
      var x = object4b[m].report_date
      object4b[m].report_date = new Date(x)
    }

    object4b.sort((a, b) => a.report_date - b.report_date)
    var chartData4b = []

    var n;
    for (n = 1; n < object4b.length; n++){
      var x = object4b[n].total_cases - object4b[n-1].total_cases
      chartData4b.push({"date": dateFormat(object4b[n].report_date, "mmm dd, yyyy"), "cases reported": x, "predicted cases": 0})
    }

    window.onresize = function() {    
        // var widthWin = window.document.body.clientWidth;
        // var heightWin = window.document.body.clientHeight;
        var widthWin = window.innerWidth
        var heightWin = window.innerHeight
        setViewport({
            latitude: 38.031479,
            longitude: -78.481272,
            width: window.innerWidth-100,
            height: heightWin/2,  //window.innerHeight
            zoom: 12,
        })
        setViewport1({
            latitude: 36.841258,
            longitude: -76.383983,
            width:  window.innerWidth-100,
            height: heightWin/2,  //window.innerHeight
            zoom: 9,
        })
    }

    //cvill
    const [viewport, setViewport] = useState({
        latitude: 38.031479,
        longitude: -78.481272,
        width: window.innerWidth-100, //"auto"
        height: window.innerHeight/2,  //window.innerHeight
        zoom: 13,
        borderTopLeftRadius: 20,
    });

    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
     
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        []
      );

      //hampton roads
      const [viewport1, setViewport1] = useState({
        latitude: 36.841258,
        longitude: -76.383983,
        width: window.innerWidth-100,
        height: window.innerHeight/2, 
        zoom: 9,
    });

    const mapRef1 = useRef();
    const handleViewportChange1 = useCallback(
        (newViewport) => setViewport1(newViewport),
        []
    );

    const handleGeocoderViewportChange1 = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
     
          return handleViewportChange1({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        []
      );

    const [showPopup, setShowPopup] = useState(null);

    let activeTabColor = "#1197E8";
    let inactiveTabColor = "#b1b6b8";
    let activeBorderTabColor = "3px solid #1197E8";
    let inactiveBorderTabColor = "3px solid #b1b6b8";

    const[tabTextColor, setTabTextColor] = useState(activeTabColor);
    const[tabTextColor1, setTabTextColor1] = useState(inactiveTabColor);
    const[tabBorderColor, setTabBorderColor] = useState(activeBorderTabColor);
    const[tabBorderColor1, setTabBorderColor1] = useState(inactiveBorderTabColor);

    const[cvillActive, setCvillActive] = useState(true);
    const[hamptonActive, setHamptonActive] = useState(false); 

    let activeColor = 'rgba(52, 235, 183, 0.8)'; 
    let inactiveColor = 'rgba(52, 220, 235, 0.5)'; 
    let activeRegionColor = 'rgba(235, 255, 255, 0.2)';
    let inactiveRegionColor = 'rgba(255, 255, 255, 0.1)';

    const [locationColor, setLocationColor] = useState(inactiveColor);
    const [locationColor1, setLocationColor1] = useState(inactiveColor);
    const [locationColor2, setLocationColor2] = useState(inactiveColor);
    const [locationColor3, setLocationColor3] = useState(inactiveColor);

    const [regionLineColorCvill, setRegionLineColorCvill] = useState(inactiveRegionColor);

    const [regionLineColorChesapeake, setRegionLineColorChesapeake] = useState(inactiveRegionColor);
    const [regionLineColorHampton, setRegionLineColorHampton] = useState(inactiveRegionColor);
    const [regionLineColorSuffolk, setRegionLineColorSuffolk] = useState(inactiveRegionColor); 
    const [regionLineColorNewportNews, setRegionLineColorNewportNews] = useState(inactiveRegionColor);
    const [regionLineColorNorfolk, setRegionLineColorNorfolk] = useState(inactiveRegionColor);
    const [regionLineColorPortsmouth, setRegionLineColorPortsmouth] = useState(inactiveRegionColor);
    const [regionLineColorVaBeach, setRegionLineColorVaBeach] = useState(inactiveRegionColor); 

    const [showChart, setShowChart] = useState(null);

    const DataFormaterX = (date) => {
        return date.toString().split(",")[0];
    }

    const DataFormaterY = (number) => {
        if(number > 1000000000){
            return (number/1000000000).toString() + 'B';
        }else if(number > 1000000){
            return (number/1000000).toString() + 'M';
        }else if(number > 1000){
            return (number/1000).toString() + 'K';
        }else{
            return number.toString();
        }
    }

      const [checked, setChecked] = useState(true); 

    return(
        <div className="App">
            <div style={{margin: 20, display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <GiWaterRecycling style={{color: 'rgba(52, 220, 235, 1)', marginRight: 10, marginTop: 5}} size={35}/>
            <h2 style={{}}><strong>Virginia Wastewater Reports</strong></h2>
            </div>
            
            <strong style ={{color: "grey"}}>Click a location on the map to view its wastewater report and predicted cases.</strong>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: 20}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <div style={{ width: "50vw", borderBottom: tabBorderColor, cursor: "pointer", backgroundColor: "whitesmoke", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                onClick = {() => {
                    setTabTextColor(activeTabColor);
                    setTabBorderColor(activeBorderTabColor); 
                    setTabTextColor1(inactiveTabColor);
                    setTabBorderColor1(inactiveBorderTabColor); 
                    setCvillActive(true);
                    setHamptonActive(false);

                    setShowChart(null); 
                    setLocationColor(inactiveColor);
                    setLocationColor1(inactiveColor);
                    setLocationColor2(inactiveColor);
                    setLocationColor3(inactiveColor); 
                }}
                >
                    <strong style={{color: tabTextColor}}>Charlottesville Area</strong>
                </div>
                <div style={{ width: "50vw", borderBottom: tabBorderColor1, cursor: "pointer", backgroundColor: "whitesmoke", borderTopRightRadius: 10, borderBottomRightRadius: 10}}
                onClick = {() => {
                    setTabTextColor1(activeTabColor);
                    setTabBorderColor1(activeBorderTabColor); 
                    setTabTextColor(inactiveTabColor);
                    setTabBorderColor(inactiveBorderTabColor);
                    setHamptonActive(true);
                    setCvillActive(false); 

                    setShowChart(2);
                    setLocationColor(inactiveColor);
                    setLocationColor1(inactiveColor);
                    setLocationColor2(inactiveColor);
                    setLocationColor3(inactiveColor); 
                }}
                >
                    <strong style={{color: tabTextColor1}}>Hampton Roads Area</strong>
                </div>
                </div>
                <div style={{margin: 20}}>
                {cvillActive && <MapGL
                    className="map-view-container"
                    ref={mapRef}
                    {...viewport}
                    onViewportChange={handleViewportChange}
                    mapStyle = "mapbox://styles/noahb20/ckigtszgw173519qy1c0t05va"
                    mapboxApiAccessToken = "pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                >
                    <div style={{position: 'absolute', right: 10, top: 10}}>
                    <NavigationControl />
                    </div>
                    <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken="pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                    position="top-left"
                    />
                    <Marker latitude={38.0293} longitude={-78.4767} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() => {
                        setShowPopup(0);
                        setLocationColor(activeColor);
                        setLocationColor1(inactiveColor);
                        setShowChart(0);
                    }}
                    onMouseOver={() => {
                        setShowPopup(0);
                        setRegionLineColorCvill(activeRegionColor);
                    }}
                    onMouseLeave={() => {
                        setShowPopup(null); 
                        setRegionLineColorCvill(inactiveRegionColor);
                    }}
                    >
                        <GiWaterRecycling style={{color: locationColor}} size={30}/>
                    </div>
                </Marker>
                {showPopup === 0 && 
                    <Popup
                        latitude={38.0293}
                        longitude={-78.4767}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #1</div>
                    </Popup>}  
                <Marker latitude={38.03501} longitude={-78.50425} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() =>{
                         setShowPopup(1);
                         setLocationColor1(activeColor);
                         setLocationColor(inactiveColor);
                         setShowChart(1);
                         }}
                         onMouseOver={() => {
                            setShowPopup(1);
                            setRegionLineColorCvill(activeRegionColor);
                        }}
                        onMouseLeave={() => {
                            setShowPopup(null);
                            setRegionLineColorCvill(inactiveRegionColor);
                        }}
                         >
                             <GiWaterRecycling style={{color: locationColor1}} size={30}/>
                         </div>
                </Marker>
                {showPopup === 1 && 
                    <Popup
                        latitude={38.03501}
                        longitude={-78.50425}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #2</div>
                    </Popup>}

                  
                   <div>
                    <Source id='polylineLayer' type='geojson' data={CharlottesvilleLimits}>
                        <Layer
                        id='lineLayer' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>

                    <Source id='polygon' type='geojson' data={CharlottesvilleLimits}>
                        <Layer
                        id= 'aoi-solid-fill'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorCvill,
                         }}
                        />
                    </Source>
                    </div>
                </MapGL>}

                {hamptonActive && <div>
                    <MapGL
                    className="map-view-container"
                    ref={mapRef1}
                    {...viewport1}
                    onViewportChange={handleViewportChange1}
                    mapStyle = "mapbox://styles/noahb20/ckigtszgw173519qy1c0t05va"
                    mapboxApiAccessToken = "pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                >
                    <div style={{position: 'absolute', right: 10, top: 10}}>
                    <NavigationControl />
                    </div>
                    <Geocoder
                    mapRef={mapRef1}
                    onViewportChange={handleGeocoderViewportChange1}
                    mapboxApiAccessToken="pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                    position="top-left"
                    />
                    <Marker latitude={36.83399572935205} longitude={-76.30274523863231} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() => {
                        setShowPopup(2);
                        setLocationColor2(activeColor);
                        setLocationColor3(inactiveColor);
                        setShowChart(2);
                    }}
                    onMouseOver={() => {
                        setShowPopup(2);
                        setRegionLineColorPortsmouth(activeRegionColor);
                    }}
                    onMouseLeave={() => {
                        setShowPopup(null); 
                        setRegionLineColorPortsmouth(inactiveRegionColor);
                    }}
                    >
                        <GiWaterRecycling style={{color: locationColor2}} size={30}/>
                    </div>
                </Marker>
                {showPopup === 2 && 
                    <Popup
                        latitude={36.83399572935205}
                        longitude={-76.30274523863231}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #3</div>
                    </Popup>}
                <Marker latitude={36.99906646301743} longitude={-76.41358453874881} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() =>{
                         setShowPopup(3);
                         setLocationColor3(activeColor);
                         setLocationColor2(inactiveColor);
                         setShowChart(3);
                         }}
                         onMouseOver={() => {
                            setShowPopup(3);
                            setRegionLineColorNewportNews(activeRegionColor);
                        }}
                        onMouseLeave={() => {
                            setShowPopup(null);
                            setRegionLineColorNewportNews(inactiveRegionColor);
                        }}
                         >
                             <GiWaterRecycling style={{color: locationColor3}} size={30}/>
                         </div>
                </Marker>
                {showPopup === 3 && 
                    <Popup
                        latitude={36.99906646301743}
                        longitude={-76.41358453874881}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #4</div>
                    </Popup>}

                  
                   <div>
                    <Source id='polylineLayer' type='geojson' data={ChesapeakeLimits}>
                        <Layer
                        id='lineLayer' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>

                    <Source id='polygon' type='geojson' data={ChesapeakeLimits}>
                        <Layer
                        id= 'aoi-solid-fill'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorChesapeake,
                         }}
                        />
                    </Source>
                    </div>  

                    <div>
                    <Source id='polylineLayer2' type='geojson' data={NorfolkLimits}>
                        <Layer
                        id='lineLayer2' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon2' type='geojson' data={NorfolkLimits}>
                        <Layer
                        id= 'aoi-solid-fill2'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorNorfolk,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer3' type='geojson' data={PortsmouthLimits}>
                        <Layer
                        id='lineLayer3' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon3' type='geojson' data={PortsmouthLimits}>
                        <Layer
                        id= 'aoi-solid-fill3'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorPortsmouth,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer4' type='geojson' data={SuffolkLimits}>
                        <Layer
                        id='lineLayer4' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon4' type='geojson' data={SuffolkLimits}>
                        <Layer
                        id= 'aoi-solid-fill4'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorSuffolk,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer5' type='geojson' data={VaBeachLimits}>
                        <Layer
                        id='lineLayer5' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon5' type='geojson' data={VaBeachLimits}>
                        <Layer
                        id= 'aoi-solid-fill5'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorVaBeach,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer6' type='geojson' data={HamptonLimits}>
                        <Layer
                        id='lineLayer6' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon6' type='geojson' data={HamptonLimits}>
                        <Layer
                        id= 'aoi-solid-fill6'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorHampton,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer7' type='geojson' data={NewportNewsLimits}>
                        <Layer
                        id='lineLayer7' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon7' type='geojson' data={NewportNewsLimits}>
                        <Layer
                        id= 'aoi-solid-fill7'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorNewportNews,
                         }}
                        />
                    </Source>
                    </div>

                </MapGL>
                </div>}

                </div>
                <div style={{margin: 20, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <BiLineChart size={20} style={{marginRight: 10, marginTop: 5}}/>
                <label>
                    <Switch onChange={() => setChecked(!checked)} checked={checked} checkedIcon={false} uncheckedIcon={false} onColor="#c0c4c2" offColor="#c0c4c2"/>
                </label>
                <BsFillBarChartFill size={20} style={{marginLeft: 10, marginTop: 5}}/>
                </div>
                
                {cvillActive && <div>
                {(showChart === null || showChart === 0) && <div>
                <h2>Test Location #1</h2>
                <strong style={{color: "grey"}}>XXXX Road, City, State, ZIP</strong>
                </div>}
                {showChart === 1 && <div>
                <h2>Test Location #2</h2>
                <strong style={{color: "grey"}}>XXXX Road, City, State, ZIP</strong>
                </div>}
                {(checked && (showChart === null || showChart === 0)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData1a}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                </div>}
                {(!checked && (showChart === null || showChart === 0)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData1a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                </div>}
                {(checked && (showChart === null || showChart === 0)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData1b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis  domain={[0, 'dataMax']} tickFormatter={DataFormaterY}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases reported" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                </div>}
                {(!checked && (showChart === null || showChart === 0)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData1b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY} domain={[0, 'dataMax']}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases reported" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                </div>}
                {(checked && (showChart === 1)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData2a}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                </div>}
                {(!checked && (showChart === 1)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData2a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                </div>}
                {(checked && (showChart === 1)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData2b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis  domain={[0, 'dataMax']} tickFormatter={DataFormaterY}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases reported" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                </div>}
                {(!checked && (showChart === 1)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData2b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY} domain={[0, 'dataMax']}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases reported" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                </div>}
                </div>}

                {hamptonActive && <div>
                {(showChart === 2) && <div>
                <h2>Test Location #3</h2>
                <strong style={{color: "grey"}}>XXXX Road, City, State, ZIP</strong>
                </div>}
                {showChart === 3 && <div>
                <h2>Test Location #4</h2>
                <strong style={{color: "grey"}}>XXXX Road, City, State, ZIP</strong>
                </div>}
                {(checked && (showChart === 2)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData3a}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                </div>}
                {(!checked && (showChart === 2)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData3a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                </div>}
                {(checked && (showChart === 2)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData3b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis  domain={[0, 'dataMax']} tickFormatter={DataFormaterY}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases reported" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                </div>}
                {(!checked && (showChart === 2)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData3b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY} domain={[0, 'dataMax']}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases reported" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                </div>}
                {(checked && (showChart === 3)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData4a}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                </div>}
                {(!checked && (showChart === 3)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Primary Sludge</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData4a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                </div>}
                {(checked && (showChart === 3)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <BarChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData4b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis  domain={[0, 'dataMax']} tickFormatter={DataFormaterY}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases reported" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                </div>}
                {(!checked && (showChart === 3)) && <div className="chart-view-container" style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", margin: 20, padding: 20}}>
                    <h4>Daily Reported Cases</h4>
                    <LineChart width={window.innerWidth-150} height={window.innerHeight/4} data={chartData4b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY} domain={[0, 'dataMax']}>
                        <Label value="cases reported" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases reported" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                </div>}
                </div>}


                <div>
                <RiInformationLine size={30} style={{color: "grey"}}/>
                <p>The Daily Reported Cases data on this site is automated and provided by the <a href="https://www.vdh.virginia.gov/" target = "_blank">Virginia Department of Health</a></p>
                </div>

            </div>
        </div>
    )
}

export default Wastewatertracker; 