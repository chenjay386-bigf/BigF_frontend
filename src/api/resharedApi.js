
import api from "./api";

export const resharePost = async (postId) => {
  const response = await api.post("/reshares", {
    post_id: postId,
  });

  return response.data;
};

export const removeReshare = async (postId) => {
  const response = await api.delete(`/reshares/${postId}`);
  return response.data;
};

export const getReshares = async () => {
  const response = await api.get("/reshares");
  return response.data;
};
