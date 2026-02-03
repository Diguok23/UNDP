import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Zap, Building2, Heart, Users, Scale, Lightbulb, Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What We Do | UNDP",
  description: "Explore UNDP's work across sustainable development, climate action, governance, gender equality, and crisis response.",
}

const thematicAreas = [
  {
    title: "Sustainable Development",
    description: "Helping countries achieve the 2030 Agenda through integrated solutions that address poverty, inequality, and environmental sustainability.",
    icon: Leaf,
    color: "bg-green-600",
    href: "/what-we-do/sustainable-development",
    highlights: [
      "Supporting national SDG implementation strategies",
      "Strengthening statistical capacity for SDG monitoring",
      "Financing sustainable development solutions",
    ],
  },
  {
    title: "Climate & Environment",
    description: "Supporting countries in climate adaptation, mitigation, and the transition to sustainable energy and nature-based solutions.",
    icon: Zap,
    color: "bg-blue-600",
    href: "/issues/climate",
    highlights: [
      "Nationally Determined Contributions support",
      "Climate finance and green economy",
      "Nature-based solutions and biodiversity",
    ],
  },
  {
    title: "Democratic Governance",
    description: "Building effective, accountable, and inclusive institutions that deliver for people and uphold human rights.",
    icon: Building2,
    color: "bg-amber-600",
    href: "/issues/governance",
    highlights: [
      "Rule of law and access to justice",
      "Anti-corruption and transparency",
      "Electoral support and civic engagement",
    ],
  },
  {
    title: "Crisis Prevention & Response",
    description: "Helping communities prevent crises, respond effectively when they occur, and build back better.",
    icon: Heart,
    color: "bg-red-600",
    href: "/issues/crisis",
    highlights: [
      "Early warning and prevention",
      "Humanitarian-development nexus",
      "Disaster risk reduction",
    ],
  },
  {
    title: "Gender Equality",
    description: "Advancing gender equality and women's empowerment as a core accelerator of sustainable development.",
    icon: Users,
    color: "bg-pink-600",
    href: "/issues/gender",
    highlights: [
      "Women's economic empowerment",
      "Gender-responsive governance",
      "Ending gender-based violence",
    ],
  },
  {
    title: "Poverty & Inequality",
    description: "Tackling the root causes of poverty and reducing inequalities to ensure no one is left behind.",
    icon: Scale,
    color: "bg-indigo-600",
    href: "/issues/poverty",
    highlights: [
      "Social protection systems",
      "Inclusive growth strategies",
      "Multidimensional poverty analysis",
    ],
  },
]

const approaches = [
  {
    title: "Signature Solutions",
    description: "Six integrated solutions that drive development impact: poverty and inequality, governance, resilience, environment, energy, and gender equality.",
    icon: Lightbulb,
  },
  {
    title: "SDG Integration",
    description: "Leveraging the interconnected nature of the SDGs to maximize development impact through integrated approaches.",
    icon: Globe2,
  },
  {
    title: "Innovation",
    description: "Using frontier technologies and innovative financing to accelerate development results and reach those furthest behind.",
    icon: Zap,
  },
]

export default function WhatWeDoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#0468B1] py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
              What We Do
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-relaxed">
              UNDP works across multiple interconnected areas to help countries achieve the 
              Sustainable Development Goals and leave no one behind.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
                Integrated Solutions for Complex Challenges
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Today's development challenges are interconnected. Poverty, climate change, 
                inequality, and weak governance reinforce each other. That's why UNDP takes 
                an integrated approach, working across sectors to maximize impact.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Our presence in over 170 countries gives us unique insight into local contexts, 
                while our global network enables us to share knowledge and scale solutions that work.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/sdg-wheel.svg"
                alt="Sustainable Development Goals"
                width={400}
                height={400}
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our Approach</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We combine global expertise with local knowledge to deliver lasting development results.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {approaches.map((approach) => (
              <Card key={approach.title} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 rounded-full bg-primary/10 p-4">
                    <approach.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{approach.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {approach.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Thematic Areas */}
      <section id="focus-areas" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our Focus Areas</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore the key thematic areas where UNDP is driving sustainable development impact.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {thematicAreas.map((area) => (
              <Card key={area.title} className="group overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className={`${area.color} p-4`}>
                  <area.icon className="h-10 w-10 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {area.description}
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {area.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={area.href}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-[#0468B1] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">Our Impact</h2>
            <p className="mt-4 text-lg text-white/90">
              Real results from our work around the world.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-5xl font-bold">86M</div>
              <p className="mt-2 text-white/80">People supported to escape multidimensional poverty</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold">53</div>
              <p className="mt-2 text-white/80">Countries supported on climate adaptation</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold">95</div>
              <p className="mt-2 text-white/80">Elections supported with technical assistance</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold">2.1M</div>
              <p className="mt-2 text-white/80">Jobs created through livelihood programs</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-white text-[#0468B1] hover:bg-white/90">
              <Link href="/resources/annual-report">
                Read Our Annual Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Explore Our Work by Country</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See how we're making a difference in specific countries and regions around the world.
          </p>
          <Button asChild size="lg" className="mt-8 bg-[#0468B1] hover:bg-[#035a9c]">
            <Link href="/countries">
              View Country Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
