"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Calendar, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  { id: "all", name: "All Stories" },
  { id: "news", name: "News" },
  { id: "features", name: "Features" },
  { id: "press", name: "Press Releases" },
  { id: "blog", name: "Blog" },
]

const topics = [
  "Climate Action",
  "Gender Equality", 
  "Poverty",
  "Governance",
  "Crisis Response",
  "Innovation",
]

const articles = [
  {
    id: 1,
    title: "Empowering Women Entrepreneurs in Nigeria",
    slug: "empowering-women-nigeria",
    excerpt: "How small business support is transforming communities and creating economic opportunities for women across Nigeria. A look at the impact of microfinance and skills training programs.",
    image: "/images/image-18-credit-UNEDP -nigeria-amalachukwu-ibeneme-crop.jpg",
    date: "January 28, 2026",
    category: "features",
    topic: "Gender Equality",
    featured: true,
  },
  {
    id: 2,
    title: "Solar Power Brings Clean Water to Rural Afghanistan",
    slug: "solar-power-afghanistan",
    excerpt: "Renewable energy solutions are providing sustainable access to clean water for communities in remote areas, improving health and livelihoods for thousands of families.",
    image: "/images/image-1-credit-UNEDP -afghanistan.jpg",
    date: "January 25, 2026",
    category: "features",
    topic: "Climate Action",
    featured: true,
  },
  {
    id: 3,
    title: "Sustainable Agriculture in Cuba",
    slug: "sustainable-agriculture-cuba",
    excerpt: "Supporting farmers with climate-smart practices to build resilient food systems and protect biodiversity in the face of changing climate conditions.",
    image: "/images/UNEDP -cu-diosmara-farm-2025.jpg",
    date: "January 22, 2026",
    category: "features",
    topic: "Climate Action",
    featured: false,
  },
  {
    id: 4,
    title: "UNEDP  Administrator Visits Climate-Vulnerable Nations",
    slug: "administrator-climate-visit",
    excerpt: "Administrator highlights urgent need for increased climate finance and support for developing countries on the frontlines of the climate crisis.",
    image: "/images/human-development-healthy-planet.jpg",
    date: "January 20, 2026",
    category: "news",
    topic: "Climate Action",
    featured: false,
  },
  {
    id: 5,
    title: "New Report: Multidimensional Poverty in 2025",
    slug: "mpi-report-2025",
    excerpt: "Latest data reveals both progress and persistent challenges in the global fight against multidimensional poverty.",
    image: "/images/mpi-2025-coverpage-crop.jpg",
    date: "January 18, 2026",
    category: "press",
    topic: "Poverty",
    featured: false,
  },
  {
    id: 6,
    title: "Innovation Labs: Accelerating Development Solutions",
    slug: "innovation-labs-2025",
    excerpt: "How UNEDP 's global network of Accelerator Labs is testing and scaling innovative approaches to development challenges.",
    image: "/images/human-development-healthy-planet.jpg",
    date: "January 15, 2026",
    category: "blog",
    topic: "Innovation",
    featured: false,
  },
  {
    id: 7,
    title: "Youth Leaders Drive Climate Action in Pacific Islands",
    slug: "youth-climate-pacific",
    excerpt: "Young people across the Pacific are leading community-based climate adaptation initiatives with UNEDP  support.",
    image: "/images/good-stories.png",
    date: "January 12, 2026",
    category: "features",
    topic: "Climate Action",
    featured: false,
  },
  {
    id: 8,
    title: "Strengthening Electoral Systems in West Africa",
    slug: "elections-west-africa",
    excerpt: "Technical support for credible, inclusive elections across the region as several countries prepare for polls.",
    image: "/images/UNEDP 60-crop.jpg",
    date: "January 10, 2026",
    category: "news",
    topic: "Governance",
    featured: false,
  },
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
      const matchesTopic = !selectedTopic || article.topic === selectedTopic
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesTopic && matchesSearch
    })
  }, [selectedCategory, selectedTopic, searchQuery])

  const featuredArticles = articles.filter(a => a.featured)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#0468B1] py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
              News & Stories
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-relaxed">
              The latest news, features, and impact stories from our work around the world. 
              Discover how we're making a difference for people and planet.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 lg:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Stories</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/news/${article.slug}`}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="rounded-full bg-[#0468B1] px-3 py-1 text-xs font-semibold text-white">
                        {article.topic}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors text-balance">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 border-b border-border sticky top-16 lg:top-20 bg-background z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search and Category Row */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search stories..."
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
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topic Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Topics:</span>
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTopic === topic
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {topic}
                </button>
              ))}
              {selectedTopic && (
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="text-xs text-primary hover:underline ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredArticles.length} stories
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No stories found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-[#0468B1] px-3 py-1 text-xs font-semibold text-white">
                          {article.topic}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                        <span className="mx-2">|</span>
                        <span className="capitalize">{article.category}</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors text-balance">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-[#0468B1]">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold md:text-4xl">Stay Informed</h2>
            <p className="mt-4 text-lg text-white/90">
              Subscribe to receive the latest news and stories from UNEDP  directly in your inbox.
            </p>
            <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <Button type="submit" className="bg-white text-[#0468B1] hover:bg-white/90 px-8">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
