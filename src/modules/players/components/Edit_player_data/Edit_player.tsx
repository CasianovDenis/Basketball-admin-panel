import React, { useEffect, useState, createRef } from "react";
import style from "./EditPlayer.module.css";
import "../../../../pages/css/loading_spinner.css";
import Toastify from "toastify-js";

import { useNavigate, useLocation } from "react-router-dom";

import Upload_image from "../../../../api/public/Upload_image";
import Delete_image from "../../../../api/public/Delete_image";
import Get_player from "../../../../api/players/Get_player";

import Update_player from "../../../../api/players/Update_player";
import Select_player_position from "../../../../common/components/Select/Select_player_position";
import Select_team from "../../../../common/components/Select/Select_team";

export default function Edit_player() {
  const navigate = useNavigate();
  const location = useLocation();

  const player_id = location.state.id;
  const [image_url, setImageUrl] = useState("");
  const [image_name, setImageName] = useState(null);
  const [message, setMessage] = useState("");

  const [player_position, setPlayerPosition] = useState(null);
  const [player_team, setPlayerTeam] = useState(null);
  const [team_name, setTeamName] = useState(null);
  const [player_height, setPlayerHeight] = useState(0);
  const [player_weight, setPlayerWeight] = useState(0);
  const [player_number, setPlayreNumber] = useState(0);
  const [player_birthday, setPlayerBirthday] = useState("");
  const [player_name, setPlayerName] = useState("");

  const [wrong_name, setWrongName] = useState("");
  const [wrong_position, setWrongPosition] = useState("");
  const [wrong_team, setWrongTeam] = useState("");
  const [wrong_height, setWrongHeight] = useState("");
  const [wrong_weight, setWrongWeight] = useState("");
  const [wrong_birthday, setWrongBirtdhay] = useState("");
  const [wrong_number, setWrongNumber] = useState("");

  const refName = createRef<HTMLInputElement>(),
    refHeight = createRef<HTMLInputElement>(),
    refWeight = createRef<HTMLInputElement>(),
    refBirthday = createRef<HTMLInputElement>(),
    refNumber = createRef<HTMLInputElement>();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
    else if (player_id === null) navigate("/Players");

    Get_player(player_id, function (result: any) {
      setImageUrl(result[0].avatarUrl);
      setPlayerPosition(result[0].position);
      setPlayerTeam(result[0].team);
      setTeamName(result[0].teamName);
      setPlayerHeight(result[0].height);
      setPlayerWeight(result[0].weight);
      setPlayreNumber(result[0].number);
      setPlayerBirthday(result[0].birthday.slice(0, 10));
      setPlayerName(result[0].name);
    });
  }, []);

  const savefile = (ev: any) => {
    Toastify({
      text: "Start upload image , please wait",
      className: "info",
      style: {
        background: "linear-gradient(to right, #fe8c00, #f83600)",
      },
    }).showToast();

    Upload_image(ev.target.files[0], function (result: any) {
      let resultFromfunction = result;
      let avatar_url = "http://dev.trainee.dex-it.ru" + resultFromfunction;
      setImageUrl(avatar_url);
      const get_name = resultFromfunction.slice(
        resultFromfunction.indexOf("/") + 8
      );
      setImageName(get_name);
    });
  };

  const cancel_uplaod = () => {
    if (image_name !== null)
      Delete_image(image_name, function (result: any) {});
    setImageUrl("");
    navigate("/Players");
  };

  const save_team = () => {
    if (
      refName.current &&
      refHeight.current &&
      refWeight.current &&
      refBirthday.current &&
      refNumber.current
    ) {
      let name = refName.current.value;
      let height = Number(refHeight.current.value);
      let weight = Number(refWeight.current.value);
      let birthday = refBirthday.current.value;
      let number = refNumber.current.value;
      if (
        name.length > 0 &&
        height > 0 &&
        weight > 0 &&
        birthday.length > 0 &&
        number.length > 0 &&
        player_position !== null &&
        player_team !== null
      ) {
        if (height > 0 && height <= 999) {
          if (weight > 0 && weight <= 999) {
            let actual_year = new Date().getFullYear();
            let year_player = new Date(birthday).getFullYear();
            if (year_player <= actual_year && year_player > 0) {
              if (image_url.length > 0) {
                let player = {
                  name: name,
                  number: Number(number),
                  position: player_position,
                  team: player_team,
                  birthday: birthday,
                  height: height,
                  weight: weight,
                  avatarUrl: image_url,
                  id: Number(player_id),
                };
                Update_player(player, function (result: any) {});
                navigate("/PlayerInformation", {
                  state: { player_id: player_id },
                });
                setMessage("");
              } else setMessage("Please upload image");
            } else setWrongBirtdhay("Incorrect birthday year");
          } else setWrongWeight("Weight incorrect");
        } else setWrongHeight("Height incorrect");
      } else {
        setWrongName("Fields can't be empty");
        setWrongBirtdhay("Fields can't be empty");
        setWrongHeight("Fields can't be empty");
        setWrongWeight("Fields can't be empty");
        setWrongNumber("Fields can't be empty");
        setWrongPosition("Fields can't be empty");
        setWrongTeam("Fields can't be empty");
      }
    }
  };

  const set_player_position = (position: any) => {
    setPlayerPosition(position);
  };
  const set_player_team = (position: any) => {
    setPlayerTeam(position);
  };
  if (player_position !== null && player_team !== null)
    return (
      <div className={style.container}>
        <div style={{ margin: "20px" }}>
          <label
            onClick={() => navigate("/Players")}
            style={{ cursor: "pointer", color: "#e4163a" }}
          >
            Players/
          </label>

          <label style={{ color: "#e4163a" }}>Edit player information</label>
        </div>
        <div className={style.container_editplayer}>
          <div
            className={style.upload_image}
            onChange={savefile}
            style={{
              backgroundImage: "url(" + image_url + ")",
            }}
          >
            <label htmlFor="file_input">
              <img src="/Icon/add_photo_icon.svg" />
            </label>

            <input id="file_input" type="file" style={{ display: "none" }} />
          </div>

          <div className={style.inputBox}>
            <form>
              <label>Name</label>
              <input type="text" ref={refName} defaultValue={player_name} />
              <p style={{ color: "red" }}>{wrong_name}</p>
              <label>Position</label>
              <Select_player_position
                func={set_player_position}
                position={player_position}
              />
              <p style={{ color: "red" }}>{wrong_position}</p>
              <label>Team</label>
              <Select_team func={set_player_team} team={team_name} />
              <p style={{ color: "red" }}>{wrong_team}</p>
              <div className={style.personal_data_container}>
                <div>
                  <label>Height(cm)</label>
                  <input
                    type="number"
                    max="999"
                    ref={refHeight}
                    defaultValue={player_height}
                  />
                  <p style={{ color: "red" }}>{wrong_height}</p>
                </div>
                <div>
                  <label>Weight(kg)</label>
                  <input
                    type="number"
                    max="999"
                    ref={refWeight}
                    defaultValue={player_weight}
                  />
                  <p style={{ color: "red" }}>{wrong_weight}</p>
                </div>
                <div>
                  <label>Birthday</label>
                  <input
                    type="date"
                    ref={refBirthday}
                    defaultValue={player_birthday}
                  />
                  <p style={{ color: "red" }}>{wrong_birthday}</p>
                </div>
                <div>
                  <label>Number</label>
                  <input
                    type="number"
                    max="999"
                    ref={refNumber}
                    defaultValue={player_number}
                  />
                  <p style={{ color: "red" }}>{wrong_number}</p>
                </div>
              </div>
            </form>
            <button id={style.cancel_button} onClick={cancel_uplaod}>
              Cancel
            </button>
            <button id={style.save_button} onClick={save_team}>
              Save
            </button>
            <p style={{ color: "red" }}>{message}</p>
          </div>
        </div>
      </div>
    );
  else return <div className="loader"></div>;
}
