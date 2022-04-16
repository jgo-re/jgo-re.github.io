import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, Navigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
import GetBlob from './GetBlob'
import CreateBlob from './CreateBlob'
// import { Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <Router>
      {/* <div className="App">
        <h1 className="nice-font">
          Blob.
        </h1>
      </div> */}

    
      <Routes>
        <Route path="/" element={<NewBlob/>}/>
        <Route path="/:key" element={<ViewBlob/>}/>
      </Routes>
    </Router>
  );
}

export default App;

function NewBlob(){
  console.log("New Blob");
  return (
      <>
      <textarea defaultValue="Put your blob of text in here ☺."/>
      <button onClick={CallCreateBlob}>Create Blob</button>
      </>
      
  );
}

function CallCreateBlob(){
  let val = document.querySelector('textarea').value;
  let json = `{"Value":"${val}"}`;
  fetch('http://localhost:8000/b/', { method: 'POST', body: json})
  .then(response => response.json())
  .then(response => {
    console.log(response);
    window.location = `/${response}`;
  });
}

function ViewBlob(){
  console.log("View Blob");
  const { key } = useParams();
  let navigate = useNavigate();

  var {value, loading, error} = GetBlob(key);
  console.log(value);

  if (loading){
    return <textarea value={value}/>
  } 

  if (error) {
    navigate('/', true);
  } 

  return <textarea value={value}/>;
}

