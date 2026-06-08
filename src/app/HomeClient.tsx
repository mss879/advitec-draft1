"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function Home() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleFaqClick = (idx: number) => {
    setActiveFaq(prev => {
      if (prev === idx) {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
          return -1;
        }
        return prev;
      }
      return idx;
    });
  };

  const slides = [
    "/hero_slide_1.webp",
    "/hero_slide_2.webp",
    "/hero_slide_3.webp",
    "/hero_slide_4.webp"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      q: "What exactly does Advitec International do?",
      a: "Based in Colombo, Advitec International is a premier, fully-integrated distributor of high-quality bio-medical devices. We act as a vital bridge, connecting top-tier global medical device manufacturers with local healthcare needs in Sri Lanka."
    },
    {
      q: "Do you supply to both the private and public sectors?",
      a: "Yes. We proudly serve both private hospitals and the public health sector, working tirelessly to make high-quality healthcare solutions accessible and affordable across the country."
    },
    {
      q: "Does your distribution network cover areas outside of Colombo?",
      a: "Absolutely. While our headquarters are strategically located in the commercial capital of Colombo, we operate a robust, highly efficient supply chain and logistics network that provides secure, island-wide distribution."
    },
    {
      q: "What types of medical devices do you distribute?",
      a: "We offer a vast and diverse portfolio of medical devices tailored to empower medical professionals. Our product range spans from user-friendly Homecare Apparatus and rapid Handheld Diagnostic Tools, all the way to Highly Automated Clinical Equipment."
    },
    {
      q: "How do you ensure the quality and safety of your medical devices?",
      a: "Because patient lives depend on our products, safety and efficacy are our top priorities. We operate under stringent quality management procedures. Every device we market is backed by rigorous international quality certifications and complies with all prevailing Sri Lankan healthcare legislation."
    },
    {
      q: "Do you provide after-sales and technical support?",
      a: "Yes, we do. We understand that medical professionals rely on our devices to save lives. Advitec provides dedicated after-sales support and technical services to ensure device longevity and optimal performance."
    },
    {
      q: "We are a global medical manufacturer. How can Advitec help us enter Sri Lanka?",
      a: "We serve as your trusted \"one-stop-shop\" and ultimate gateway to the Sri Lankan healthcare market. We offer end-to-end B2B distribution solutions, including market access, secure warehousing and logistics, strategic sales and brand promotion, and comprehensive after-sales support."
    },
    {
      q: "Can you assist with local regulatory compliance and product registrations?",
      a: "Yes. Navigating local compliance can be complex, but our experienced team handles it seamlessly. We leverage deeply established relationships with Key Opinion Leaders (KOLs) and local regulators to ensure your products meet all regulatory capabilities and approvals."
    },
    {
      q: "How do we initiate a strategic partnership with Advitec?",
      a: "We are always looking to build fruitful partnerships with top-tier international manufacturers. You can easily reach out to us by filling out the digital inquiry form on our Contact Us page, or by emailing us directly at info@advitecint.com."
    }
  ];

  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll logic for Section 2
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const img1Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const img3Y = useTransform(scrollYProgress, [0, 1], [160, -160]);
  const img4Y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // GSAP Reveal Animations
  useGSAP(() => {
    gsap.from(".reveal-text", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(".reveal-img", {
      y: 120,
      opacity: 0,
      scale: 0.8,
      rotationX: 15,
      duration: 1.2,
      stagger: 0.15,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      }
    });
    // SECTION 3 REVEALS
    gsap.fromTo(".s3-img", 
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(".s3-text", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(".s3-card", 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(".s3-icon", 
      { scale: 0.5, rotation: -45, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 70%",
        }
      }
    );

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-screen bg-black p-[5px]">
      {/* The main white canvas with 5px inset from the black background */}
      <div 
        className="relative min-h-[calc(100vh-10px)] w-full rounded-2xl bg-white flex flex-col"
        style={{ clipPath: "inset(0 round 1rem)" }}
      >
        
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex h-24 items-center justify-between px-8 lg:px-16">
          <div className="relative h-12 w-48">
            <Image 
              src="/logo-01-332x129.webp" 
              alt="Advitec International" 
              fill 
              sizes="192px"
              className="object-contain object-left" 
              priority 
            />
          </div>
          <div className="hidden space-x-8 text-base font-semibold text-gray-600 md:flex">
            <Link href="/" className="hover:text-[#54833B] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#54833B] transition-colors">About Us</Link>
            <Link href="/products" className="hover:text-[#54833B] transition-colors">Products</Link>
            <Link href="/blog" className="hover:text-[#54833B] transition-colors">Blog</Link>
          </div>
          <Link href="/contact" className="hidden md:inline-flex group relative items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#5c8b42]/90 to-[#2b421e]/90 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(58,87,40,0.4),inset_0_-3px_5px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 before:absolute before:inset-x-[15%] before:-top-1.5 before:h-1/2 before:rounded-full before:bg-gradient-to-b before:from-white/40 before:to-transparent">
            <span className="relative z-10">Contact Us</span>
          </Link>
          {/* Hamburger button for mobile */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-[#54833B]/10 hover:text-[#3A5728] md:hidden transition-colors"
            aria-label="Open Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-white flex flex-col p-6 md:hidden"
            >
              {/* Header inside overlay */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="relative h-10 w-40">
                  <Image 
                    src="/logo-01-332x129.webp" 
                    alt="Advitec International" 
                    fill 
                    sizes="160px"
                    className="object-contain object-left" 
                  />
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-[#54833B]/10 hover:text-[#3A5728] transition-colors"
                  aria-label="Close Menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-6 pt-10 text-xl font-bold text-slate-800 flex-grow">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#54833B] transition-colors">Home</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#54833B] transition-colors">About Us</Link>
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#54833B] transition-colors">Products</Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#54833B] transition-colors">Blog</Link>
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#5c8b42]/90 to-[#2b421e]/90 px-6 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_rgba(58,87,40,0.4)] border border-white/20 mt-4 text-center"
                >
                  Contact Us
                </Link>
              </div>

              {/* Footer info inside overlay */}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-2 text-xs font-semibold text-slate-400">
                <p>info@advitecint.com</p>
                <p>+94 11 234 5678</p>
                <p>© {new Date().getFullYear()} Advitec. All rights reserved.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row pt-24 min-h-[calc(100vh-10px)] shrink-0">
          
          {/* Left Side (Text & CTA) */}
          <div className="relative z-10 flex h-auto lg:h-full w-full flex-col justify-start px-6 pb-6 pt-12 lg:pb-12 lg:pt-36 sm:px-12 lg:w-1/2 lg:px-16 xl:px-24">
            
            <h1 className="mb-6 pt-2 lg:pt-0 text-4xl font-black font-outfit leading-tight tracking-tight text-[#3A5728] sm:text-5xl xl:text-6xl">
              World-Class Bio-Medical Devices in Sri Lanka
            </h1>
            
            <p className="mb-10 max-w-xl text-lg text-slate-600 leading-relaxed sm:text-lg lg:text-xl">
              Connecting global medical innovations with local healthcare needs to inspire and nurture hope for a healthier, spirited tomorrow.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/products" className="group relative inline-flex items-center justify-center h-[42px] sm:h-auto overflow-hidden rounded-full bg-gradient-to-b from-[#5c8b42]/90 to-[#2b421e]/90 px-4 py-0 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-[0_10px_30px_rgba(58,87,40,0.5),inset_0_-4px_8px_rgba(0,0,0,0.4),inset_0_2px_6px_rgba(255,255,255,0.6)] border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 before:absolute before:inset-x-[15%] before:-top-2 before:h-1/2 before:rounded-full before:bg-gradient-to-b before:from-white/50 before:to-transparent">
                <span className="relative z-10">Explore Our Solutions</span>
              </Link>
              
              <Link href="/contact" className="group relative inline-flex items-center justify-center h-[42px] sm:h-auto gap-1.5 sm:gap-2 overflow-hidden rounded-full bg-gradient-to-b from-white/90 to-slate-200/90 px-4 py-0 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold text-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.1),inset_0_-4px_8px_rgba(0,0,0,0.1),inset_0_2px_6px_rgba(255,255,255,0.9)] border border-white/50 backdrop-blur-md transition-all hover:scale-105 active:scale-95 before:absolute before:inset-x-[15%] before:-top-2 before:h-1/2 before:rounded-full before:bg-gradient-to-b before:from-white/80 before:to-transparent hover:text-[#3A5728]">
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  Contact Us
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side - Custom Rounded Slideshow Container */}
          <div className="relative h-[30vh] sm:h-[45vh] lg:h-auto w-full lg:w-1/2 p-4 lg:pr-8 lg:pb-8 flex items-center justify-center">
            <div 
              className="group relative h-full w-full overflow-hidden bg-slate-100 shadow-xl transition-transform duration-700 ease-out hover:scale-[1.02] mt-8 lg:mt-4 rounded-3xl"
              style={{
                clipPath: "polygon(0 25%, 20% 25%, 20% 0%, 100% 0%, 100% 100%, 15% 100%, 0 85%)"
              }}
            >
              {/* Background Hero Slideshow with Crossfade */}
              <AnimatePresence>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={slides[currentSlide]}
                    alt={`Advitec Solutions - Slide ${currentSlide + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Overlay with the exact brand green to tie it into the theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3A5728]/40 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* --- SECTION 2: COMPANY INTRODUCTION --- */}
        <section ref={section2Ref} className="bg-white pt-28 pb-16 sm:pt-40 sm:pb-20 px-6 sm:px-12 lg:px-20 border-t border-zinc-100 shrink-0 overflow-hidden perspective-1000 mt-12 sm:mt-0">
          <div className="max-w-4xl mx-auto">
            
            <div className="reveal-text">
              <motion.h2 style={{ y: textY }} className="mb-8 text-2xl font-extrabold leading-tight tracking-tight text-[#3A5728] sm:text-3xl lg:text-4xl text-center">
                Better Health Now, and for the Future
              </motion.h2>
            </div>
            
            <div className="reveal-text">
              <motion.p style={{ y: textY }} className="text-lg sm:text-xl lg:text-2xl font-normal leading-[1.7] text-zinc-800 text-center tracking-normal sm:tracking-wide">
                Based in Colombo, Advitec International Pvt Ltd is a premier, fully-integrated distributor of a diverse range of bio-medical devices. We proudly represent top-tier international manufacturers, working tirelessly to make high-quality healthcare solutions both accessible and affordable across Sri Lanka. Whether serving private hospitals or the public health sector, we uphold the highest standards of care in every single delivery.
              </motion.p>
            </div>
            
            {/* Floating Animations Styles */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes customFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
              }
              .animate-float-1 { animation: customFloat 6s ease-in-out infinite; }
              .animate-float-2 { animation: customFloat 7s ease-in-out infinite 1s; }
              .animate-float-3 { animation: customFloat 6.5s ease-in-out infinite 2s; }
              .animate-float-4 { animation: customFloat 8s ease-in-out infinite 0.5s; }
              @keyframes iconFloat {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-3px) scale(1.03) rotate(1deg); }
              }
              .animate-icon-float { animation: iconFloat 4s ease-in-out infinite; }
            `}} />

            <div className="relative mt-12 grid grid-cols-2 justify-items-center md:flex md:flex-row md:flex-nowrap justify-center items-center gap-4 sm:gap-6 md:gap-12 max-w-[320px] sm:max-w-[400px] md:max-w-none mx-auto">
              {/* Image 1 */}
              <div className="reveal-img w-full max-w-[140px] sm:max-w-[160px] md:max-w-none md:w-auto">
                <motion.div style={{ y: img1Y }} className="animate-float-1">
                  <div className="relative w-full aspect-[4/3] md:w-56 md:h-40 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 rotate-[-3deg] hover:rotate-0 hover:z-10 group">
                    <Image alt="Patient Monitor" src="/advitec_equip_3.webp" fill sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>
              </div>
              
              {/* Image 2 */}
              <div className="reveal-img w-full max-w-[140px] sm:max-w-[160px] md:max-w-none md:w-auto">
                <motion.div style={{ y: img2Y }} className="animate-float-2">
                  <div className="relative w-full aspect-[4/3] md:w-56 md:h-40 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 rotate-[3deg] hover:rotate-0 hover:z-10 group">
                    <Image alt="Respiratory Nebulizer" src="/advitec_equip_1.webp" fill sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>
              </div>
              
              {/* Image 3 */}
              <div className="reveal-img w-full max-w-[140px] sm:max-w-[160px] md:max-w-none md:w-auto">
                <motion.div style={{ y: img3Y }} className="animate-float-3">
                  <div className="relative w-full aspect-[4/3] md:w-56 md:h-40 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 rotate-[-2deg] hover:rotate-0 hover:z-10 group">
                    <Image alt="Sterile Surgical Instruments" src="/advitec_equip_2.webp" fill sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>
              </div>
              
              {/* Image 4 */}
              <div className="reveal-img w-full max-w-[140px] sm:max-w-[160px] md:max-w-none md:w-auto">
                <motion.div style={{ y: img4Y }} className="animate-float-4">
                  <div className="relative w-full aspect-[4/3] md:w-56 md:h-40 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 rotate-[2deg] hover:rotate-0 hover:z-10 group">
                    <Image alt="Infusion Pump" src="/advitec_equip_4.webp" fill sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>
              </div>
            </div>
            
          </div>
        </section>

        {/* --- SECTION 3: ABOUT US (Stuxen Style Masonry Grid) --- */}
        <section ref={section3Ref} className="bg-[#eef2ea] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-t border-zinc-200 shrink-0 relative z-20">
          <div className="max-w-[75rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column: Sticky Image Wrapper */}
            <div className="relative w-full h-full">
              <div className="sticky top-24 lg:top-32">
                <div className="s3-img relative h-[350px] sm:h-[450px] lg:h-[550px] w-full rounded-[2rem] overflow-hidden shadow-xl group">
                  <Image 
                    src="/advitec_section3_new.webp" 
                    alt="Advitec Medical Facility" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A5728]/20 to-transparent pointer-events-none mix-blend-multiply"></div>
                
                {/* Frosted Glass Floating Card (VNTNR recreation) */}
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-12 sm:bottom-12 rounded-2xl sm:rounded-3xl bg-black/30 backdrop-blur-xl border border-white/20 p-4 sm:p-6 shadow-2xl flex flex-col gap-2 sm:gap-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#54833B]/40 to-transparent opacity-50 mix-blend-overlay"></div>
                  <div className="relative z-10 w-8 h-1 bg-white/50 rounded-full mx-auto mb-2"></div>
                  
                  <div className="relative z-10 flex justify-between text-[10px] sm:text-xs font-semibold tracking-widest text-white/80 uppercase">
                    <span>Supply</span>
                    <span>Health</span>
                  </div>
                  
                  <div className="relative z-10 grid grid-cols-2 gap-y-0.5 sm:gap-y-1 text-[10px] sm:text-xs font-medium text-white/90">
                    <p>Hospitals</p>
                    <p className="text-right">Clinics</p>
                    <p>Public Sector</p>
                    <p className="text-right">Laboratories</p>
                    <p>Private Care</p>
                    <p className="text-right">Outpatient</p>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-5xl font-black text-white tracking-tighter">ADVITEC.</h3>
                    <p className="text-[9px] sm:text-[10px] uppercase font-bold text-white/60 tracking-widest mt-1">Medical Distribution</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text and Masonry Cards */}
            <div className="w-full flex flex-col pt-4 lg:pt-0">
              
              {/* Header Elements */}
              <div className="s3-text mb-6 inline-flex w-max items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
                Our Services
              </div>
              
              <h2 className="s3-text mb-6 text-[28px] leading-[1.2] font-extrabold tracking-tight text-slate-900 sm:text-4xl xl:text-[42px] xl:leading-[1.15]">
                Your Ultimate Gateway to the Sri Lankan Healthcare Market
              </h2>
              
              <p className="s3-text text-slate-600 text-[15px] sm:text-[17px] font-medium mb-10 leading-[1.8] max-w-xl pr-4">
                We offer end-to-end distribution solutions for global medical device manufacturers seeking to enter or expand within Sri Lanka. As your trusted partner and &quot;one-stop-shop,&quot; our comprehensive services include:
              </p>
              
              <div className="s3-text mb-12">
                <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#5c8b42] hover:bg-[#4b7336] transition-colors px-6 py-3 text-sm font-bold text-white shadow-lg">
                  <span className="relative z-10 flex items-center gap-2">
                    Partner With Us
                    <div className="rounded-full bg-white/20 p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </span>
                </Link>
              </div>

              {/* Horizontal List Cards (1 per row) */}
              <div className="flex flex-col gap-5 w-full">
                
                                {/* Card 1 : Compliance */}
                <div className="s3-card group relative bg-white/70 backdrop-blur-xl rounded-[1.75rem] p-6 sm:p-8 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_8px_rgba(255,255,255,0.5)] border border-white/60 flex flex-col sm:flex-row sm:items-center gap-6 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_12px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-4 sm:w-[180px] shrink-0 relative z-10">
                    <div className="s3-icon relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4f7f1] to-white shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] border border-white/80 group-hover:-translate-y-1 transition-all duration-500 animate-icon-float" style={{ animationDelay: '0s' }}>
                      <div className="absolute -inset-2 bg-[#54833B]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-out_infinite]"></div>
                      <motion.svg className="w-8 h-8 text-[#54833B] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                         {/* Shield */}
                         <motion.path 
                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 1], ease: "easeInOut" }}
                         />
                         {/* Checkmark */}
                         <motion.path 
                            d="m9 12 2 2 4-4" 
                            initial={{ pathLength: 0, opacity: 0, scale: 0.5 }}
                            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1], scale: [0.5, 1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, times: [0, 0.6, 1], ease: "backOut", delay: 0.5 }}
                            style={{ transformOrigin: "center", transformBox: "fill-box" }}
                         />
                      </motion.svg>
                    </div>
                    <div className="flex flex-col relative z-10">
                      <h3 className="text-[32px] font-black leading-none text-slate-800 tracking-tighter mix-blend-multiply">01</h3>
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5 uppercase tracking-widest">Compliance</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:border-l sm:border-slate-200/60 sm:pl-6 pt-1 sm:pt-0 relative z-10">
                    <h4 className="text-[18px] font-extrabold text-slate-900 mb-1.5 leading-snug group-hover:text-[#3A5728] transition-colors">Market Access & Regulatory</h4>
                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Seamlessly navigating local compliance and market entry requirements.</p>
                  </div>
                </div>

                {/* Card 2 : Logistics */}
                <div className="s3-card group relative bg-white/70 backdrop-blur-xl rounded-[1.75rem] p-6 sm:p-8 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_8px_rgba(255,255,255,0.5)] border border-white/60 flex flex-col sm:flex-row sm:items-center gap-6 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_12px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-4 sm:w-[180px] shrink-0 relative z-10">
                    <div className="s3-icon relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4f7f1] to-white shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] border border-white/80 group-hover:-translate-y-1 transition-all duration-500 animate-icon-float" style={{ animationDelay: '0.4s' }}>
                      <div className="absolute -inset-2 bg-[#54833B]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-out_infinite]"></div>
                      <motion.svg className="w-8 h-8 text-[#54833B] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        {/* Package base */}
                        <motion.path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
                           initial={{ pathLength: 0, opacity: 0 }}
                           animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                           transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
                        />
                        {/* Package lines */}
                        <motion.path d="m3.3 7 8.7 5 8.7-5"
                           initial={{ pathLength: 0, opacity: 0 }}
                           animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                           transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1], ease: "easeOut", delay: 0.6 }}
                        />
                        <motion.path d="M12 22V12"
                           initial={{ pathLength: 0, opacity: 0 }}
                           animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                           transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1], ease: "easeOut", delay: 0.8 }}
                        />
                        <motion.path d="m7.5 4.27 9 5.15"
                           initial={{ pathLength: 0, opacity: 0 }}
                           animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
                           transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1], ease: "easeOut", delay: 1.0 }}
                        />
                      </motion.svg>
                    </div>
                    <div className="flex flex-col relative z-10">
                      <h3 className="text-[32px] font-black leading-none text-slate-800 tracking-tighter mix-blend-multiply">02</h3>
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5 uppercase tracking-widest">Logistics</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:border-l sm:border-slate-200/60 sm:pl-6 pt-1 sm:pt-0 relative z-10">
                    <h4 className="text-[18px] font-extrabold text-slate-900 mb-1.5 leading-snug group-hover:text-[#3A5728] transition-colors">Supply Chain & Distribution</h4>
                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Secure warehousing and highly efficient island-wide device delivery.</p>
                  </div>
                </div>

                {/* Card 3 : Promotion */}
                <div className="s3-card group relative bg-white/70 backdrop-blur-xl rounded-[1.75rem] p-6 sm:p-8 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_8px_rgba(255,255,255,0.5)] border border-white/60 flex flex-col sm:flex-row sm:items-center gap-6 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_12px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-4 sm:w-[180px] shrink-0 relative z-10">
                    <div className="s3-icon relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4f7f1] to-white shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] border border-white/80 group-hover:-translate-y-1 transition-all duration-500 animate-icon-float" style={{ animationDelay: '0.8s' }}>
                      <div className="absolute -inset-2 bg-[#54833B]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-out_infinite]"></div>
                      <motion.svg className="w-8 h-8 text-[#54833B] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        {/* Megaphone body */}
                        <motion.g animate={{ rotate: [0, -10, 0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "10px 14px", transformBox: "fill-box" }}>
                          <motion.path d="m3 11 18-5v12L3 14v-3z" />
                          <motion.path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                        </motion.g>
                        {/* Sound Wave */}
                        <motion.path d="M22 9a4.5 4.5 0 0 1 0 6" 
                          initial={{ opacity: 0, x: -5, scale: 0.8 }}
                          animate={{ opacity: [0, 1, 0], x: [-5, 2, 5], scale: [0.8, 1, 1.2] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />
                      </motion.svg>
                    </div>
                    <div className="flex flex-col relative z-10">
                      <h3 className="text-[32px] font-black leading-none text-slate-800 tracking-tighter mix-blend-multiply">03</h3>
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5 uppercase tracking-widest">Promotion</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:border-l sm:border-slate-200/60 sm:pl-6 pt-1 sm:pt-0 relative z-10">
                    <h4 className="text-[18px] font-extrabold text-slate-900 mb-1.5 leading-snug group-hover:text-[#3A5728] transition-colors">Sales & Marketing</h4>
                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Strategic market penetration and brand promotion for your devices.</p>
                  </div>
                </div>

                {/* Card 4 : Support */}
                <div className="s3-card group relative bg-white/70 backdrop-blur-xl rounded-[1.75rem] p-6 sm:p-8 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_8px_rgba(255,255,255,0.5)] border border-white/60 flex flex-col sm:flex-row sm:items-center gap-6 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05),inset_0_2px_12px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-4 sm:w-[180px] shrink-0 relative z-10">
                    <div className="s3-icon relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4f7f1] to-white shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] border border-white/80 group-hover:-translate-y-1 transition-all duration-500 animate-icon-float" style={{ animationDelay: '1.2s' }}>
                      <div className="absolute -inset-2 bg-[#54833B]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-out_infinite]"></div>
                      <motion.svg className="w-8 h-8 text-[#54833B] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        {/* Settings Gear */}
                        <motion.path 
                           d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" 
                           animate={{ rotate: 360 }}
                           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                           style={{ transformOrigin: "center", transformBox: "fill-box" }}
                        />
                        {/* Inner Circle */}
                        <motion.circle cx="12" cy="12" r="3" 
                           initial={{ scale: 0.8 }}
                           animate={{ scale: [0.8, 1.2, 0.8] }}
                           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                           style={{ transformOrigin: "center", transformBox: "fill-box" }}
                        />
                      </motion.svg>
                    </div>
                    <div className="flex flex-col relative z-10">
                      <h3 className="text-[32px] font-black leading-none text-slate-800 tracking-tighter mix-blend-multiply">04</h3>
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5 uppercase tracking-widest">Support</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:border-l sm:border-slate-200/60 sm:pl-6 pt-1 sm:pt-0 relative z-10">
                    <h4 className="text-[18px] font-extrabold text-slate-900 mb-1.5 leading-snug group-hover:text-[#3A5728] transition-colors">After-Sales Service</h4>
                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Dedicated technical services to ensure device longevity and safety.</p>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </section>

        {/* --- SECTION 3.2: PRODUCTS PREVIEW --- */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative z-20 bg-[#fcfdfa] border-t border-slate-100">
          <div className="max-w-[85rem] mx-auto w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 lg:mb-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm mb-4">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
                  Device Portfolio Preview
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-none">
                  Flagship Medical Technology
                </h2>
                <p className="text-slate-500 font-medium text-base mt-4 leading-relaxed max-w-xl">
                  A curated preview of our certified medical equipment and clinical apparatus distributed across Sri Lanka's healthcare system.
                </p>
              </div>
              
              <Link 
                href="/products" 
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#5c8b42]/90 to-[#2b421e]/90 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(58,87,40,0.3)] border border-white/20 transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                View Full Portfolio
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Grid of 4 Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Respiratory Nebulizer",
                  category: "Homecare Apparatus",
                  desc: "Delivers aerosolized medication for clinical respiratory relief. Specially designed for domestic care.",
                  classification: "Class B",
                  image: "/prod_nebulizer.webp"
                },
                {
                  name: "Handheld Ultrasound Tool",
                  category: "Handheld Diagnostic Tools",
                  desc: "A ultra-portable diagnostic imaging system that connects directly to mobile screens for clinic audits.",
                  classification: "Class B",
                  image: "/prod_handheld_ultrasound.webp"
                },
                {
                  name: "Patient Monitor",
                  category: "Highly Automated Clinical Equipment",
                  desc: "Multi-parameter patient monitor displaying vital signs, ECG waveforms, and integrated predictive warning scores.",
                  classification: "Class C",
                  image: "/prod_patient_monitor.webp"
                },
                {
                  name: "Sterile Surgical Instruments",
                  category: "Surgical & Laboratory Supplies",
                  desc: "Premium, stainless steel medical instruments designed for precision surgical tasks in the operating room.",
                  classification: "Class A",
                  image: "/prod_surgical_instruments.webp"
                }
              ].map((prod, idx) => (
                <div key={idx} className="group flex flex-col bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-slate-50 border border-slate-100">
                    <Image 
                      src={prod.image} 
                      alt={prod.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
                      {prod.classification}
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-extrabold text-[#3A5728] uppercase tracking-wider">{prod.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mt-1.5 group-hover:text-[#54833B] transition-colors">{prod.name}</h3>
                  <p className="text-slate-500 text-xs mt-2.5 leading-relaxed font-medium flex-grow">{prod.desc}</p>
                  
                  <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A5728] hover:text-[#2b421e] mt-4 pt-4 border-t border-slate-50 group-hover:gap-2 transition-all">
                    Product Details
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3.5: OPERATIONS PROCESS --- */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative z-20 bg-[#fcfdfa] border-t border-slate-100">
          <div className="max-w-[85rem] mx-auto w-full">
            <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
                Client Onboarding Process
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                How We Onboard New Clients
              </h2>
              <p className="text-slate-500 font-medium text-base mt-4 leading-relaxed">
                Our structured 4-step client onboarding process makes it simple for global bio-medical manufacturers to register, store, and distribute their innovations across Sri Lanka.
              </p>
            </div>

            {/* Process Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              
              {/* Optional Connection Line for Desktop */}
              <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#54833B]/20 via-[#3A5728]/10 to-transparent -translate-y-[60px] z-0 pointer-events-none"></div>
              
              {[
                {
                  step: "01",
                  title: "Initial Consultation",
                  desc: "We evaluate your bio-medical device specifications, target hospital segments, and regulatory readiness to design a fast-track entry roadmap.",
                  icon: (
                    <svg className="w-6 h-6 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  )
                },
                {
                  step: "02",
                  title: "Regulatory Onboarding",
                  desc: "We compile required technical ISO dossiers and handle NMRA applications as your local representative, securing all compliance approvals.",
                  icon: (
                    <svg className="w-6 h-6 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                },
                {
                  step: "03",
                  title: "Supply Chain Setup",
                  desc: "We integrate your devices into our state-of-the-art warehouses, configuring custom temperature controls and cold-chain logistics.",
                  icon: (
                    <svg className="w-6 h-6 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                {
                  step: "04",
                  title: "Market Activation",
                  desc: "We onboard your products into local hospital procurement systems, initiate sales representation, and begin technical distribution.",
                  icon: (
                    <svg className="w-6 h-6 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                }
              ].map((step, idx) => (
                <div key={idx} className="group relative bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 z-10 flex flex-col items-center text-center">
                  
                  {/* Step counter and icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#54833B]/5 border border-[#54833B]/10 mb-6 group-hover:scale-105 group-hover:bg-[#54833B]/10 transition-all duration-300">
                    <span className="absolute -top-3 -right-3 bg-[#54833B] text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                      {step.step}
                    </span>
                    {step.icon}
                  </div>

                  <div className="min-h-[56px] flex items-center justify-center w-full">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#3A5728] transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  
                  <div className="min-h-[80px] flex items-start justify-center w-full mt-3">
                    <p className="text-slate-500 text-xs leading-relaxed font-medium text-center">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 4: FAQ --- */}
        <section className="bg-[#fcfdfa] py-16 sm:py-20 px-6 sm:px-12 lg:px-20 relative z-20">
          <div className="max-w-[70rem] mx-auto">
            {/* Main Grid: Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 lg:items-start relative">
              
              {/* Left Column (Scrolling) */}
              <div className="lg:col-span-6 flex flex-col">
                
                {/* Title Section */}
                <div className="mb-12">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm max-w-max">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
                    FAQ
                  </div>
                  <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-black tracking-tighter text-slate-900 leading-[1.1] uppercase">
                    FREQUENTLY ASKED
                    <br />
                    <span className="font-serif italic font-normal text-slate-800 tracking-normal capitalize">Questions!</span>
                  </h2>
                </div>

                {/* Tabs / Accordion */}
                <div className="flex flex-col gap-3">
                  {faqs.map((faq, idx) => {
                    const isActive = activeFaq === idx;
                    return (
                      <div key={idx} className="flex flex-col">
                        <button 
                          key={idx}
                          onClick={() => handleFaqClick(idx)}
                          className={`group text-left w-full rounded-3xl p-4 sm:p-5 transition-all duration-300 flex items-center justify-between ${isActive ? 'bg-[#54833B] shadow-[0_8px_20px_rgba(84,131,59,0.25)] text-white' : 'bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}
                        >
                          <div className={`font-bold text-[15px] sm:text-[16px] pr-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-800'}`}>
                            {idx + 1}. {faq.q}
                          </div>
                          <div className={`flex shrink-0 h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                            {isActive ? (
                              <svg className="w-5 h-5 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden lg:hidden"
                            >
                              <div className="p-5 text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 rounded-b-3xl -mt-3 border border-t-0 border-slate-100">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column (Sticky) - Hidden on Mobile */}
              <div className="hidden lg:flex lg:col-span-6 lg:sticky lg:top-[120px] z-10 flex-col">
                
                {/* Paragraph */}
                <div className="mb-12 lg:-mt-2">
                  <p className="text-slate-500 text-[15px] sm:text-[16px] font-medium leading-[1.8]">
                    At Advitec, we believe clarity builds trust. That's why we've gathered the most common questions our clients ask and answered.
                  </p>
                </div>

                {/* Answer Box */}
                <div className="relative w-full h-full min-h-[350px] lg:h-auto lg:min-h-[460px] rounded-3xl bg-white p-8 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    {activeFaq !== -1 && (
                      <motion.div
                        key={activeFaq}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col h-full"
                      >
                        <div className="border-b border-slate-100 pb-6 mb-6">
                          <h3 className="text-[26px] sm:text-[30px] font-black text-slate-900 tracking-tight">Question Answer:</h3>
                        </div>
                        
                        <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed font-medium">
                          {faqs[activeFaq]?.a}
                        </p>
                        
                        <div className="mt-8 pt-4">
                          <Link href="/about" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#54833B] pl-6 pr-2 py-2 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#436A2E] hover:shadow-lg">
                            More About Us
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform">
                              <svg className="w-4 h-4 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* --- SECTION 5: CTA --- */}
        <section className="px-6 sm:px-12 lg:px-20 pb-20 pt-10 relative z-20 bg-[#fcfdfa]">
          <div className="max-w-[70rem] mx-auto">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3A5728] to-[#1e2e15] px-6 py-16 sm:px-16 sm:py-20 shadow-2xl">
              {/* Decorative Background Elements */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#54833B] opacity-30 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white opacity-10 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Ready to elevate your healthcare distribution?
                </h2>
                <p className="text-[#cce2be] text-lg sm:text-xl mb-10 max-w-2xl font-medium">
                  Partner with Advitec International to secure reliable, island-wide market access for your bio-medical devices in Sri Lanka.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-[#3A5728] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95">
                    <span className="relative z-10 flex items-center gap-2">
                      Partner With Us
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </a>
                  <a href="/sales" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95">
                    <span className="relative z-10">Contact Sales</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-gradient-to-b from-[#1a2814] to-[#0f170b] rounded-t-[3rem] mt-8 pt-20 pb-8 px-6 sm:px-12 lg:px-20 z-20 relative">
          <div className="max-w-[70rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
              
              {/* Left Column: Brand & Socials */}
              <div className="md:col-span-4 lg:col-span-5 flex flex-col">
                <div className="relative h-12 w-48 mb-6">
                  <Image 
                    src="/logo-01-332x129.webp" 
                    alt="Advitec International" 
                    fill 
                    sizes="192px"
                    className="object-contain object-left brightness-0 invert" 
                  />
                </div>
                <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-sm">
                  Connecting top-tier global medical device manufacturers with local healthcare needs in Sri Lanka. Better health now, and for the future.
                </p>
                
                {/* Social Icons (Instagram, Facebook, LinkedIn, YouTube) */}
                <div className="flex items-center gap-4">
                  <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#54833B] hover:text-white hover:border-[#54833B] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#54833B] hover:text-white hover:border-[#54833B] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#54833B] hover:text-white hover:border-[#54833B] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="#" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#54833B] hover:text-white hover:border-[#54833B] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </a>
                </div>
              </div>

              {/* Middle & Right Links */}
              <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
                <div>
                  <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
                  <ul className="flex flex-col gap-4">
                    <li><a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Market Access</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Supply Chain</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Sales & Marketing</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">After-Sales Support</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
                  <ul className="flex flex-col gap-4">
                    <li><Link href="/about" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">About Us</Link></li>
                    <li><Link href="/products" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Products</Link></li>
                    <li><Link href="/blog" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Blog</Link></li>
                    <li><Link href="/contact" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                  <ul className="flex flex-col gap-4 text-[15px] text-white/60 font-medium">
                    <li>info@advitecint.com</li>
                    <li>+94 11 234 5678</li>
                    <li className="leading-relaxed">Level 5, Parkland Building,<br />Colombo 02, Sri Lanka</li>
                  </ul>
                </div>
              </div>
              
            </div>

            {/* Bottom Copyright */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
              <p className="text-sm font-medium text-white/50 order-2 md:order-1">
                © {new Date().getFullYear()} Advitec. All rights reserved.
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium text-white/50 order-1 md:order-2">
                <span>Designed and developed by</span>
                <a 
                  href="https://www.arcai.agency" 
                  target="_blank" 
                  rel="noopener" 
                  title="AI Automation and Web Design agency"
                  className="inline-block cursor-pointer transition-transform hover:scale-105"
                >
                  <span className="sr-only">AI Automation and Web Design agency</span>
                  <Image src="/arc logo.webp" alt="AI Automation and Web Design agency" width={110} height={40} className="w-auto h-8 sm:h-10 cursor-pointer object-contain translate-y-1 -ml-1" />
                </a>
              </div>

              <div className="flex items-center gap-6 order-3 md:order-3">
                <a href="#" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
