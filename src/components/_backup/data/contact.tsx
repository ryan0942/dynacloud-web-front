import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const contactInfo = [
  {
    icon: <MapPin className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Our Location",
    description:
      "123 Business Avenue, Tech Park, Suite 101, San Francisco, CA 94107",
  },
  {
    icon: <Phone className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Phone Number",
    description: "+1 (555) 123-4567, +1 (555) 987-6543",
  },
  {
    icon: <Mail className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Email Address",
    description: "info@devun.com, support@devun.com",
  },
  {
    icon: <Clock className="size-6 text-blue-600 dark:text-blue-400" />,
    title: "Working Hours",
    description:
      "Monday - Friday: 9AM - 6PM, Saturday: 10AM - 2PM, Sunday: Closed",
  },
];

export const contactFAQs = [
  {
    question: "What services does Devun offer?",
    answer:
      "Devun offers a comprehensive range of IT services including web and mobile app development, UI/UX design, digital marketing, cybersecurity, and cloud computing solutions tailored to meet the specific needs of your business.",
  },
  {
    question: "How long does it take to complete a typical project?",
    answer:
      "Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a complex enterprise application could take several months. We provide detailed timelines during the initial consultation phase.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer various support and maintenance packages to ensure your digital solutions continue to perform optimally. Our team is available for technical support, updates, and enhancements as your business evolves.",
  },
  {
    question: "How do you handle project pricing?",
    answer:
      "We offer transparent pricing based on project requirements. Depending on the nature of the project, we may work on a fixed-price model, time and materials basis, or retainer arrangement. We provide detailed quotes after understanding your specific needs.",
  },
];
