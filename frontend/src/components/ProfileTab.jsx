import { useState } from "react";

function ProfileTab({ user }) {
  const [name, setName] = useState(user?.name ?? "");

  return (
    <div>
      <h2 className="text-sm font-medium text-zinc-100 mb-5">Profile Info</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-400">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-9 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-400">Email</label>
          <input
            value={user?.email ?? ""}
            disabled
            className="h-9 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-600 cursor-not-allowed"
          />
          <p className="text-[10px] text-zinc-600">Email cannot be changed</p>
        </div>
        <button className="h-9 px-4 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity w-fit">
          Save Changes
        </button>
      </div>
    </div>
  );
}
export default ProfileTab;
