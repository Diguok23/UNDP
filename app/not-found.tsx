import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Globe2, FileText, Newspaper } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/unedf-logo.jpg"
            alt="UN Economic Development Programme "
            className="h-24 w-auto"
          />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-primary">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page may have been moved, deleted, or may never have existed.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Search Site
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Try one of these pages instead:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-3 w-3" />
              About UNEDP
            </Link>
            <Link
              href="/countries"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Globe2 className="h-3 w-3" />
              Countries
            </Link>
            <Link
              href="/news"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Newspaper className="h-3 w-3" />
              News
            </Link>
            <Link
              href="/resources"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <FileText className="h-3 w-3" />
              Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
