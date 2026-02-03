import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Globe,
  Heart,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join UNEDF and make a difference. Explore career opportunities with the UN Economic Development Fund.",
};

const benefits = [
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Work on projects that transform lives in communities worldwide",
  },
  {
    icon: Users,
    title: "Diverse Team",
    description:
      "Collaborate with talented professionals from over 150 countries",
  },
  {
    icon: Heart,
    title: "Competitive Benefits",
    description: "Comprehensive health coverage, pension, and education grants",
  },
  {
    icon: Zap,
    title: "Growth Opportunities",
    description: "Continuous learning and career development programs",
  },
];

const typeColors: Record<string, string> = {
  "full-time": "bg-green-100 text-green-800",
  "part-time": "bg-blue-100 text-blue-800",
  contract: "bg-orange-100 text-orange-800",
  internship: "bg-purple-100 text-purple-800",
  consultant: "bg-cyan-100 text-cyan-800",
};

export default async function CareersPage() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  const featuredJobs = jobs?.filter((job) => job.featured) || [];
  const regularJobs = jobs?.filter((job) => !job.featured) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/images/good-stories.png')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
              Join Our Mission
            </h1>
            <p className="mt-6 text-lg text-white/90 md:text-xl leading-relaxed">
              Be part of a global team working to promote sustainable economic
              development and create lasting change in communities around the
              world.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#openings">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-primary"
                >
                  View Open Positions
                </Button>
              </a>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why Join UNEDF?</h2>
            <p className="mt-4 text-muted-foreground">
              At UNEDF, you will have the opportunity to contribute to
              meaningful work that shapes the future of sustainable development.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold md:text-3xl">Featured Positions</h2>
            <p className="mt-2 text-muted-foreground">
              High-priority roles we are looking to fill
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featuredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group border-2 border-primary/20 transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge className="mb-2 bg-primary/10 text-primary">
                          Featured
                        </Badge>
                        <h3 className="text-xl font-semibold group-hover:text-primary">
                          {job.title}
                        </h3>
                        {job.department && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {job.department}
                          </p>
                        )}
                      </div>
                      <Badge className={typeColors[job.type]}>
                        {job.type.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      {job.level && (
                        <span className="flex items-center gap-1 capitalize">
                          <Briefcase className="h-4 w-4" />
                          {job.level} level
                        </span>
                      )}
                      {job.salary_range && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary_range}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    {job.closing_date && (
                      <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Closes:{" "}
                        {new Date(job.closing_date).toLocaleDateString()}
                      </p>
                    )}
                    <div className="mt-4">
                      <Link href={`/careers/${job.slug}`}>
                        <Button>View Details & Apply</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Openings */}
      <section id="openings" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold md:text-3xl">All Open Positions</h2>
          <p className="mt-2 text-muted-foreground">
            {jobs?.length || 0} positions available worldwide
          </p>

          {jobs && jobs.length > 0 ? (
            <div className="mt-8 space-y-4">
              {regularJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold group-hover:text-primary">
                          {job.title}
                        </h3>
                        <Badge className={typeColors[job.type]}>
                          {job.type.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        {job.department && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </span>
                        )}
                        {job.closing_date && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Closes:{" "}
                            {new Date(job.closing_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link href={`/careers/${job.slug}`}>
                      <Button variant="outline">View & Apply</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-8">
              <CardContent className="py-12 text-center">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  No Open Positions
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Check back later for new opportunities or subscribe to our
                  newsletter.
                </p>
                <Link href="/#newsletter">
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Subscribe for Updates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Make an Impact?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Join thousands of professionals who have chosen to build their
            careers at UNEDF and contribute to sustainable development
            worldwide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#openings">
              <Button size="lg" variant="secondary" className="text-primary">
                Browse All Jobs
              </Button>
            </a>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                About UNEDF
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
