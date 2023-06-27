export default function Get_player(player_id: number, callback: any) {
  const token = localStorage.getItem("JWToken");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  fetch(
    "http://dev.trainee.dex-it.ru/api/Player/Get?id=" + player_id,
    requestOptions
  )
    .then((response) => response.json())
    .then((response) => {
      callback([response]);
    });
}
