import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

const articlesData: Record<string, {
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  author: string
  topic: string
  relatedArticles: { title: string; slug: string; image: string }[]
}> = {
  "empowering-women-nigeria": {
    title: "Empowering Women Entrepreneurs in Nigeria",
    excerpt: "How small business support is transforming communities and creating economic opportunities for women across Nigeria.",
    content: `
      <p>In the bustling markets of Lagos and the rural communities of northern Nigeria, a quiet revolution is underway. Women entrepreneurs are transforming their families and communities through small businesses, supported by UNDP's comprehensive economic empowerment programs.</p>
      
      <h2>Breaking Barriers to Economic Participation</h2>
      <p>For decades, women in Nigeria have faced significant barriers to economic participation, including limited access to finance, skills training, and markets. UNDP's Women's Economic Empowerment Programme is addressing these challenges head-on, providing holistic support that enables women to start and grow sustainable businesses.</p>
      
      <p>"Before the programme, I could barely feed my family," says Amina, a 34-year-old mother of four from Kano State. "Now I run a successful tailoring business and employ three other women. My children are all in school, and I'm saving for the future."</p>
      
      <h2>Comprehensive Support Model</h2>
      <p>The programme combines multiple elements to maximize impact:</p>
      <ul>
        <li><strong>Skills training:</strong> Women receive vocational training in trades ranging from tailoring to food processing</li>
        <li><strong>Access to finance:</strong> Microloans and savings groups help women access the capital they need</li>
        <li><strong>Market linkages:</strong> Connections to buyers and digital marketplaces expand business opportunities</li>
        <li><strong>Mentorship:</strong> Successful businesswomen provide guidance and support to newcomers</li>
      </ul>
      
      <h2>Impact at Scale</h2>
      <p>Since its launch, the programme has reached over 50,000 women across 15 states. Independent evaluations show that participating women have increased their monthly incomes by an average of 120%, with ripple effects throughout their communities.</p>
      
      <p>"When you empower a woman, you empower a community," says Dr. Fatima Bello, UNDP Nigeria's Gender Advisor. "We're seeing improvements in child nutrition, school enrollment, and household decision-making power."</p>
      
      <h2>Looking Ahead</h2>
      <p>Building on this success, UNDP is scaling up the programme with support from the Government of Nigeria and international partners. The goal is to reach 200,000 women by 2028, with a particular focus on climate-vulnerable communities and conflict-affected areas.</p>
      
      <p>For women like Amina, the future has never looked brighter. "I dream of opening a training center for young women," she says. "I want to give them the same chance I received."</p>
    `,
    image: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg",
    date: "January 28, 2026",
    readTime: "5 min read",
    author: "UNDP Nigeria",
    topic: "Gender Equality",
    relatedArticles: [
      { title: "Sustainable Agriculture in Cuba", slug: "sustainable-agriculture-cuba", image: "/images/undp-cu-diosmara-farm-2025.jpg" },
      { title: "Solar Power Brings Clean Water to Rural Afghanistan", slug: "solar-power-afghanistan", image: "/images/image-1-credit-undp-afghanistan.jpg" },
    ],
  },
  "solar-power-afghanistan": {
    title: "Solar Power Brings Clean Water to Rural Afghanistan",
    excerpt: "Renewable energy solutions are providing sustainable access to clean water for communities in remote areas.",
    content: `
      <p>In the remote villages of Afghanistan's central highlands, solar panels are powering a transformation. Communities that once struggled to access clean water are now benefiting from sustainable, solar-powered water systems that provide reliable access year-round.</p>
      
      <h2>A Sustainable Solution</h2>
      <p>The lack of reliable electricity has long been a barrier to water access in rural Afghanistan. Traditional diesel pumps are expensive to operate and maintain, often breaking down at critical times. Solar-powered systems offer a sustainable alternative.</p>
      
      <p>"Before, we had to walk two hours to fetch water," says Zahra, a young girl from Bamyan Province. "Now, clean water comes right to our village. I have more time for school."</p>
      
      <h2>Community-Led Implementation</h2>
      <p>UNDP works closely with communities throughout the project cycle. Local residents are involved in site selection, construction, and ongoing maintenance, ensuring ownership and sustainability.</p>
      
      <p>Each system includes:</p>
      <ul>
        <li>Solar panels and battery storage for reliable power</li>
        <li>Deep well pumps accessing groundwater</li>
        <li>Storage tanks and distribution networks</li>
        <li>Water points designed for safe, easy access</li>
      </ul>
      
      <h2>Health and Economic Benefits</h2>
      <p>The impact extends far beyond water access. Waterborne diseases have decreased by 60% in communities with new systems. Women and girls, who traditionally bear the burden of water collection, now have time for education and economic activities.</p>
      
      <h2>Scaling Up</h2>
      <p>With support from the Green Climate Fund, UNDP is expanding the programme to reach 500 communities by 2027. The initiative demonstrates how climate solutions can address multiple development challenges simultaneously.</p>
    `,
    image: "/images/image-1-credit-undp-afghanistan.jpg",
    date: "January 25, 2026",
    readTime: "4 min read",
    author: "UNDP Afghanistan",
    topic: "Climate Action",
    relatedArticles: [
      { title: "Empowering Women Entrepreneurs in Nigeria", slug: "empowering-women-nigeria", image: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg" },
      { title: "Sustainable Agriculture in Cuba", slug: "sustainable-agriculture-cuba", image: "/images/undp-cu-diosmara-farm-2025.jpg" },
    ],
  },
  "sustainable-agriculture-cuba": {
    title: "Sustainable Agriculture in Cuba",
    excerpt: "Supporting farmers with climate-smart practices to build resilient food systems and protect biodiversity.",
    content: `
      <p>On the rolling hills of Cuba's Pinar del Río province, farmers are pioneering climate-smart agricultural practices that protect the environment while improving yields. With UNDP support, they're building a model for sustainable food production.</p>
      
      <h2>Climate-Smart Farming</h2>
      <p>Cuba's agricultural sector faces increasing pressure from climate change, including more frequent droughts, intense hurricanes, and unpredictable rainfall. Traditional farming methods are no longer sufficient.</p>
      
      <p>UNDP's Sustainable Agriculture Programme introduces practices including:</p>
      <ul>
        <li>Agroforestry systems that combine crops with trees</li>
        <li>Water-efficient irrigation technologies</li>
        <li>Organic pest management</li>
        <li>Soil conservation techniques</li>
      </ul>
      
      <h2>Farmer Stories</h2>
      <p>"My grandfather farmed this land, but the old ways don't work anymore," says Diosmara, a cattle farmer. "With the new techniques, my pastures stay green even in dry season, and my cattle are healthier."</p>
      
      <h2>Protecting Biodiversity</h2>
      <p>The programme also focuses on protecting Cuba's unique biodiversity. Farmers are learning to maintain wildlife corridors, protect native species, and use integrated pest management instead of harmful chemicals.</p>
      
      <h2>Results and Expansion</h2>
      <p>After three years, participating farms have seen 40% increases in productivity while reducing water use by 30%. The model is now being expanded to other provinces with support from the Global Environment Facility.</p>
    `,
    image: "/images/undp-cu-diosmara-farm-2025.jpg",
    date: "January 22, 2026",
    readTime: "4 min read",
    author: "UNDP Cuba",
    topic: "Climate Action",
    relatedArticles: [
      { title: "Solar Power Brings Clean Water to Rural Afghanistan", slug: "solar-power-afghanistan", image: "/images/image-1-credit-undp-afghanistan.jpg" },
      { title: "Empowering Women Entrepreneurs in Nigeria", slug: "empowering-women-nigeria", image: "/images/image-18-credit-undp-nigeria-amalachukwu-ibeneme-crop.jpg" },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articlesData[slug]
  if (!article) return { title: "Article Not Found | UNDP" }
  
  return {
    title: `${article.title} | UNDP News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: "article",
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articlesData[slug]
  
  if (!article) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-12 lg:py-20">
          <Link 
            href="/news" 
            className="mb-4 inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
          <span className="mb-4 inline-block rounded-full bg-[#0468B1] px-4 py-1 text-sm font-semibold text-white">
            {article.topic}
          </span>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl max-w-4xl text-balance">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </span>
            <span>By {article.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share */}
              <div className="mt-12 border-t border-border pt-8">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Share2 className="h-4 w-4" />
                    Share this story
                  </span>
                  <div className="flex gap-2">
                    <a 
                      href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://undp.org/news/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://undp.org/news/${slug}`)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://undp.org/news/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">Related Stories</h3>
                <div className="space-y-4">
                  {article.relatedArticles.map((related) => (
                    <Link 
                      key={related.slug}
                      href={`/news/${related.slug}`}
                      className="group flex gap-4"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-3">
                        {related.title}
                      </h4>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 rounded-lg bg-muted p-6">
                  <h3 className="font-semibold text-foreground">Stay Updated</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Subscribe to receive the latest news and stories from UNDP.
                  </p>
                  <Button asChild className="mt-4 w-full bg-[#0468B1] hover:bg-[#035a9c]">
                    <Link href="/news#subscribe">Subscribe</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
