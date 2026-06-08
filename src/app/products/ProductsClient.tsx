"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  name: string;
  category: "Homecare Apparatus" | "Handheld Diagnostic Tools" | "Highly Automated Clinical Equipment" | "Surgical & Laboratory Supplies";
  desc: string;
  classification: "Class A" | "Class B" | "Class C" | "Class D";
  image: string;
}

export default function ProductsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    "All",
    "Homecare Apparatus",
    "Handheld Diagnostic Tools",
    "Highly Automated Clinical Equipment",
    "Surgical & Laboratory Supplies"
  ];

  // Compile strictly mentioned products from the site's copy
  const products: Product[] = [
    {
      name: "Respiratory Nebulizer",
      category: "Homecare Apparatus",
      desc: "Delivers aerosolized medication for clinical respiratory relief. Specially designed for high-performance domestic care.",
      classification: "Class B",
      image: "/prod_nebulizer.webp"
    },
    {
      name: "Hearing Aids",
      category: "Homecare Apparatus",
      desc: "Compact, sound-amplifying devices designed to aid patients suffering from auditory impairments.",
      classification: "Class B",
      image: "/prod_hearing_aid.webp"
    },
    {
      name: "Manual Wheelchair",
      category: "Homecare Apparatus",
      desc: "Durable medical mobility support apparatus designed for general patient care and rehabilitation.",
      classification: "Class A",
      image: "/prod_wheelchair.webp"
    },
    {
      name: "Handheld Ultrasound Tool",
      category: "Handheld Diagnostic Tools",
      desc: "A ultra-portable diagnostic imaging system that connects directly to mobile screens for clinic audits.",
      classification: "Class B",
      image: "/prod_handheld_ultrasound.webp"
    },
    {
      name: "Bedside Echo and Lung Ultrasound Probe",
      category: "Handheld Diagnostic Tools",
      desc: "Handheld ultrasound imaging probes designed for real-time cardiac and pulmonary evaluations in emergency care units.",
      classification: "Class B",
      image: "/prod_echo_probe.webp"
    },
    {
      name: "Rapid Blood Analyzer",
      category: "Handheld Diagnostic Tools",
      desc: "A portable blood analyzer offering instant metabolic panels and blood gas measurements at the point of care.",
      classification: "Class B",
      image: "/prod_blood_analyzer.webp"
    },
    {
      name: "Patient Monitor",
      category: "Highly Automated Clinical Equipment",
      desc: "Multi-parameter patient monitor displaying vital signs, ECG waveforms, and integrated predictive early warning scores.",
      classification: "Class C",
      image: "/prod_patient_monitor.webp"
    },
    {
      name: "Smart Infusion Pump",
      category: "Highly Automated Clinical Equipment",
      desc: "Smart IV infusion pump featuring safety-focused dose calculations, pre-loaded drug libraries, and EMR integration.",
      classification: "Class C",
      image: "/prod_infusion_pump.webp"
    },
    {
      name: "Mechanical Ventilator",
      category: "Highly Automated Clinical Equipment",
      desc: "Advanced respiratory ventilator support offering adaptive ventilation modes to match critical ICU patient breathing patterns.",
      classification: "Class D",
      image: "/prod_ventilator.webp"
    },
    {
      name: "Continuous Renal Replacement Therapy (CRRT) Machine",
      category: "Highly Automated Clinical Equipment",
      desc: "Provides continuous blood filtration therapy for hemodynamically unstable patients experiencing acute kidney injuries.",
      classification: "Class D",
      image: "/prod_crrt_machine.webp"
    },
    {
      name: "Mobile Digital Radiography (DR) Machine",
      category: "Highly Automated Clinical Equipment",
      desc: "Bedside digital X-ray imaging platform providing rapid clinical confirmation directly inside the ICU.",
      classification: "Class C",
      image: "/prod_digital_xray.webp"
    },
    {
      name: "Anesthesia Machine",
      category: "Highly Automated Clinical Equipment",
      desc: "High-precision gas delivery systems integrated with automated ventilator monitoring for operating theaters.",
      classification: "Class C",
      image: "/prod_anesthesia.webp"
    },
    {
      name: "Sterile Surgical Instruments",
      category: "Surgical & Laboratory Supplies",
      desc: "Premium, stainless steel medical instruments designed for precision surgical tasks in the operating room.",
      classification: "Class A",
      image: "/prod_surgical_instruments.webp"
    },
    {
      name: "Surgical Swabs & Tongue Depressors",
      category: "Surgical & Laboratory Supplies",
      desc: "High-grade disposable surgical consumables manufactured to standard administrative safety guidelines.",
      classification: "Class A",
      image: "/prod_swabs_tongue.webp"
    },
    {
      name: "Hypodermic Needles",
      category: "Surgical & Laboratory Supplies",
      desc: "Sterile syringes and needles designed for precise, safe subcutaneous and intramuscular drug administration.",
      classification: "Class B",
      image: "/prod_needles.webp"
    },
    {
      name: "Diagnostic Reagents",
      category: "Surgical & Laboratory Supplies",
      desc: "Temperature-sensitive biochemical laboratory reagents requiring validated cold chain logistics and storage.",
      classification: "Class B",
      image: "/prod_reagents.webp"
    }
  ];

  // Filter logic
  const filteredProducts = products.filter(prod => {
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.classification.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        {/* --- HERO SECTION --- */}
        <section className="pt-36 pb-12 px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            {/* Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
              Medical Equipment Portfolio
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-slate-900 mb-6">
              Our Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A5728] to-[#54833B]">Products</span>
            </h1>
            
            <p className="text-[16px] sm:text-[18px] text-slate-500 leading-relaxed font-medium max-w-2xl">
              We distribute a robust range of bio-medical products from leading international manufacturers, backed by full legislative compliance and technical support.
            </p>
          </div>
        </section>

        {/* --- FILTER & SEARCH --- */}
        <section className="px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10 pb-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center pb-8 border-b border-slate-100">
            {/* Categories */}
            <div className="flex flex-row overflow-x-auto flex-nowrap gap-2 w-full lg:w-auto px-6 -mx-6 sm:px-12 sm:-mx-12 lg:mx-0 lg:px-0 pb-4 lg:pb-0 lg:flex-wrap lg:justify-start no-scrollbar scroll-smooth snap-x snap-mandatory">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap snap-start transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shrink-0 ${
                    selectedCategory === cat 
                      ? 'bg-gradient-to-r from-[#3A5728] to-[#54833B] text-white shadow-[0_4px_12px_rgba(58,87,40,0.25)] border border-transparent' 
                      : 'bg-white/85 backdrop-blur-md text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:text-slate-800 shadow-sm'
                  }`}
                >
                  {cat === "All" ? "All Products" : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
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

        {/* --- PRODUCTS GRID --- */}
        <section className="px-6 sm:px-12 lg:px-20 max-w-[85rem] mx-auto w-full relative z-10 pb-24 flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 flex flex-col items-center">
              <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-800 mb-1">No products found</h3>
              <p className="text-slate-500 font-medium text-sm">We couldn't find any devices matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod, idx) => (
                <div 
                  key={idx}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Card Image */}
                  <div className="relative w-full aspect-[4/3] bg-slate-50 border-b border-slate-50">
                    <Image 
                      src={prod.image} 
                      alt={prod.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#54833B] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                        {prod.classification}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{prod.category}</span>
                    
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#3A5728] transition-colors leading-snug mb-2">
                      {prod.name}
                    </h3>
                    
                    <p className="text-slate-500 font-medium text-xs leading-relaxed line-clamp-3 mb-6">
                      {prod.desc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <Link 
                        href="/contact" 
                        className="text-[11px] font-bold text-[#3A5728] hover:text-[#54833B] flex items-center gap-1.5"
                      >
                        Request Quote
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
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
