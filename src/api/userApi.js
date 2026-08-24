
import api from "./api";


// PROFILE
export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await api.get(`/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/profile", data);
  return response.data;
};


// FOLLOW
export const followUser = async (userId) => {
  const response = await api.post(`/follow/${userId}`);
  return response.data;
};

export const unfollowUser = async (userId) => {
  const response = await api.delete(`/follow/${userId}`);
  return response.data;
};

export const getFollowers = async (userId) => {
  const response = await api.get(`/follow/${userId}/followers`);
  return response.data;
};

export const getFollowing = async (userId) => {
  const response = await api.get(`/follow/${userId}/following`);
  return response.data;
};
