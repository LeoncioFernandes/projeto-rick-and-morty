import axios from "axios";

const instanceApiService = axios.create({
	baseURL: "https://rickandmortyapi.com/api/",
});

export { instanceApiService };
