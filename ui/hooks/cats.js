import useSWR from "swr";
import { fetchAllCats } from "../services/cats";
import { API_ENDPOINTS } from "../util/api";

export const useFetchAllCats = () => {
  const fetcher = async () => await fetchAllCats();
  const swrOptions = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  const { error, data: cats } = useSWR(API_ENDPOINTS.cats, fetcher, swrOptions);
  if (error) {
    console.error(error);
    throw error;
  }
  return cats;
};
