
import api from "./api";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const getPost = async (postId) => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
};

export const createPost = async (data) => {
  const response = await api.post("/posts", data);
  return response.data;
};

export const updatePost = async (postId, data) => {
  const response = await api.put(`/posts/${postId}`, data);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};