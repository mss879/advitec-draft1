"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [loading, setLoading] = useState(isHomepage);

  useEffect(() => {
    if (!isHomepage) {
      setLoading(false);
      return;
    }

    // Keep loader active for exactly 2 seconds (2000ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isHomepage]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b04] text-white"
            style={{
              backgroundImage: "radial-gradient(circle at center, #13220c 0%, #070b04 100%)",
            }}
          >
            <div className="flex flex-col items-center">
              {/* Brand Name with Typing Animation */}
              <div className="font-sans text-lg sm:text-3xl font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#aacc99] uppercase select-none pl-[0.15em] text-center px-4">
                <TypingText text="World Class Bio-Medical Devices" delay={45} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={loading ? "overflow-hidden h-screen" : ""}>
        {children}
      </div>
    </>
  );
}

function TypingText({ text, delay }: { text: string; delay: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // Reset text on mount
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span className="inline-flex items-center">
      {displayedText}
      <span className="ml-1.5 w-[3px] h-[20px] sm:h-[30px] text-[#54833B] bg-current animate-cursor-blink"></span>
    </span>
  );
}
