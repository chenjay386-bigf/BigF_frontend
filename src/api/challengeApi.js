
import api from "./api";


// CHALLENGES
export const getChallenges = async () => {
  const response = await api.get("/challenges");
  return response.data;
};

export const getChallenge = async (id) => {
  const response = await api.get(`/challenges/${id}`);
  return response.data;
};

export const createChallenge = async (data) => {
  const response = await api.post("/challenges", data);
  return response.data;
};

export const updateChallenge = async (id, data) => {
  const response = await api.put(`/challenges/${id}`, data);
  return response.data;
};

export const deleteChallenge = async (id) => {
  const response = await api.delete(`/challenges/${id}`);
  return response.data;
};


// CHALLENGE SUBMISSIONS
export const submitChallengeEntry = async (data) => {
  const response = await api.post(
    "/challenge-submissions",
    data
  );

  return response.data;
};

export const getChallengeSubmissions = async (challengeId) => {
  const response = await api.get(
    `/challenge-submissions/challenge/${challengeId}`
  );

  return response.data;
};


// CHALLENGE VOTES
export const voteForChallengeEntry = async (submissionId) => {
  const response = await api.post(
    "/challenge-votes",
    {
      submission_id: submissionId,
    }
  );

  return response.data;
};

export const removeChallengeVote = async (submissionId) => {
  const response = await api.delete(
    `/challenge-votes/${submissionId}`
  );

  return response.data;
};


// CHALLENGE REWARDS
export const getChallengeRewards = async (challengeId) => {
  const response = await api.get(
    `/challenge-rewards/challenge/${challengeId}`
  );

  return response.data;
};

export const createChallengeReward = async (data) => {
  const response = await api.post(
    "/challenge-rewards",
    data
  );

  return response.data;
};
