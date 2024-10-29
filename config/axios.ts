import axios from "axios";

const action = axios.create({
  baseURL: "http://localhost:8080/api/v1.0/",
});

export { action };
