import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "toastify-js/src/toastify.css";

import NavBar from "./common/components/NavBar/Navbar";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Teams from "./pages/Teams/Teams";
import Add_team from "./modules/teams/components/AddTeam/Add_team";
import Team_information from "./modules/teams/components/Team_information/Team_information";
import Edit_team from "./modules/teams/components/Edit_team_data/Edit_team";

import Players from "./pages/Players/Players";
import Add_player from "./modules/players/components/AddPlayer/Add_player";
import Player_information from "./modules/players/components/Player_information/Player_information";
import Edit_player from "./modules/players/components/Edit_player_data/Edit_player";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/Players" element={<Players />} />
        <Route path="/AddPlayer" element={<Add_player />} />
        <Route path="/PlayerInformation" element={<Player_information />} />
        <Route path="/EditPlayer" element={<Edit_player />} />

        <Route path="/Teams" element={<Teams />} />
        <Route path="/AddTeam" element={<Add_team />} />
        <Route path="/TeamInformation" element={<Team_information />} />
        <Route path="/EditTeam" element={<Edit_team />} />
      </Routes>
    </BrowserRouter>
  );
}
