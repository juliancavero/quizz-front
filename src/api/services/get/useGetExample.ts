import { endpoints } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GetExampleParams = {};

type Response = {
  data: string;
};

const getExample = async ({}: GetExampleParams) => {
  try {
    const { data } = await axios.get<Response>(
      endpoints.EXAMPLE_TREE.GET_EXAMPLE
    );
    return data;
  } catch (error) {}
};

const useGetExample = (params: GetExampleParams) => {
  return useQuery({
    queryKey: ["example"],
    queryFn: () => getExample(params),
  });
};

export default useGetExample;
