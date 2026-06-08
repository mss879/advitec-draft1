"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost, blogPosts } from "../posts";

interface Props {
  post: BlogPost;
}

export default function PostClient({ post }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress Bar logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Copy Link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract H2 headers for Table of Contents
  const headers = post.content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.startsWith("## ") && !line.startsWith("### "))
    .map(line => line.replace("## ", ""));

  // Find related articles (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 2);

  // Format markdown utility
  const formatBoldText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>');
  };

  // Custom JSX renderer for post content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        if (inTable && tableHeaders.length > 0) {
          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-8 rounded-2xl border border-slate-100 shadow-sm max-w-full">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-[#f4f7f1]">
                  <tr>
                    {tableHeaders.map((h, idx) => (
                      <th key={idx} className="px-6 py-4 text-left text-xs font-bold text-[#3A5728] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {tableRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/30 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-6 py-4 text-sm text-slate-600 font-medium" dangerouslySetInnerHTML={{ __html: formatBoldText(cell) }}></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          inTable = false;
          tableHeaders = [];
          tableRows = [];
        }
        continue;
      }

      if (line.startsWith("## ")) {
        const titleText = line.replace("## ", "");
        // Create an ID for scrolling anchor
        const anchorId = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2 key={i} id={anchorId} className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight border-b border-slate-100 pb-3 scroll-mt-28" dangerouslySetInnerHTML={{ __html: formatBoldText(titleText) }}></h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-bold text-[#3A5728] mt-8 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: formatBoldText(line.replace("### ", "")) }}></h3>
        );
      } else if (line.startsWith("---")) {
        elements.push(<hr key={i} className="my-10 border-slate-100" />);
      } else if (line.startsWith("|")) {
        const cells = line.split("|").map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cells.every(c => c.startsWith("---") || c.startsWith(":---") || c.endsWith("---:"))) {
          continue;
        }
        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
      } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
        const text = line.replace(/^\d+\.\s+/, "");
        elements.push(
          <div key={i} className="flex gap-4 my-4 items-start pl-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#54833B]/10 text-xs font-bold text-[#54833B]">{line.match(/^\d+/)?.[0]}</span>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-medium pt-0.5" dangerouslySetInnerHTML={{ __html: formatBoldText(text) }}></p>
          </div>
        );
      } else if (line.startsWith("- ")) {
        const text = line.replace("- ", "");
        elements.push(
          <div key={i} className="flex gap-3 my-4 items-start pl-2">
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#54833B] mt-2.5"></span>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: formatBoldText(text) }}></p>
          </div>
        );
      } else {
        elements.push(
          <p key={i} className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-medium my-5" dangerouslySetInnerHTML={{ __html: formatBoldText(line) }}></p>
        );
      }
    }

    if (inTable && tableHeaders.length > 0) {
      elements.push(
        <div key={`table-end`} className="overflow-x-auto my-8 rounded-2xl border border-slate-100 shadow-sm max-w-full">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f4f7f1]">
              <tr>
                {tableHeaders.map((h, idx) => (
                  <th key={idx} className="px-6 py-4 text-left text-xs font-bold text-[#3A5728] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/30 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-6 py-4 text-sm text-slate-600 font-medium" dangerouslySetInnerHTML={{ __html: formatBoldText(cell) }}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-black p-[5px]">
      <div 
        className="relative min-h-[calc(100vh-10px)] w-full rounded-2xl bg-[#fcfdfa] flex flex-col overflow-hidden"
        style={{ clipPath: "inset(0 round 1rem)" }}
      >
        
        {/* Reading Progress Bar */}
        <div 
          className="fixed top-0 left-0 h-[4px] bg-[#54833B] z-[999] transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex h-24 items-center justify-between px-8 lg:px-16 bg-white/50 backdrop-blur-md border-b border-white/20">
          <Link href="/" className="relative h-12 w-48 block">
            <Image 
              src="/logo-01-332x129.webp" 
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

        {/* --- ARTICLE HEADER --- */}
        <section className="pt-36 pb-12 px-6 sm:px-12 lg:px-20 max-w-[55rem] mx-auto w-full relative z-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3A5728] hover:text-[#54833B] uppercase tracking-wider mb-6 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#f4f7f1] text-[#3A5728] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs font-semibold text-slate-400">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">{post.author}</span>
              <span className="text-xs font-semibold text-slate-400 mt-0.5">Published on {post.date}</span>
            </div>

            {/* Sharing Tools */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopyLink}
                className="flex h-9 px-4 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white hover:border-[#54833B]/40 hover:bg-[#f4f7f1]/30 transition-all text-xs font-bold text-slate-600 hover:text-[#3A5728]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 text-slate-500 hover:text-sky-500 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* --- HERO IMAGE --- */}
        <section className="px-6 sm:px-12 lg:px-20 max-w-[75rem] mx-auto w-full relative z-10 pb-8">
          <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-md border border-slate-100 bg-slate-50">
            <Image 
              src={post.coverImage} 
              alt={post.title} 
              fill 
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#3A5728]/5 mix-blend-overlay"></div>
          </div>
        </section>

        {/* --- ARTICLE BODY --- */}
        <section className="px-6 sm:px-12 lg:px-20 max-w-[75rem] mx-auto w-full relative z-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column (Sticky Sidebar Table of Contents) */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Table of Contents</h3>
                <ul className="flex flex-col gap-3.5">
                  {headers.map((h, idx) => {
                    const anchorId = h.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return (
                      <li key={idx}>
                        <a 
                          href={`#${anchorId}`} 
                          className="text-[13px] font-bold text-slate-600 hover:text-[#3A5728] transition-colors leading-snug block"
                        >
                          {h}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Right Column (Article content) */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>
            </div>

          </div>
        </section>

        {/* --- BOTTOM CTA --- */}
        <section className="px-6 sm:px-12 lg:px-20 pb-20 pt-10 relative z-20">
          <div className="max-w-[70rem] mx-auto">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3A5728] to-[#1e2e15] px-6 py-12 sm:px-12 sm:py-16 shadow-xl">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#54833B] opacity-20 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
                <div className="text-left flex flex-col">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                    Looking to Register Your Device in Sri Lanka?
                  </h2>
                  <p className="text-[#cce2be] text-sm font-medium max-w-xl">
                    Advitec International is a fully accredited NMRA distributor. We help global brands successfully navigate local healthcare compliance, storage, and logistics.
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-[#3A5728] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95">
                    <span className="relative z-10 flex items-center gap-2">
                      Get a Compliance Audit
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

        {/* --- RELATED ARTICLES --- */}
        <section className="py-16 px-6 sm:px-12 lg:px-20 bg-[#eef2ea]/40 border-t border-zinc-100 relative z-10">
          <div className="max-w-[70rem] mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(p => (
                <Link 
                  key={p.slug} 
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#f4f7f1] text-[#3A5728] text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">{p.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3A5728] transition-colors leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs leading-relaxed line-clamp-2 mb-6">
                    {p.excerpt}
                  </p>
                  <span className="text-[10px] font-bold text-[#3A5728] group-hover:text-[#54833B] flex items-center gap-1 mt-auto">
                    Read Article
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
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
                    src="/logo-01-332x129.webp" 
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
          </footer>
        </div>

      </div>
    </div>
  );
}
