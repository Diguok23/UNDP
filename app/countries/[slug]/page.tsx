import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, MapPin, Users, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

const countriesData: Record<string, {
  name: string
  flag: string
  region: string
  description: string
  overview: string
  focusAreas: string[]
  keyResults: { value: string; label: string }[]
  projects: { title: string; description: string; status: string }[]
  relatedNews: { title: string; date: string; slug: string }[]
  heroImage: string
}> = {
  nigeria: {
    name: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    description: "Supporting sustainable development and governance across Africa's most populous nation.",
    overview: "UNDP Nigeria works with the government and people of Nigeria to address development challenges including poverty, inequality, climate change, and governance. Our programs span all 36 states and the Federal Capital Territory, focusing on building inclusive and sustainable development pathways for Africa's largest economy and most populous nation.",
    focusAreas: ["Democratic Governance", "Inclusive Growth", "Climate & Environment", "Crisis Prevention"],
    keyResults: [
      { value: "5M+", label: "People supported" },
      { value: "36", label: "States covered" },
      { value: "500+", label: "Projects delivered" },
      { value: "$200M+", label: "Development investment" },
    ],
    projects: [
      { title: "Democratic Governance for Development", description: "Strengthening institutions and promoting inclusive governance.", status: "Active" },
      { title: "Youth Employment Programme", description: "Creating economic opportunities for young Nigerians.", status: "Active" },
      { title: "Climate Promise Nigeria", description: "Supporting implementation of Nigeria's climate commitments.", status: "Active" },
    ],
    relatedNews: [
      { title: "Empowering Women Entrepreneurs in Nigeria", date: "January 28, 2026", slug: "empowering-women-nigeria" },
    ],
    heroImage: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
  },
  afghanistan: {
    name: "Afghanistan",
    flag: "🇦🇫",
    region: "Asia & the Pacific",
    description: "Essential services and community resilience support.",
    overview: "UNDP Afghanistan operates in one of the world's most challenging development contexts, working to maintain essential services, support community resilience, and preserve development gains. Our programs focus on sustainable livelihoods, essential services delivery, and community-based approaches that reach those most in need while navigating complex operational challenges.",
    focusAreas: ["Essential Services", "Livelihoods", "Community Resilience", "Climate Adaptation"],
    keyResults: [
      { value: "3M+", label: "People reached" },
      { value: "34", label: "Provinces" },
      { value: "1000+", label: "Communities supported" },
      { value: "$150M+", label: "Annual investment" },
    ],
    projects: [
      { title: "Area-Based Approach to Development", description: "Integrated community development across provinces.", status: "Active" },
      { title: "Emergency Livelihoods Programme", description: "Supporting vulnerable families with income opportunities.", status: "Active" },
      { title: "Solar Energy for Essential Services", description: "Renewable energy for health facilities and schools.", status: "Active" },
    ],
    relatedNews: [
      { title: "Solar Power Brings Clean Water to Rural Afghanistan", date: "January 25, 2026", slug: "solar-power-afghanistan" },
    ],
    heroImage: "/images/image-1-credit-undp-afghanistan.jpg",
  },
  cuba: {
    name: "Cuba",
    flag: "🇨🇺",
    region: "Latin America & Caribbean",
    description: "Sustainable agriculture and climate resilience.",
    overview: "UNDP Cuba supports the country's sustainable development agenda with a focus on climate resilience, sustainable agriculture, and local economic development. Our programs help communities adapt to climate change, promote sustainable food systems, and strengthen local governance and innovation capacity.",
    focusAreas: ["Climate Adaptation", "Sustainable Agriculture", "Local Development", "Energy Transition"],
    keyResults: [
      { value: "500K+", label: "People benefited" },
      { value: "15", label: "Provinces" },
      { value: "100+", label: "Municipalities engaged" },
      { value: "$50M+", label: "Development programs" },
    ],
    projects: [
      { title: "Sustainable Agriculture Programme", description: "Climate-smart practices for resilient food systems.", status: "Active" },
      { title: "Local Energy Development", description: "Renewable energy solutions for communities.", status: "Active" },
      { title: "Coastal Resilience", description: "Protecting communities from climate impacts.", status: "Active" },
    ],
    relatedNews: [
      { title: "Sustainable Agriculture in Cuba", date: "January 22, 2026", slug: "sustainable-agriculture-cuba" },
    ],
    heroImage: "/images/undp-cu-diosmara-farm-2025.jpg",
  },
}

// Generate static params for all countries
export async function generateStaticParams() {
  return Object.keys(countriesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const country = countriesData[slug]
  if (!country) return { title: "Country Not Found | UNDP" }
  
  return {
    title: `${country.name} | UNDP`,
    description: country.description,
  }
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const country = countriesData[slug]
  
  if (!country) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={country.heroImage || "/placeholder.svg"}
            alt={country.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-12 lg:py-20">
          <Link 
            href="/countries" 
            className="mb-4 inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Countries
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-6xl" role="img" aria-label={`${country.name} flag`}>
              {country.flag}
            </span>
            <div>
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {country.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                {country.region}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Results */}
      <section className="bg-[#0468B1] py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {country.keyResults.map((result) => (
              <div key={result.label} className="text-center text-white">
                <div className="text-4xl font-bold">{result.value}</div>
                <div className="mt-1 text-sm text-white/80">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Overview</h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {country.overview}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {country.focusAreas.map((area) => (
                  <span 
                    key={area}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-12">Key Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {country.projects.map((project) => (
              <Card key={project.title} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related News */}
      {country.relatedNews.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Latest from {country.name}</h2>
              <Button asChild variant="outline">
                <Link href="/news">View All News</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {country.relatedNews.map((news) => (
                <Link 
                  key={news.slug}
                  href={`/news/${news.slug}`}
                  className="group rounded-lg border border-border p-6 transition-all hover:border-primary hover:shadow-lg"
                >
                  <time className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {news.date}
                  </time>
                  <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#0468B1]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl">Get Involved</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Learn more about our work in {country.name} and how you can support sustainable development.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-white text-[#0468B1] hover:bg-white/90">
              <Link href="/resources">
                View Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <Link href="/about">
                About UNDP
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
