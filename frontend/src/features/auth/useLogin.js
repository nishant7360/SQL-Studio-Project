import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "@/services/apiAuth";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function loginUser(form) {
    setIsLoading(true);
    try {
      await login(form);
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
