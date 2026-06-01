import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "@/services/apiAuth";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function loginUser(form) {
    setIsLoading(true);
    try {
      await login(form);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/questionset");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { loginUser, isLoading };
}

export default useLogin;
