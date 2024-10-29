import axios from "axios";

const action = axios.create({
  baseURL: "https://studfit-54c0c4c93256.herokuapp.com/api/v1.0/",
});

export { action };
