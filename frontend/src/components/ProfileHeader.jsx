function ProfileHeader({ user }) {
  return (
    <div
      className="rounded-xl border border-zinc-800 p-6 mb-6 flex items-center gap-4"
      style={{ backgroundColor: "#27272a" }}
    >
      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0">
        <span className="text-2xl font-bold text-primary-foreground">
          {user?.name?.[0]?.toUpperCase()}
        </span>
      </div>
      <div>
        <h1 className="text-lg font-semibold text-zinc-100">{user?.name}</h1>
        <p className="text-xs text-zinc-500">{user?.email}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
