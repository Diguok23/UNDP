import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Leaf, Scale, Users, Building2, Heart, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

const issuesData: Record<string, {
  title: string
  description: string
  longDescription: string
  icon: React.ElementType
  color: string
  heroImage: string
  stats: { value: string; label: string }[]
  keyInitiatives: { title: string; description: string }[]
  relatedStories: { title: string; excerpt: string; image: string; slug: string }[]
}> = {
  climate: {
    title: "Climate & Environment",
    description: "Climate change is the defining challenge of our time.",
    longDescription: "UNDP supports over 140 countries in their climate action efforts, helping them develop and implement ambitious Nationally Determined Contributions, transition to clean energy, build climate resilience, and protect biodiversity. We mobilize climate finance, strengthen policy frameworks, and scale up nature-based solutions to address the interlinked crises of climate change and biodiversity loss.",
    icon: Leaf,
    color: "bg-green-600",
    heroImage: "/images/image-1-credit-undp-afghanistan.jpg",
    stats: [
      { value: "140+", label: "Countries supported on climate action" },
      { value: "$5B+", label: "Climate finance mobilized" },
      { value: "60M", label: "Hectares of land protected" },
      { value: "90+", label: "Countries on NDC implementation" },
    ],
    keyInitiatives: [
      { title: "Climate Promise", description: "Supporting 120+ countries to enhance their climate pledges and translate them into action." },
      { title: "Nature, Climate & Energy", description: "Integrated solutions for climate, nature, and sustainable energy transitions." },
      { title: "Green Commodities Programme", description: "Reducing deforestation in commodity supply chains while improving farmer livelihoods." },
    ],
    relatedStories: [
      { title: "Solar Power Brings Clean Water to Rural Afghanistan", excerpt: "Renewable energy solutions providing sustainable water access.", image: "/images/image-1-credit-undp-afghanistan.jpg", slug: "solar-power-afghanistan" },
      { title: "Sustainable Agriculture in Cuba", excerpt: "Climate-smart farming practices building resilience.", image: "/images/undp-cu-diosmara-farm-2025.jpg", slug: "sustainable-agriculture-cuba" },
    ],
  },
  poverty: {
    title: "Poverty & Inequality",
    description: "Eradicating poverty in all its forms remains the greatest global challenge.",
    longDescription: "UNDP works to understand and address the multiple dimensions of poverty—not just income, but also health, education, and living standards. We support countries in developing comprehensive poverty reduction strategies, strengthening social protection systems, and promoting inclusive economic growth that benefits everyone, especially those furthest behind.",
    icon: Scale,
    color: "bg-indigo-600",
    heroImage: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
    stats: [
      { value: "86M", label: "People helped escape poverty" },
      { value: "100+", label: "Countries with MPI analysis" },
      { value: "25M", label: "People with improved livelihoods" },
      { value: "1.1B", label: "People still in multidimensional poverty" },
    ],
    keyInitiatives: [
      { title: "Multidimensional Poverty Index", description: "Tracking poverty beyond income to guide targeted interventions." },
      { title: "Social Protection", description: "Building systems that protect vulnerable populations from shocks and crises." },
      { title: "Inclusive Growth", description: "Ensuring economic development benefits the most marginalized communities." },
    ],
    relatedStories: [
      { title: "Empowering Women Entrepreneurs in Nigeria", excerpt: "Small business support transforming communities.", image: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg", slug: "empowering-women-nigeria" },
    ],
  },
  gender: {
    title: "Gender Equality",
    description: "Gender equality is a fundamental human right and development accelerator.",
    longDescription: "UNDP integrates gender equality across all our work while running targeted programs on women's economic empowerment, political participation, and ending gender-based violence. We work with governments, civil society, and communities to transform social norms, strengthen legal frameworks, and create opportunities for women and girls to thrive.",
    icon: Users,
    color: "bg-pink-600",
    heroImage: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
    stats: [
      { value: "70+", label: "Countries with gender programs" },
      { value: "15M", label: "Women economically empowered" },
      { value: "50+", label: "Countries on gender governance" },
      { value: "40%", label: "Of our programs gender-focused" },
    ],
    keyInitiatives: [
      { title: "Women's Economic Empowerment", description: "Creating opportunities for women to participate in and benefit from economic growth." },
      { title: "Gender-Responsive Governance", description: "Increasing women's political participation and leadership." },
      { title: "Ending Gender-Based Violence", description: "Working to eliminate violence against women and girls worldwide." },
    ],
    relatedStories: [
      { title: "Empowering Women Entrepreneurs in Nigeria", excerpt: "Economic opportunities transforming lives.", image: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg", slug: "empowering-women-nigeria" },
    ],
  },
  governance: {
    title: "Democratic Governance",
    description: "Effective institutions are the foundation of sustainable development.",
    longDescription: "UNDP strengthens governance systems that are responsive, inclusive, and accountable. We support electoral processes, strengthen parliaments and judiciaries, combat corruption, promote human rights, and help build institutions that deliver services effectively to all citizens. Good governance creates the conditions for sustainable development and lasting peace.",
    icon: Building2,
    color: "bg-amber-600",
    heroImage: "/images/human-development-healthy-planet.jpg",
    stats: [
      { value: "95", label: "Elections supported" },
      { value: "130+", label: "Parliaments strengthened" },
      { value: "80+", label: "Countries on rule of law" },
      { value: "60+", label: "Countries on anti-corruption" },
    ],
    keyInitiatives: [
      { title: "Electoral Support", description: "Technical assistance for credible, inclusive elections worldwide." },
      { title: "Rule of Law & Justice", description: "Strengthening judicial systems and expanding access to justice." },
      { title: "Anti-Corruption", description: "Building transparent, accountable institutions that serve all citizens." },
    ],
    relatedStories: [],
  },
  crisis: {
    title: "Crisis Prevention & Response",
    description: "Helping communities prevent crises and build back better.",
    longDescription: "UNDP works across the humanitarian-development-peace nexus, helping communities prevent crises, respond when they occur, and recover in ways that address root causes and build long-term resilience. We support early warning systems, provide emergency livelihoods, clear landmines, support peacebuilding, and help communities reduce disaster risk.",
    icon: Heart,
    color: "bg-red-600",
    heroImage: "/images/undp-cu-diosmara-farm-2025.jpg",
    stats: [
      { value: "50+", label: "Crisis countries supported" },
      { value: "10M", label: "Emergency livelihoods provided" },
      { value: "35+", label: "Countries on disaster risk" },
      { value: "25+", label: "Countries on peacebuilding" },
    ],
    keyInitiatives: [
      { title: "Crisis Response", description: "Rapid deployment to help communities recover from conflict and disaster." },
      { title: "Resilience Building", description: "Strengthening capacity to prevent and withstand future shocks." },
      { title: "Mine Action", description: "Clearing landmines and explosive remnants to save lives and enable recovery." },
    ],
    relatedStories: [],
  },
  innovation: {
    title: "Innovation & Technology",
    description: "Harnessing innovation to accelerate sustainable development.",
    longDescription: "UNDP operates a global network of innovation facilities that test new approaches to development challenges. We support countries in leveraging digital technologies for governance, service delivery, and citizen engagement while ensuring that technological change benefits everyone and leaves no one behind. Innovation is how we find new solutions to persistent problems.",
    icon: Lightbulb,
    color: "bg-cyan-600",
    heroImage: "/images/human-development-healthy-planet.jpg",
    stats: [
      { value: "115", label: "Innovation labs worldwide" },
      { value: "60+", label: "Countries on digital governance" },
      { value: "500+", label: "Innovations tested" },
      { value: "50+", label: "Solutions scaled globally" },
    ],
    keyInitiatives: [
      { title: "Accelerator Labs", description: "A global network learning about emerging challenges and testing solutions." },
      { title: "Digital Transformation", description: "Supporting governments in digital governance and service delivery." },
      { title: "Frontier Technologies", description: "Exploring AI, blockchain, and other technologies for development impact." },
    ],
    relatedStories: [],
  },
}

export async function generateStaticParams() {
  return Object.keys(issuesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const issue = issuesData[slug]
  if (!issue) return { title: "Issue Not Found | UNDP" }
  
  return {
    title: `${issue.title} | UNDP`,
    description: issue.description,
  }
}

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const issue = issuesData[slug]
  
  if (!issue) {
    notFound()
  }

  const Icon = issue.icon

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={issue.heroImage || "/placeholder.svg"}
            alt={issue.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-12 lg:py-20">
          <Link 
            href="/issues" 
            className="mb-4 inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Issues
          </Link>
          <div className="flex items-center gap-4">
            <div className={`${issue.color} rounded-full p-4`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl text-balance">
              {issue.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-xl text-foreground font-medium leading-relaxed">
              {issue.description}
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {issue.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-[#0468B1]">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {issue.stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-4xl font-bold md:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-12">Key Initiatives</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {issue.keyInitiatives.map((initiative) => (
              <Card key={initiative.title} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{initiative.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {initiative.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {issue.relatedStories.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Related Stories</h2>
              <Button asChild variant="outline">
                <Link href="/news">View All Stories</Link>
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {issue.relatedStories.map((story) => (
                <Link 
                  key={story.slug}
                  href={`/news/${story.slug}`}
                  className="group overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{story.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Explore Our Work</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See how we're addressing {issue.title.toLowerCase()} in countries around the world.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-[#0468B1] hover:bg-[#035a9c]">
              <Link href="/countries">
                View Country Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/resources">Browse Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
