import Logo from "@/components/navbar/logo";
import ThemeToggle from "@/components/navbar/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FileTextIcon, HomeIcon, LayersIcon } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/tohdos", label: "Tohdos", icon: LayersIcon },
  { href: "/archive", label: "Archive", icon: FileTextIcon },
];

const Navbar: React.FC = () => {
  return (
    <nav className="border shadow px-4 md:px-6 bg-gray-100/30 backdrop-blur-md dark:bg-muted rounded-full mx-auto fixed w-5/12 top-4 ">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
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
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="flex-row items-center gap-2 py-1.5"
                          // active={link.active}
                        >
                          <Icon
                            size={16}
                            className="text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavLink
                      to={link.href}
                      // className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                      className={({ isActive }) =>
                        cn(
                          "flex font-medium flex-col gap-1 rounded-md p-2 text-sm transition-all outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active]:bg-accent data-[active]:text-accent-foreground data-[active]:hover:bg-accent data-[active]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
                          isActive && "bg-accent",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link to="/auth/sign-in">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="text-sm">
              <Link to="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
          {/* User menu */}
          {/* <UserMenu /> */}

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
