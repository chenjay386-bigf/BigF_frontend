
import api from "./api";

export const likePost = async (postId) => {
  const response = await api.post("/likes", {
    post_id: postId,
  });

  return response.data;
};

export const unlikePost = async (postId) => {
  const response = await api.delete(`/likes/${postId}`);
  return response.data;
};

export const getPostLikes = async (postId) => {
  const response = await api.get(`/likes/post/${postId}`);
  return response.data;
};