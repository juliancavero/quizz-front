import { endpoints } from "@/api/endpoints";
import buildUrl from "@/api/utils/buildUrl";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type PutExampleBody = {
  example: string;
};

type Response = {
  data: string;
};

type APIError = {
  message: string;
};

const putExample = async (
  id: string,
  body: PutExampleBody
): Promise<Response> => {
  const url = buildUrl(endpoints.EXAMPLE_TREE.PUT_EXAMPLE, { id });
  try {
    const { data } = await axios.put<Response>(url, body);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err.response?.data as APIError;
  }
};

const usePutExample = () => {
  return useMutation<Response, APIError, { id: string; body: PutExampleBody }>({
    mutationFn: ({ id, body }) => putExample(id, body),
  });
};

export default usePutExample;
