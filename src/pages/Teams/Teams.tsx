import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/card_content.css";
import style from "./Teams.module.css";
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
      }
    });
  }, [request]);

  const change_page = (ev: any) => {
    let element = ev.target.getAttribute("aria-label");

    const selected_page = element.replace(/\D/g, "");

    setPageNumber(selected_page);

    request === false ? setRequest(true) : setRequest(false);
  };

  const open_team_information = (ev: any) => {
    let id = ev.target.getAttribute("id");

    navigate("/TeamInformation", { state: { team_id: id } });
  };

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

        {teams.map((item) => {
          return (
            <div
              className="card_container"
              id={item["id"]}
              onClick={open_team_information}
            >
              <img src={item["imageUrl"]} alt={item["name"]} id={item["id"]} />
              <div className="carousel-caption d-md-block" id={item["id"]}>
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
