import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ApplicationForm } from "@/components/careers/application-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("title, description, location")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!job) {
    return { title: "Job Not Found" };
  }

  return {
    title: `${job.title} - ${job.location}`,
    description: job.description,
  };
}

const typeColors: Record<string, string> = {
  "full-time": "bg-green-100 text-green-800",
  "part-time": "bg-blue-100 text-blue-800",
  contract: "bg-orange-100 text-orange-800",
  internship: "bg-purple-100 text-purple-800",
  consultant: "bg-cyan-100 text-cyan-800",
};

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !job) {
    notFound();
  }

  const isExpired = job.closing_date && new Date(job.closing_date) < new Date();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link
            href="/careers"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all jobs
          </Link>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold md:text-4xl">{job.title}</h1>
                <Badge className={typeColors[job.type]}>
                  {job.type.replace("-", " ")}
                </Badge>
              </div>
              {job.department && (
                <p className="mt-2 text-lg text-white/90">{job.department}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {job.location}
                </span>
                {job.level && (
                  <span className="flex items-center gap-2 capitalize">
                    <Briefcase className="h-5 w-5" />
                    {job.level} level
                  </span>
                )}
                {job.salary_range && (
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    {job.salary_range}
                  </span>
                )}
              </div>
            </div>
            {job.closing_date && (
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <p className="text-sm text-white/80">Application Deadline</p>
                <p className="font-semibold">
                  {new Date(job.closing_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.responsibilities.map(
                      (resp: string, index: number) => (
                        <li key={index} className="flex gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{resp}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>What We Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">
                      {job.type.replace("-", " ")}
                    </span>
                  </div>
                  {job.level && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium capitalize">{job.level}</span>
                    </div>
                  )}
                  {job.department && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{job.department}</span>
                    </div>
                  )}
                  {job.salary_range && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salary</span>
                      <span className="font-medium">{job.salary_range}</span>
                    </div>
                  )}
                  {job.closing_date && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className="font-medium">
                        {new Date(job.closing_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Application Form */}
              {isExpired ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">
                      Application Closed
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      The deadline for this position has passed.
                    </p>
                    <Link href="/careers">
                      <Button variant="outline" className="mt-4 bg-transparent">
                        View Other Positions
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <ApplicationForm jobId={job.id} jobTitle={job.title} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
