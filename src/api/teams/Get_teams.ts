import Toastify from "toastify-js";

export default function Get_teams(
  team_name: any,
  page_number: any,
  page_size: any,
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

  fetch(
    "http://dev.trainee.dex-it.ru/api/Team/GetTeams?Name=" +
      team_name +
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
