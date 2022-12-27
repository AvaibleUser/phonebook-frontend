import axios from "axios";

const baseUrl = "/api/persons";

const getResponseData = async (request) => {
  const response = await request;

  return await response.data;
};

const getPersons = () => {
  return getResponseData(axios.get(baseUrl));
};

const addPerson = (person) => {
  return getResponseData(axios.post(baseUrl, person));
};

const modifyPerson = async (id, person) => {
  return getResponseData(axios.put(`${baseUrl}/${id}`, person));
};

export default { getPersons, addPerson, modifyPerson };
