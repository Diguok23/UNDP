import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  about: [
    { name: "Who We Are", href: "/about" },
    { name: "Our Leadership", href: "/about#leadership" },
    { name: "Our History", href: "/about#history" },
    { name: "Careers", href: "/careers" },
  ],
  work: [
    { name: "Sustainable Development", href: "/what-we-do" },
    { name: "Climate Action", href: "/issues/climate" },
    { name: "Gender Equality", href: "/issues/gender" },
    { name: "Governance", href: "/issues/governance" },
  ],
  resources: [
    { name: "Publications", href: "/resources" },
    { name: "Data Portal", href: "/resources#data" },
    { name: "Annual Reports", href: "/resources#reports" },
    { name: "Press Room", href: "/news" },
  ],
  countries: [
    { name: "Africa", href: "/countries?region=africa" },
    { name: "Arab States", href: "/countries?region=arab" },
    { name: "Asia & Pacific", href: "/countries?region=asia" },
    { name: "Europe & CIS", href: "/countries?region=europe" },
    { name: "Latin America", href: "/countries?region=latam" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/undp", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com/undp", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com/undp", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/company/undp", icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com/undp", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0468B1] text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <svg width="60" height="122" viewBox="0 0 60 122" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-auto">
                <path d="M29.07 61.73H0.0300293V90.77H29.07V61.73Z" fill="white"/>
                <path d="M7.40002 66.49V77.91C7.40002 83.91 10.4 86.2 14.4 86.2C18.6 86.2 21.73 83.78 21.73 77.82V66.49H19.16V78C19.16 82.26 17.29 84.16 14.45 84.16C11.85 84.16 9.93002 82.31 9.93002 78V66.49H7.40002Z" fill="#0468B1"/>
                <path d="M59.9 61.73H30.86V90.77H59.9V61.73Z" fill="white"/>
                <path d="M40.46 86V77.67C40.46 74.44 40.46 72.11 40.29 69.67H40.38C41.4463 71.8926 42.6555 74.0438 44 76.11L50.13 86H52.66V66.56H50.31V74.7C50.31 77.7 50.31 80.05 50.59 82.64H50.5C49.5009 80.4608 48.348 78.3555 47.05 76.34L40.87 66.53H38.11V86H40.46Z" fill="#0468B1"/>
                <path d="M59.9 92.55H30.86V121.59H59.9V92.55Z" fill="white"/>
                <path d="M50.29 98.79C49.13 97.79 47.29 97.18 44.85 97.18C43.2377 97.1631 41.6274 97.2971 40.04 97.58V116.71H42.54V109C43.1982 109.132 43.8691 109.189 44.54 109.17C45.6256 109.231 46.7123 109.07 47.7336 108.697C48.7549 108.324 49.6894 107.746 50.48 107C51.0024 106.446 51.4066 105.792 51.6679 105.076C51.9293 104.361 52.0423 103.6 52 102.84C52.0182 102.089 51.8739 101.342 51.577 100.652C51.2802 99.9618 50.8378 99.3436 50.28 98.84" fill="#0468B1"/>
                <path d="M44.62 107.22C43.9212 107.236 43.223 107.169 42.54 107.02V99.48C43.3192 99.3435 44.109 99.2766 44.9 99.28C47.66 99.28 49.48 100.51 49.48 103.11C49.48 105.71 47.66 107.22 44.62 107.22Z" fill="white"/>
                <path d="M29.04 92.58H0V121.62H29.04V92.58Z" fill="white"/>
                <path d="M20.42 99.54C18.72 97.96 16.16 97.15 12.57 97.15C10.7759 97.1524 8.98448 97.2861 7.20996 97.55V116.63C8.73037 116.801 10.2602 116.874 11.79 116.85C15.56 116.85 18.55 115.85 20.39 114.07C21.3321 113.061 22.064 111.875 22.543 110.58C23.022 109.286 23.2385 107.909 23.18 106.53C23.2577 105.233 23.0509 103.934 22.5742 102.725C22.0974 101.516 21.3622 100.425 20.42 99.53" fill="#0468B1"/>
                <path d="M12.28 114.85C11.4348 114.879 10.5887 114.839 9.75 114.73V99.4C10.7146 99.2089 11.6968 99.1217 12.68 99.14C17.97 99.14 20.57 101.99 20.54 106.62C20.54 111.85 17.63 114.87 12.28 114.85Z" fill="white"/>
                <path d="M59.93 0H0.0300293V59.91H59.93V0Z" fill="white"/>
              </svg>
            </Link>
            <p className="mt-4 text-sm text-white/80">
              United Nations Development Programme
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Work Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Our Work</h3>
            <ul className="space-y-2">
              {footerLinks.work.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Countries</h3>
            <ul className="space-y-2">
              {footerLinks.countries.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-8">
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <Link href="/fraud-alert" className="hover:text-white">Fraud Alert</Link>
            <Link href="/scam-alert" className="hover:text-white">Scam Alert</Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} United Nations Development Programme</p>
        </div>
      </div>
    </footer>
  )
}
