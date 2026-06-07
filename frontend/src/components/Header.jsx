import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/features/auth/useLogout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/questionset", label: "Questions" },
];

function Header({ user, isAuthenticated }) {
  const navigate = useNavigate();
  const { logoutUser } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="border-b border-zinc-800 sticky top-0 z-50"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">
              <Link to="/">S</Link>
            </span>
          </div>
          <span className="text-base font-semibold tracking-tight text-zinc-100">
            <Link to="/">SQL Studio</Link>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-5 ml-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-zinc-100 bg-zinc-800"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-zinc-700 text-zinc-100">
                        {user?.avatar ? (
                          <img src={user.avatar} alt="avatar" />
                        ) : (
                          user?.name?.[0]?.toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={logoutUser}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="h-8 text-xs border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t border-zinc-800 px-4 py-4 flex flex-col gap-2"
          style={{ backgroundColor: "#18181b" }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-zinc-100 bg-zinc-800"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="border-t border-zinc-800 pt-3 mt-1">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-zinc-700 text-zinc-100 text-xs">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">
                      {user?.name}
                    </p>
                    <p className="text-xs text-zinc-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-sm px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-sm px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    logoutUser();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-sm px-3 py-2 rounded-md text-red-500 hover:bg-zinc-800 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <Button
                className="w-full h-9 text-sm"
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
