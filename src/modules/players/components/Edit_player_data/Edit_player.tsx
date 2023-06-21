import React, { useEffect, useState, createRef } from "react";
import style from "./EditPlayer.module.css";
import "../../../../pages/css/loading_spinner.css";
import Toastify from "toastify-js";

import { useNavigate, useLocation } from "react-router-dom";

import { FileEarmarkPlus } from "react-bootstrap-icons";
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
      let height = refHeight.current.value;
      let weight = refWeight.current.value;
      let birthday = refBirthday.current.value;
      let number = refNumber.current.value;
      if (
        name.length > 0 &&
        height.length > 0 &&
        height.length > 0 &&
        weight.length > 0 &&
        birthday.length > 0 &&
        number.length > 0 &&
        player_position !== null &&
        player_team !== null
      ) {
        if (weight.length > 0 && weight.length <= 999) {
          if (height.length > 0 && height.length <= 999) {
            if (image_url.length > 0) {
              let player = {
                name: name,
                number: number,
                position: player_position,
                team: player_team,
                birthday: birthday,
                height: height,
                weight: weight,
                avatarUrl: image_url,
                id: player_id,
              };
              Update_player(player, function (result: any) {});

              setMessage("");
            } else setMessage("Please upload image");
          } else setMessage("Height incorrect");
        } else setMessage("Weight incorrect");
      } else setMessage("Fields can't be empty");
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
        <label
          onClick={() => navigate("/Players")}
          style={{ cursor: "pointer", color: "#d33864" }}
        >
          Players/
        </label>
        <label style={{ color: "#d33864" }}>Edit player information</label>
        <div className={style.container_editplayer}>
          <div
            className={style.upload_image}
            onChange={savefile}
            style={{
              backgroundImage: "url(" + image_url + ")",
            }}
          >
            <label htmlFor="file_input">
              <FileEarmarkPlus size={50} />
            </label>

            <input id="file_input" type="file" style={{ display: "none" }} />
          </div>

          <div className={style.inputBox}>
            <form>
              <p>Name</p>
              <input type="text" ref={refName} defaultValue={player_name} />

              <p>Position</p>
              <Select_player_position
                func={set_player_position}
                position={player_position}
              />

              <p>Team</p>
              <Select_team func={set_player_team} team={team_name} />
              <div className={style.personal_data_container}>
                <p>Height(cm)</p>
                <input
                  type="number"
                  max="999"
                  ref={refHeight}
                  defaultValue={player_height}
                />
                <p>Weight(kg)</p>
                <input
                  type="number"
                  max="999"
                  ref={refWeight}
                  defaultValue={player_weight}
                />

                <p>Birthday</p>
                <input
                  type="date"
                  ref={refBirthday}
                  defaultValue={player_birthday}
                />
                <p>Number</p>
                <input
                  type="number"
                  max="999"
                  ref={refNumber}
                  defaultValue={player_number}
                />
              </div>
              <p style={{ color: "red" }}>{message}</p>
            </form>
            <button id={style.cancel_button} onClick={cancel_uplaod}>
              Cancel
            </button>
            <button id={style.save_button} onClick={save_team}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  else return <div className="loader"></div>;
}
