import { endpoints } from "@/api/endpoints";
import buildUrl from "@/api/utils/buildUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GetExampleByIdParams = {
  id: string;
};

type Response = {
  data: string;
};

const getExample = async ({ id }: GetExampleByIdParams) => {
  const url = buildUrl(endpoints.EXAMPLE_TREE.GET_EXAMPLE_BY_ID, {
    id,
  });
  try {
    const { data } = await axios.get<Response>(url);
    return data;
  } catch (error) {}
};

const useGetExampleById = (params: GetExampleByIdParams) => {
  return useQuery({
    queryKey: ["example", params.id],
    queryFn: () => getExample(params),
  });
};

export default useGetExampleById;
