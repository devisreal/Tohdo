import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AuthUser } from "@/contexts/auth-context";
import {
  ArchiveIcon,
  Layers2Icon,
  LogOutIcon,
  UserRoundIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type UserMenuProps = {
  user: AuthUser;
  isLoggingOut: boolean;
  onLogout: () => Promise<void>;
};

export default function UserMenu({
  user,
  isLoggingOut,
  onLogout,
}: UserMenuProps) {
  const navigate = useNavigate();
  const initials = user.email.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto p-0 hover:bg-transparent cursor-pointer rounded-full"
        >
          <Avatar>
            <AvatarImage alt="Profile image" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 mt-1" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            Signed in user
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => navigate("/profile")}
            className="cursor-pointer"
          >
            <UserRoundIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate("/tohdos")}
            className="cursor-pointer"
          >
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Tohdos</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate("/archive")}
            className="cursor-pointer"
          >
            <ArchiveIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Archive</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoggingOut}
          onSelect={(event) => {
            event.preventDefault();
            void onLogout();
          }}
          className="cursor-pointer text-red-500/90 dark:text-red-400/90 group"
        >
          <LogOutIcon
            size={16}
            className="opacity-60 group-hover:text-red-500 dark:group-hover:text-red-500"
            aria-hidden="true"
          />
          <span className="group-hover:text-red-500 dark:group-hover:text-red-500">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
