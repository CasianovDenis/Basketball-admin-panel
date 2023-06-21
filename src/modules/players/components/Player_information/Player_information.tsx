import React, { useEffect, useState } from "react";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../../pages/css/loading_spinner.css";
import style from "./Player_information.module.css";
import Get_player from "../../../../api/players/Get_player";
import Delete_player from "../../../../api/players/Delete_player";

export default function Player_information() {
  const navigate = useNavigate();
  const location = useLocation();

  const [player, setPlayer] = useState([]);
  const [player_age, setPlayerAge] = useState(0);
  const [player_name, setPlayerName] = useState("");

  const player_id = location.state.player_id;
  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
    else if (player_id === null) navigate("/Players");

    Get_player(player_id, function (result: any) {
      setPlayer(result);
      setPlayerName(result[0].name);
      var birtdhay_player = new Date(result[0].birthday);

      const date = new Date();
      let actual_year = date.getFullYear();
      let age = actual_year - birtdhay_player.getFullYear();

      setPlayerAge(age);
    });
  }, []);

  const delete_player = () => {
    const result = window.confirm("You want to delete this player?");
    if (result === true) {
      Delete_player(player_id, function (result: any) {});
    }
  };
  if (player.length > 0)
    return (
      <div className={style.container_playerInformation}>
        <div className={style.nav_block}>
          <label
            onClick={() => navigate("/Players")}
            style={{ cursor: "pointer", color: "#d33864" }}
          >
            Players/
          </label>
          <label style={{ color: "#d33864" }}>{player_name}</label>

          <div className={style.action_container}>
            <PencilSquare
              size={25}
              fill="gray"
              onClick={() =>
                navigate("/EditPlayer", { state: { id: player_id } })
              }
              style={{ margin: "25px" }}
            />
            <Trash size={25} fill="#d33864" onClick={delete_player} />
          </div>
        </div>
        {player.map((item) => {
          return (
            <div className={style.player_information}>
              <img src={item["avatarUrl"]} alt={item["name"]} />

              <p id={style.player_name} style={{ color: "white" }}>
                {item["name"]}&nbsp;
                <label style={{ color: "#d33864" }}>#{item["number"]}</label>
              </p>
              <div className={style.personal_player_information}>
                <h5>Positition</h5>
                <p>{item["position"]}</p>
                <h5>Team</h5>
                <p>{item["teamName"]}</p>
                <h5>Height</h5>
                <p>{item["height"]} cm</p>
                <h5>Weight</h5>
                <p>{item["weight"]} kg</p>
                <h5>Age</h5>
                <p>{player_age}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  else return <div className="loader"></div>;
}
