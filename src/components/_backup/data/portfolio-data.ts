// Mock data for projects
// In a real application, this would be fetched from a CMS or API

import type { MediaItem } from "@/lib/media-utils";

export interface ProjectResult {
  title: string;
  description: string;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  avatar?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  duration: string;
  client: string;
  industry: string;
  services: string[];
  technologies: string[];
  website?: string;
  featuredImage: string;
  overview: string;
  description: string[];
  gallery: MediaItem[];
  results: ProjectResult[];
  testimonial?: ProjectTestimonial;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "financial-services-digital-transformation",
    title: "Financial Services Digital Transformation",
    summary:
      "Complete digital transformation for a leading financial services company, modernizing their legacy systems and improving customer experience.",
    overview:
      "This project involved a comprehensive digital transformation for a leading financial services company. We modernized their legacy systems, implemented cloud solutions, and created a seamless customer experience across all digital touchpoints.",
    description: [
      "The client, a well-established financial services provider with over 30 years in the industry, was struggling with outdated legacy systems that were becoming increasingly difficult to maintain and scale. Their customers were demanding more digital services, and competitors were gaining market share with more modern offerings.",
      "Our team conducted a thorough analysis of their existing infrastructure and business processes. We developed a phased transformation strategy that would minimize disruption while delivering incremental improvements. The project included modernizing core banking systems, implementing a new cloud-based infrastructure, developing mobile applications, and creating a unified customer experience across all channels.",
      "We implemented agile methodologies throughout the project, working in close collaboration with the client's team. This approach allowed us to deliver value incrementally and adapt to changing requirements and market conditions. The transformation was completed over 18 months, with key milestones achieved at regular intervals.",
      "The new system architecture leverages microservices, containerization, and cloud-native technologies to provide scalability, resilience, and improved security. We implemented automated testing and continuous integration/continuous deployment (CI/CD) pipelines to ensure quality and enable rapid iterations.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Mobile banking application interface",
        caption:
          "Redesigned mobile banking application with improved user experience",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Dashboard analytics",
        caption: "Real-time analytics dashboard for financial advisors",
      },
      {
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "System architecture walkthrough",
        caption: "New cloud-based microservices architecture demonstration",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Customer portal",
        caption: "Unified customer portal providing access to all services",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1563986768817-257bf91c5f9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Security implementation",
        caption:
          "Enhanced security features including biometric authentication",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Team collaboration",
        caption:
          "Our team working closely with the client's staff during implementation",
      },
    ],
    date: "January 2023",
    duration: "18 months",
    category: "Digital Transformation",
    client: "Global Financial Services Inc.",
    industry: "Financial Services",
    services: [
      "Digital Transformation",
      "Cloud Migration",
      "Application Development",
      "UX/UI Design",
      "DevOps Implementation",
    ],
    technologies: [
      "AWS",
      "Kubernetes",
      "React",
      "Node.js",
      "MongoDB",
      "Docker",
      "Terraform",
      "Jenkins",
    ],
    website: "https://u-dynacloud.uidea.tw",
    results: [
      {
        title: "40% Increase in Digital Engagement",
        description:
          "Customer engagement with digital platforms increased by 40% within six months of launch.",
      },
      {
        title: "65% Faster Time-to-Market",
        description:
          "New features and services can now be deployed 65% faster than with the previous system.",
      },
      {
        title: "30% Reduction in Operational Costs",
        description:
          "Cloud migration and process automation resulted in a 30% reduction in operational costs.",
      },
    ],
    testimonial: {
      quote:
        "The digital transformation project has revolutionized how we operate and serve our customers. The IT Services team demonstrated exceptional expertise and commitment throughout the project, delivering beyond our expectations.",
      name: "Sarah Johnson",
      position: "CTO",
      company: "Global Financial Services Inc.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  },
  {
    id: "2",
    slug: "e-commerce-platform-redesign",
    title: "E-Commerce Platform Redesign",
    summary:
      "Complete redesign and redevelopment of an e-commerce platform, resulting in improved user experience and increased sales.",
    overview:
      "We completely redesigned and redeveloped an e-commerce platform for a retail client, focusing on user experience, performance, and conversion optimization. The project resulted in significant improvements in key metrics including page load times, conversion rates, and average order value.",
    description: [
      "Our client, a mid-sized retailer with both physical stores and an online presence, was experiencing high bounce rates and low conversion rates on their existing e-commerce platform. The site was slow, difficult to navigate, and not optimized for mobile devices, which represented an increasing share of their traffic.",
      "We began with comprehensive user research, including interviews, surveys, and analysis of existing analytics data. This research informed our approach to the redesign, ensuring that we addressed the actual pain points experienced by users rather than making assumptions.",
      "The redesign process involved creating detailed wireframes and prototypes, which were tested with real users to validate our design decisions. We implemented a responsive design approach to ensure optimal experiences across all devices, with particular attention to the mobile experience.",
      "On the technical side, we rebuilt the platform using modern technologies and best practices. We implemented a headless commerce architecture, separating the frontend presentation layer from the backend commerce functionality. This approach provides greater flexibility, improved performance, and better scalability.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "E-commerce homepage design",
        caption: "Redesigned homepage with improved product discovery",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Mobile shopping experience",
        caption: "Optimized mobile shopping experience",
      },
      {
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1556742212-5b321f3c261b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Checkout process",
        caption: "Streamlined checkout process reducing abandonment",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1556742205-e10c9486e506?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Product detail page",
        caption:
          "Enhanced product detail pages with improved conversion elements",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Search functionality",
        caption: "Advanced search and filtering capabilities",
      },
    ],
    date: "March 2023",
    duration: "6 months",
    category: "E-Commerce",
    client: "Urban Retail Group",
    industry: "Retail",
    services: [
      "UX/UI Design",
      "Web Development",
      "E-Commerce Development",
      "Performance Optimization",
      "SEO",
    ],
    technologies: [
      "Next.js",
      "Shopify",
      "Tailwind CSS",
      "GraphQL",
      "Algolia",
      "Vercel",
    ],
    website: "https://u-dynacloud.uidea.tw",
    results: [
      {
        title: "52% Increase in Conversion Rate",
        description:
          "The redesigned platform achieved a 52% increase in conversion rate within the first three months.",
      },
      {
        title: "68% Reduction in Page Load Time",
        description:
          "Average page load time was reduced by 68%, significantly improving user experience.",
      },
      {
        title: "27% Increase in Average Order Value",
        description:
          "Improved product discovery and recommendations led to a 27% increase in average order value.",
      },
    ],
    testimonial: {
      quote:
        "The redesign has transformed our online business. Not only does the site look and feel much better, but the results speak for themselves with significant improvements in all our key metrics.",
      name: "Michael Chen",
      position: "E-Commerce Director",
      company: "Urban Retail Group",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
  {
    id: "3",
    slug: "healthcare-management-system",
    title: "Healthcare Management System",
    summary:
      "Custom healthcare management system for a network of clinics, improving patient care and operational efficiency.",
    overview:
      "We developed a comprehensive healthcare management system for a network of medical clinics. The system integrates patient records, appointment scheduling, billing, and reporting in a secure, HIPAA-compliant platform that has significantly improved both patient care and operational efficiency.",
    description: [
      "Our client, a growing network of specialized medical clinics, was struggling with disparate systems for different aspects of their operations. Patient records were in one system, scheduling in another, and billing in yet another. This fragmentation led to inefficiencies, data entry errors, and challenges in providing coordinated care.",
      "We worked closely with healthcare professionals, administrators, and IT staff to understand their workflows and requirements. Based on this research, we designed a unified system that would bring all these functions together while ensuring security, compliance, and ease of use.",
      "The development process followed a rigorous methodology to ensure that the system would meet the strict requirements of the healthcare industry. We implemented comprehensive security measures to protect patient data, including encryption, access controls, and audit logging. The system was designed to be fully compliant with HIPAA and other relevant regulations.",
      "A key feature of the system is its interoperability with other healthcare systems and standards. We implemented support for HL7 and FHIR standards, allowing for seamless exchange of information with other healthcare providers, laboratories, and insurance companies.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Patient dashboard",
        caption: "Comprehensive patient dashboard for healthcare providers",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Appointment scheduling",
        caption: "Intelligent appointment scheduling system",
      },
      {
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1576091160101-2a51e5d551c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Electronic health records demo",
        caption: "Secure electronic health records management demonstration",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1576091160291-31c0b5e9a6fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Billing and insurance",
        caption: "Integrated billing and insurance processing",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1576091160472-872c8e139e6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Reporting dashboard",
        caption: "Advanced analytics and reporting capabilities",
      },
    ],
    date: "June 2023",
    duration: "12 months",
    category: "Healthcare IT",
    client: "MediCare Clinic Network",
    industry: "Healthcare",
    services: [
      "Custom Software Development",
      "System Integration",
      "Database Design",
      "Security Implementation",
      "Training & Support",
    ],
    technologies: [
      "Angular",
      "Java Spring Boot",
      "PostgreSQL",
      "Docker",
      "Azure",
      "FHIR API",
    ],
    website: "https://u-dynacloud.uidea.tw",
    results: [
      {
        title: "35% Reduction in Administrative Time",
        description:
          "Staff spend 35% less time on administrative tasks, allowing more focus on patient care.",
      },
      {
        title: "42% Faster Patient Check-in",
        description:
          "The streamlined system reduced patient check-in time by 42%.",
      },
      {
        title: "99.9% System Uptime",
        description:
          "The robust architecture has maintained 99.9% uptime since deployment.",
      },
    ],
    testimonial: {
      quote:
        "This system has revolutionized how we operate. Our staff can now focus more on patient care rather than paperwork, and the integrated view of patient information has improved our ability to provide coordinated care.",
      name: "Dr. Emily Rodriguez",
      position: "Medical Director",
      company: "MediCare Clinic Network",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
  },
  {
    id: "4",
    slug: "supply-chain-optimization",
    title: "Supply Chain Optimization",
    summary:
      "AI-powered supply chain optimization solution for a manufacturing company, reducing costs and improving efficiency.",
    overview:
      "We implemented an AI-powered supply chain optimization solution for a global manufacturing company. The system uses advanced analytics, machine learning, and real-time data to optimize inventory levels, predict demand, and streamline logistics operations.",
    description: [
      "The client, a global manufacturer with operations in multiple countries, was facing challenges with their supply chain including excess inventory in some locations and stockouts in others, high logistics costs, and difficulty in predicting demand accurately. These issues were impacting their ability to serve customers effectively and affecting their bottom line.",
      "Our approach began with a comprehensive analysis of their existing supply chain operations, including data collection from multiple systems and sources. We identified key areas for improvement and developed a strategy for implementing an intelligent supply chain optimization solution.",
      "The solution we developed integrates data from various sources including ERP systems, IoT devices, supplier systems, and external market data. Advanced analytics and machine learning algorithms process this data to provide insights and recommendations for optimization.",
      "Key features of the system include demand forecasting using machine learning, inventory optimization that balances service levels with carrying costs, supplier performance analytics, and logistics optimization that reduces transportation costs while meeting delivery requirements.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1586528116493-ce5d5e0a8e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Supply chain dashboard",
        caption: "Real-time supply chain visibility dashboard",
      },
      {
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Demand forecasting demo",
        caption: "AI-powered demand forecasting visualization demonstration",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1586528116240-9da1bea9ac94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Inventory optimization",
        caption: "Intelligent inventory optimization system",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Logistics tracking",
        caption: "Global logistics tracking and optimization",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1494961104209-3c223057bd26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Supplier analytics",
        caption: "Supplier performance analytics and insights",
      },
    ],
    date: "September 2023",
    duration: "9 months",
    category: "AI & Analytics",
    client: "Global Manufacturing Corp",
    industry: "Manufacturing",
    services: [
      "AI & Machine Learning",
      "Data Analytics",
      "System Integration",
      "Process Optimization",
      "Custom Software Development",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "Apache Kafka",
      "Elasticsearch",
      "Power BI",
      "Google Cloud Platform",
    ],
    website: "https://u-dynacloud.uidea.tw",
    results: [
      {
        title: "22% Reduction in Inventory Costs",
        description:
          "Optimized inventory levels resulted in a 22% reduction in inventory carrying costs.",
      },
      {
        title: "18% Improvement in Forecast Accuracy",
        description:
          "AI-powered demand forecasting improved accuracy by 18% compared to previous methods.",
      },
      {
        title: "15% Reduction in Logistics Costs",
        description:
          "Optimized routing and load consolidation reduced logistics costs by 15%.",
      },
    ],
    testimonial: {
      quote:
        "The supply chain optimization solution has given us unprecedented visibility and control over our global operations. The AI-powered forecasting has been particularly valuable in helping us navigate market volatility.",
      name: "Robert Tanaka",
      position: "VP of Supply Chain",
      company: "Global Manufacturing Corp",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: "5",
    slug: "smart-city-infrastructure",
    title: "Smart City Infrastructure",
    summary:
      "IoT-based smart city infrastructure for a municipal government, improving urban services and sustainability.",
    overview:
      "We designed and implemented an IoT-based smart city infrastructure for a forward-thinking municipal government. The project integrates various urban systems including traffic management, public transportation, waste management, and energy consumption to create a more efficient, sustainable, and livable city.",
    description: [
      "The city was facing challenges common to many urban areas: traffic congestion, inefficient public services, high energy consumption, and environmental concerns. City leaders wanted to leverage technology to address these issues and improve quality of life for residents while also reducing operational costs and environmental impact.",
      "Our team worked closely with various city departments to understand their specific needs and challenges. We developed a comprehensive smart city strategy and architecture that would integrate disparate systems while providing a platform for future innovation and expansion.",
      "The technical implementation involved deploying a network of IoT sensors throughout the city, establishing a secure and scalable data platform, and developing applications for both city administrators and residents. We implemented edge computing capabilities to process data locally when appropriate, reducing latency and bandwidth requirements.",
      "A key aspect of the project was ensuring interoperability between different systems and vendors. We implemented open standards and APIs to create an ecosystem that can evolve over time and incorporate new technologies as they emerge.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Smart traffic management",
        caption: "Intelligent traffic management system reducing congestion",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Public transportation optimization",
        caption: "Real-time public transportation optimization",
      },
      {
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Smart city overview",
        caption: "Comprehensive overview of the smart city infrastructure",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Energy monitoring",
        caption: "Smart grid and energy consumption monitoring",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Waste management",
        caption: "IoT-enabled waste management system",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Citizen app",
        caption: "Mobile application for citizens to access city services",
      },
    ],
    date: "November 2023",
    duration: "24 months",
    category: "IoT",
    client: "Metropolis City Government",
    industry: "Government",
    services: [
      "IoT Implementation",
      "System Architecture",
      "Data Platform Development",
      "Mobile App Development",
      "System Integration",
    ],
    technologies: [
      "IoT Sensors",
      "LoRaWAN",
      "MQTT",
      "Azure IoT Hub",
      "React Native",
      "Node.js",
      "Time Series Database",
    ],
    website: "https://u-dynacloud.uidea.tw",
    results: [
      {
        title: "30% Reduction in Traffic Congestion",
        description:
          "Smart traffic management reduced congestion in key areas by 30%.",
      },
      {
        title: "25% Energy Savings",
        description:
          "Smart lighting and building management resulted in 25% energy savings in city facilities.",
      },
      {
        title: "40% Improvement in Waste Collection Efficiency",
        description:
          "IoT-enabled waste management improved collection efficiency by 40%.",
      },
    ],
    testimonial: {
      quote:
        "This smart city initiative has transformed how we deliver services to our citizens. We're now able to make data-driven decisions that improve efficiency, sustainability, and quality of life for everyone in our community.",
      name: "Mayor Jennifer Williams",
      position: "Mayor",
      company: "Metropolis City",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    },
  },
  {
    id: "6",
    slug: "cybersecurity-infrastructure-upgrade",
    title: "Cybersecurity Infrastructure Upgrade",
    summary:
      "Comprehensive cybersecurity infrastructure upgrade for a financial institution, protecting sensitive data and ensuring compliance.",
    overview:
      "We implemented a comprehensive cybersecurity infrastructure upgrade for a financial institution, addressing vulnerabilities, implementing advanced threat protection, and ensuring regulatory compliance. The project significantly improved the organization's security posture and ability to detect and respond to threats.",
    description: [
      "The client, a mid-sized financial institution, was concerned about the increasing sophistication of cyber threats and the potential impact on their business. They also needed to ensure compliance with industry regulations such as PCI DSS, GDPR, and local financial regulations. Their existing security infrastructure was fragmented and reactive, with limited visibility into potential threats.",
      "Our team began with a thorough security assessment, identifying vulnerabilities and gaps in the existing infrastructure. Based on this assessment, we developed a comprehensive security strategy aligned with industry best practices and regulatory requirements.",
      "The implementation included multiple layers of security controls, including next-generation firewalls, intrusion detection and prevention systems, endpoint protection, data loss prevention, and security information and event management (SIEM). We also implemented strong authentication mechanisms, encryption for data at rest and in transit, and secure access controls.",
      "Beyond the technical implementation, we also focused on developing robust security policies and procedures, and conducted training for staff to raise security awareness and reduce the risk of social engineering attacks.",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Security operations center",
        caption: "State-of-the-art security operations center",
      },
      {
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Threat detection demo",
        caption: "Real-time threat intelligence dashboard demonstration",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Network security architecture",
        caption: "Multi-layered network security architecture",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Security awareness training",
        caption: "Interactive security awareness training for staff",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        alt: "Compliance reporting",
        caption: "Automated compliance reporting and documentation",
      },
    ],
    date: "February 2024",
    duration: "8 months",
    category: "Cybersecurity",
    client: "Secure Financial Services",
    industry: "Financial Services",
    services: [
      "Security Assessment",
      "Infrastructure Security",
      "Threat Detection & Response",
      "Compliance Management",
      "Security Training",
    ],
    technologies: [
      "Palo Alto Networks",
      "CrowdStrike",
      "Splunk SIEM",
      "Okta",
      "Encryption",
      "Zero Trust Architecture",
    ],
    website: "https://u-dynacloud.uidea.tw",
    results: [
      {
        title: "95% Reduction in Security Incidents",
        description:
          "Advanced threat protection reduced security incidents by 95%.",
      },
      {
        title: "100% Compliance Achievement",
        description:
          "The institution achieved 100% compliance with all relevant regulations.",
      },
      {
        title: "60% Faster Threat Detection",
        description:
          "The new SIEM system enabled 60% faster detection of potential threats.",
      },
    ],
    testimonial: {
      quote:
        "The cybersecurity upgrade has given us peace of mind knowing that our systems and data are protected by state-of-the-art security measures. The team's expertise in both security and financial regulations was invaluable.",
      name: "David Thompson",
      position: "CISO",
      company: "Secure Financial Services",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
  },
];

/**
 * Get all projects
 * @returns Array of all projects
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Get featured projects
 * @param limit Maximum number of projects to return
 * @returns Array of featured projects
 */
export function getFeaturedProjects(limit?: number): Project[] {
  const featuredProjects = projects.filter((project) => project.featured);
  return limit ? featuredProjects.slice(0, limit) : featuredProjects;
}

/**
 * Get a project by its slug
 * @param slug The project slug
 * @returns The project or undefined if not found
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Get projects by category
 * @param category The category to filter by
 * @param limit Maximum number of projects to return
 * @returns Array of projects in the specified category
 */
export function getProjectsByCategory(
  category: string,
  limit?: number,
): Project[] {
  const filteredProjects = projects.filter(
    (project) => project.category === category,
  );
  return limit ? filteredProjects.slice(0, limit) : filteredProjects;
}

/**
 * Get related projects based on category and excluding the current project
 * @param currentId ID of the current project to exclude
 * @param category Category to match
 * @param limit Maximum number of projects to return
 * @returns Array of related projects
 */
export function getRelatedProjects(
  currentId: string,
  category: string,
  limit = 3,
): Project[] {
  return projects
    .filter(
      (project) => project.id !== currentId && project.category === category,
    )
    .slice(0, limit);
}

/**
 * Get all unique project categories
 * @returns Array of unique categories
 */
export function getAllProjectCategories(): string[] {
  const categories = new Set(projects.map((project) => project.category));
  return Array.from(categories);
}

export const getAllCategories = () => {
  const categories = new Set(projects.map((project) => project.category));
  return Array.from(categories);
};
