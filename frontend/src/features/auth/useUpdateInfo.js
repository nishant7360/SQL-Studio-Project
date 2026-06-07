import { updateInfo } from "@/services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

function useUpdateInfo() {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  async function update(name) {
    try {
      setIsUpdating(true);
      await updateInfo(name);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Info updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  }
  return { update, isUpdating };
}
export default useUpdateInfo;
