"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";
const COOKIE_EXPIRY_DAYS = 365;

/** 設置 cookie */
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/** 獲取 cookie */
function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function CookieConsent() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 檢查是否已經同意過
    const hasConsented = getCookie(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // 延遲顯示，讓頁面先載入完成
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie(COOKIE_CONSENT_KEY, "true", COOKIE_EXPIRY_DAYS);
    setIsVisible(false);
  };

  const handleClose = () => {
    setCookie(COOKIE_CONSENT_KEY, "true", COOKIE_EXPIRY_DAYS);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6"
          exit={{ y: 100, opacity: 0 }}
          initial={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="container mx-auto">
            <div className="relative flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:gap-6 sm:p-6">
              {/* 關閉按鈕 */}
              <button
                aria-label={t("CookieConsent.Close")}
                className="absolute right-3 top-3 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                onClick={handleClose}
              >
                <X className="size-5" />
              </button>

              {/* 圖標 */}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                <Cookie className="size-6" />
              </div>

              {/* 內容 */}
              <div className="flex-1 pr-6 text-center sm:pr-0 sm:text-left">
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {t("CookieConsent.Title")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("CookieConsent.Description")}{" "}
                  <Link
                    className="text-primary underline hover:text-primary/80"
                    href="/privacy-policy"
                  >
                    {t("PrivacyPolicy.Title")}
                  </Link>
                </p>
              </div>

              {/* 按鈕 */}
              <div className="flex w-full shrink-0 gap-3 sm:mr-4 sm:w-auto">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  onClick={handleAccept}
                >
                  {t("CookieConsent.Accept")}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
