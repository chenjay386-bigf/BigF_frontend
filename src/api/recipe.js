import api from "./api";

// Get all recipes
export const getRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};

// Get one recipe
export const getRecipe = async (recipeId) => {
  const response = await api.get(`/recipes/${recipeId}`);
  return response.data;
};

// Create recipe
export const createRecipe = async (recipeData) => {
  const response = await api.post("/recipes", recipeData);
  return response.data;
};

// Update recipe
export const updateRecipe = async (recipeId, recipeData) => {
  const response = await api.put(`/recipes/${recipeId}`, recipeData);
  return response.data;
};

// Delete recipe
export const deleteRecipe = async (recipeId) => {
  const response = await api.delete(`/recipes/${recipeId}`);
  return response.data;
};