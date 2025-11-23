import httpClient from "../utils/httpClient";

const createTinyLink = async (data) => {
  const response = await httpClient.post("/api/links", data);
  if (!response?.success) throw new Error(response?.message);
  return response;
};

const getAllTinyLinks = async () => {
  const response = await httpClient.get("/api/links");
  if (!response?.success) throw new Error(response?.message);
  return response;
};

const getTinyLinkStats = async (code) => {
  const response = await httpClient.get(`/api/links/${code}`);
  if (!response?.success) throw new Error(response?.message);
  return response;
};

const deleteTinyLink = async (code) => {
  const response = await httpClient.delete(`/api/links/${code}`);
  if (!response?.success) throw new Error(response?.message);
  return response;
};

export { createTinyLink, getAllTinyLinks, getTinyLinkStats, deleteTinyLink };
