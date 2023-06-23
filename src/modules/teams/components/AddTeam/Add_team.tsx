import React, { useEffect, useState, createRef } from "react";
import style from "./AddTeam.module.css";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

import Upload_image from "../../../../api/public/Upload_image";
import Delete_image from "../../../../api/public/Delete_image";
import Create_team from "../../../../api/teams/Create_team";

export default function Add_team() {
  const navigate = useNavigate();
  const [image_url, setImageUrl] = useState(null);
  const [image_name, setImageName] = useState(null);
  const [wrong_name, setWrongName] = useState("");
  const [wrong_division, setWrongDivision] = useState("");
  const [wrong_conference, setWrongConference] = useState("");
  const [wrong_yearFoundation, setWrongYearFoundation] = useState("");
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
      setImageName(get_name);
    });
  };

  const cancel_uplaod = () => {
    Delete_image(image_name, function (result: any) {});
    setImageUrl(null);
    navigate("/Teams");
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
        setWrongName("");
        setWrongYearFoundation("");
        setWrongConference("");
        setWrongDivision("");
        if (yearfoundation.length > 0 && yearfoundation.length <= 4) {
          if (image_url !== null) {
            Create_team(
              name,
              yearfoundation,
              division,
              conference,
              image_url,
              function (result: any) {}
            );

            refName.current.value = "";
            refDivision.current.value = "";
            refConference.current.value = "";
            refYearFoundation.current.value = "";
            setImageUrl(null);
            setMessage("");
            setWrongYearFoundation("");
            navigate("/Teams");
          } else setMessage("Please upload image");
        } else setWrongYearFoundation("Incorrect year");
      } else {
        setWrongName("Fields can't be empty");
        setWrongYearFoundation("Fields can't be empty");
        setWrongConference("Fields can't be empty");
        setWrongDivision("Fields can't be empty");
      }
    }
  };
  return (
    <div className={style.container}>
      <div style={{ margin: "20px" }}>
        <label
          onClick={() => navigate("/Teams")}
          style={{ cursor: "pointer", color: "#d33864" }}
        >
          Teams/
        </label>
        <label style={{ color: "#d33864" }}>Add new team</label>
      </div>
      <div className={style.container_addteam}>
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
            <p>Name</p>
            <input type="text" ref={refName} />
            <p style={{ color: "red" }}>{wrong_name}</p>
            <p>Division</p>
            <input type="text" ref={refDivision} />
            <p style={{ color: "red" }}>{wrong_division}</p>
            <p>Conference</p>
            <input type="text" ref={refConference} />
            <p style={{ color: "red" }}>{wrong_conference}</p>
            <p>Year of foundation</p>
            <input type="number" max="9999" ref={refYearFoundation} />
            <p style={{ color: "red" }}>{wrong_yearFoundation}</p>
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
