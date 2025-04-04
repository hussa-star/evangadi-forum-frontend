import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:5500/api",
});

export default Instance;
