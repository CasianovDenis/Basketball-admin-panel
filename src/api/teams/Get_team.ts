import Toastify from "toastify-js";

export default function Get_team(team_id: any, callback: any) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  fetch(
    "http://dev.trainee.dex-it.ru/api/Team/Get?id=" + team_id,
    requestOptions
  )
    .then((response) => response.json())
    .then((response) => {
      callback([response]);
    });
  /*.catch((ex) => {
      Toastify({
        text: "Team not exist ",
        className: "info",
        style: {
          background: "linear-gradient(to right, #eb3349, #f45c43)",
        },
      }).showToast();*/
  //localStorage.removeItem("JWToken");
  //window.location.assign("/");
  // });
}
