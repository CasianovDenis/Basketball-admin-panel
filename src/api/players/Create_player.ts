import Toastify from "toastify-js";
import Player_objectOptions from "../../modules/players/interfaces/Player_objectOptions";

export default function Create_player(
  player_object: Player_objectOptions,
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
      name: player_object.name,
      number: player_object.number,
      position: player_object.position,
      team: player_object.team,
      birthday: player_object.birthday,
      height: player_object.height,
      weight: player_object.weight,
      avatarUrl: player_object.avatarUrl,
    }),
  };

  fetch("http://dev.trainee.dex-it.ru/api/Player/Add", requestOptions)
    .then((responseData) => {
      Toastify({
        text: "Player added successfully",
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
