import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestScreen from "./UserScreen/GuestScreen"
import React from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestQueue from "./UserScreen/GuestQueue";

const main = () => {
    
    return (
        
        <Router>
        <Routes>
            <Route path="/" element={<div>홈 화면</div>} />
            <Route path="/guest-register" element={<GuestScreen />} />
            <Route path="/guest-queue" element={<GuestQueue />} />
        </Routes>
        </Router>
    );
    
   
};


export default main;