'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react'

const TroubleshootingPage = () => {
  const [expandedFaq, setExpandedFaq] = React.useState<string | null>(null)

  const faqs = [
    {
      id: 'admin-access-denied',
      question: 'I get "You do not have administrator access" error after logging in',
      answer: (
        <div className="space-y-3">
          <p>
            This error occurs when your account exists but is not registered as an admin. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go back to the login page</li>
            <li>Click the <strong>"Sync Admin Status"</strong> button</li>
            <li>This will verify your admin status in the admin_users table and update your account metadata</li>
            <li>Try logging in again</li>
          </ol>
          <p className="text-sm text-muted-foreground">
            If the error persists, contact your system administrator to verify your account is marked as admin in the database.
          </p>
        </div>
      ),
    },
    {
      id: 'sync-button-missing',
      question: 'The "Sync Admin Status" button is not showing',
      answer: (
        <div className="space-y-3">
          <p>The button only appears if you receive the admin access denied error.</p>
          <p className="text-sm">
            If you{"'"}re getting a different error:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Invalid email/password:</strong> Check your credentials and try again
            </li>
            <li>
              <strong>Account not found:</strong> You may not have an account yet. Visit the registration page.
            </li>
            <li>
              <strong>Other errors:</strong> Check your internet connection or contact support
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'registration-failed',
      question: 'Registration fails with "failed to submit" error',
      answer: (
        <div className="space-y-3">
          <p>This can happen due to several reasons:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Email already exists:</strong> If you already have an account, use login instead
            </li>
            <li>
              <strong>Network error:</strong> Check your internet connection and try again
            </li>
            <li>
              <strong>Invalid email:</strong> Make sure your email address is valid (e.g., user@example.com)
            </li>
            <li>
              <strong>Password too weak:</strong> Use a password with at least 6 characters
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            If the issue persists, wait a few moments and try again.
          </p>
        </div>
      ),
    },
    {
      id: 'metadata-sync',
      question: 'What does "Sync Admin Status" do?',
      answer: (
        <div className="space-y-3">
          <p>The sync function does the following:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Checks if your account is listed in the admin_users table</li>
            <li>Verifies your is_admin flag is set to true</li>
            <li>Updates your account metadata to reflect your admin status</li>
            <li>This ensures the system recognizes you as an administrator</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            This is useful if your admin status was added manually to the database after you created your account.
          </p>
        </div>
      ),
    },
    {
      id: 'dashboard-access',
      question: 'I logged in but cannot access the admin dashboard',
      answer: (
        <div className="space-y-3">
          <p>If you successfully logged in but cannot access the dashboard:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Make sure you are on the correct URL: /setup</li>
            <li>Try refreshing the page</li>
            <li>Clear your browser cache and try logging in again</li>
            <li>If the issue continues, try the "Sync Admin Status" button</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            If you still cannot access, your session may have expired. Log out and log back in.
          </p>
        </div>
      ),
    },
    {
      id: 'forgot-password',
      question: 'How do I reset my password?',
      answer: (
        <div className="space-y-3">
          <p>
            Currently, there is no self-service password reset. Please contact your system administrator to reset your password.
          </p>
          <p className="text-sm text-muted-foreground">
            In a future update, a password recovery feature will be available on the login page.
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/setup/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
          <h1 className="text-3xl font-bold">Admin Portal Help</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to common admin access and login issues
          </p>
        </div>

        {/* Quick Status Check */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <HelpCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle>Quick Diagnosis</AlertTitle>
          <AlertDescription className="text-sm">
            If you see an admin access error on login, use the <strong>"Sync Admin Status"</strong> button to automatically verify and update your admin privileges.
          </AlertDescription>
        </Alert>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    {faq.id === 'admin-access-denied' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    {faq.id === 'sync-button-missing' && <HelpCircle className="h-4 w-4 text-blue-500" />}
                    {!['admin-access-denied', 'sync-button-missing'].includes(faq.id) && <CheckCircle className="h-4 w-4 text-gray-400" />}
                    {faq.question}
                  </CardTitle>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    expandedFaq === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </CardHeader>
              
              {expandedFaq === faq.id && (
                <CardContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Admin Info */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              If you{"'"}ve tried the troubleshooting steps above and still cannot access the admin portal:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Check that your email is correct</li>
              <li>Verify you registered for admin access</li>
              <li>Contact your system administrator for assistance</li>
              <li>Provide them with your email address and the error message you received</li>
            </ul>
            <div className="pt-4 flex gap-2">
              <Link href="/setup/login">
                <Button variant="outline">Back to Login</Button>
              </Link>
              <Link href="/setup/register">
                <Button variant="outline">Register for Access</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TroubleshootingPage
