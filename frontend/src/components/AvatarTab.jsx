import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import useUploadAvatar from "@/features/auth/useUploadAvatar";
import { Spinner } from "@/components/ui/spinner";

function AvatarTab({ user }) {
  const { upload, isUploading } = useUploadAvatar();
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) upload(file);
  }

  return (
    <div>
      <h2 className="text-sm font-medium text-zinc-100 mb-5">Avatar</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-primary flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase()}
            </span>
          )}
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-zinc-700 rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-zinc-500 transition-colors"
        >
          {isUploading ? (
            <Spinner className="size-5" />
          ) : (
            <>
              <ImagePlus className="w-6 h-6 text-zinc-500" />
              <p className="text-xs text-zinc-500">Click to upload avatar</p>
              <p className="text-[10px] text-zinc-700">
                PNG, JPG, WEBP up to 2MB
              </p>
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default AvatarTab;
