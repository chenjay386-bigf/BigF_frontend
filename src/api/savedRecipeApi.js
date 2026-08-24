
import api from "./api";

export const saveRecipe = async (recipeId) => {
  const response = await api.post("/saved-recipes", {
    recipe_id: recipeId,
  });

  return response.data;
};

export const unsaveRecipe = async (recipeId) => {
  const response = await api.delete(`/saved-recipes/${recipeId}`);
  return response.data;
};

export const getSavedRecipes = async () => {
  const response = await api.get("/saved-recipes");
  return response.data;
};
