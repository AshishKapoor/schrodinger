import API, { API_ENDPOINTS } from '../util/api';

export const fetchAllCats = async () => {
  try {
    const { status, data } = await API.get(API_ENDPOINTS.cats);
    return status === 200 && data;
  } catch (error) {
    throw error;
  }
};
