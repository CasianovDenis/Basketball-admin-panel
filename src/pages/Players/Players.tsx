import React, { useEffect, useState } from "react";
import style from "./Players.module.css";
import "../css/empty_content.css";
import "../css/card_content.css";

import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Get_players from "../../api/players/Get_players";
import Get_team from "../../api/teams/Get_team";
import Get_teams from "../../api/teams/Get_teams";

export default function Players() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [player_name, setPlayerName] = useState("");
  const [page_number, setPageNumber] = useState(1);
  const [page_size, setPageSize] = useState(6);
  const [page_count, setPageCount] = useState(1);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
    Get_teams("", page_number, page_size, function (result: any) {
      let teams_array = result.data;

      Get_players(
        player_name,
        page_number,
        page_size,
        0,
        function (result: any) {
          let players_array = result.data;
          for (let index = 0; players_array.length > index; index++) {
            for (let position = 0; teams_array.length > position; position++) {
              if (players_array[index].team == teams_array[position].id)
                players_array[index].team = teams_array[position].name;
            }
          }
          setPlayers(players_array);

          let count_records = result.count;
          if (count_records > 6) {
            let sum = count_records + page_size;
            let pagination_count = sum / page_size;
            setPageCount(Math.trunc(pagination_count));
          }
        }
      );
    });
  }, [request]);

  const change_page = (ev: any) => {
    let element = ev.target.getAttribute("aria-label");

    const selected_page = element.replace(/\D/g, "");

    setPageNumber(selected_page);

    request === false ? setRequest(true) : setRequest(false);
  };

  const open_player_information = (ev: any) => {
    let id = ev.target.getAttribute("id");

    navigate("/PlayerInformation", { state: { player_id: id } });
  };
  if (players !== null && players.length > 0)
    return (
      <div className={style.container_players}>
        <div className={style.search_bar}>
          <input
            type="text"
            placeholder="Search..."
            onClick={() => {
              {
                players.map((item) => {
                  console.log(item["team"]);
                });
              }
            }}
          />
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

        {players.map((item) => {
          return (
            <div
              className="card_container"
              id={item["id"]}
              onClick={open_player_information}
            >
              <img
                src={item["avatarUrl"]}
                alt={item["name"]}
                style={{ marginTop: "28px", width: "200px" }}
                id={item["id"]}
              />
              <div className="carousel-caption d-md-block" id={item["id"]}>
                <h5 id={item["id"]}>
                  {item["name"]}&nbsp;
                  <label style={{ color: "#d33864" }}>#{item["number"]}</label>
                </h5>
                <p id={item["id"]}>{item["team"]}</p>
              </div>
            </div>
          );
        })}

        <Stack spacing={2}>
          <Pagination
            count={page_count}
            id={style.MuiPagination}
            color="primary"
            onClick={change_page}
          />
        </Stack>
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
