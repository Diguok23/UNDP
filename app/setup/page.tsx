import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus, Lock, Clock, Shield, BarChart3 } from "lucide-react"

export const metadata = {
  title: "Admin Portal | UNEDP",
  description: "UNEDP Administration Portal - Manage careers, content, and operations.",
}

export default function SetupHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/unedp-logo.jpg"
              alt="UNEDP Logo"
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline font-semibold text-foreground">
              Admin Portal
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/setup/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/setup/register">Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto max-w-6xl px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-balance">
            UNEDP Admin Portal
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Manage careers, applications, content, and all your organizational operations from one central dashboard.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/setup/login" className="gap-2">
                <LogIn className="h-5 w-5" />
                Sign In
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/setup/register" className="gap-2">
                <UserPlus className="h-5 w-5" />
                Create Account
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 w-full mt-20 mb-16">
          {/* Feature 1 */}
          <div className="rounded-lg border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Centralized Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage all aspects of your organization from a unified dashboard
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            <p className="text-sm text-muted-foreground">
              Stay updated with live application submissions and content changes
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
            <p className="text-sm text-muted-foreground">
              Role-based access control and secure authentication
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 p-12 text-center w-full">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign in with your work email to access the admin dashboard and manage your operations.
          </p>
          <Button size="lg" asChild>
            <Link href="/setup/login">Sign In Now</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} UN Economic Development Programme (UNEDP). All rights reserved.
            </p>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Website
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
