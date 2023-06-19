import React, { useEffect, useState, createRef } from "react";
import style from "./AddPlayer.module.css";
import { useNavigate } from "react-router-dom";

import { FileEarmarkPlus } from "react-bootstrap-icons";
import Upload_image from "../../../../api/public/Upload_image";
import Delete_image from "../../../../api/public/Delete_image";
import Create_player from "../../../../api/players/Create_player";

import Select_player_position from "../../../../common/components/Select/Select_player_position";
import Select_team from "../../../../common/components/Select/Select_team";

export default function Add_player() {
  const navigate = useNavigate();
  const [image_url, setImageUrl] = useState(null);
  const [image_name, setImageName] = useState(null);
  const [message, setMessage] = useState("");
  const [player_position, setPlayerPosition] = useState(null);
  const [player_team, setPlayerTeam] = useState(null);

  const refName = createRef<HTMLInputElement>(),
    refHeight = createRef<HTMLInputElement>(),
    refWeight = createRef<HTMLInputElement>(),
    refBirthday = createRef<HTMLInputElement>(),
    refNumber = createRef<HTMLInputElement>();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
  }, []);

  const savefile = (ev: any) => {
    console.log(ev.target.files[0]);

    Upload_image(ev.target.files[0], function (result: any) {
      let resultFromfunction = result;
      setImageUrl(resultFromfunction);
      const get_name = resultFromfunction.slice(
        resultFromfunction.indexOf("/") + 8
      );
      setImageName(get_name);
    });
  };

  const cancel_uplaod = () => {
    Delete_image(image_name, function (result: any) {});
    setImageUrl(null);
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
            if (image_url !== null) {
              let player = {
                name: name,
                number: number,
                position: player_position,
                team: player_team,
                birthday: birthday,
                height: height,
                weight: weight,
                avatarUrl: "http://dev.trainee.dex-it.ru" + image_url,
              };
              Create_player(player, function (result: any) {});
              refName.current.value = "";
              refHeight.current.value = "";
              refWeight.current.value = "";
              refBirthday.current.value = "";
              refNumber.current.value = "";
              setImageUrl(null);
              setPlayerPosition(null);
              setPlayerTeam(null);
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
  return (
    <div className={style.container}>
      <label
        onClick={() => navigate("/Players")}
        style={{ cursor: "pointer", color: "#d33864" }}
      >
        Players/
      </label>
      <label style={{ color: "#d33864" }}>Add new player</label>
      <div className={style.container_addplayer}>
        <div
          className={style.upload_image}
          onChange={savefile}
          style={{
            backgroundImage:
              "url(http://dev.trainee.dex-it.ru" + image_url + ")",
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
            <input type="text" ref={refName} />

            <p>Position</p>
            <Select_player_position func={set_player_position} />

            <p>Team</p>
            <Select_team func={set_player_team} />
            <div className={style.personal_data_container}>
              <p>Height(cm)</p>
              <input type="number" max="999" ref={refHeight} />
              <p>Weight(kg)</p>
              <input type="number" max="999" ref={refWeight} />

              <p>Birthday</p>
              <input type="date" ref={refBirthday} />
              <p>Number</p>
              <input type="number" max="999" ref={refNumber} />
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
}
