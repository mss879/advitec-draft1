"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogPosts } from "./posts";

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Regulatory", "Logistics", "Critical Care", "Medical Innovation"];

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const gridPosts = filteredPosts.filter(post => post.slug !== featuredPost.slug || selectedCategory !== "All");

  return (
    <div className="min-h-screen bg-black p-[5px]">
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

        {/* --- HERO SECTION --- */}
        <section className="pt-36 pb-12 px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            {/* Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
              Healthcare Journal
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-slate-900 mb-6">
              Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A5728] to-[#54833B]">Publications</span>
            </h1>
            
            <p className="text-[16px] sm:text-[18px] text-slate-500 leading-relaxed font-medium max-w-2xl">
              Stay up-to-date with industry news regarding bio-medical innovations, NMRA regulatory compliance, cold chain medical logistics, and advanced intensive care.
            </p>
          </div>
        </section>

        {/* --- SEARCH & FILTERS --- */}
        <section className="px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10 pb-8">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center pb-8 border-b border-slate-100">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-[#54833B] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-full pl-5 pr-10 py-2.5 focus:ring-[#54833B] focus:border-[#54833B] transition-all placeholder:text-slate-400 font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURED POST (ONLY ON "ALL" CATEGORY WITH NO SEARCH IN PROGRESS) --- */}
        {selectedCategory === "All" && searchQuery === "" && (
          <section className="px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10 pb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Featured Article</h2>
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="group flex flex-col lg:flex-row bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Image Left */}
              <div className="w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto relative bg-slate-50 min-h-[300px]">
                <Image 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title} 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Text Right */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#f4f7f1] text-[#3A5728] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{featuredPost.readTime}</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-[#3A5728] transition-colors leading-tight">
                  {featuredPost.title}
                </h3>
                
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{featuredPost.author}</span>
                    <span className="text-[10px] font-semibold text-slate-400 mt-0.5">{featuredPost.date}</span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7f1] text-[#3A5728] group-hover:bg-[#3A5728] group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* --- GRID OF POSTS --- */}
        <section className="px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10 pb-24 flex-grow">
          {selectedCategory === "All" && searchQuery === "" && (
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Latest Articles</h2>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 flex flex-col items-center">
              <svg className="w-16 h-16 text-slate-300 mb-4 animate-[bounce_2s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-800 mb-1">No articles found</h3>
              <p className="text-slate-500 font-medium text-sm">We couldn't find any post matching "{searchQuery}" under {selectedCategory}.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-6 text-xs font-bold text-[#3A5728] hover:text-[#54833B] uppercase tracking-widest"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === "All" && searchQuery === "" ? gridPosts : filteredPosts).map(post => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Card Image */}
                  <div className="relative w-full aspect-[16/10] bg-slate-50">
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-[#3A5728] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-semibold text-slate-400 mb-2">{post.date} · {post.readTime}</span>
                    
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3A5728] transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 font-medium text-xs leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{post.author}</span>
                      <span className="text-[10px] font-bold text-[#3A5728] group-hover:text-[#54833B] flex items-center gap-1">
                        Read Article
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* --- FOOTER --- */}
        <div className="px-6 sm:px-12 lg:px-20 bg-[#fcfdfa] mt-auto">
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
