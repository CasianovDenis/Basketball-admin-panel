import Toastify from "toastify-js";
import Team_objectOptions from "../../common/interfaces/Team_objectOptions";

export default function Update_player(
  team_object: Team_objectOptions,
  callback: any
) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "PUT",
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
      id: team_object.id,
    }),
  };

  fetch("http://dev.trainee.dex-it.ru/api/Team/Update", requestOptions)
    .then((responseData) => {
      Toastify({
        text: "Team information changed successfully",
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
