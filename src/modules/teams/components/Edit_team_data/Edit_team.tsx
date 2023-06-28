import React, { useEffect, useState, createRef } from "react";
import style from "./EditTeam.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Toastify from "toastify-js";
import "../../../../pages/css/loading_spinner.css";

import { useDispatch } from "react-redux";
import { store } from "../../../../configs/redux/store/store";
import { RootState } from "../../../../configs/redux/store/store";
import { saveImageName } from "../../../../configs/redux/actions/ImageData";

import Upload_image from "../../../../api/public/Upload_image";
import Delete_image from "../../../../api/public/Delete_image";
import Update_team from "../../../../api/teams/Update_team";
import Get_team from "../../../../api/teams/Get_team";

export default function Edit_team() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [image_url, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [team_name, setTeamName] = useState("");
  const [team_division, setTeamDivision] = useState("");
  const [team_conference, setTeamConference] = useState("");
  const [team_yearFoundation, setTeamYearFoundation] = useState(0);

  const [wrong_name, setWrongName] = useState("");
  const [wrong_division, setWrongDivision] = useState("");
  const [wrong_conference, setWrongConference] = useState("");
  const [wrong_yearFoundation, setWrongYearFoundation] = useState("");

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
      dispatch(saveImageName(get_name.toString()));
    });
  };

  const cancel_uplaod = () => {
    let value = store.getState();
    if (value.data.name_img !== null)
      Delete_image(value.data.name_img, function (result: any) {});
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
        setWrongName("");
        setWrongYearFoundation("");
        setWrongConference("");
        setWrongDivision("");
        if (yearfoundation.length > 0 && yearfoundation.length <= 4) {
          if (image_url !== null) {
            let team = {
              team_name: name,
              team_yearfoundation: Number(yearfoundation),
              team_division: division,
              team_conference: conference,
              image_url: image_url,
              id: team_id,
            };

            Update_team(team, function (result: any) {});
            navigate("/TeamInformation", {
              state: { team_id: team_id },
            });
            setMessage("");
          } else setMessage("Please upload image");
        } else setMessage("Incorrect year");
      } else {
        setWrongName("Fields can't be empty");
        setWrongYearFoundation("Fields can't be empty");
        setWrongConference("Fields can't be empty");
        setWrongDivision("Fields can't be empty");
      }
    }
  };
  if (team_yearFoundation > 0)
    return (
      <div className={style.container}>
        <div style={{ margin: "20px" }}>
          <label
            onClick={() => navigate("/Teams")}
            style={{ cursor: "pointer", color: "#e4163a" }}
          >
            Teams/
          </label>
          <label style={{ color: "#e4163a" }}>Edit team information</label>
        </div>
        <div className={style.container_editteam}>
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
            <form style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <label>Name</label>
                <input type="text" ref={refName} defaultValue={team_name} />
                <p style={{ color: "red" }}>{wrong_name}</p>
              </div>
              <div>
                <label>Division</label>
                <input
                  type="text"
                  ref={refDivision}
                  defaultValue={team_division}
                />
                <p style={{ color: "red" }}>{wrong_division}</p>
              </div>
              <div>
                <label>Conference</label>
                <input
                  type="text"
                  ref={refConference}
                  defaultValue={team_conference}
                />
                <p style={{ color: "red" }}>{wrong_conference}</p>
              </div>
              <div>
                <label>Year of foundation</label>
                <input
                  type="number"
                  max="9999"
                  ref={refYearFoundation}
                  defaultValue={team_yearFoundation}
                />
                <p style={{ color: "red" }}>{wrong_yearFoundation}</p>
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
