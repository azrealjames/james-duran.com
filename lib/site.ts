// Edit the text on the site here. Nothing else needs to change.

export const site = {
  name: "James Duran",
  url: "https://www.james-duran.com",
  email: "azrealjames@gmail.com",
  github: "https://github.com/azrealjames",
  linkedin: "https://www.linkedin.com/in/james-duran-b1061830/",
  location: "Denver, Colorado",
  year: 2026,
};

export type Project = {
  name: string;
  kind: string;
  description: string[];
  forWho: string;
  does: string;
  stack: string[];
  status: string;
  links: { label: string; href: string }[];
  // Optional screenshot. Put the file in public/images and set width/height to its real pixel size.
  image?: { src: string; alt: string; width: number; height: number };
};

export const projects: Project[] = [
  {
    name: "Worthy Estimates",
    kind: "Offline-ready PWA for tradespeople",
    description: [
      "Write an estimate on your phone, with line items, notes, and sales tax by city. Send a clean PDF by text or email, turn it into an invoice, and mark it paid. There is no account to create, and everything stays on the device, so it works on a job site with no signal.",
      "Now in early market testing with contractors.",
    ],
    forWho: "Contractors and small trades",
    does: "Estimates, invoices, PDF sharing, payment links",
    stack: ["PWA", "Offline-first", "Vercel"],
    status: "Live, market testing",
    links: [
      { label: "Live site", href: "https://worthyestimates.com" },
      { label: "Source on GitHub", href: "https://github.com/azrealjames/worthy-estimates" },
    ],
  },
  {
    name: "Worthy Rides",
    kind: "Trip profitability for rideshare drivers",
    description: [
      "Screenshot a ride offer and see right away whether it pays. The app reads the trip details from the image, works out the real profit after costs, and helps the driver decide to accept or decline.",
      "Next up is a loan payoff dashboard that connects daily earnings to paying off a vehicle.",
    ],
    forWho: "Uber and Lyft drivers",
    does: "Screenshot reading, profit math, trip history",
    stack: ["Next.js", "PWA", "Claude API", "Cloud Vision OCR"],
    status: "Live, expanding",
    links: [{ label: "Live site", href: "https://worthyrides.com" }],
  },
  {
    name: "Hovey Painting",
    kind: "Lead-generation site for a family painting company",
    description: [
      "A mobile-first site for a Denver-area painter that shows the work and makes it easy to ask for a free estimate. It features a before and after slider for a fire-damage restoration, a service breakdown, and clear calls to action on every screen.",
    ],
    forWho: "Homeowners looking for a painter",
    does: "Services, portfolio, before and after slider, contact",
    stack: ["Next.js", "Tailwind CSS"],
    status: "Live client site",
    links: [{ label: "Live site", href: "https://www.hoveypainting.com" }],
    image: { src: "/images/hoveypainting.png", alt: "The Hovey Painting home page with its logo and a Get a Quote button", width: 1919, height: 952 },
  },
  {
    name: "SEO Meta Tag Analyzer",
    kind: "Preview tool for marketers and developers",
    description: [
      "Enter any URL and see how its meta tags will look in Google results and on social platforms, with feedback on what to fix.",
    ],
    forWho: "Marketers and developers",
    does: "Search and social previews, tag feedback",
    stack: ["Next.js", "TypeScript", "Open Graph"],
    status: "Live",
    links: [{ label: "Live app", href: "https://v0-seo-tag-analyzer-app.vercel.app/" }],
    image: { src: "/images/seo-analyzer.png", alt: "The SEO Meta Tag Analyzer showing a 90% score and a checklist for a sample site", width: 1915, height: 981 },
  },
];

export const ticker = [
  "Estimates",
  "Invoices",
  "Trip math",
  "Lead pages",
  "Before and after",
  "Installable PWAs",
  "Works offline",
  "Screenshot to profit",
];

export const shippedStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "PWAs", "Claude API", "Vercel"];
export const trainedStack = ["Node.js", "Express", "MongoDB", "Python"];
