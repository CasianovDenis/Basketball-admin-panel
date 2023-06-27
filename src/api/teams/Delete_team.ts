import Toastify from "toastify-js";

export default function Delete_team(team_id: number, callback: any) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({}),
  };

  fetch(
    "http://dev.trainee.dex-it.ru/api/Team/Delete?id=" + team_id,
    requestOptions
  )
    .then((responseData) => {
      Toastify({
        text: "Team deleted succesfully",
        className: "info",
        style: {
          background: "linear-gradient(to right, #1d976c, #93f9b9)",
        },
      }).showToast();
      window.location.assign("/Teams");
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
