import { ImagePlus } from "lucide-react";

function AvatarTab({ user }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-zinc-100 mb-5">Avatar</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
          <span className="text-3xl font-bold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase()}
          </span>
        </div>
        <div
          className="w-full border-2 border-dashed border-zinc-700 rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-zinc-500 transition-colors"
          onClick={() => document.getElementById("avatar-upload").click()}
        >
          <ImagePlus className="w-6 h-6 text-zinc-500" />
          <p className="text-xs text-zinc-500">Click to upload avatar</p>
          <p className="text-[10px] text-zinc-700">PNG, JPG up to 2MB</p>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
export default AvatarTab;
