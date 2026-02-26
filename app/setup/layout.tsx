"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  Globe,
  Newspaper,
  FileText,
  Settings,
  LayoutDashboard,
  ChevronLeft,
  Briefcase,
  ClipboardList,
  LogOut,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/setup/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/setup/jobs", label: "Jobs", icon: Briefcase },
  { href: "/setup/applications", label: "Applications", icon: ClipboardList },
  { href: "/setup/countries", label: "Countries", icon: Globe },
  { href: "/setup/news", label: "News & Stories", icon: Newspaper },
  { href: "/setup/resources", label: "Resources", icon: FileText },
  { href: "/setup/settings", label: "Settings", icon: Settings },
];

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Public pages that don't require authentication
      const publicPages = ["/setup", "/setup/login", "/setup/register"];
      const isPublicPage = publicPages.includes(pathname);

      if (isPublicPage) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const supabase = createClient();
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("[v0] Error checking session:", error);
          setIsAuthenticated(false);
          setIsLoading(false);
          router.push("/setup/login");
          return;
        }

        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || null);
          setIsLoading(false);
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
          router.push("/setup/login");
        }
      } catch (err) {
        console.error("[v0] Auth check error:", err);
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push("/setup/login");
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/setup/login");
    } catch (err) {
      console.error("[v0] Logout error:", err);
    }
  };

  // Public pages that don't require authentication
  const publicPages = ["/setup", "/setup/login", "/setup/register"];
  const isPublicPage = publicPages.includes(pathname);

  if (isLoading && !isPublicPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !isPublicPage) {
    return null; // Router will redirect to login
  }

  // Render public pages without sidebar
  if (isPublicPage) {
    return children;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/setup/dashboard" className="flex items-center gap-2">
              <img
                src="/images/unedp-logo.jpg"
                alt="UNEDP Logo"
                className="h-8 w-auto"
              />
              <span className="font-semibold text-primary">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/setup/dashboard" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t p-4 space-y-3">
            {userEmail && (
              <div className="text-xs text-muted-foreground truncate">
                <div className="font-medium text-foreground mb-1">Logged in as</div>
                <div className="break-words">{userEmail}</div>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
