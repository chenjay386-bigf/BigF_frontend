
import api from "./api";

export const rateRecipe = async (data) => {
  const response = await api.post("/ratings", data);
  return response.data;
};

export const getRecipeRatings = async (recipeId) => {
  const response = await api.get(`/ratings/recipe/${recipeId}`);
  return response.data;
};
