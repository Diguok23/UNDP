import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Scale, Users, Building2, Heart, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Global Issues | UNDP",
  description: "Explore the critical global issues UNDP addresses: climate change, poverty, gender equality, governance, crisis response, and innovation.",
}

const issues = [
  {
    title: "Climate & Environment",
    slug: "climate",
    description: "Climate change is the defining challenge of our time. UNDP helps countries transition to low-carbon, climate-resilient economies while protecting biodiversity and ecosystems.",
    icon: Leaf,
    color: "bg-green-600",
    image: "/images/image-1-credit-undp-afghanistan.jpg",
    stats: [
      { value: "140+", label: "Countries supported on climate action" },
      { value: "$5B+", label: "Climate finance mobilized" },
      { value: "60M", label: "Hectares of land protected" },
    ],
    approach: "We support countries in implementing their climate commitments, transitioning to clean energy, and building resilience to climate impacts through nature-based solutions.",
  },
  {
    title: "Poverty & Inequality",
    slug: "poverty",
    description: "Over 1 billion people still live in multidimensional poverty. UNDP works to eradicate poverty in all its forms and reduce inequalities within and among countries.",
    icon: Scale,
    color: "bg-indigo-600",
    image: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
    stats: [
      { value: "86M", label: "People helped escape poverty" },
      { value: "100+", label: "Countries with poverty analysis" },
      { value: "25M", label: "People with improved livelihoods" },
    ],
    approach: "We analyze multidimensional poverty, strengthen social protection systems, promote inclusive growth, and ensure that the most vulnerable are not left behind.",
  },
  {
    title: "Gender Equality",
    slug: "gender",
    description: "Gender equality is not only a fundamental human right but a necessary foundation for a peaceful, prosperous world. UNDP puts gender equality at the center of all our work.",
    icon: Users,
    color: "bg-pink-600",
    image: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
    stats: [
      { value: "70+", label: "Countries with gender equality programs" },
      { value: "15M", label: "Women economically empowered" },
      { value: "50+", label: "Countries on gender-responsive governance" },
    ],
    approach: "We advance women's economic empowerment, promote gender-responsive governance, and work to eliminate all forms of gender-based violence and discrimination.",
  },
  {
    title: "Democratic Governance",
    slug: "governance",
    description: "Effective, accountable institutions are essential for sustainable development. UNDP strengthens governance systems that deliver for people and uphold human rights.",
    icon: Building2,
    color: "bg-amber-600",
    image: "/images/human-development-healthy-planet.jpg",
    stats: [
      { value: "95", label: "Elections supported" },
      { value: "130+", label: "Parliaments strengthened" },
      { value: "80+", label: "Countries on rule of law" },
    ],
    approach: "We support inclusive political participation, strengthen justice systems, combat corruption, and help build transparent, accountable institutions.",
  },
  {
    title: "Crisis Prevention & Response",
    slug: "crisis",
    description: "From conflict to natural disasters, crises reverse development gains and push millions into poverty. UNDP helps communities prevent crises and build back better.",
    icon: Heart,
    color: "bg-red-600",
    image: "/images/undp-cu-diosmara-farm-2025.jpg",
    stats: [
      { value: "50+", label: "Crisis-affected countries supported" },
      { value: "10M", label: "People with emergency livelihoods" },
      { value: "35+", label: "Countries on disaster risk reduction" },
    ],
    approach: "We work on early warning, conflict prevention, crisis response, and building resilience so communities can withstand and recover from shocks.",
  },
  {
    title: "Innovation & Technology",
    slug: "innovation",
    description: "Technology and innovation can accelerate progress on the SDGs. UNDP harnesses digital tools and innovative approaches to solve development challenges.",
    icon: Lightbulb,
    color: "bg-cyan-600",
    image: "/images/human-development-healthy-planet.jpg",
    stats: [
      { value: "115", label: "Innovation labs worldwide" },
      { value: "60+", label: "Countries on digital governance" },
      { value: "500+", label: "Innovations tested and scaled" },
    ],
    approach: "We support countries in harnessing technology for development, testing innovative solutions, and scaling what works to achieve the SDGs faster.",
  },
]

export default function IssuesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#0468B1] py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
              Global Issues
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-relaxed">
              The world faces interconnected challenges that require integrated solutions. 
              Explore the critical issues UNDP addresses to build a better future for all.
            </p>
          </div>
        </div>
      </section>

      {/* Issues Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {issues.map((issue, index) => (
              <div 
                key={issue.slug}
                id={issue.slug}
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={issue.image || "/placeholder.svg"}
                      alt={issue.title}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-4 left-4 ${issue.color} rounded-full p-3`}>
                      <issue.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
                    {issue.title}
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {issue.description}
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    <strong>Our Approach:</strong> {issue.approach}
                  </p>

                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {issue.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="mt-8 bg-[#0468B1] hover:bg-[#035a9c]">
                    <Link href={`/issues/${issue.slug}`}>
                      Explore {issue.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Connection */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
                Connected to the SDGs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                All the issues we address are interconnected and mapped to the 17 Sustainable 
                Development Goals. Progress in one area accelerates progress in others.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our integrated approach ensures that solutions address multiple challenges 
                simultaneously, maximizing impact and avoiding trade-offs between different 
                development priorities.
              </p>
              <Button asChild className="mt-6 bg-[#0468B1] hover:bg-[#035a9c]">
                <Link href="/what-we-do">
                  Learn About Our Approach
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/sdg-wheel.svg"
                alt="Sustainable Development Goals Wheel"
                width={400}
                height={400}
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl mb-12">
            Explore by Issue
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {issues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/issues/${issue.slug}`}
                className="group flex flex-col items-center rounded-lg border border-border p-6 text-center transition-all hover:border-primary hover:shadow-lg"
              >
                <div className={`${issue.color} rounded-full p-3 transition-transform group-hover:scale-110`}>
                  <issue.icon className="h-6 w-6 text-white" />
                </div>
                <span className="mt-4 font-semibold text-foreground group-hover:text-primary">
                  {issue.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
