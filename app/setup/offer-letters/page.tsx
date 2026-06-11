'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Mail, Send, CheckCircle, XCircle } from 'lucide-react'

interface OfferLetter {
  id: string
  application_id: string
  position_title: string
  salary: string | null
  start_date: string | null
  offer_status: string
  sent_at: string | null
  accepted_at: string | null
  rejected_at: string | null
  created_at: string
  applications: {
    id: string
    full_name: string
    email: string
    status: string
  }
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  expired: 'bg-yellow-100 text-yellow-800',
}

export default function OfferLettersPage() {
  const supabase = createClient()
  const [offerLetters, setOfferLetters] = useState<OfferLetter[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingId, setSendingId] = useState<string | null>(null)

  useEffect(() => {
    loadOfferLetters()
  }, [])

  const loadOfferLetters = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('offer_letters')
        .select(
          `
          *,
          applications (
            id,
            full_name,
            email,
            status
          )
        `
        )
        .order('created_at', { ascending: false })

      if (error) throw error
      setOfferLetters(data || [])
    } catch (err) {
      console.error('[v0] Error loading offer letters:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSendOfferLetter = async (offer: OfferLetter) => {
    setSendingId(offer.id)
    try {
      const response = await fetch('/api/send-offer-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: offer.application_id,
          positionTitle: offer.position_title,
          salary: offer.salary,
          startDate: offer.start_date,
          applicantEmail: offer.applications.email,
          applicantName: offer.applications.full_name,
        }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error)

      alert('Offer letter sent successfully!')
      loadOfferLetters()
    } catch (err) {
      console.error('[v0] Error sending offer letter:', err)
      alert('Failed to send offer letter')
    } finally {
      setSendingId(null)
    }
  }

  const draftOffers = offerLetters.filter((o) => o.offer_status === 'draft')
  const sentOffers = offerLetters.filter((o) => o.offer_status === 'sent')
  const acceptedOffers = offerLetters.filter((o) => o.offer_status === 'accepted')
  const rejectedOffers = offerLetters.filter((o) => o.offer_status === 'rejected')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Offer Letters</h1>
        <p className="text-muted-foreground">
          Create and manage offer letters for candidates
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{draftOffers.length}</p>
            <p className="text-xs text-muted-foreground">Draft</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{sentOffers.length}</p>
            <p className="text-xs text-muted-foreground">Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600">{acceptedOffers.length}</p>
            <p className="text-xs text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-red-600">{rejectedOffers.length}</p>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            All Offer Letters ({offerLetters.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : offerLetters.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offerLetters.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {offer.applications.full_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {offer.applications.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{offer.position_title}</TableCell>
                    <TableCell>{offer.salary || '-'}</TableCell>
                    <TableCell>
                      {offer.start_date
                        ? new Date(offer.start_date).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize ${
                          statusColors[offer.offer_status]
                        }`}
                      >
                        {offer.offer_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {offer.sent_at
                        ? new Date(offer.sent_at).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {offer.offer_status === 'draft' && (
                          <Button
                            size="sm"
                            onClick={() => handleSendOfferLetter(offer)}
                            disabled={sendingId === offer.id}
                          >
                            <Send className="mr-1 h-4 w-4" />
                            {sendingId === offer.id ? 'Sending...' : 'Send'}
                          </Button>
                        )}
                        {offer.offer_status === 'accepted' && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Accepted</span>
                          </div>
                        )}
                        {offer.offer_status === 'rejected' && (
                          <div className="flex items-center gap-1 text-red-600">
                            <XCircle className="h-4 w-4" />
                            <span className="text-sm">Rejected</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No offer letters yet</h3>
              <p className="text-muted-foreground">
                Create offer letters for candidates from the applications page
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
