"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Shield } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      console.error("[v0] Sign in error:", signInError)
      setError(signInError.message)
      setIsLoading(false)
      return
    }

    // Verify user exists and has admin access
    if (!data?.user) {
      setError("Login failed. Please try again.")
      setIsLoading(false)
      return
    }

    console.log("[v0] User logged in:", data.user.id)
    console.log("[v0] User metadata:", data.user.user_metadata)

    // Check if user is admin via metadata (set during signup via trigger)
    const isAdmin = data.user.user_metadata?.is_admin === true
    
    if (!isAdmin) {
      console.error("[v0] User is not admin:", data.user.id)
      setError("You do not have administrator access. Please contact your system administrator.")
      await supabase.auth.signOut()
      setIsLoading(false)
      return
    }

    console.log("[v0] Admin verified, redirecting to setup")
    router.push("/setup")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <img 
              src="/images/unedp-logo.jpg" 
              alt="UNEDP Logo" 
              className="mx-auto h-16 w-auto"
            />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Admin Portal</span>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(error || errorParam === "not_admin") && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error || "You do not have administrator access."}
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@unedp.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground">
              {"Don't have admin access? "}
              <Link href="/setup/register" className="text-primary hover:underline">
                Request access
              </Link>
            </div>
            <div className="text-center text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Return to main website
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
