import React, { useEffect, useState } from "react";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../../pages/css/loading_spinner.css";
import style from "./Team_information.module.css";
import Get_team from "../../../../api/teams/Get_team";
import Delete_team from "../../../../api/teams/Delete_team";
import Get_players from "../../../../api/players/Get_players";

export default function Team_information() {
  const navigate = useNavigate();
  const location = useLocation();

  const [team, setTeam] = useState([]);

  const [team_name, setTeamName] = useState("");
  const [players, setPlayers] = useState([]);

  const team_id = location.state.team_id;
  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
    else if (team_id === null && team_id === undefined) navigate("/Teams");

    Get_team(team_id, function (resultfromFunction: any) {
      setTeam(resultfromFunction);
      setTeamName(resultfromFunction[0].name);

      Get_players("", 1, 6, resultfromFunction[0].id, function (result: any) {
        const date = new Date();
        let actual_year = date.getFullYear();

        const new_array_with_age = result.data.map(
          ({
            name,
            number,
            avatarUrl,
            height,
            weight,
            position,
            birthday,
          }: {
            number: number;
            name: string;
            avatarUrl: string;
            position: string;
            height: number;
            weight: number;
            birthday: string;
          }) => ({
            name: name,
            number: number,
            avatarUrl: avatarUrl,
            height: height,
            weight: weight,
            position: position,
            age: actual_year - new Date(birthday).getFullYear(),
          })
        );

        setPlayers(new_array_with_age);
      });
    });
  }, []);

  const delete_team = () => {
    const result = window.confirm("You want to delete this team?");
    if (result === true) {
      Delete_team(team_id, function (result: any) {});
    }
  };
  if (team.length > 0)
    return (
      <div className={style.container_teamInformation}>
        <div className={style.nav_block}>
          <label
            onClick={() => navigate("/Players")}
            style={{ cursor: "pointer", color: "#d33864" }}
          >
            Teams/
          </label>
          <label style={{ color: "#d33864" }}>{team_name}</label>

          <div className={style.action_container}>
            <PencilSquare
              size={25}
              fill="gray"
              onClick={() => navigate("/EditTeam", { state: { id: team_id } })}
              style={{ margin: "25px" }}
            />
            <Trash size={25} fill="#d33864" onClick={delete_team} />
          </div>
        </div>
        {team.map((item) => {
          return (
            <div className={style.team_information}>
              <img src={item["imageUrl"]} alt={item["name"]} />

              <p id={style.team_name} style={{ color: "white" }}>
                {item["name"]}
              </p>
              <div className={style.detailed_team_information}>
                <h5>Year of foundation</h5>
                <p>{item["foundationYear"]}</p>
                <h5>Division</h5>
                <p>{item["division"]}</p>
                <h5>Conference</h5>
                <p>{item["conference"]}</p>
              </div>
            </div>
          );
        })}
        <div className={style.table_container}>
          <table className="table" style={{ borderRadius: "5px" }}>
            <thead>
              <tr>
                <th scope="col">Roster</th>
                <th scope="col"> </th>
                <th scope="col"> </th>
                <th scope="col"> </th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Player</th>
                <th scope="col">Height</th>
                <th scope="col">Weight</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              {players.map((item) => {
                let i = 0;
                return (
                  <tr>
                    <th scope="row">{item["number"]}</th>
                    <td>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={item["avatarUrl"]}
                      />
                      {item["name"]}
                      <p style={{ marginLeft: "60px" }}>{item["position"]}</p>
                    </td>
                    <td>{item["height"]}</td>
                    <td>{item["weight"]}</td>
                    <td>{item["age"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  else return <div className="loader"></div>;
}
