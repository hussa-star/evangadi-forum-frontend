import axios from "axios";

const Instance = axios.create({
  baseURL: "https://hussacodes.com/api",
});

export default Instance;
