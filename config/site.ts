export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Naveen",
  description: "Online coding platform by naveen ",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Docs",
      href: "/docs",
    },
    {
      title: "Cources",
      href: "/cources",
    },
    {
      title: "Contests",
      href: "/contests",
    },
    {
      title: "Editor",
      href: "/editor",
    },
  ],
  links: {
    twitter: "http://localhost:3000",
    github: "https://github.com/Naveenalla3000",
    docs: "http://localhost:3000",
  },
}

export const contestInstructions: string[] = [
  "We've updated our contest rules to better reflect participant feedback, ensuring a fairer and more comprehensive competition. Review the new rules for detailed insights.",
  "We'll update the final contest ratings within 5 working days post-contest.",
  "Incorrect submissions will keep hidden test cases confidential to preserve the contest's integrity.",
  "To support learning and improvement, we encourage participants to discuss strategies and solutions in the forum after the contest has concluded.",
]
