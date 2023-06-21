import Toastify from "toastify-js";

export default function Update_player(player_object: any, callback: any) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "PUT",
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
      id: player_object.id,
    }),
  };

  fetch("http://dev.trainee.dex-it.ru/api/Player/Update", requestOptions)
    .then((responseData) => {
      Toastify({
        text: "Player information changed successfully",
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