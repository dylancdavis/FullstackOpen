import axios from "axios";

const baseUrl = "/api/users";

const getAll = async () => (await axios.get(baseUrl)).data;

const userService = { getAll };
export default userService;
