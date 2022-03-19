import API, { API_ENDPOINTS } from "../util/api";

export const fetchAllPosts = async () => {
  try {
    const { status, data } = await API.get(API_ENDPOINTS.posts);
    return status === 200 && data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (params) => {
  const { x, y, type } = params;
  const body = { x, y };

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { status, data } = await API.post(
      `${API_ENDPOINTS.posts}/${type}`,
      body,
      requestOptions
    );
    return status === 200 && data;
  } catch (error) {
    throw error;
  }
};
