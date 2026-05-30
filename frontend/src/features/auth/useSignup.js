import { signup } from "@/services/apiAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function signupUser(form) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await signup(form);
      toast.success("User created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { signupUser, isLoading, error };
}

export default useSignup;
