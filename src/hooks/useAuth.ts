import { useState, useEffect } from "react";
import useLogin from "@/api/services/auth/useLogin";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { mutate: login, isPending: isLoggingIn } = useLogin();

  useEffect(() => {
    // Auto-login on component mount
    login(
      { username: "boxbox", password: "xobxob" },
      {
        onSuccess: (data) => {
          setAccessToken(data.access_token);
          setIsAuthenticated(true);
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setIsAuthenticated(false);
        },
      }
    );
  }, []);

  return {
    accessToken,
    isAuthenticated,
    isLoggingIn,
  };
};

export default useAuth;
