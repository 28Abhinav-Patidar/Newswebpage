import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [progress, setprogress] = useState(0);

  return (
    <Router>
      <Navbar />
      <LoadingBar color="#f11946" progress={progress} />
      
      <Routes>
        <Route path="/" element={<News setprog={setprogress} key="general" pagesize={6} category="general" />} />
        <Route path="/business" element={<News setprog={setprogress} key="business" pagesize={6} category="business" />} />
        <Route path="/sports" element={<News setprog={setprogress} key="sports" pagesize={6} category="sports" />} />
        <Route path="/education" element={<News setprog={setprogress} key="education" pagesize={6} category="education" />} />
        <Route path="/science" element={<News setprog={setprogress} key="science" pagesize={6} category="science" />} />
        <Route path="/entertainment" element={<News setprog={setprogress} key="entertainment" pagesize={6} category="entertainment" />} />
        <Route path="/health" element={<News setprog={setprogress} key="health" pagesize={6} category="health" />} />
      </Routes>
    </Router>
  );
}