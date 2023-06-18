import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Teams.module.css";
import "../css/empty_content.css";
import { Search } from "react-bootstrap-icons";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
  }, []);
  if (teams !== null && teams.length > 0)
    return (
      <div className={style.container_teams}>
        <div className={style.search_bar}>
          <input type="text" placeholder="Search..." />
          <span>
            <Search size={15} />
          </span>
        </div>

        <button
          className={style.add_button}
          onClick={() => navigate("/AddTeam")}
        >
          Add +
        </button>
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{ width: "350px", height: "350px" }}
          >
            <img
              src="/Images/SignIn_basketball.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className={style.container_teams}>
        <div className={style.search_bar}>
          <input type="text" placeholder="Search..." />
          <span>
            <Search size={15} />
          </span>
        </div>

        <button
          className={style.add_button}
          onClick={() => navigate("/AddTeam")}
        >
          Add +
        </button>
        <div className="empty_content">
          <img src="/Images/teams_empty.jpg" />
          <p>Empty Here</p>
          <label>Add new teams to continue</label>
        </div>
      </div>
    );
}
