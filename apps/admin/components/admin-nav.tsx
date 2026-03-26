import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/feeder-sites", label: "Feeder Sites" },
  { href: "/issue-boards", label: "Issue Boards" },
  { href: "/landing-factory", label: "Landing Factory" },
  { href: "/editorial-queue", label: "Editorial Queue" },
  { href: "/source-intel", label: "Source Intel" },
  { href: "/source-router", label: "Source Router" },
  { href: "/draft-studio", label: "Draft Studio" },
  { href: "/seo-ops", label: "SEO Ops" },
  { href: "/network-analytics", label: "Network Analytics" }
];

export function AdminNav() {
  return (
    <nav className="topnav shell">
      <div>
        <div className="eyebrow">TX-24 runoff suite</div>
        <strong>Campaign operator console</strong>
      </div>
      <div className="stack">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="navlink">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
