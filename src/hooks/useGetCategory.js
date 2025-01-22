import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../components/axiosInstance";

const useGetCategory = (id) => {
  const {
    isPending,
    isError,
    data: category = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosInstance.get('insurance/category', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data; // Use response.data instead of response.json()
    },
  });
  return [category, refetch];
};

export default useGetCategory;