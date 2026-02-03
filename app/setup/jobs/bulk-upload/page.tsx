"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ArrowLeft,
  Download,
  Info
} from "lucide-react"

interface JobData {
  title: string
  slug?: string
  location: string
  type: string
  department?: string
  level?: string
  salary_range?: string
  description: string
  requirements?: string[]
  responsibilities?: string[]
  benefits?: string[]
  closing_date?: string
  is_active?: boolean
  featured?: boolean
}

interface UploadResult {
  success: number
  failed: number
  errors: string[]
}

const sampleCSV = `title,location,type,department,level,salary_range,description,requirements,responsibilities,benefits,closing_date,featured
"Programme Officer","New York, USA","full-time","Programme Management","mid","$65,000 - $85,000","Lead programme implementation activities across multiple countries.","Masters degree required|5+ years experience|Fluency in English","Manage programme budgets|Coordinate with partners|Monitor activities","Health insurance|Pension plan|Education grant","2026-03-15","false"
"Climate Analyst","Geneva, Switzerland","full-time","Climate & Environment","entry","$50,000 - $65,000","Analyze climate data and support climate finance initiatives.","Bachelor's in environmental science|Strong analytical skills|Experience with GIS","Conduct data analysis|Prepare reports|Support field teams","Competitive salary|Learning opportunities|Work-life balance","2026-02-28","true"`;

const sampleJSON = `[
  {
    "title": "Programme Officer",
    "location": "New York, USA",
    "type": "full-time",
    "department": "Programme Management",
    "level": "mid",
    "salary_range": "$65,000 - $85,000",
    "description": "Lead programme implementation activities across multiple countries.",
    "requirements": ["Masters degree required", "5+ years experience", "Fluency in English"],
    "responsibilities": ["Manage programme budgets", "Coordinate with partners", "Monitor activities"],
    "benefits": ["Health insurance", "Pension plan", "Education grant"],
    "closing_date": "2026-03-15",
    "featured": false
  },
  {
    "title": "Climate Analyst",
    "location": "Geneva, Switzerland",
    "type": "full-time",
    "department": "Climate & Environment",
    "level": "entry",
    "salary_range": "$50,000 - $65,000",
    "description": "Analyze climate data and support climate finance initiatives.",
    "requirements": ["Bachelor's in environmental science", "Strong analytical skills", "Experience with GIS"],
    "responsibilities": ["Conduct data analysis", "Prepare reports", "Support field teams"],
    "benefits": ["Competitive salary", "Learning opportunities", "Work-life balance"],
    "closing_date": "2026-02-28",
    "featured": true
  }
]`;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    + '-' + Date.now().toString(36)
}

function parseCSV(csv: string): JobData[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const jobs: JobData[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    
    const job: Record<string, unknown> = {}
    headers.forEach((header, index) => {
      const value = values[index]?.replace(/"/g, '') || ''
      
      if (['requirements', 'responsibilities', 'benefits'].includes(header)) {
        job[header] = value ? value.split('|').map(v => v.trim()) : []
      } else if (header === 'featured' || header === 'is_active') {
        job[header] = value.toLowerCase() === 'true'
      } else {
        job[header] = value
      }
    })
    
    if (job.title && job.location && job.type && job.description) {
      jobs.push(job as unknown as JobData)
    }
  }
  
  return jobs
}

function parseJSON(json: string): JobData[] {
  try {
    const data = JSON.parse(json)
    return Array.isArray(data) ? data : [data]
  } catch {
    return []
  }
}

export default function BulkUploadPage() {
  const [inputData, setInputData] = useState("")
  const [format, setFormat] = useState<"csv" | "json">("json")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<UploadResult | null>(null)
  const [preview, setPreview] = useState<JobData[]>([])
  const router = useRouter()

  const handlePreview = () => {
    const jobs = format === "csv" ? parseCSV(inputData) : parseJSON(inputData)
    setPreview(jobs)
  }

  const handleUpload = async () => {
    setIsLoading(true)
    setResult(null)
    
    const jobs = format === "csv" ? parseCSV(inputData) : parseJSON(inputData)
    
    if (jobs.length === 0) {
      setResult({ success: 0, failed: 0, errors: ["No valid jobs found in the input data."] })
      setIsLoading(false)
      return
    }
    
    const supabase = createClient()
    const errors: string[] = []
    let success = 0
    let failed = 0
    
    for (const job of jobs) {
      const jobData = {
        ...job,
        slug: job.slug || generateSlug(job.title),
        is_active: job.is_active ?? true,
        featured: job.featured ?? false,
        closing_date: job.closing_date || null,
      }
      
      const { error } = await supabase.from("jobs").insert(jobData)
      
      if (error) {
        failed++
        errors.push(`Failed to add "${job.title}": ${error.message}`)
      } else {
        success++
      }
    }
    
    setResult({ success, failed, errors })
    setIsLoading(false)
    
    if (success > 0 && failed === 0) {
      setTimeout(() => {
        router.push("/setup/jobs")
        router.refresh()
      }, 2000)
    }
  }

  const downloadSample = (type: "csv" | "json") => {
    const content = type === "csv" ? sampleCSV : sampleJSON
    const blob = new Blob([content], { type: type === "csv" ? "text/csv" : "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sample-jobs.${type}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/setup/jobs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Bulk Upload Jobs</h1>
          <p className="text-muted-foreground">Import multiple job postings at once using CSV or JSON</p>
        </div>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload multiple job postings at once by pasting CSV or JSON data below. Each job requires at minimum: title, location, type, and description.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => downloadSample("csv")}>
              <Download className="mr-2 h-4 w-4" />
              Download CSV Template
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadSample("json")}>
              <Download className="mr-2 h-4 w-4" />
              Download JSON Template
            </Button>
          </div>
          <div className="rounded-lg bg-muted p-4 text-xs">
            <p className="font-medium">Required fields:</p>
            <ul className="mt-1 list-inside list-disc text-muted-foreground">
              <li><code>title</code> - Job title</li>
              <li><code>location</code> - Job location</li>
              <li><code>type</code> - full-time, part-time, contract, internship, or consultant</li>
              <li><code>description</code> - Job description</li>
            </ul>
            <p className="mt-3 font-medium">Optional fields:</p>
            <ul className="mt-1 list-inside list-disc text-muted-foreground">
              <li><code>department</code>, <code>level</code>, <code>salary_range</code></li>
              <li><code>requirements</code>, <code>responsibilities</code>, <code>benefits</code> (arrays)</li>
              <li><code>closing_date</code> (YYYY-MM-DD format)</li>
              <li><code>featured</code>, <code>is_active</code> (true/false)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Job Data
          </CardTitle>
          <CardDescription>
            Paste your job data in CSV or JSON format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={format === "json" ? "default" : "outline"}
              onClick={() => setFormat("json")}
              size="sm"
            >
              JSON Format
            </Button>
            <Button
              variant={format === "csv" ? "default" : "outline"}
              onClick={() => setFormat("csv")}
              size="sm"
            >
              CSV Format
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="data">Paste {format.toUpperCase()} data here</Label>
            <Textarea
              id="data"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={format === "json" ? sampleJSON : sampleCSV}
              rows={15}
              className="font-mono text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview} disabled={!inputData}>
              Preview Jobs
            </Button>
            <Button onClick={handleUpload} disabled={!inputData || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Jobs
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {preview.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview ({preview.length} jobs)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {preview.map((job, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.location} • {job.type} {job.department && `• ${job.department}`}
                      </p>
                    </div>
                    {job.featured && (
                      <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">{job.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {result && (
        <Alert variant={result.failed > 0 ? "destructive" : "default"} className={result.failed === 0 ? "border-green-500 bg-green-50 text-green-900" : ""}>
          {result.failed > 0 ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          )}
          <AlertTitle>
            {result.failed === 0 ? "Upload Successful" : "Upload Completed with Errors"}
          </AlertTitle>
          <AlertDescription>
            <p>{result.success} jobs uploaded successfully. {result.failed} jobs failed.</p>
            {result.errors.length > 0 && (
              <ul className="mt-2 list-inside list-disc text-sm">
                {result.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
            {result.failed === 0 && (
              <p className="mt-2 text-sm">Redirecting to jobs list...</p>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
