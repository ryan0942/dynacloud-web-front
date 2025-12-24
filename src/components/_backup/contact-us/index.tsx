"use client";

import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { contactFAQs, contactInfo } from "@/components/_backup/data/contact";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Link } from "@/i18n/navigation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    // Show success message
    alert("Your message has been sent successfully!");
  };

  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle="Get in touch with our team for any inquiries or support"
          title="Contact Us"
        />

        {/* Contact Information */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <HoverEffect items={contactInfo} />
          </div>
        </SectionWrapper>

        {/* Contact Form & Map */}
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <SectionTitle
                  subtitle="GET IN TOUCH"
                  title="Send Us a Message"
                />
                <p className="mb-8 text-gray-600 dark:text-gray-400">
                  Fill out the form below and our team will get back to you as
                  soon as possible.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="name"
                      >
                        Your Name *
                      </label>
                      <input
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Email Address *
                      </label>
                      <input
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="subject"
                      >
                        Subject *
                      </label>
                      <select
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">
                          Technical Support
                        </option>
                        <option value="Partnership">Partnership</option>
                        <option value="Career">Career</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      htmlFor="message"
                    >
                      Your Message *
                    </label>
                    <textarea
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div>
                    <Button
                      className="group bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      type="submit"
                    >
                      <Send className="mr-2 size-4" /> Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        className="ml-2"
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <SectionTitle
                  subtitle="OUR LOCATION"
                  title="Find Us on the Map"
                />

                <div className=" overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                  {/* Replace with actual map component or iframe */}
                  <iframe
                    className="h-[500px] w-full"
                    loading="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7050398.57309783!2d68.9966984!3d30.36295725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f8fd751f%3A0x46b7a1f7e614925c!2sPakistan!5e0!3m2!1sen!2s!4v1747222944706!5m2!1sen!2s"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ Section */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-blue-600"></span>
              <h2 className="text-sm font-medium text-blue-600">
                COMMON QUESTIONS
              </h2>
              <span className="block h-0.5 w-5 bg-blue-600"></span>
            </div>
            <AnimatedText
              as="h2"
              className="mb-10 justify-center text-3xl font-bold"
              text="Frequently Asked Questions"
            />

            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              {contactFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h3 className="mb-3 text-xl font-bold">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/faq">
                <Button
                  className="group border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
                  variant="outline"
                >
                  View All FAQs
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
