import API, { API_ENDPOINTS } from '../util/api';

export const fetchAllPosts = async () => {
  try {
    const { status, data } = await API.get(API_ENDPOINTS.posts);
    return status === 200 && data;
  } catch (error) {
    throw error;
  }
};
