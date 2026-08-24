
import api from "./api";

export const submitSocialMediaPost = async (data) => {
  const response = await api.post(
    "/social-media-submissions",
    data
  );

  return response.data;
};

export const getSocialMediaSubmissions = async () => {
  const response = await api.get(
    "/social-media-submissions"
  );

  return response.data;
};

export const deleteSocialMediaSubmission = async (id) => {
  const response = await api.delete(
    `/social-media-submissions/${id}`
  );

  return response.data;
};