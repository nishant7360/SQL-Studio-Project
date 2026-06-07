import { useState } from "react";
import { uploadAvatar } from "@/services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUploadAvatar() {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  async function upload(file) {
    setIsUploading(true);
    try {
      await uploadAvatar(file);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Avatar updated!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  }

  return { upload, isUploading };
}

export default useUploadAvatar;
