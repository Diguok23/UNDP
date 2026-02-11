import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, Target, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const workAreas = {
  "sustainable-development": {
    title: "Sustainable Development",
    subtitle: "Advancing the 2030 Agenda",
    description: "UNEDP is the lead UN agency helping countries achieve the Sustainable Development Goals. We work with governments, civil society, and the private sector to build pathways out of poverty while protecting the planet.",
    heroImage: "/images/sdg-wheel.svg",
    challenges: [
      "Progress on the SDGs has stalled or reversed in many areas",
      "Climate change threatens development gains",
      "Growing inequalities within and between countries",
      "Need for systemic transformation across sectors"
    ],
    approach: [
      "Integrated policy support combining economic, social, and environmental dimensions",
      "Data and analytics for evidence-based decision making",
      "Financing solutions including SDG bonds and impact investment",
      "Multi-stakeholder partnerships for collective action"
    ],
    stats: [
      { value: "170+", label: "Countries supported" },
      { value: "500+", label: "SDG initiatives" },
      { value: "$2B+", label: "Annual investment" },
      { value: "50M+", label: "People reached" }
    ],
    results: [
      "Supported 85 countries in integrating SDGs into national plans",
      "Mobilized $4.2 billion in SDG financing",
      "Built data capacity in 60+ countries for SDG monitoring",
      "Trained 10,000+ government officials on SDG implementation"
    ],
    relatedNews: [
      {
        title: "New SDG Acceleration Framework launched",
        date: "January 2025",
        slug: "sdg-acceleration-framework"
      },
      {
        title: "UNDP partners with private sector on SDG financing",
        date: "December 2024",
        slug: "sdg-financing-partnership"
      }
    ]
  },
  "poverty-inequality": {
    title: "Poverty & Inequality",
    subtitle: "Leaving No One Behind",
    description: "UNDP works to eradicate extreme poverty in all its forms everywhere, while reducing inequalities within and among countries. We take an integrated approach that addresses the multidimensional nature of poverty.",
    heroImage: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
    challenges: [
      "700 million people still live in extreme poverty",
      "Inequality is rising in most countries",
      "COVID-19 reversed years of poverty reduction",
      "Climate change disproportionately affects the poor"
    ],
    approach: [
      "Multidimensional poverty analysis and measurement",
      "Social protection system strengthening",
      "Livelihood and employment programs",
      "Inclusive economic policies and financial inclusion"
    ],
    stats: [
      { value: "100M+", label: "People lifted out of poverty" },
      { value: "90+", label: "Countries with MPI data" },
      { value: "15M", label: "Jobs created/supported" },
      { value: "$500M", label: "In social protection" }
    ],
    results: [
      "Helped 100+ million people escape multidimensional poverty",
      "Supported social protection systems reaching 200 million people",
      "Created or supported 15 million livelihoods",
      "Advanced financial inclusion for 50 million people"
    ],
    relatedNews: [
      {
        title: "Multidimensional Poverty Index 2025 released",
        date: "January 2025",
        slug: "mpi-2025-release"
      },
      {
        title: "UNDP expands livelihood programs in Africa",
        date: "November 2024",
        slug: "livelihoods-africa"
      }
    ]
  },
  "climate-environment": {
    title: "Climate & Environment",
    subtitle: "Protecting People and Planet",
    description: "UNDP helps countries tackle climate change and environmental degradation while building resilience. Through the Climate Promise, we support the world's largest portfolio of climate action initiatives.",
    heroImage: "/images/human-development-healthy-planet.jpg",
    challenges: [
      "Climate impacts accelerating faster than predicted",
      "Biodiversity loss threatening ecosystems and livelihoods",
      "Developing countries need $300B+ annually for climate action",
      "Just transition requires protecting vulnerable communities"
    ],
    approach: [
      "Climate Promise supporting 120+ countries on NDCs",
      "Nature-based solutions and ecosystem restoration",
      "Green and circular economy transitions",
      "Climate finance mobilization and access"
    ],
    stats: [
      { value: "120+", label: "Countries in Climate Promise" },
      { value: "$5B+", label: "Climate finance mobilized" },
      { value: "50M", label: "Hectares restored" },
      { value: "30M", label: "People with improved resilience" }
    ],
    results: [
      "Supported 120+ countries to enhance climate commitments",
      "Mobilized $5+ billion in climate finance",
      "Protected or restored 50 million hectares of ecosystems",
      "Built climate resilience for 30 million people"
    ],
    relatedNews: [
      {
        title: "Climate Promise expands to new countries",
        date: "January 2025",
        slug: "climate-promise-expansion"
      },
      {
        title: "Record climate finance mobilized in 2024",
        date: "December 2024",
        slug: "climate-finance-record"
      }
    ]
  },
  "gender-equality": {
    title: "Gender Equality",
    subtitle: "Empowering Women and Girls",
    description: "UNEDP integrates gender equality across all our work while implementing targeted initiatives to advance women's rights, leadership, and economic empowerment.",
    heroImage: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
    challenges: [
      "No country has achieved full gender equality",
      "Women bear disproportionate climate and crisis impacts",
      "Gender gaps persist in leadership and economic participation",
      "Gender-based violence remains widespread"
    ],
    approach: [
      "Gender mainstreaming across all programs",
      "Women's leadership and political participation",
      "Economic empowerment and entrepreneurship",
      "Addressing gender-based violence"
    ],
    stats: [
      { value: "50+", label: "Countries with gender programs" },
      { value: "10M+", label: "Women economically empowered" },
      { value: "5,000+", label: "Women in leadership trained" },
      { value: "100+", label: "Gender-responsive laws supported" }
    ],
    results: [
      "Economically empowered 10+ million women",
      "Supported 100+ gender-responsive laws and policies",
      "Trained 5,000+ women leaders",
      "Integrated gender across $3 billion in programming"
    ],
    relatedNews: [
      {
        title: "UNDP Gender Equality Strategy 2025-2030 launched",
        date: "January 2025",
        slug: "gender-strategy-launch"
      },
      {
        title: "Women's economic empowerment program expands",
        date: "October 2024",
        slug: "womens-empowerment"
      }
    ]
  },
  "crisis-resilience": {
    title: "Crisis Response & Resilience",
    subtitle: "From Crisis to Recovery",
    description: "UNEDP works before, during, and after crises to help communities prepare, respond, and recover. We focus on building long-term resilience while addressing immediate needs.",
    heroImage: "/images/image-1-credit-undp-afghanistan.jpg",
    challenges: [
      "Record 360 million people need humanitarian assistance",
      "Crises increasingly complex and protracted",
      "Climate change amplifying disaster risks",
      "Funding gaps for prevention and recovery"
    ],
    approach: [
      "Crisis prevention and early warning",
      "Emergency livelihoods and basic services",
      "Recovery and reconstruction",
      "Building resilience to future shocks"
    ],
    stats: [
      { value: "60+", label: "Crisis response operations" },
      { value: "100M+", label: "People supported in crises" },
      { value: "$2B+", label: "Crisis response funding" },
      { value: "40+", label: "Recovery programs" }
    ],
    results: [
      "Responded to 60+ crises in 2024",
      "Supported 100+ million people affected by crises",
      "Created 5 million emergency livelihoods",
      "Rebuilt critical infrastructure in 30+ countries"
    ],
    relatedNews: [
      {
        title: "UNEDP scales up crisis response capacity",
        date: "January 2025",
        slug: "crisis-response-scale"
      },
      {
        title: "Recovery programs show lasting impact",
        date: "November 2024",
        slug: "recovery-impact"
      }
    ]
  },
  "governance-institutions": {
    title: "Governance & Institutions",
    subtitle: "Building Effective, Accountable Institutions",
    description: "UNEDP strengthens governance systems and institutions to be more inclusive, effective, and accountable. We work on rule of law, anti-corruption, and digital transformation.",
    heroImage: "/images/undp60-crop.jpg",
    challenges: [
      "Trust in institutions declining globally",
      "Corruption costs $2.6 trillion annually",
      "Digital divide in government services",
      "Rule of law backsliding in many countries"
    ],
    approach: [
      "Institutional capacity building",
      "Anti-corruption and transparency",
      "Digital governance transformation",
      "Rule of law and access to justice"
    ],
    stats: [
      { value: "80+", label: "Countries supported" },
      { value: "200+", label: "Institutions strengthened" },
      { value: "50+", label: "Digital gov initiatives" },
      { value: "100M+", label: "People with better access to justice" }
    ],
    results: [
      "Strengthened 200+ government institutions",
      "Supported anti-corruption measures in 50+ countries",
      "Launched 50+ digital governance initiatives",
      "Improved access to justice for 100+ million people"
    ],
    relatedNews: [
      {
        title: "Digital governance transformation accelerates",
        date: "January 2025",
        slug: "digital-governance"
      },
      {
        title: "Anti-corruption partnerships expand",
        date: "September 2024",
        slug: "anti-corruption"
      }
    ]
  }
}

export function generateStaticParams() {
  return Object.keys(workAreas).map((slug) => ({ slug }))
}

export default async function WorkAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = workAreas[slug as keyof typeof workAreas]

  if (!area) {
    notFound()
  }

  const slugs = Object.keys(workAreas)
  const currentIndex = slugs.indexOf(slug)
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={area.heroImage || "/placeholder.svg"}
          alt={area.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to What We Do
            </Link>
            <p className="text-primary-foreground/80 text-lg mb-2">{area.subtitle}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {area.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {area.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {area.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-destructive" />
                  The Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {area.challenges.map((challenge, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-destructive font-bold">{index + 1}.</span>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Approach */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Our Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {area.approach.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Our Results</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {area.results.map((result, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-lg">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Related News</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {area.relatedNews.map((news, index) => (
              <Link
                key={index}
                href={`/news/${news.slug}`}
                className="block p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow group"
              >
                <p className="text-sm text-muted-foreground mb-2">{news.date}</p>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {prevSlug ? (
              <Button variant="ghost" asChild>
                <Link href={`/what-we-do/${prevSlug}`} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {workAreas[prevSlug as keyof typeof workAreas].title}
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {nextSlug && (
              <Button variant="ghost" asChild>
                <Link href={`/what-we-do/${nextSlug}`} className="flex items-center gap-2">
                  {workAreas[nextSlug as keyof typeof workAreas].title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Learn more about how UNEDP is working on {area.title.toLowerCase()} around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/countries">Explore Country Programs</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources">View Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
