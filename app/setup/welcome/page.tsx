import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Globe, Newspaper, FileText, Briefcase } from "lucide-react"

export const metadata = {
  title: "Admin Portal | UNEDP",
  description: "UNEDP Administration Portal - Manage website content, jobs, and more.",
}

export default function AdminWelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/images/unedp-logo.jpg" 
              alt="UNEDP Logo" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-muted-foreground">Admin Portal</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/setup/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/setup/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-balance">
            UNEDP Administration Portal
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Manage your organization's website content, post job opportunities, 
            review applications, and keep your audience informed with the latest news and resources.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/setup/login">Sign In to Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/setup/register">Request Admin Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-2xl font-semibold">
          What You Can Manage
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Country Programs</CardTitle>
              <CardDescription>
                Manage country profiles, key results, focus areas, and regional information.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Newspaper className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">News & Stories</CardTitle>
              <CardDescription>
                Publish articles, success stories, and updates to keep stakeholders informed.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Resources</CardTitle>
              <CardDescription>
                Upload reports, case studies, data analysis, and downloadable materials.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Briefcase className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Job Postings</CardTitle>
              <CardDescription>
                Create and manage job opportunities, internships, and consultant positions.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Applications</CardTitle>
              <CardDescription>
                Review job applications, communicate with candidates, and track hiring progress.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Settings</CardTitle>
              <CardDescription>
                Configure site settings, manage admin users, and customize preferences.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} UN Economic Development Programme (UNEDP). All rights reserved.</p>
          <p className="mt-2">
            <Link href="/" className="hover:text-foreground">
              Return to main website
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
