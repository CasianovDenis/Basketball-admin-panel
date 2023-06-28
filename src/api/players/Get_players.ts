import Toastify from "toastify-js";

export default function Get_players(
  player_name: string,
  page_number: number,
  page_size: number,
  id_teams: { team_id: number }[],
  callback?: any
) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  if (id_teams[0].team_id > 0 && player_name.length > 0) {
    let team_id_fetch = "";
    let text = "";
    for (let index = 0; index < id_teams.length; index++) {
      text = "&TeamIds=" + id_teams[index].team_id;
      team_id_fetch = team_id_fetch + text;
    }

    fetch(
      "http://dev.trainee.dex-it.ru/api/Player/GetPlayers?Name=" +
        player_name +
        "&Page=" +
        page_number +
        team_id_fetch +
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
  } else
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
}
