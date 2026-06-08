"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  // GSAP animations for About sections
  useGSAP(() => {
    gsap.fromTo(".about-hero-fade", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".timeline-card", 
      { x: (i) => (i % 2 === 0 ? -60 : 60), opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%"
        }
      }
    );

    gsap.fromTo(".value-card", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 75%"
        }
      }
    );
  }, { scope: containerRef });

  const stats = [
    { label: "Global Manufacturers Partnered", value: "15+" },
    { label: "Hospitals & Laboratories Served", value: "250+" },
    { label: "NMRA Registration Approvals", value: "100%" },
    { label: "Technical Support Availability", value: "24/7" }
  ];

  const milestones = [
    {
      year: "2015",
      title: "Inception & Establishment",
      description: "Advitec International Pvt Ltd was established in Colombo with the goal of bridging the gap between global bio-medical manufacturers and Sri Lanka's healthcare needs, starting with public hospital tenders."
    },
    {
      year: "2018",
      title: "Logistical Infrastructure Expansion",
      description: "Investing heavily in cold chain distribution capabilities, we opened a temperature-controlled medical storage warehouse in Colombo, ensuring safe distribution of sensitive diagnostics."
    },
    {
      year: "2021",
      title: "NMRA Compliance Leadership",
      description: "Successfully built our dedicated Regulatory Affairs Board, securing legal authority representation for Class A through D medical devices with the National Medicines Regulatory Authority."
    },
    {
      year: "2025",
      title: "Full-Integrated Distribution Solutions",
      description: "Achieved complete island-wide hospital coverage, representing 15+ premier global brands and supporting Sri Lanka's leading private healthcare groups and public health institutes."
    }
  ];

  const values = [
    {
      id: 1,
      title: "Patient-First Quality",
      subtitle: "Uncompromising Standards",
      desc: "Because human lives depend directly on our solutions, we only distribute devices backed by rigorous ISO certifications and clinical validations.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Absolute Integrity",
      subtitle: "Transparency & Trust",
      desc: "We uphold strict ethical compliance in every commercial tender, public distribution contract, and partner negotiation, earning long-term local trust.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Logistical Precision",
      subtitle: "Cold Chain Assurance",
      desc: "Leveraging custom tracking systems and temperature-validated transport fleets, we guarantee the safety of cold chain diagnostics across all regions.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25M12 9h4.5m-4.5 3h4.5m-4.5 3h3m-7.5-6h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9h1.125C18.37 3 19 3.63 19 4.414v12.586c0 .784-.63 1.414-1.414 1.414H5.414C4.63 18.414 4 17.784 4 17V4.414C4 3.63 4.63 3 5.414 3H12v6z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Technical Empowerment",
      subtitle: "Field Support Network",
      desc: "Our bio-medical field service engineers provide ongoing system calibration, staff training, and 24/7 technical support for our product installations.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 1021 17.25l-5.83-5.83m0 0a2.67 2.67 0 11-3.75-3.75M15.17 11.42L19.5 7.085a3 3 0 10-4.24-4.24l-4.335 4.336M11.42 15.17l-4.336 4.335a3 3 0 11-4.24-4.24l4.336-4.335M11.42 15.17a2.67 2.67 0 11-3.75-3.75M9.615 9.615L3.83 3.83A2.67 2.67 0 100 7.58l5.83 5.83" />
        </svg>
      )
    }
  ];

  const team = [
    {
      name: "Pradeep Samarasinghe",
      role: "Director of Operations & Logistics",
      bio: "Oversees Advitec's island-wide warehouse network, cold chain validation, and hardware logistics.",
      image: "/team_pradeep.png"
    },
    {
      name: "Dilhara Senanayake",
      role: "Lead, Regulatory & Legislative Affairs",
      bio: "Manages all NMRA registration applications and guides global partners on Sri Lankan medical law compliance.",
      image: "/team_dilhara.png"
    },
    {
      name: "Eng. Ruwan Wijewardene",
      role: "Chief Biomedical Engineer",
      bio: "Directs after-sales technical services, equipment calibration standards, and ICU system integrations.",
      image: "/team_ruwan.png"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black p-[5px]">
      <div 
        className="relative min-h-[calc(100vh-10px)] w-full rounded-2xl bg-[#fcfdfa] flex flex-col overflow-hidden"
        style={{ clipPath: "inset(0 round 1rem)" }}
      >
        
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex h-24 items-center justify-between px-8 lg:px-16 bg-white/50 backdrop-blur-md border-b border-white/20">
          <Link href="/" className="relative h-12 w-48 block">
            <Image 
              src="/logo-01-332x129.png" 
              alt="Advitec International" 
              fill 
              sizes="192px"
              className="object-contain object-left" 
              priority 
            />
          </Link>
          <div className="hidden space-x-8 text-base font-semibold text-slate-600 md:flex">
            <Link href="/" className="hover:text-[#54833B] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#54833B] transition-colors">About Us</Link>
            <Link href="/products" className="hover:text-[#54833B] transition-colors">Products</Link>
            <Link href="/blog" className="hover:text-[#54833B] transition-colors">Blog</Link>
          </div>
          <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#5c8b42]/90 to-[#2b421e]/90 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(58,87,40,0.4),inset_0_-3px_5px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 before:absolute before:inset-x-[15%] before:-top-1.5 before:h-1/2 before:rounded-full before:bg-gradient-to-b before:from-white/40 before:to-transparent">
            <span className="relative z-10">Contact Us</span>
          </Link>
        </nav>

        {/* --- SECTION 1: ABOUT HERO --- */}
        <section className="pt-36 pb-20 px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            
            {/* Hero Left Content */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              <div className="about-hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm max-w-max">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
                About Advitec International
              </div>
              
              <h1 className="about-hero-fade mb-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-slate-900">
                Pioneering Access to
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A5728] to-[#54833B]">Medical Excellence</span>
              </h1>
              
              <p className="about-hero-fade mb-8 text-[16px] sm:text-[18px] text-slate-600 leading-relaxed font-medium max-w-xl">
                Advitec International is a leading, fully-integrated distributor of high-quality bio-medical devices based in Colombo, Sri Lanka. We represent premier global manufacturers, serving as their strategic gateway to both the public health sector and private hospital networks.
              </p>
              
              {/* Stats Grid */}
              <div className="about-hero-fade grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-3xl sm:text-4xl font-black text-[#3A5728] tracking-tight">{stat.value}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-500 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right Visual Column */}
            <div className="w-full lg:w-5/12 flex justify-center relative">
              <div className="about-hero-fade relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group border border-slate-100">
                <Image 
                  src="/about_hq.png" 
                  alt="Biomedical Distribution Center"
                  fill 
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b421e]/80 via-[#3a5728]/20 to-transparent pointer-events-none mix-blend-multiply"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <h3 className="text-lg font-bold tracking-tight">Fully Regulatory Compliant</h3>
                  <p className="text-xs text-white/80 mt-1">Every device is audited and approved by the local NMRA legislation guidelines.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 2: THE ADVITEC JOURNEY (TIMELINE) --- */}
        <section ref={timelineRef} className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#eef2ea]/50 border-t border-b border-zinc-100 relative z-10">
          <div className="max-w-[70rem] mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm mb-4">
                Our Evolution
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Our Strategic Milestones
              </h2>
              <p className="text-slate-500 font-medium mt-3 leading-relaxed">
                Tracing our history from a specialized medical equipment agent in Colombo to a premier national logistics and regulatory partner.
              </p>
            </div>

            {/* Timeline Tree */}
            <div className="relative border-l border-slate-200/80 ml-4 md:ml-32 py-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="timeline-card relative mb-12 last:mb-0 pl-8 md:pl-12">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#54833B] shadow-[0_0_8px_rgba(84,131,59,0.5)]"></div>
                  
                  {/* Year Tag */}
                  <div className="md:absolute md:-left-[120px] md:top-0 md:w-24 text-left md:text-right font-black text-2xl text-[#3A5728] tracking-tight mb-2 md:mb-0">
                    {milestone.year}
                  </div>

                  {/* Card Container */}
                  <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{milestone.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{milestone.description}</p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- SECTION 3: CORE VALUES (INTERACTIVE GRID) --- */}
        <section ref={valuesRef} className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative z-10 bg-[#fcfdfa]">
          <div className="max-w-[75rem] mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm mb-4">
                Core Principles
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                The Values Driving Our Execution
              </h2>
              <p className="text-slate-500 font-medium mt-3 leading-relaxed">
                Every delivery, registration, and technical repair is guided by a core commitment to healthcare quality.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((val, idx) => {
                const isHovered = hoveredValue === val.id;
                return (
                  <div 
                    key={val.id}
                    onMouseEnter={() => setHoveredValue(val.id)}
                    onMouseLeave={() => setHoveredValue(null)}
                    className="value-card group relative bg-white border border-slate-100 rounded-[1.75rem] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#54833B]/30 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-500 flex gap-6 overflow-hidden"
                  >
                    {/* Visual Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f4f7f1]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon Column */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4f7f1] text-[#54833B] group-hover:bg-[#54833B] group-hover:text-white transition-all duration-500 relative z-10">
                      {val.icon}
                    </div>

                    {/* Text Column */}
                    <div className="flex flex-col relative z-10 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{val.subtitle}</span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3A5728] transition-colors duration-300">{val.title}</h3>
                      <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">{val.desc}</p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* --- SECTION 4: QUALITY & LEGISLATIVE COMPLIANCE SPOTLIGHT --- */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#eef2ea]/40 border-t border-zinc-100 relative z-10">
          <div className="max-w-[70rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm mb-6 max-w-max">
                NMRA Compliance
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Rigorous Legislative & Quality Standards
              </h2>
              
              <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6">
                Advitec International operates under strict legislative guidelines as required by the Sri Lankan Ministry of Health. We specialize in managing local regulatory clearances with the National Medicines Regulatory Authority (NMRA).
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#54833B]/10 text-[#54833B]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Detailed Class A, B, C, D registration files compilation.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#54833B]/10 text-[#54833B]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Power-of-Attorney representation for international device makers.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#54833B]/10 text-[#54833B]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Strict compliance with post-market clinical surveillance.</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Using an existing diagnostic image container) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-white/60">
                <Image 
                  src="/about_testing.png" 
                  alt="Biomedical Testing Laboratory" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#3A5728]/10 mix-blend-overlay"></div>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 5: TEAM BOARD / DIRECTORS --- */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative z-10 bg-[#fcfdfa]">
          <div className="max-w-[70rem] mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm mb-4">
                Expert Leadership
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Our Dedicated Specialists
              </h2>
              <p className="text-slate-500 font-medium mt-3 leading-relaxed">
                Meet the operations, regulatory, and engineering experts overseeing our medical device solutions.
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="flex flex-col bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-50">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover object-center brightness-[0.98]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{member.name}</h3>
                  <span className="text-xs font-bold text-[#3A5728] uppercase tracking-wider mt-1">{member.role}</span>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed font-medium">{member.bio}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="px-6 sm:px-12 lg:px-20 pb-20 pt-10 relative z-20 bg-[#fcfdfa]">
          <div className="max-w-[70rem] mx-auto">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3A5728] to-[#1e2e15] px-6 py-16 sm:px-16 sm:py-20 shadow-2xl">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#54833B] opacity-30 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Interested in partnering with Advitec?
                </h2>
                <p className="text-[#cce2be] text-lg sm:text-xl mb-10 max-w-2xl font-medium">
                  Let's discuss how we can register and distribute your medical innovations across Sri Lankan hospital systems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-[#3A5728] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95">
                    <span className="relative z-10 flex items-center gap-2">
                      Initiate Strategic Partnership
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <div className="px-6 sm:px-12 lg:px-20 bg-[#fcfdfa]">
          <footer className="bg-gradient-to-b from-[#1a2814] to-[#0f170b] rounded-[3rem] rounded-b-none mt-8 pt-20 pb-8 px-6 sm:px-12 lg:px-20 z-20 relative max-w-[85rem] mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
              
              {/* Left Column: Brand & Socials */}
              <div className="md:col-span-4 lg:col-span-5 flex flex-col">
                <Link href="/" className="relative h-12 w-48 mb-6 block">
                  <Image 
                    src="/logo-01-332x129.png" 
                    alt="Advitec International" 
                    fill 
                    sizes="192px"
                    className="object-contain object-left brightness-0 invert" 
                  />
                </Link>
                <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-sm">
                  Connecting top-tier global medical device manufacturers with local healthcare needs in Sri Lanka. Better health now, and for the future.
                </p>
                
                {/* Social Icons */}
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
                <Image src="/arc logo.png" alt="ARC AI" width={110} height={40} className="w-auto h-8 sm:h-10 object-contain translate-y-1 -ml-1" />
              </div>

              <div className="flex items-center gap-6 order-3 md:order-3">
                <a href="#" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}
