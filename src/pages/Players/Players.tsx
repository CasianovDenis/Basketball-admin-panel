import React, { useEffect, useState } from "react";
import style from "./Players.module.css";
import "../css/empty_content.css";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
  }, []);

  if (players !== null && players.length > 0)
    return (
      <div className={style.container_players}>
        <div className={style.search_bar}>
          <input type="text" placeholder="Search..." />
          <span>
            <Search size={15} />
          </span>
        </div>

        <button
          className={style.add_button}
          onClick={() => navigate("/AddPlayer")}
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
        </div>
      </div>
    );
  else
    return (
      <div className={style.container_players}>
        <div className={style.search_bar}>
          <input type="text" placeholder="Search..." />
          <span>
            <Search size={15} />
          </span>
        </div>

        <button
          className={style.add_button}
          onClick={() => navigate("/AddPlayer")}
        >
          Add +
        </button>
        <div className="empty_content">
          <img src="/Images/players_empty.jpg" />
          <p>Empty Here</p>
          <label>Add new players to continue</label>
        </div>
      </div>
    );
}
