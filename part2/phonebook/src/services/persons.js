import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (person) => {
	const request = axios.post(baseUrl, person);
	return request.then((response) => response.data);
};

const remove = (personId) => {
	const request = axios.delete(`${baseUrl}/${personId}`);
	return request.then((response) => response.data);
};

const updatePersonNumber = (personId, person) => {
	const request = axios.put(`${baseUrl}/${personId}`, person);
	return request.then((response) => response.data);
};

export default { getAll, create, remove, updatePersonNumber };
