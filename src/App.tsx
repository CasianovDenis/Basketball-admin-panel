import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import "./App.css";

//import NavBar from "./NavMenu/NavBar";
//import Footer from "./Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
//import StudentInformation from "./components/StudentGrade/StudentInformation.tsx";
//import TeachersSubjects from "./components/TeacherSubjects/TeachersSubjects.tsx";
//import Home from "./Home/Home";

//import { Context } from "./components/Context.js";

//import "./custom.css";
//import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      {/*<NavBar />*/}

      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route path="/SignUp" element={<SignUp />} />
        {/*
        <Route path="/SignUp" element={<SignUp />} />
        
          <Route exact path="/TeacherSubjects" element={<TeachersSubjects />} />
          <Route exact path="/AdminPage" element={<AdminPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
}
