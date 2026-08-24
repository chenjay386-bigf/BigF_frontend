
import api from "./api";

export const getComments = async (postId) => {
  const response = await api.get(`/comments/post/${postId}`);
  return response.data;
};

export const createComment = async (data) => {
  const response = await api.post("/comments", data);
  return response.data;
};

export const updateComment = async (commentId, data) => {
  const response = await api.put(`/comments/${commentId}`, data);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};
