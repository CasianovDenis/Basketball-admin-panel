import Toastify from "toastify-js";

export default function Get_team(response_array: any, callback: any) {
  const token = localStorage.getItem("JWToken");
  let players_array = new Array(response_array.length);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  for (let index = 0; response_array.length > index; index++)
    fetch(
      "http://dev.trainee.dex-it.ru/api/Team/Get?id=" +
        response_array[index].team,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        players_array[index] = {
          name: response_array[index].name,
          avatarUrl: response_array[index].avatarUrl,
          number: response_array[index].number,
          team: response.name,
        };
      })
      .catch((ex) => {
        Toastify({
          text: "Wrong token ",
          className: "info",
          style: {
            background: "linear-gradient(to right, #eb3349, #f45c43)",
          },
        }).showToast();
        //localStorage.removeItem("JWToken");
        //window.location.assign("/");
      });

  callback(players_array);
}
