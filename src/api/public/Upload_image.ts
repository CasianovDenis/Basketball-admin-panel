import axios from "axios";
import Toastify from "toastify-js";

export default function Upload_teams_image(file: any, callback: any) {
  const token = localStorage.getItem("JWToken");

  const filedata = new FormData();
  filedata.append("File", file);

  const result = axios.post(
    "http://dev.trainee.dex-it.ru/api/Image/SaveImage",
    filedata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );
  result
    .then((response) => {
      callback(response.data);
      Toastify({
        text: "Image saved",
        className: "info",
        style: {
          background: "linear-gradient(to right, #1d976c, #93f9b9)",
        },
      }).showToast();
    })
    .catch((ex) => {
      Toastify({
        text: "Wrong image format ",
        className: "info",
        style: {
          background: "linear-gradient(to right, #eb3349, #f45c43)",
        },
      }).showToast();
    });
}
