import { useQuery } from '@tanstack/react-query';

const useGetCategory = (id) => {
  const {
    isPending,
    isError,
    data: category = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/api/insurance/category`);
      return res.json();
    },
  });
  return [category, refetch];
};

export default useGetCategory;