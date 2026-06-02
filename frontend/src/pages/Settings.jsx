import { useState } from "react";
import ChangePassword from "@/features/auth/ChangePassword";
import { useGetMe } from "@/features/auth/useGetMe";
import { User, Lock, ImagePlus } from "lucide-react";
import ProfileTab from "@/components/ProfileTab";
import AvatarTab from "@/components/AvatarTab";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Password", icon: Lock },
  { id: "avatar", label: "Avatar", icon: ImagePlus },
];

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useGetMe();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-xl font-semibold text-zinc-100 mb-1">Settings</h1>
      <p className="text-xs text-zinc-500 mb-8">Manage your account settings</p>

      <div className="flex gap-6">
        <div
          className="w-48 shrink-0 rounded-xl border border-zinc-800 p-2 h-fit"
          style={{ backgroundColor: "#27272a" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="flex-1 rounded-xl border border-zinc-800 p-6"
          style={{ backgroundColor: "#27272a" }}
        >
          {activeTab === "profile" && <ProfileTab user={user} />}
          {activeTab === "password" && <ChangePassword />}
          {activeTab === "avatar" && <AvatarTab user={user} />}
        </div>
      </div>
    </div>
  );
}

export default Settings;
