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
import { FileText, Send, CheckCircle } from 'lucide-react'

interface Contract {
  id: string
  application_id: string
  contract_type: string
  contract_status: string
  sent_at: string | null
  signed_at: string | null
  created_at: string
  applications: {
    id: string
    full_name: string
    email: string
  }
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  signed: 'bg-green-100 text-green-800',
  executed: 'bg-green-700 text-white',
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContracts()
  }, [])

  const loadContracts = async () => {
    setLoading(true)
    const supabase = createClient()
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select(
          `
          *,
          applications (
            id,
            full_name,
            email
          )
        `
        )
        .order('created_at', { ascending: false })

      if (error) throw error
      setContracts(data || [])
    } catch (err) {
      console.error('[v0] Error loading contracts:', err)
    } finally {
      setLoading(false)
    }
  }

  const draftContracts = contracts.filter((c) => c.contract_status === 'draft')
  const sentContracts = contracts.filter((c) => c.contract_status === 'sent')
  const signedContracts = contracts.filter((c) => c.contract_status === 'signed')
  const executedContracts = contracts.filter(
    (c) => c.contract_status === 'executed'
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contracts</h1>
        <p className="text-muted-foreground">
          Manage employment contracts for candidates
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{draftContracts.length}</p>
            <p className="text-xs text-muted-foreground">Draft</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{sentContracts.length}</p>
            <p className="text-xs text-muted-foreground">Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-600">{signedContracts.length}</p>
            <p className="text-xs text-muted-foreground">Signed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600">
              {executedContracts.length}
            </p>
            <p className="text-xs text-muted-foreground">Executed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Contracts ({contracts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : contracts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent Date</TableHead>
                  <TableHead>Signed Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {contract.applications.full_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contract.applications.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {contract.contract_type}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize ${
                          statusColors[contract.contract_status]
                        }`}
                      >
                        {contract.contract_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {contract.sent_at
                        ? new Date(contract.sent_at).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {contract.signed_at
                        ? new Date(contract.signed_at).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {contract.contract_status === 'signed' && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Signed</span>
                          </div>
                        )}
                        {contract.contract_status === 'sent' && (
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <Send className="mr-1 h-4 w-4" />
                            Resend
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No contracts yet</h3>
              <p className="text-muted-foreground">
                Contracts will appear here once created
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
