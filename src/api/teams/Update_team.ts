import Toastify from "toastify-js";

export default function Update_player(
  team_name: any,
  team_yearfoundation: any,
  team_division: any,
  team_conference: any,
  image_url: any,
  team_id: any,
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
      name: team_name,
      foundationYear: team_yearfoundation,
      division: team_division,
      conference: team_conference,
      imageUrl: image_url,
      id: team_id,
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
