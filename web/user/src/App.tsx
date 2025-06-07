import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestScreen from "./UserScreen/GuestScreen"
import React from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const main = () => {
    
    return (
        
        <Router>
        <Routes>
            <Route path="/" element={<div>홈 화면</div>} />
            <Route path="/guest-register" element={<GuestScreen />} />
        </Routes>
        </Router>
    );
    
   
};


export default main;