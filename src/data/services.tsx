import {
  BarChart,
  Cloud,
  Code,
  Palette,
  Shield,
  Smartphone,
} from "lucide-react";

export const services = [
  {
    icon: "/images/data/services/icon_1.png",
    image: "/images/data/services/image_1.png",
    title: "雲端伺服器託管服務",
    description:
      "Google Cloud 提供安全高效的雲端伺服器託管，助企業快速部署與靈活擴展。",
  },
  {
    icon: "/images/data/services/icon_2.png",
    image: "/images/data/services/image_2.png",
    title: "GCP 雲端解決方案",
    description:
      "Google Workspace 整合雲端協作工具，提升團隊效率，助企業數位轉型與雲端辦公。",
  },
  {
    icon: "/images/data/services/icon_3.png",
    image: "/images/data/services/image_3.png",
    title: "Google 資安服務",
    description:
      "提供 Google Cloud Security 與資安防護方案，強化資料安全、存取控管與威脅偵測。",
  },
  {
    icon: "/images/data/services/icon_4.png",
    image: "/images/data/services/image_4.png",
    title: "GCP 雲端解決方案",
    description:
      "DYNACLOUD Argon 企業AI夥伴，結合雲端與智能技術，協助企業高效創新與智慧轉型。",
  },
  {
    icon: "/images/data/services/icon_3.png",
    image: "/images/data/services/image_3.png",
    title: "Google 資安服務",
    description:
      "提供 Google Cloud Security 與資安防護方案，強化資料安全、存取控管與威脅偵測。",
  },
  {
    icon: "/images/data/services/icon_4.png",
    image: "/images/data/services/image_4.png",
    title: "GCP 雲端解決方案",
    description:
      "DYNACLOUD Argon 企業AI夥伴，結合雲端與智能技術，協助企業高效創新與智慧轉型。",
  },
];

export const serviceOverviews = [
  {
    icon: <Code className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Web Development",
    description:
      "Custom web applications and websites designed to enhance user experience and drive business growth.",
  },
  {
    icon: <Smartphone className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences across devices.",
  },
  {
    icon: <Palette className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "UI/UX Design",
    description:
      "User-centered design solutions that enhance usability and create engaging digital experiences.",
  },
  {
    icon: <BarChart className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Digital Marketing",
    description:
      "Strategic digital marketing solutions to increase your online presence and drive targeted traffic.",
  },
  {
    icon: <Shield className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Cyber Security",
    description:
      "Comprehensive security solutions to protect your digital assets and ensure business continuity.",
  },
  {
    icon: <Cloud className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Cloud Computing",
    description:
      "Scalable cloud solutions that optimize your IT infrastructure and enhance business agility.",
  },
];

export const servicesPage = [
  {
    id: "web-development",
    icon: <Code className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Web Development",
    description:
      "Custom web applications and websites designed to enhance user experience and drive business growth.",
    features: [
      "Responsive Web Design",
      "E-commerce Solutions",
      "Content Management Systems",
      "Progressive Web Apps",
      "API Development & Integration",
    ],
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&fit=crop&w=800&h=500&q=80", // high-res monitor with code
  },
  {
    id: "app-development",
    icon: <Smartphone className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences across devices.",
    features: [
      "iOS & Android Development",
      "Cross-Platform Solutions",
      "UI/UX Design",
      "App Maintenance & Support",
      "Performance Optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?crop=entropy&fit=crop&w=800&h=500&q=80", // mobile UI design
  },
  {
    id: "ui-ux-design",
    icon: <Palette className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "UI/UX Design",
    description:
      "User-centered design solutions that enhance usability and create engaging digital experiences.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Visual Design",
      "Interaction Design",
      "Usability Testing",
    ],
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&fit=crop&w=800&h=500&q=80", // UX design sketches
  },
  {
    id: "digital-marketing",
    icon: <BarChart className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Digital Marketing",
    description:
      "Strategic digital marketing solutions to increase your online presence and drive targeted traffic.",
    features: [
      "SEO & Content Marketing",
      "Social Media Management",
      "PPC Advertising",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&fit=crop&w=800&h=500&q=80", // marketing strategy whiteboard
  },
  {
    id: "cyber-security",
    icon: <Shield className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Cyber Security",
    description:
      "Comprehensive security solutions to protect your digital assets and ensure business continuity.",
    features: [
      "Security Assessments",
      "Penetration Testing",
      "Compliance Management",
      "Security Training",
      "Incident Response",
    ],
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&fit=crop&w=800&h=500&q=80", // digital lock and code
  },
  {
    id: "cloud-computing",
    icon: <Cloud className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Cloud Computing",
    description:
      "Scalable cloud solutions that optimize your IT infrastructure and enhance business agility.",
    features: [
      "Cloud Migration",
      "Infrastructure as a Service",
      "Platform as a Service",
      "DevOps & CI/CD",
      "Cloud Security",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&fit=crop&w=800&h=500&q=80",
  },
];
