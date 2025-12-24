"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type React from "react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

import { postContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getCompanyInfoQuery } from "@/queries/company-info";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactUsPage() {
  const t = useTranslations();
  const locale = useLocale();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error(t("PleaseCompleteRecaptcha"));
      return;
    }

    const response = await postContact(formData);
    if (response.success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      toast.success(t("Toast.MessageSentSuccess"));
    } else {
      toast.error(t("Toast.MessageSentError"));
    }
  };

  /** 取得資料 */
  const { data: companyInfoData } = useQuery(getCompanyInfoQuery(locale));
  const companyInfo = companyInfoData?.result;

  const contactInfo = [
    {
      icon: <MapPin className="size-6 text-primary dark:text-blue-400" />,
      title: t("Address"),
      description: companyInfo?.address,
    },
    {
      icon: <Phone className="size-6 text-primary dark:text-blue-400" />,
      title: t("Phone"),
      description: companyInfo?.phone,
    },
    {
      icon: <Mail className="size-6 text-primary dark:text-blue-400" />,
      title: t("Email"),
      description: companyInfo?.email,
    },
    {
      icon: <Clock className="size-6 text-primary dark:text-blue-400" />,
      title: t("WorkingHours"),
      description: companyInfo?.opening_time,
    },
  ];

  return (
    <PageTransition>
      <main>
        <PageHeader subtitle={t("ContactSubTitle")} title={t("Contact")} />

        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <motion.div
                className="rounded-lg bg-gray-100 p-8 shadow-sm dark:bg-gray-900"
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h3 className="mb-6 text-2xl font-bold">
                  {t("SendUsAMessage")}
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      htmlFor="name"
                    >
                      {t("YourName")} *
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
                      {t("YourEmail")} *
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
                      {t("YourPhone")} *
                    </label>
                    <input
                      required
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
                      htmlFor="message"
                    >
                      {t("YourMessage")} *
                    </label>
                    <textarea
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div>
                    <ReCAPTCHA
                      key={locale}
                      ref={recaptchaRef}
                      hl={locale === "tw" ? "zh-TW" : "en"}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={handleRecaptchaChange}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      checked={agreedToPrivacy}
                      className="mt-1 size-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                      id="privacy-policy"
                      type="checkbox"
                      onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    />
                    <label
                      className="mt-0.5 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                      htmlFor="privacy-policy"
                    >
                      {t.rich("AgreeToPrivacyPolicy", {
                        link: (chunks) => (
                          <a
                            className="text-primary underline hover:text-blue-700"
                            href={`/${locale}/privacy-policy`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {chunks}
                          </a>
                        ),
                      })}
                    </label>
                  </div>

                  <div>
                    <Button
                      className="group bg-primary text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      disabled={!recaptchaToken || !agreedToPrivacy}
                      type="submit"
                    >
                      <Send className="mr-2 size-4" /> {t("SendMessage")}
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
                className="grid grid-rows-2 gap-8"
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="relative flex size-full flex-col items-center justify-center gap-8 px-5">
                  <Image
                    alt="Contact us background image"
                    className="absolute size-full rounded-lg object-cover"
                    height={2400}
                    src="/images/contact-bg.jpg"
                    width={3824}
                  />
                  <Image
                    alt="Logo"
                    className="z-10"
                    height={66}
                    src="/logo-white.svg"
                    width={332}
                  />
                  <span className="z-10 text-center text-2xl text-white">
                    {t.rich("Slogan", {
                      br: () => <br />,
                    })}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="h-full rounded-lg border border-gray-200 bg-blue-100/10 p-6 dark:border-gray-800 dark:bg-gray-900"
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <div className="mb-4">{item.icon}</div>
                      <h4 className="mb-2 text-lg font-bold">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
