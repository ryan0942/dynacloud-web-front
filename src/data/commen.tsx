import { Award, BarChart3, Facebook, Linkedin, Target } from "lucide-react";

export const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "News", href: "/news" },
  { name: "Blog", href: "/blogs" },
  { name: "Case", href: "/cases" },
  { name: "Partners", href: "/#partners_section" },
  {
    name: "JoinUs",
    href: "https://www.104.com.tw/company/1a2x6blgx8#info06",
    target: "_blank",
    rel: "noopener noreferrer",
  },
] as const;

export const socialLinks = [
  {
    icon: <Facebook className="size-4" />,
    href: "https://www.facebook.com/Dynacloud.Co?locale=zh_TW",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    icon: <Linkedin className="size-4" />,
    href: "https://www.linkedin.com/company/dynacloudco/?originalSubdomain=tw",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export const HOME_TEAM_DATA = [
  {
    icon: <Target className="mx-auto mb-4 size-10 text-blue-400" />,
    heading: "Partnerships",
    description:
      "Creating strategic partnerships to deliver comprehensive solutions that drive business growth.",
  },
  {
    icon: <Award className="mx-auto mb-4 size-10 text-blue-400" />,
    heading: "Innovation",
    description:
      " Constantly pushing boundaries with innovative approaches to solve complex business challenges.",
  },
  {
    icon: <BarChart3 className="mx-auto mb-4 size-10 text-blue-400" />,
    heading: "Results",
    description:
      "Delivering measurable results that help our clients achieve their business objectives.",
  },
];
