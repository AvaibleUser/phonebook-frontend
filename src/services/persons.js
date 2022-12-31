import axios from "axios";

const baseUrl = "/api/persons";

const getResponseData = async (request) => {
  const response = await request;

  return response.data;
};

const getAll = () => getResponseData(axios.get(baseUrl));

const add = (person) => getResponseData(axios.post(baseUrl, person));

const modify = (person) =>
  getResponseData(axios.put(`${baseUrl}/${person.id}`, person));

const remove = (id) => getResponseData(axios.delete(`${baseUrl}/${id}`));

export default { getAll, add, modify, remove };
