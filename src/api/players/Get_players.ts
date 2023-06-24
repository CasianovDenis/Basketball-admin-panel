import Toastify from "toastify-js";

export default function Get_players(
  player_name: string,
  page_number: number,
  page_size: number,
  id_team: number,
  callback: any
) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  if (id_team === 0)
    fetch(
      "http://dev.trainee.dex-it.ru/api/Player/GetPlayers?Name=" +
        player_name +
        "&Page=" +
        page_number +
        "&PageSize=" +
        page_size,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        callback(response);
      })
      .catch((ex) => {
        Toastify({
          text: "Wrong token ",
          className: "info",
          style: {
            background: "linear-gradient(to right, #eb3349, #f45c43)",
          },
        }).showToast();
        localStorage.removeItem("JWToken");
        window.location.assign("/");
      });
  else
    fetch(
      "http://dev.trainee.dex-it.ru/api/Player/GetPlayers?Name=" +
        player_name +
        "&Page=" +
        page_number +
        "&TeamIds=" +
        id_team +
        "&PageSize=" +
        page_size,

      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        callback(response);
      })
      .catch((ex) => {
        Toastify({
          text: "Wrong token ",
          className: "info",
          style: {
            background: "linear-gradient(to right, #eb3349, #f45c43)",
          },
        }).showToast();
        localStorage.removeItem("JWToken");
        window.location.assign("/");
      });
}
