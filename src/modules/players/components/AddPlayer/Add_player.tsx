import React, { useEffect, useState, createRef } from "react";
import style from "./AddPlayer.module.css";
import { useNavigate } from "react-router-dom";

import { FileEarmarkPlus } from "react-bootstrap-icons";
import Upload_image from "../../../../api/public/Upload_image";
import Delete_image from "../../../../api/public/Delete_image";
import Create_player from "../../../../api/players/Create_player";

import Select from "../../../../common/components/Select/Custom_select";
export default function Add_player() {
  const navigate = useNavigate();
  const [image_url, setImageUrl] = useState(null);
  const [image_name, setImageName] = useState(null);
  const [message, setMessage] = useState("");

  const refName = createRef<HTMLInputElement>(),
    refDivision = createRef<HTMLInputElement>(),
    refConference = createRef<HTMLInputElement>(),
    refYearFoundation = createRef<HTMLInputElement>();

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
      refDivision.current &&
      refConference.current &&
      refYearFoundation.current
    ) {
      let name = refName.current.value;
      let division = refDivision.current.value;
      let conference = refConference.current.value;
      let yearfoundation = refYearFoundation.current.value;
      if (
        name.length > 0 &&
        division.length > 0 &&
        conference.length > 0 &&
        yearfoundation.length > 0
      ) {
        if (yearfoundation.length > 0 && yearfoundation.length <= 4) {
          if (image_url !== null) {
            Create_player(
              name,
              yearfoundation,
              division,
              conference,
              image_url,
              function (result: any) {
                setMessage("");
              }
            );
            refName.current.value = "";
            refDivision.current.value = "";
            refConference.current.value = "";
            refYearFoundation.current.value = "";
            setImageUrl(null);
          } else setMessage("Please upload image");
        } else setMessage("Incorrect year");
      } else setMessage("Fields can't be empty");
    }
  };

  const test = (ev: any) => {
    console.log(ev);
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
            <Select func={test} />

            {/*<input type="text" ref={refDivision} />*/}

            <p>Team</p>

            <input type="text" ref={refConference} />
            <p>Height(cm)</p>
            <input type="number" max="999" ref={refYearFoundation} />
            <p>Weight(kg)</p>
            <input type="number" max="999" ref={refYearFoundation} />

            <p>Birthday</p>
            <input type="number" max="9999" ref={refYearFoundation} />
            <p>Number</p>
            <input type="number" max="999" ref={refYearFoundation} />
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
