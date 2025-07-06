import { endpoints } from "@/api/endpoints";
import buildUrl from "@/api/utils/buildUrl";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type Response = {
  data: string;
};

type APIError = {
  message: string;
};

const deleteExample = async (id: string): Promise<Response> => {
  const url = buildUrl(endpoints.EXAMPLE_TREE.DELETE_EXAMPLE, { id });
  try {
    const { data } = await axios.delete<Response>(url);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err.response?.data as APIError;
  }
};

const useDeleteExample = () => {
  return useMutation<Response, APIError, string>({
    mutationFn: (id: string) => deleteExample(id),
  });
};

export default useDeleteExample;
