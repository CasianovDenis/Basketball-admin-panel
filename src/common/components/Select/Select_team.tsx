import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

import style from "./Custom_select.module.css";

export default function Select_player_position(props: any) {
  const navigate = useNavigate();
  const [selected_team, setSelectedTeam] = useState("Select");
  const [list_display, setListDisplay] = useState(false);
  const [teams_list, setTeamsList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("JWToken");

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    fetch("http://dev.trainee.dex-it.ru/api/Team/GetTeams", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        setTeamsList(responseData.data);
      })
      .catch((ex) => {
        Toastify({
          text: "Token isn't actual ",
          className: "info",
          style: {
            background: "linear-gradient(to right, #eb3349, #f45c43)",
          },
        }).showToast();
        localStorage.removeItem("JWToken");
        window.location.assign("/");
      });
  }, []);

  const select_team = (ev: any) => {
    let display_team = ev.target.getAttribute("title");
    setSelectedTeam(display_team);
    let team = ev.target.getAttribute("id");
    props.func(team);
    setListDisplay(false);
  };

  const chnage_list_status = (ev: any) => {
    ev.preventDefault();
    list_display === false ? setListDisplay(true) : setListDisplay(false);
  };

  if (teams_list !== null && teams_list.length > 0)
    return (
      <div className={style.dropdown}>
        <button onClick={chnage_list_status}>{selected_team}</button>
        {list_display && (
          <ul className={style.menu_list} onClick={select_team}>
            {teams_list.map((item) => {
              return (
                <li id={item["id"]} title={item["name"]}>
                  {item["name"]}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  else
    return (
      <div className={style.dropdown}>
        <button onClick={() => navigate("/AddTeam")}>
          Add team before select
        </button>
      </div>
    );
}
