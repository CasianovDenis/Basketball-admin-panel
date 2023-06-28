import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BoxArrowInRight, PeopleFill, PersonFill } from "react-bootstrap-icons";
import "./NavBar.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [decoded_token, setDecoded_token] = useState<any>(null);

  const [teams_color, setTeamsColor] = useState("currentColor");
  const [players_color, setPlayersColor] = useState("currentColor");
  const [button_togler_status, setButtonToglerStatus] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/Teams") {
      setTeamsColor("#e4163a");
      setPlayersColor("currentColor");

      let element = document.getElementById("teams_container_content");
      if (element)
        button_togler_status === true
          ? (element.style.opacity = "0.2")
          : (element.style.opacity = "initial");
    } else if (location.pathname === "/Players") {
      setTeamsColor("currentColor");
      setPlayersColor("#e4163a");

      let element = document.getElementById("players_container_content");
      if (element)
        button_togler_status === true
          ? (element.style.opacity = "0.2")
          : (element.style.opacity = "initial");
    }

    let token = localStorage.getItem("JWToken");
    if (token) {
      var base64 = token.split(".")[1];
      var token_data = JSON.parse(window.atob(base64));
      setDecoded_token(token_data);
    }
  }, [location.pathname]);

  const container_opacity = () => {
    if (location.pathname === "/Teams") {
      let element = document.getElementById("teams_container_content");
      if (element)
        button_togler_status === false
          ? (element.style.opacity = "0.2")
          : (element.style.opacity = "initial");
    } else if (location.pathname === "/Players") {
      let element = document.getElementById("players_container_content");
      if (element)
        button_togler_status === false
          ? (element.style.opacity = "0.2")
          : (element.style.opacity = "initial");
    }

    button_togler_status === false
      ? setButtonToglerStatus(true)
      : setButtonToglerStatus(false);
  };
  const exit_account = () => {
    localStorage.removeItem("JWToken");
    setDecoded_token(null);
    navigate("/");
  };
  if (decoded_token !== null)
    return (
      <>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div id="navbarSupportedContent">
            <div className="navbar_user">
              <img
                src="/Icon/profile_icon.svg"
                style={{ width: "48px", height: "48px" }}
              />
              <p style={{ marginLeft: "20px" }}>{decoded_token.user}</p>
            </div>
            <hr />
          </div>

          <div className="list-group list-group-flush mx-3 mt-4">
            <div
              onClick={() => navigate("/Teams")}
              style={{ cursor: "pointer" }}
            >
              <PeopleFill
                color={teams_color}
                style={{ marginLeft: "15px" }}
                size={20}
              />
              <p style={{ color: teams_color }}>Teams</p>
            </div>
            <div
              onClick={() => navigate("/Players")}
              style={{ cursor: "pointer" }}
            >
              <PersonFill
                color={players_color}
                style={{ marginLeft: "15px" }}
                size={20}
              />
              <p style={{ color: players_color }}>Players</p>
            </div>
          </div>

          <div className="logout" onClick={exit_account}>
            <BoxArrowInRight size={22} style={{ marginLeft: "20px" }} />
            <p style={{ marginLeft: "2px" }}>Sign Out</p>
          </div>
        </nav>

        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu "
              aria-controls="sidebarMenu "
              aria-expanded="true"
              aria-label="Toggle navigation"
              onClick={container_opacity}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href="/Teams">
              <img src="/Images/logo.png" height="50" />
            </a>

            <div className="collapse navbar-collapse">
              <div className="navbar_user">
                <label style={{ margin: "15px" }}>{decoded_token.user}</label>

                <img src="/Icon/profile_icon.svg" />
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  else return <></>;
}
