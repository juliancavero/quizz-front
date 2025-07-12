import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type LoginParams = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
};

const login = async ({ username, password }: LoginParams) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      "https://automated-media.onrender.com/auth/api/login",
      { username, password }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export default useLogin;
