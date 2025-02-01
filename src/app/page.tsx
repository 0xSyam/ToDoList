"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, Sun, Moon, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();

  return (
    <ThemeProvider attribute="class">
      <div className="relative flex min-h-[100vh] flex-col overflow-x-hidden">
        <header className="site-header sticky top-0 z-10 w-full bg-background/80 py-2 backdrop-blur-md dark:bg-background/50">
          <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid h-14 grid-cols-3 items-center">
              <div className="mx-auto lg:mx-0">
                <Link href="/" aria-label="Home Page" className="inline-block">
                  <div className="font-bold text-3xl bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent transition-colors duration-300">
                    ToDo
                  </div>
                </Link>
              </div>

              <div className="order-first md:order-none">
                <div className="hidden items-center justify-center md:flex">
                  {/* Add navigation items here if needed */}
                </div>

                <div className="flex justify-start sm:items-center md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <Menu className="h-8 w-8" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-1">
                <div className="flex space-x-2">
                  <div className="hidden space-x-0.5 md:flex">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Sun className="h-[0.9rem] w-[0.9rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-[0.9rem] w-[0.9rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </div>

                  <Button asChild className="group">
                    <Link href="/signup">
                      Sign Up
                      <ArrowRight className="ml-1 hidden h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 lg:block" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="flex flex-col items-center space-y-4 p-4">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Sun className="h-[0.9rem] w-[0.9rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[0.9rem] w-[0.9rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </header>

        <main className="relative w-full">
          <div className="relative flex flex-col space-y-24 py-14 overflow-x-hidden">
            {/* Hero Section */}
            <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
              <div className="mx-auto flex flex-col space-y-20">
                <div className="mx-auto flex flex-1 flex-col items-center justify-center duration-1000 md:flex-row animate-in fade-in zoom-in-90 slide-in-from-top-36">
                  <div className="flex w-full flex-1 flex-col items-center space-y-6 xl:space-y-8 2xl:space-y-10">
                    <div className="delay-300 duration-700 animate-in fade-in fill-mode-both">
                      <h3 className="space-x-2.5 rounded-full border border-gray-100 px-2 py-2.5 text-center text-sm font-medium text-transparent dark:border-primary/10">
                        <span className="rounded-2xl bg-primary px-2.5 py-1.5 text-sm font-semibold text-primary-foreground">
                          New
                        </span>
                        <span className="text-secondary-foreground">
                          Plan, Organize, and Achieve More in Less Time.
                        </span>
                      </h3>
                    </div>

                    <div className="flex flex-col items-center space-y-8">
                      <h1 className="hero-title flex flex-col text-center font-sans text-4xl font-semibold tracking-tighter dark:text-white sm:text-6xl lg:max-w-5xl lg:text-7xl xl:text-[4.85rem]">
                        <span>The ultimate Task Management</span>
                        <span>for your productivity</span>
                      </h1>

                      <div className="flex max-w-2xl flex-col space-y-1">
                        <h3 className="p-0 text-center font-sans text-xl font-normal tracking-tight text-muted-foreground">
                          Build better habits and boost productivity with our
                          intuitive Todo List Web App. Start organizing your
                          life in minutes, not hours.
                        </h3>
                      </div>
                    </div>

                    <div className="delay-500 duration-1000 animate-in fade-in fill-mode-both">
                      <div className="flex space-x-4">
                        <Button
                          asChild
                          size="lg"
                          className="h-12 rounded-xl px-4 text-base font-semibold transition-all hover:shadow-2xl dark:shadow-primary/30"
                        >
                          <Link href="/signup">
                            <span className="flex items-center space-x-2">
                              <span>Get Started</span>
                              <ArrowRight className="h-4 w-4 animate-in fade-in slide-in-from-left-8 delay-1000 duration-1000 zoom-in fill-mode-both" />
                            </span>
                          </Link>
                        </Button>

                        <Button
                          variant="link"
                          asChild
                          size="lg"
                          className="h-12 rounded-xl px-4 text-base font-semibold"
                        >
                          <Link href="/#">Contact Us</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-full">
                  <div className="mx-auto flex justify-center py-8 delay-1000 duration-1000 animate-in fade-in zoom-in-95 slide-in-from-top-32 fill-mode-both">
                    <Image
                      src="/images/dashboard.png"
                      alt="App Image"
                      width={3558}
                      height={2222}
                      className="rounded-2xl border border-gray-200 dark:border-primary/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
              <div className="flex flex-col space-y-16 xl:space-y-32 2xl:space-y-36">
                <div className="flex flex-col justify-between space-y-8">
                  <div className="flex w-full max-w-5xl flex-col space-y-4">
                    <div className="flex">
                      <div className="flex items-center justify-center space-x-4 rounded-lg p-3 font-semibold">
                        <LayoutDashboard className="h-5" />
                        <span>All-in-one solution</span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-normal tracking-tight xl:text-5xl">
                      <b className="font-semibold dark:text-white">
                        The ultimate Todo List Web App
                      </b>{" "}
                      <span className="font-normal text-muted-foreground">
                        Streamline your workflow and achieve your goals faster
                        with our powerful task management tool.
                      </span>
                    </h3>
                  </div>

                  <div className="grid w-full grid-cols-1 gap-4 space-y-0 lg:grid-cols-3">
                    <Card className="relative col-span-2 overflow-hidden lg:h-96">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          Manage Tasks with Ease
                        </CardTitle>
                        <CardDescription className="max-w-xs text-sm font-semibold tracking-tight">
                          An intuitive dashboard to organize and track all your
                          tasks efficiently.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src="/images/dashboard.png"
                          alt="Dashboard Header"
                          width={2061}
                          height={800}
                          className="absolute right-0 top-0 hidden h-full w-full rounded-tl-2xl border border-border lg:top-36 lg:flex lg:h-auto lg:w-10/12"
                        />
                      </CardContent>
                    </Card>

                    <Card className="relative col-span-2 w-full overflow-hidden lg:col-span-1">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          Authentication
                        </CardTitle>
                        <CardDescription className="max-w-xs text-sm font-semibold tracking-tight">
                          Our app supports multiple sign-in options to make
                          accessing your tasks quick and secure.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src="/images/sign-in.webp"
                          alt="Sign In"
                          width={1760}
                          height={1680}
                          className="absolute left-16 top-32 hidden h-auto w-8/12 rounded-l-2xl lg:flex"
                        />
                      </CardContent>
                    </Card>

                    <Card className="relative col-span-2 overflow-hidden lg:col-span-1 lg:h-96">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          Multi-User Support
                        </CardTitle>
                        <CardDescription className="max-w-xs text-sm font-semibold tracking-tight">
                          Allow multiple users to manage their tasks separately
                          with individual accounts.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src="/images/multi-tenancy.webp"
                          alt="Multi Tenancy"
                          width={2061}
                          height={800}
                          className="absolute right-0 top-0 hidden h-full w-full rounded-tl-2xl border lg:top-28 lg:flex lg:h-auto lg:w-8/12"
                        />
                      </CardContent>
                    </Card>

                    <Card className="relative col-span-2 overflow-hidden lg:h-96">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          Real-time Sync
                        </CardTitle>
                        <CardDescription className="max-w-xs text-sm font-semibold tracking-tight">
                          Sync your tasks across devices in real-time to stay
                          updated no matter where you are.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src="/images/biling.jpg"
                          alt="Billing"
                          width={2061}
                          height={800}
                          className="absolute right-0 top-0 hidden h-full w-full rounded-tl-2xl border border-border lg:top-36 lg:flex lg:h-auto lg:w-11/12"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="site-footer relative mt-auto w-full py-8 2xl:py-16">
          <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
              <div className="flex w-full space-x-2 lg:w-4/12 xl:w-4/12 xl:space-x-6 2xl:space-x-8">
                <div className="flex flex-col space-y-4">
                  <div>
                    <Link
                      href="/"
                      aria-label="Home Page"
                      className="inline-block"
                    >
                      <div className="font-bold text-3xl bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent transition-colors duration-300">
                        ToDo
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Organize tasks, track progress, and stay focused—all in
                        one place.
                      </p>
                    </div>
                    <div className="flex text-xs text-muted-foreground">
                      <p>© Copyright 2025 ToDo. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col space-y-8 lg:flex-row lg:justify-end lg:space-x-6 lg:space-y-0 xl:space-x-16">
                <div>
                  <div className="flex flex-col space-y-2.5">
                    <span className="font-heading">Get Started</span>
                    <ul className="flex flex-col space-y-2.5">
                      <li className="text-sm text-muted-foreground hover:underline">
                        <Link href="/login">Sign In</Link>
                      </li>
                      <li className="text-sm text-muted-foreground hover:underline">
                        <Link href="/signup">Sign Up</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col space-y-2.5">
                    <span className="font-heading">Legal</span>
                    <ul className="flex flex-col space-y-2.5">
                      <li className="text-sm text-muted-foreground hover:underline">
                        <Link href="/#">Terms of Service</Link>
                      </li>
                      <li className="text-sm text-muted-foreground hover:underline">
                        <Link href="/#">Privacy Policy</Link>
                      </li>
                      <li className="text-sm text-muted-foreground hover:underline">
                        <Link href="/#">Cookie Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
