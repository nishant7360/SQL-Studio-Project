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
import { NavLink, useNavigate } from "react-router-dom";

function Header({ user, isAuthenticated }) {
  const navigate = useNavigate();

  return (
    <header
      className="border-b border-zinc-800 sticky top-0 z-50"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">
                S
              </span>
            </div>
            <span className="text-base font-semibold tracking-tight text-zinc-100">
              SQL Studio
            </span>
          </div>

          <nav className="flex items-center gap-5 ml-20">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-zinc-100 bg-zinc-800"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/questionset"
              className={({ isActive }) =>
                `text-sm px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-zinc-100 bg-zinc-800"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                }`
              }
            >
              Questions
            </NavLink>
          </nav>
        </div>

        {/* Right side */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-zinc-700 text-zinc-100">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
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
    </header>
  );
}

export default Header;
