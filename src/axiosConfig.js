import axios from "axios";

const Instance = axios.create({
  baseURL: "http://hussacodes.com/api",
});

export default Instance;
