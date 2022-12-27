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

const modifyPerson = async (person) => {
  return getResponseData(axios.put(`${baseUrl}/${person.id}`, person));
};

const removePerson = async (id) => {
  return getResponseData(axios.delete(`${baseUrl}/${id}`));
};

export default { getPersons, addPerson, modifyPerson, removePerson };
