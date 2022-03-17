import useSWR from "swr";
import { fetchAllCats } from "../services/cats";
import { API_ENDPOINTS } from "../util/api";

const FIVE_SECONDS = 5000;

export const useFetchAllCats = () => {
  const fetcher = async () => await fetchAllCats();
  const swrOptions = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: FIVE_SECONDS,
  };
  const { error, data: cats } = useSWR(API_ENDPOINTS.cats, fetcher, swrOptions);
  if (error) {
    console.error(error);
    throw error;
  }
  return cats;
};
