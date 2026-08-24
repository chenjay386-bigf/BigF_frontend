
import api from "./api";

export const loginUser = async ({ email, password }) => {
  const response = await api.post("/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
