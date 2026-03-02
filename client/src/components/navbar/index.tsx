import Logo from "@/components/navbar/logo";
import ThemeToggle from "@/components/navbar/theme-toggle";
import UserMenu from "@/components/navbar/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { FileTextIcon, HomeIcon, LayersIcon } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/tohdos", label: "Tohdos", icon: LayersIcon },
  { href: "/archive", label: "Archive", icon: FileTextIcon },
];

// Track if animation has played in this session (resets on page reload)
let hasAnimated = false;

const Navbar: React.FC = () => {
  const { isAuthenticated, status, user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  React.useEffect(() => {
    hasAnimated = true;
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <motion.nav
      initial={!hasAnimated ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-full max-w-xl md:max-w-2xl rounded-full border  px-3 ps-4 shadow-sm border-border/60 bg-background/70 backdrop-blur-xl dark:bg-card/70 dark:border-border/80 dark:shadow-black/40"
    >
      <div className="flex h-15 items-center justify-between">
        {/* Left side - Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          {!isAuthenticated && !user && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 px-4 md:hidden rounded-full"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-48 p-2 md:hidden">
                <div className="flex flex-col gap-1">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavLink
                        key={index}
                        to={link.href}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                          )
                        }
                      >
                        <Icon size={16} />
                        {link.label}
                      </NavLink>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <ThemeToggle className="" />
                </div>
              </PopoverContent>
            </Popover>
          )}
          {/* Mobile menu trigger */}

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="hidden font-bold tracking-tight md:inline-block">
              Tohdo
            </span>
          </Link>
        </div>

        {/* Center - Navigation Links (Desktop) */}
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList className="gap-1">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors hover:text-foreground/80",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-accent/50",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 rounded-full bg-primary/20 dark:bg-white/10"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.1,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </>
                  )}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side - Auth & Theme */}
        <div className="flex items-center gap-2">
          {status !== "checking" && (
            <div className="flex items-center gap-2">
              {isAuthenticated && user ? (
                <UserMenu
                  user={user}
                  isLoggingOut={isLoggingOut}
                  onLogout={handleLogout}
                />
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <Link to="/auth/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild size="sm" className="rounded-full px-4">
                    <Link to="/auth/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          )}
          <ThemeToggle
            className={`${!isAuthenticated && !user && "hidden md:inline"}`}
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
