import React, { useEffect, useState, createRef } from "react";
import style from "./EditTeam.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Toastify from "toastify-js";
import "../../../../pages/css/loading_spinner.css";

import { FileEarmarkPlus } from "react-bootstrap-icons";
import Upload_image from "../../../../api/public/Upload_image";
import Delete_image from "../../../../api/public/Delete_image";
import Update_team from "../../../../api/teams/Update_team";
import Get_team from "../../../../api/teams/Get_team";

export default function Edit_team() {
  const navigate = useNavigate();
  const location = useLocation();

  const [image_url, setImageUrl] = useState("");
  const [image_name, setImageName] = useState(null);
  const [message, setMessage] = useState("");
  const [team_name, setTeamName] = useState("");
  const [team_division, setTeamDivision] = useState("");
  const [team_conference, setTeamConference] = useState("");
  const [team_yearFoundation, setTeamYearFoundation] = useState(0);
  const team_id = location.state.id;

  const refName = createRef<HTMLInputElement>(),
    refDivision = createRef<HTMLInputElement>(),
    refConference = createRef<HTMLInputElement>(),
    refYearFoundation = createRef<HTMLInputElement>();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token === null) navigate("/");
    else if (team_id === null) navigate("/Players");

    Get_team(team_id, function (result: any) {
      setImageUrl(result[0].imageUrl);
      setTeamName(result[0].name);
      setTeamDivision(result[0].division);
      setTeamConference(result[0].conference);
      setTeamYearFoundation(result[0].foundationYear);
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
      let _url = "http://dev.trainee.dex-it.ru" + resultFromfunction;
      setImageUrl(_url);
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
        if (yearfoundation.length > 0 && yearfoundation.length <= 4) {
          if (image_url !== null) {
            Update_team(
              name,
              yearfoundation,
              division,
              conference,
              image_url,
              team_id,
              function (result: any) {}
            );

            setMessage("");
          } else setMessage("Please upload image");
        } else setMessage("Incorrect year");
      } else setMessage("Fields can't be empty");
    }
  };
  if (team_yearFoundation > 0)
    return (
      <div className={style.container}>
        <label
          onClick={() => navigate("/Teams")}
          style={{ cursor: "pointer", color: "#d33864" }}
        >
          Teams/
        </label>
        <label style={{ color: "#d33864" }}>Edit team information</label>
        <div className={style.container_editteam}>
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
              <input type="text" ref={refName} defaultValue={team_name} />

              <p>Division</p>
              <input
                type="text"
                ref={refDivision}
                defaultValue={team_division}
              />

              <p>Conference</p>
              <input
                type="text"
                ref={refConference}
                defaultValue={team_conference}
              />

              <p>Year of foundation</p>
              <input
                type="number"
                max="9999"
                ref={refYearFoundation}
                defaultValue={team_yearFoundation}
              />
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
