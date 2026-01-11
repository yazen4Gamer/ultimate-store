"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginDialog } from "@/components/auth/login-dialog";
import { RegisterDialog } from "@/components/auth/register-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Gamepad2,
  List,
  Search,
  User,
  ShoppingCart,
  Heart,
  History,
  HelpCircle,
  Mail,
  Menu,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All Categories", href: "/categories" },
  { name: "Action", href: "/products?category=action" },
  { name: "Adventure", href: "/products?category=adventure" },
  { name: "RPG", href: "/products?category=rpg" },
  { name: "Shooter", href: "/products?category=shooter" },
  { name: "Sports", href: "/products?category=sports" },
  { name: "Racing", href: "/products?category=racing" },
  { name: "Strategy", href: "/products?category=strategy" },
  { name: "Puzzle", href: "/products?category=puzzle" },
];

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Ultimate Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
            <Home className="h-4 w-4" />
            Home
          </Link>
          

        <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium hover:text-primary">
            <List className="h-4 w-4" />
            Categories
            <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem asChild>
            <Link href="/categories">All Categories</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {categories.map((category) => (
            <DropdownMenuItem key={category.name} asChild>
                <Link href={category.href}>
                {category.name}
                </Link>
            </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>

          {/* Search Bar */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-10"
            />
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Profile & Cart */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Profile</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <LoginDialog>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <User className="mr-2 h-4 w-4" />
                        Login
                    </DropdownMenuItem>
                    </LoginDialog>
                    <RegisterDialog>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <User className="mr-2 h-4 w-4" />
                        Register
                    </DropdownMenuItem>
                    </RegisterDialog>
                    <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                        FAQ
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                        Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                    <Link href="/wishlist">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                    <Link href="/orders">
                        <History className="mr-2 h-4 w-4" />
                        Order History
                    </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/cart" className="flex items-center gap-3 text-sm font-medium">
            <Button variant="outline" size="sm" className="gap-2 relative">
              <ShoppingCart className="h-4 w-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search games..."
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Link href="/" className="flex items-center gap-3 text-sm font-medium">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium flex items-center gap-3">
                      <List className="h-4 w-4" />
                      Categories
                    </p>
                    <div className="ml-7 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block text-sm text-muted-foreground hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <User className="h-4 w-4" />
                    Login
                  </Button>
                  <Link href="/cart" className="flex items-center gap-3 text-sm font-medium">
                  <Button variant="outline" className="w-full justify-start gap-3 relative">
                    <ShoppingCart className="h-4 w-4" />
                    Cart
                    {cartCount > 0 && (
                      <span className="absolute right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}