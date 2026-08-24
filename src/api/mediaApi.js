
import api from "./api";

export const getMedia = async () => {
  const response = await api.get("/media");
  return response.data;
};

export const uploadMedia = async (formData) => {
  const response = await api.post("/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteMedia = async (mediaId) => {
  const response = await api.delete(`/media/${mediaId}`);
  return response.data;
};
