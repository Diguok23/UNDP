"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, FileText, Newspaper, Globe, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample searchable content - in production this would come from a CMS/API
const searchableContent = [
  {
    type: "page",
    title: "About UNEDP",
    description: "Learn about our mission, vision, and 60 years of development work.",
    url: "/about",
    category: "Pages"
  },
  {
    type: "page",
    title: "What We Do",
    description: "Explore our thematic pillars from sustainable development to crisis response.",
    url: "/what-we-do",
    category: "Pages"
  },
  {
    type: "issue",
    title: "Climate Change & Environment",
    description: "Supporting countries to protect and restore ecosystems while building climate resilience.",
    url: "/issues/climate-environment",
    category: "Issues"
  },
  {
    type: "issue",
    title: "Poverty & Inequality",
    description: "Working to eradicate extreme poverty and reduce inequalities within and among countries.",
    url: "/issues/poverty-inequality",
    category: "Issues"
  },
  {
    type: "issue",
    title: "Gender Equality",
    description: "Advancing gender equality and women's empowerment across all our work.",
    url: "/issues/gender-equality",
    category: "Issues"
  },
  {
    type: "issue",
    title: "Democratic Governance",
    description: "Strengthening institutions and promoting inclusive, accountable governance.",
    url: "/issues/democratic-governance",
    category: "Issues"
  },
  {
    type: "news",
    title: "UNEDP launches new climate resilience initiative in Africa",
    description: "A groundbreaking program to help 10 African nations adapt to climate change impacts.",
    url: "/news/climate-resilience-africa",
    category: "News",
    image: "/images/image-18-credit-UNEDP-nigeria-amalachukwu-ibeneme-crop.jpg"
  },
  {
    type: "news",
    title: "Solar-powered water systems transform rural Afghanistan",
    description: "Renewable energy solutions bringing clean water to remote communities.",
    url: "/news/solar-water-afghanistan",
    category: "News",
    image: "/images/image-1-credit-UNEDP-afghanistan.jpg"
  },
  {
    type: "news",
    title: "Sustainable agriculture empowers women farmers in Cuba",
    description: "Climate-smart farming practices increasing yields and incomes.",
    url: "/news/sustainable-agriculture-cuba",
    category: "News",
    image: "/images/UNEDP-cu-diosmara-farm-2025.jpg"
  },
  {
    type: "resource",
    title: "Human Development Report 2025",
    description: "Annual flagship report on global human development trends and challenges.",
    url: "/resources",
    category: "Resources"
  },
  {
    type: "resource",
    title: "Multidimensional Poverty Index 2025",
    description: "Comprehensive analysis of poverty beyond income measures.",
    url: "/resources",
    category: "Resources",
    image: "/images/mpi-2025-coverpage-crop.jpg"
  },
  {
    type: "resource",
    title: "Climate Promise Progress Report",
    description: "Tracking UNEDP's support for countries implementing their climate commitments.",
    url: "/resources",
    category: "Resources"
  },
  {
    type: "country",
    title: "Afghanistan",
    description: "UNEDP's work in Afghanistan focuses on livelihoods, governance, and community resilience.",
    url: "/countries/afghanistan",
    category: "Countries"
  },
  {
    type: "country",
    title: "Nigeria",
    description: "Supporting Nigeria's development through poverty reduction and climate action.",
    url: "/countries/nigeria",
    category: "Countries"
  },
  {
    type: "country",
    title: "Cuba",
    description: "Partnering with Cuba on sustainable development and climate resilience.",
    url: "/countries/cuba",
    category: "Countries"
  }
]

const categoryIcons: Record<string, typeof FileText> = {
  Pages: FileText,
  Issues: BookOpen,
  News: Newspaper,
  Resources: FileText,
  Countries: Globe
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<typeof searchableContent>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const categories = ["All", ...new Set(searchableContent.map(item => item.category))]
  
  const filteredResults = selectedCategory === "All" 
    ? results 
    : results.filter(item => item.category === selectedCategory)

  const resultsByCategory = categories.slice(1).reduce((acc, cat) => {
    acc[cat] = results.filter(item => item.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-8 text-center">
            Search UNEDP
          </h1>
          <div className="max-w-2xl mx-auto">
            <form 
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search pages, news, resources, countries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12 text-lg bg-background"
                  autoFocus
                />
              </div>
              <Button type="submit" size="lg" className="h-12">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {query.length > 0 && (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <p className="text-muted-foreground">
                  Found <span className="font-semibold text-foreground">{results.length}</span> results for{" "}
                  <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
                </p>
                
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                      {cat !== "All" && resultsByCategory[cat] !== undefined && (
                        <Badge variant="secondary" className="ml-2">
                          {resultsByCategory[cat]}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {filteredResults.length > 0 ? (
                <div className="space-y-6">
                  {filteredResults.map((result, index) => {
                    const Icon = categoryIcons[result.category] || FileText
                    return (
                      <Link
                        key={index}
                        href={result.url}
                        className="block bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow group"
                      >
                        <div className="flex gap-6">
                          {result.image && (
                            <div className="hidden md:block w-32 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={result.image || "/placeholder.svg"}
                                alt={result.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="h-4 w-4 text-primary" />
                              <Badge variant="secondary">{result.category}</Badge>
                            </div>
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors mb-2">
                              {result.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {result.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or browse our content below.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" asChild>
                      <Link href="/what-we-do">What We Do</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/issues">Issues</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/countries">Countries</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/news">News</Link>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {query.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start searching</h3>
              <p className="text-muted-foreground mb-6">
                Enter keywords to search across all UNEDP content including pages, news, resources, and country information.
              </p>
              <div className="max-w-xl mx-auto">
                <h4 className="font-semibold mb-3">Popular searches:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {["climate change", "poverty reduction", "gender equality", "human development", "sustainable development"].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

import { Suspense } from "react"

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  )
}
