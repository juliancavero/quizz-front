import { endpoints } from "@/api/endpoints";
import buildUrl from "@/api/utils/buildUrl";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type PostExampleBody = {
  example: string;
};

type Response = {
  data: string;
};

type APIError = {
  message: string;
};

const postExample = async (body: PostExampleBody): Promise<Response> => {
  const url = buildUrl(endpoints.EXAMPLE_TREE.POST_EXAMPLE, {});

  try {
    const { data } = await axios.post<Response>(url, {
      example: body.example,
    });
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err.response?.data as APIError;
  }
};

const usePostExample = () => {
  return useMutation<Response, APIError, PostExampleBody>({
    mutationFn: (body: PostExampleBody) => postExample(body),
  });
};

export default usePostExample;
