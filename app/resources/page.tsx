"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, FileText, Download, Calendar, Filter, BookOpen, BarChart3, Wrench, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  { id: "all", name: "All Resources", icon: FileText },
  { id: "reports", name: "Reports", icon: BookOpen },
  { id: "case-studies", name: "Case Studies", icon: FileCheck },
  { id: "data", name: "Data & Analysis", icon: BarChart3 },
  { id: "tools", name: "Tools & Guides", icon: Wrench },
]

const resources = [
  {
    id: 1,
    title: "Global Multidimensional Poverty Index 2025",
    description: "The latest data on multidimensional poverty across 110+ countries, revealing progress and challenges in the fight against poverty.",
    category: "reports",
    date: "January 2026",
    image: "/images/mpi-2025-coverpage-crop.jpg",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Human Development Report 2025",
    description: "Our flagship report exploring how the climate crisis is intertwined with inequality and what can be done about it.",
    category: "reports",
    date: "December 2025",
    image: "/images/mpi-2025-coverpage-crop.jpg",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Climate Action: Lessons from the Field",
    description: "Case studies from 20 countries showing what works in climate adaptation and mitigation at the community level.",
    category: "case-studies",
    date: "November 2025",
    image: "/images/image-1-credit-UNEDP-afghanistan.jpg",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Gender Inequality Index 2025",
    description: "Comprehensive data on gender disparities across health, empowerment, and labor market participation.",
    category: "data",
    date: "October 2025",
    image: "/images/image-18-credit-UNEDP-nigeria-amalachukwu-ibeneme-crop.jpg",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "SDG Integration Toolkit",
    description: "Practical tools for policymakers to identify synergies and trade-offs between Sustainable Development Goals.",
    category: "tools",
    date: "September 2025",
    image: "/images/sdg-wheel.svg",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Governance for SDGs: A Practical Guide",
    description: "A step-by-step guide for strengthening governance institutions to deliver on the 2030 Agenda.",
    category: "tools",
    date: "August 2025",
    image: "/images/human-development-healthy-planet.jpg",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Women's Economic Empowerment: Impact Assessment",
    description: "Analysis of UNEDP programs supporting women's economic participation across 30 countries.",
    category: "case-studies",
    date: "July 2025",
    image: "/images/image-18-credit-UNEDP-nigeria-amalachukwu-ibeneme-crop.jpg",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 8,
    title: "Climate Finance Flows 2025",
    description: "Data and analysis on global climate finance trends and gaps in developing countries.",
    category: "data",
    date: "June 2025",
    image: "/images/image-1-credit-UNEDP-afghanistan.jpg",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 9,
    title: "Crisis Response Handbook",
    description: "Operational guidance for rapid response to humanitarian emergencies while maintaining development focus.",
    category: "tools",
    date: "May 2025",
    image: "/images/UNEDP-cu-diosmara-farm-2025.jpg",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 10,
    title: "Annual Report 2024",
    description: "UNEDP's comprehensive overview of results, impact, and financial performance for 2024.",
    category: "reports",
    date: "April 2025",
    image: "/images/good-stories.png",
    downloadUrl: "#",
    featured: false,
  },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const featuredResources = resources.filter(r => r.featured)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#0468B1] py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
              Resources
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-relaxed">
              Access our publications, reports, data, and tools. All resources are free to download 
              and share for non-commercial use.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 lg:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Publications</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden border-0 shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <Image
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {categories.find(c => c.id === resource.category)?.name}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-foreground">{resource.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {resource.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {resource.date}
                      </span>
                    </div>
                    <Button asChild className="mt-4 w-fit bg-[#0468B1] hover:bg-[#035a9c]">
                      <a href={resource.downloadUrl}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-[#0468B1] hover:bg-[#035a9c]" : ""}
                >
                  <category.icon className="mr-1 h-4 w-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredResources.length} resources
          </div>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No resources found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    <div className="relative w-full sm:w-40 h-32 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {categories.find(c => c.id === resource.category)?.name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {resource.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{resource.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {resource.description}
                        </p>
                      </div>
                      <div className="mt-4">
                        <Button asChild variant="outline" size="sm">
                          <a href={resource.downloadUrl}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Data Portal CTA */}
      <section id="data" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-foreground md:text-4xl">Explore Our Data</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Access interactive dashboards, datasets, and visualizations on human development, 
            poverty, gender, and climate from around the world.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-[#0468B1] hover:bg-[#035a9c]">
              <Link href="https://hdr.UNEDP.org/data-center" target="_blank">
                Human Development Data
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://data.UNEDP.org" target="_blank">
                UNEDP Data Futures Platform
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
