"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Clock,
  Upload,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type React from "react";
import { useState, useRef } from "react";

import { jobPosition, jobs } from "@/components/_backup/data/careers";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Link } from "@/i18n/navigation";

// Mock job data

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    try {
      // In a real app, you would send the form data to an API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedin: "",
        coverLetter: "",
      });
      setResumeFile(null);
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle="Join our team and help shape the future of technology"
          title="Apply for Position"
        />

        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <div className="mx-auto max-w-4xl">
              {/* Job Details */}
              <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="mb-4 text-3xl font-bold">
                    {jobPosition.title}
                  </h1>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    {jobPosition.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="mr-1 size-4 text-blue-600 dark:text-blue-400" />
                      {jobPosition.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 size-4 text-blue-600 dark:text-blue-400" />
                      {jobPosition.type}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 size-4 text-blue-600 dark:text-blue-400" />
                      Posted {jobPosition.postedDate}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="mb-3 text-xl font-bold">Responsibilities</h2>
                    <ul className="space-y-2">
                      {jobPosition.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1">
                            <div className="flex size-4 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                              <div className="size-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                            </div>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h2 className="mb-3 text-xl font-bold">Requirements</h2>
                    <ul className="space-y-2">
                      {jobPosition.requirements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1">
                            <div className="flex size-4 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                              <div className="size-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                            </div>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-1"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="sticky top-24 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-bold">Job Overview</h3>

                    <div className="mb-6 space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Department
                        </p>
                        <p className="font-medium">{jobPosition.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Location
                        </p>
                        <p className="font-medium">{jobPosition.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Employment Type
                        </p>
                        <p className="font-medium">{jobPosition.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Salary Range
                        </p>
                        <p className="font-medium">{jobPosition.salary}</p>
                      </div>
                    </div>

                    <h3 className="mb-3 text-lg font-bold">Benefits</h3>
                    <ul className="space-y-2">
                      {jobPosition.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="mr-2 mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Application Form */}
              {submitStatus === "success" ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/30">
                    <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">
                    Application Submitted!
                  </h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Thank you for applying for the {jobPosition.title} position.
                    We've received your application and will review it shortly.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link href="/careers">
                      <Button
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
                        variant="outline"
                      >
                        View More Positions
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : submitStatus === "error" ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-800/30">
                    <XCircle className="size-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">Submission Failed</h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    There was an error submitting your application. Please try
                    again or contact us directly.
                  </p>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    onClick={() => setSubmitStatus("idle")}
                  >
                    Try Again
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <SectionTitle title="Apply Now" />

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                          htmlFor="firstName"
                        >
                          First Name *
                        </label>
                        <input
                          required
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                          htmlFor="lastName"
                        >
                          Last Name *
                        </label>
                        <input
                          required
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
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
                        htmlFor="linkedin"
                      >
                        LinkedIn Profile URL
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/yourprofile"
                        type="url"
                        value={formData.linkedin}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="resume"
                      >
                        Resume/CV * (PDF, DOC, DOCX)
                      </label>
                      <div
                        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-400"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="resume"
                          required={!resumeFile}
                          type="file"
                          onChange={handleFileChange}
                        />

                        {resumeFile ? (
                          <div className="flex items-center justify-center">
                            <CheckCircle2 className="mr-2 size-6 text-green-600 dark:text-green-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {resumeFile.name}
                            </span>
                            <button
                              className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setResumeFile(null);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="mx-auto mb-2 size-10 text-gray-400 dark:text-gray-500" />
                            <p className="text-gray-600 dark:text-gray-400">
                              Drag and drop your resume here, or{" "}
                              <span className="text-blue-600 dark:text-blue-400">
                                browse
                              </span>
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                              Maximum file size: 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="coverLetter"
                      >
                        Cover Letter
                      </label>
                      <textarea
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        id="coverLetter"
                        name="coverLetter"
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        rows={6}
                        value={formData.coverLetter}
                        onChange={handleChange}
                      />
                    </div>

                    <Button
                      className="group bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      disabled={submitting}
                      type="submit"
                    >
                      {submitting ? (
                        <>
                          <div className="mr-2 size-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </SectionWrapper>

        {/* Similar Positions */}
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <SectionTitle alignment="center" title="Similar Positions" />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h3 className="mb-2 text-xl font-bold">{job.title}</h3>
                  <div className="mb-4 flex flex-wrap gap-2 text-sm">
                    <div className="flex items-center">
                      <Briefcase className="mr-1 size-4 text-blue-600 dark:text-blue-400" />
                      {job.department}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 size-4 text-blue-600 dark:text-blue-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 size-4 text-blue-600 dark:text-blue-400" />
                      {job.type}
                    </div>
                  </div>
                  <Link href="/careers/apply">
                    <Button
                      className="group w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
                      variant="outline"
                    >
                      View Position
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/careers">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                  View All Open Positions
                </Button>
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
