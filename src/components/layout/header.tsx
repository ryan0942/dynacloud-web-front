"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { navItems } from "@/data/commen";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { Link, usePathname } from "@/i18n/navigation";

const languages = [
  { locale: "tw" as const, label: "繁體中文" },
  { locale: "en" as const, label: "English" },
];

export function Header() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [_scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close language menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll to hash after navigation
  useScrollToHash();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.header
      animate="visible"
      className={`fixed top-5 w-[95%] border border-gray-100 shadow-md md:w-[85%] ${isOpen ? "!rounded-md" : "rounded-full"} left-2 z-50  -translate-x-2 bg-white transition-all duration-300 dark:bg-gray-900 md:left-[7%] md:translate-x-[-7%] xl:left-[8%] xl:translate-x-[-8%] `}
      initial="hidden"
      variants={headerVariants}
    >
      <div className="container flex items-center justify-between p-5 md:px-8">
        <Link className="flex items-center" href="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image alt="Logo" height={40} src="/logo.svg" width={202} />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 xl:flex">
          {navItems.map(({ name, href, ...rest }, i) => (
            <motion.div key={name} custom={i} variants={navItemVariants}>
              <Link
                {...rest}
                href={href}
                prefetch={true}
                className={`font-semibold transition-colors hover:text-primary dark:hover:text-blue-400 ${
                  pathname.startsWith(href)
                    ? "text-primary"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {t(name)}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <div
              ref={langMenuRef}
              aria-label="Language selector"
              className="relative"
            >
              <motion.button
                aria-expanded={isLangOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <Globe className="size-5 cursor-pointer transition-colors hover:text-primary" />
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {languages.map((lang, index) => (
                      <motion.div
                        key={lang.locale}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -10 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <Link
                          href={pathname}
                          locale={lang.locale}
                          className={`flex w-full items-center justify-end px-4 py-2.5 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                            currentLocale === lang.locale
                              ? "bg-primary/10 font-bold text-primary"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                          onClick={() => setIsLangOpen(false)}
                        >
                          {lang.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Button
            asChild
            className={`hidden rounded-full bg-primary uppercase text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 md:flex`}
          >
            <Link href="/contact-us" prefetch={true} title={t("Contact")}>
              {t("Contact")}
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <motion.button
            aria-label="Toggle menu"
            className="p-2 focus:outline-none xl:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`size-6 text-gray-800 dark:text-white `} />
            ) : (
              <Menu className={`size-6 text-gray-800 dark:text-white `} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 xl:hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto flex flex-col space-y-4 p-4 md:px-10">
              {navItems.map(({ name, href, ...rest }, i) => (
                <motion.div
                  key={name}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    {...rest}
                    href={href}
                    className={`block py-2 text-sm font-medium ${
                      pathname.startsWith(href)
                        ? "text-primary dark:text-blue-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {t(name)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Button
                  asChild
                  className="w-full bg-primary text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Link
                    href="/contact-us"
                    prefetch={false}
                    title={t("Contact")}
                  >
                    {t("Contact")}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
