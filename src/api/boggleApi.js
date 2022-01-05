import axios from "axios"

const baseUrl = "http://localhost:8080";

const createLobby = async () => {
    const response = await axios.post(`${baseUrl}/createLobby`).catch(reason => console.log(reason));
    return response.data;
}

const api = {
    createLobby
}

export default api;