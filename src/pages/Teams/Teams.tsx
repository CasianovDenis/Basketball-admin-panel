import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Teams.module.css";
import style_card from "./card_content_teams.module.css";
import "../css/empty_content.css";
import { Search } from "react-bootstrap-icons";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Get_teams from "../../api/teams/Get_teams";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [team_name, setTeamName] = useState("");
  const [page_number, setPageNumber] = useState(1);
  const [page_size, setPageSize] = useState(6);
  const [page_count, setPageCount] = useState(1);
  const [request, setRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
    Get_teams(team_name, page_number, page_size, function (result: any) {
      let resultFromfunction = result;

      setTeams(resultFromfunction.data);

      let count_records = resultFromfunction.count;
      if (count_records > 6) {
        let sum = count_records + page_size;
        let pagination_count = sum / page_size;
        setPageCount(Math.trunc(pagination_count));
      } else setPageCount(1);
    });
  }, [request]);

  const change_page = (ev: any) => {
    try {
      let element = ev.target.getAttribute("aria-label");
      const selected_page = element.replace(/\D/g, "");

      setPageNumber(selected_page);
    } catch {
      let arrow_element = ev.target.getAttribute("data-testid");
      arrow_element === "NavigateNextIcon"
        ? setPageNumber(page_number + 1)
        : setPageNumber(page_number - 1);
    }
    request === false ? setRequest(true) : setRequest(false);
  };

  const open_team_information = (ev: any) => {
    let id = ev.target.getAttribute("id");

    navigate("/TeamInformation", { state: { team_id: id } });
  };

  const search_teams = (ev: any) => {
    let text =
      ev.target.value.charAt(0).toUpperCase() + ev.target.value.slice(1);
    setTeamName(text);

    request === false ? setRequest(true) : setRequest(false);

    console.log(ev.target);
  };

  if (teams !== null && teams.length > 0)
    return (
      <div className={style.container_teams}>
        <div className={style.search_bar}>
          <input type="text" placeholder="Search..." onChange={search_teams} />
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

        {teams.map((item) => {
          return (
            <div
              className={style_card.card_container}
              id={item["id"]}
              onClick={open_team_information}
            >
              <img src={item["imageUrl"]} alt={item["name"]} id={item["id"]} />
              <div className={style_card.carousel_caption} id={item["id"]}>
                <h5 id={item["id"]}>{item["name"]}</h5>
                <p id={item["id"]}>
                  Year of foundation {item["foundationYear"]}
                </p>
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
      <div className={style.container_teams}>
        <div className={style.search_bar}>
          <input type="text" placeholder="Search..." onChange={search_teams} />
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
          <img src="/Images/teams_empty.png" />
          <p>Empty Here</p>
          <label>Add new teams to continue</label>
        </div>
      </div>
    );
}
