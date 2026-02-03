"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Globe2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const regions = [
  { id: "all", name: "All Regions" },
  { id: "africa", name: "Africa" },
  { id: "arab", name: "Arab States" },
  { id: "asia", name: "Asia & the Pacific" },
  { id: "europe", name: "Europe & CIS" },
  { id: "latam", name: "Latin America & Caribbean" },
]

const countries = [
  // Africa
  { name: "Nigeria", slug: "nigeria", region: "africa", flag: "🇳🇬", description: "Supporting sustainable development and governance across Africa's most populous nation." },
  { name: "Kenya", slug: "kenya", region: "africa", flag: "🇰🇪", description: "Climate resilience, governance, and inclusive economic growth." },
  { name: "Ethiopia", slug: "ethiopia", region: "africa", flag: "🇪🇹", description: "Building resilience and supporting sustainable development pathways." },
  { name: "South Africa", slug: "south-africa", region: "africa", flag: "🇿🇦", description: "Addressing inequality and promoting sustainable economic transformation." },
  { name: "Tanzania", slug: "tanzania", region: "africa", flag: "🇹🇿", description: "Climate action and environmental sustainability programs." },
  { name: "Ghana", slug: "ghana", region: "africa", flag: "🇬🇭", description: "Democratic governance and sustainable development initiatives." },
  { name: "Rwanda", slug: "rwanda", region: "africa", flag: "🇷🇼", description: "Innovation, ICT, and green growth solutions." },
  { name: "Senegal", slug: "senegal", region: "africa", flag: "🇸🇳", description: "Youth employment and climate adaptation programs." },
  
  // Arab States
  { name: "Egypt", slug: "egypt", region: "arab", flag: "🇪🇬", description: "Sustainable development and economic diversification support." },
  { name: "Jordan", slug: "jordan", region: "arab", flag: "🇯🇴", description: "Resilience building and refugee integration programs." },
  { name: "Lebanon", slug: "lebanon", region: "arab", flag: "🇱🇧", description: "Crisis recovery and institutional strengthening." },
  { name: "Morocco", slug: "morocco", region: "arab", flag: "🇲🇦", description: "Climate action and renewable energy transitions." },
  { name: "Tunisia", slug: "tunisia", region: "arab", flag: "🇹🇳", description: "Democratic transition and economic inclusion support." },
  { name: "Iraq", slug: "iraq", region: "arab", flag: "🇮🇶", description: "Stabilization, recovery, and governance programs." },
  
  // Asia & Pacific
  { name: "Afghanistan", slug: "afghanistan", region: "asia", flag: "🇦🇫", description: "Essential services and community resilience support." },
  { name: "Bangladesh", slug: "bangladesh", region: "asia", flag: "🇧🇩", description: "Climate adaptation and inclusive economic growth." },
  { name: "India", slug: "india", region: "asia", flag: "🇮🇳", description: "Sustainable development at scale across diverse states." },
  { name: "Indonesia", slug: "indonesia", region: "asia", flag: "🇮🇩", description: "Climate action, biodiversity, and democratic governance." },
  { name: "Pakistan", slug: "pakistan", region: "asia", flag: "🇵🇰", description: "Climate resilience and inclusive development programs." },
  { name: "Philippines", slug: "philippines", region: "asia", flag: "🇵🇭", description: "Disaster risk reduction and sustainable development." },
  { name: "Vietnam", slug: "vietnam", region: "asia", flag: "🇻🇳", description: "Green growth and sustainable development pathways." },
  { name: "Thailand", slug: "thailand", region: "asia", flag: "🇹🇭", description: "Inclusive growth and environmental sustainability." },
  
  // Europe & CIS
  { name: "Ukraine", slug: "ukraine", region: "europe", flag: "🇺🇦", description: "Recovery, reconstruction, and democratic resilience." },
  { name: "Turkey", slug: "turkey", region: "europe", flag: "🇹🇷", description: "Sustainable development and refugee integration." },
  { name: "Kazakhstan", slug: "kazakhstan", region: "europe", flag: "🇰🇿", description: "Green economy and sustainable energy transitions." },
  { name: "Uzbekistan", slug: "uzbekistan", region: "europe", flag: "🇺🇿", description: "Economic reform and climate adaptation support." },
  { name: "Georgia", slug: "georgia", region: "europe", flag: "🇬🇪", description: "Democratic governance and European integration." },
  { name: "Moldova", slug: "moldova", region: "europe", flag: "🇲🇩", description: "Sustainable development and social inclusion." },
  
  // Latin America & Caribbean
  { name: "Brazil", slug: "brazil", region: "latam", flag: "🇧🇷", description: "Amazon conservation and sustainable development." },
  { name: "Colombia", slug: "colombia", region: "latam", flag: "🇨🇴", description: "Peace building and sustainable development." },
  { name: "Mexico", slug: "mexico", region: "latam", flag: "🇲🇽", description: "Climate action and social inclusion programs." },
  { name: "Cuba", slug: "cuba", region: "latam", flag: "🇨🇺", description: "Sustainable agriculture and climate resilience." },
  { name: "Peru", slug: "peru", region: "latam", flag: "🇵🇪", description: "Biodiversity conservation and inclusive growth." },
  { name: "Haiti", slug: "haiti", region: "latam", flag: "🇭🇹", description: "Crisis recovery and community resilience." },
  { name: "Guatemala", slug: "guatemala", region: "latam", flag: "🇬🇹", description: "Governance and sustainable development support." },
  { name: "Ecuador", slug: "ecuador", region: "latam", flag: "🇪🇨", description: "Biodiversity and climate action programs." },
]

export default function CountriesPage() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesRegion = selectedRegion === "all" || country.region === selectedRegion
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesRegion && matchesSearch
    })
  }, [selectedRegion, searchQuery])

  const countryCount = useMemo(() => {
    const counts: Record<string, number> = { all: countries.length }
    regions.forEach(region => {
      if (region.id !== "all") {
        counts[region.id] = countries.filter(c => c.region === region.id).length
      }
    })
    return counts
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#0468B1] py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
              Where We Work
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-relaxed">
              UNDP works in about 170 countries and territories, partnering with governments 
              and communities to find their own solutions to global and national development challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#035a9c] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-white text-center">
            <div>
              <div className="text-3xl font-bold">170+</div>
              <div className="text-sm text-white/80">Countries & Territories</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-sm text-white/80">Regional Bureaus</div>
            </div>
            <div>
              <div className="text-3xl font-bold">130+</div>
              <div className="text-sm text-white/80">Country Offices</div>
            </div>
            <div>
              <div className="text-3xl font-bold">17K+</div>
              <div className="text-sm text-white/80">Staff Worldwide</div>
            </div>
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
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region.id)}
                  className={selectedRegion === region.id ? "bg-[#0468B1] hover:bg-[#035a9c]" : ""}
                >
                  {region.name}
                  <span className="ml-1 text-xs opacity-70">({countryCount[region.id]})</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {filteredCountries.length === 0 ? (
            <div className="text-center py-16">
              <Globe2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No countries found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredCountries.map((country) => (
                <Link key={country.slug} href={`/countries/${country.slug}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-0 shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl" role="img" aria-label={`${country.name} flag`}>
                          {country.flag}
                        </span>
                        <CardTitle className="text-lg">{country.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed line-clamp-2">
                        {country.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {regions.find(r => r.id === country.region)?.name}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Regional Bureaus */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-center mb-12">
            Regional Bureaus
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regions.filter(r => r.id !== "all").map((region) => (
              <Card key={region.id} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>{region.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {countryCount[region.id]} countries and territories with active UNDP programs.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedRegion(region.id)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    View Countries
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
