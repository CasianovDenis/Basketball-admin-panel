import Toastify from "toastify-js";

export default function Delete_teams_image(file_name: any, callback: any) {
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
    "http://dev.trainee.dex-it.ru/api/Image/DeleteImage?fileName=" + file_name,
    requestOptions
  ).then((responseData) => {
    Toastify({
      text: "Operation canceled successfully",
      className: "info",
      style: {
        background: "linear-gradient(to right, #1d976c, #93f9b9)",
      },
    }).showToast();
  });
}
