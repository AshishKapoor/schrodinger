import useSWR from "swr";
import { fetchAllPosts } from "../services/posts";
import { API_ENDPOINTS } from "../util/api";

export const useFetchAllPosts = () => {
  const fetcher = async () => await fetchAllPosts();
  const swrOptions = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  const { error, data: posts } = useSWR(API_ENDPOINTS.posts, fetcher, swrOptions);
  if (error) {
    console.error(error);
    throw error;
  }
  return posts;
};
