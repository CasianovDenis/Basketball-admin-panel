import Toastify from "toastify-js";
import Team_objectOptions from "../../modules/teams/interfaces/Team_objectOptions";

export default function Create_team(
  team_object: Team_objectOptions,
  callback: any
) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      name: team_object.team_name,
      foundationYear: team_object.team_yearfoundation,
      division: team_object.team_division,
      conference: team_object.team_conference,
      imageUrl: team_object.image_url,
    }),
  };

  fetch("http://dev.trainee.dex-it.ru/api/Team/Add", requestOptions)
    .then((responseData) => {
      Toastify({
        text: "Team added successfully",
        className: "info",
        style: {
          background: "linear-gradient(to right, #1d976c, #93f9b9)",
        },
      }).showToast();
    })
    .catch((ex) => {
      Toastify({
        text: "Something wrong ",
        className: "info",
        style: {
          background: "linear-gradient(to right, #eb3349, #f45c43)",
        },
      }).showToast();
    });
}
