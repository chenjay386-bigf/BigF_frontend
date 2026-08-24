
import api from "./api";

export const getIngredients = async () => {
  const response = await api.get("/ingredients");
  return response.data;
};

export const getIngredient = async (id) => {
  const response = await api.get(`/ingredients/${id}`);
  return response.data;
};

export const createIngredient = async (data) => {
  const response = await api.post("/ingredients", data);
  return response.data;
};