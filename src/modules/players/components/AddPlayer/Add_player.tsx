import React, { useEffect, useState, createRef } from "react";
import style from "./AddPlayer.module.css";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { useSelector, useDispatch } from "react-redux";
import { saveImageName } from "../../../../configs/redux/actions/ImageData";
import { store } from "../../../../configs/redux/store/store";

import Upload_image from "../../../../api/public/Upload_image";
import Delete_image from "../../../../api/public/Delete_image";
import Create_player from "../../../../api/players/Create_player";

import Select_player_position from "../../../../common/components/Select/Select_player_position";
import Select_team from "../../../../common/components/Select/Select_team";
import { RootState } from "../../../../configs/redux/store/store";

export default function Add_player() {
  const navigate = useNavigate();
  const [image_url, setImageUrl] = useState(null);

  //const image_data = useSelector((state: RootState) => state.data.name_img);
  const dispatch = useDispatch();

  const [player_position, setPlayerPosition] = useState(null);
  const [player_team, setPlayerTeam] = useState(null);

  const [wrong_name, setWrongName] = useState("");
  const [wrong_position, setWrongPosition] = useState("");
  const [wrong_team, setWrongTeam] = useState("");
  const [wrong_height, setWrongHeight] = useState("");
  const [wrong_weight, setWrongWeight] = useState("");
  const [wrong_birthday, setWrongBirtdhay] = useState("");
  const [wrong_number, setWrongNumber] = useState("");

  const [message, setMessage] = useState("");

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
    Toastify({
      text: "Start upload image , please wait",
      className: "info",
      style: {
        background: "linear-gradient(to right, #fe8c00, #f83600)",
      },
    }).showToast();

    Upload_image(ev.target.files[0], function (result: any) {
      let resultFromfunction = result;
      setImageUrl(resultFromfunction);
      const get_name = resultFromfunction.slice(
        resultFromfunction.indexOf("/") + 8
      );

      dispatch(saveImageName(get_name.toString()));
    });
  };

  const cancel_uplaod = () => {
    let value = store.getState();

    Delete_image(value.data.name_img, function (result: any) {});
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
      let height = Number(refHeight.current.value);
      let weight = Number(refWeight.current.value);
      let birthday = refBirthday.current.value;
      let number = refNumber.current.value;
      if (
        name.length > 0 &&
        height > 0 &&
        height > 0 &&
        weight > 0 &&
        birthday.length > 0 &&
        number.length > 0 &&
        player_position !== null &&
        player_team !== null
      ) {
        setWrongName("");
        setWrongBirtdhay("");
        setWrongHeight("");
        setWrongWeight("");
        setWrongNumber("");
        setWrongPosition("");
        setWrongTeam("");
        if (height > 0 && height <= 999) {
          if (weight > 0 && weight <= 999) {
            let actual_year = new Date().getFullYear();
            let year_player = new Date(birthday).getFullYear();
            if (year_player <= actual_year && year_player > 0) {
              if (image_url !== null) {
                let player = {
                  name: name,
                  number: Number(number),
                  position: player_position,
                  team: Number(player_team),
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

                setMessage("");
                navigate("/Players");
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
  return (
    <div className={style.container}>
      <div style={{ margin: "20px" }}>
        <label
          onClick={() => navigate("/Players")}
          style={{ cursor: "pointer", color: "#e4163a" }}
        >
          Players/
        </label>
        <label style={{ color: "#e4163a" }}>Add new player</label>
      </div>
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
            <img src="/Icon/add_photo_icon.svg" />
          </label>

          <input id="file_input" type="file" style={{ display: "none" }} />
        </div>

        <div className={style.inputBox}>
          <form>
            <label>Name</label>
            <input type="text" ref={refName} />
            <p style={{ color: "red" }}>{wrong_name}</p>
            <label>Position</label>
            <Select_player_position func={set_player_position} />
            <p style={{ color: "red" }}>{wrong_position}</p>
            <label>Team</label>
            <Select_team func={set_player_team} />
            <p style={{ color: "red" }}>{wrong_team}</p>
            <div className={style.personal_data_container}>
              <div>
                <label>Height(cm)</label>
                <input type="number" max="999" ref={refHeight} />
                <p style={{ color: "red" }}>{wrong_height}</p>
              </div>
              <div>
                <label>Weight(kg)</label>
                <input type="number" max="999" ref={refWeight} />
                <p style={{ color: "red" }}>{wrong_weight}</p>
              </div>
              <div>
                <label>Birthday</label>
                <input type="date" ref={refBirthday} />
                <p style={{ color: "red" }}>{wrong_birthday}</p>
              </div>
              <div>
                <label>Number</label>
                <input type="number" max="999" ref={refNumber} />
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
}
