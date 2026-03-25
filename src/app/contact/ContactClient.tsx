"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Product Inquiry",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [activeFaq, setActiveFaq] = useState(0);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "Product Inquiry", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black p-[5px]">
      <div 
        className="relative min-h-[calc(100vh-10px)] w-full rounded-2xl bg-[#fcfdfa] flex flex-col"
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
            <Link href="/" className="hover:text-[#54833B] transition-colors">Products</Link>
          </div>
          <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#5c8b42]/90 to-[#2b421e]/90 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(58,87,40,0.4),inset_0_-3px_5px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 before:absolute before:inset-x-[15%] before:-top-1.5 before:h-1/2 before:rounded-full before:bg-gradient-to-b before:from-white/40 before:to-transparent">
            <span className="relative z-10">Contact Us</span>
          </Link>
        </nav>

        {/* --- SECTION 1 & 2 & 3: HERO + DIRECT CONTACT + INQUIRY FORM --- */}
        <div className="flex-grow flex flex-col lg:flex-row lg:items-start pt-32 pb-20 px-6 sm:px-12 lg:px-20 lg:gap-16 max-w-[85rem] mx-auto w-full relative">
          
          {/* Left Column (Hero + Direct Contact) */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center mb-16 lg:mb-0 relative z-10">
            {/* Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A5728] shadow-sm max-w-max">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#54833B]"></span>
              Get in Touch
            </div>
            
            {/* Section 1: Hero Area */}
            <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-slate-900">
              Let's Transform
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A5728] to-[#54833B]">Healthcare</span> Together
            </h1>
            
            <p className="mb-10 text-[17px] sm:text-[19px] text-slate-600 leading-relaxed font-medium max-w-lg">
              Whether you are a global manufacturer or a local healthcare provider, the Advitec team is ready to assist you.
            </p>

            <hr className="w-16 border-t-2 border-slate-200 mb-10" />

            {/* Section 2: Direct Contact Information */}
            <h2 className="text-[26px] font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              Reach Out to Our Headquarters
            </h2>
            
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed font-medium mb-10 max-w-lg pr-4">
              Located in the commercial capital of Colombo, our dedicated team is perfectly positioned to manage our island-wide distribution network. Reach out to us directly for any inquiries regarding our products, services, or quality management policies.
            </p>

            {/* Info Cards */}
            <div className="flex flex-col gap-4 w-full max-w-lg">
              
              {/* Email */}
              <div className="flex items-center gap-5 p-4 bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#54833B]/30 transition-all duration-300 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4f7f1] text-[#54833B] group-hover:scale-110 group-hover:bg-[#54833B] group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</h3>
                  <p className="text-[15px] font-semibold text-slate-800">info@advitecint.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-5 p-4 bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#54833B]/30 transition-all duration-300 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4f7f1] text-[#54833B] group-hover:scale-110 group-hover:bg-[#54833B] group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</h3>
                  <p className="text-[14px] font-semibold text-slate-800 leading-snug">Colombo, Sri Lanka</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-center gap-5 p-4 bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#54833B]/30 transition-all duration-300 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4f7f1] text-[#54833B] group-hover:scale-110 group-hover:bg-[#54833B] group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Business Hours</h3>
                  <p className="text-[14px] font-semibold text-slate-800 leading-snug">Monday – Friday<br/>8:30 AM – 5:00 PM</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Sticky Form / Section 3) */}
          <div className="w-full lg:w-7/12 relative lg:sticky lg:top-[120px] z-20 h-max">
            
            {/* Visual background blob for the form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#54833B]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="w-full relative z-10 bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05)] border border-white/80">
              
              <h2 className="text-[28px] md:text-[32px] font-black text-slate-900 tracking-tighter mb-3 leading-tight">
                How Can We Help You Today?
              </h2>
              
              <p className="text-slate-500 font-medium mb-6 leading-relaxed text-[14px] md:text-[15px] max-w-[95%]">
                Have a specific question about our medical devices, regulatory services, or supply chain capabilities? Fill out the form below, and an Advitec representative will respond to you promptly.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="bg-[#f4f7f1] border border-[#54833B]/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]"
                     >
                       <div className="w-14 h-14 bg-[#54833B] rounded-full flex items-center justify-center mb-4 text-white shadow-lg">
                         <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                         </svg>
                       </div>
                       <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Message Sent!</h3>
                       <p className="text-sm text-slate-600 font-medium">Thank you for reaching out to Advitec International. A representative will be in touch with you shortly.</p>
                       <button 
                         type="button" 
                         onClick={() => setIsSubmitted(false)}
                         className="mt-6 text-[11px] font-bold text-[#3A5728] hover:text-[#54833B] uppercase tracking-widest transition-colors"
                       >
                         Send Another Message
                       </button>
                     </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Full Name *</label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#54833B] focus:border-[#54833B] block p-3.5 transition-all duration-300 placeholder:text-slate-400 font-medium" 
                            placeholder="John Doe" 
                          />
                        </div>
                        
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address *</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#54833B] focus:border-[#54833B] block p-3.5 transition-all duration-300 placeholder:text-slate-400 font-medium" 
                            placeholder="john@example.com" 
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="subject" className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Subject</label>
                        <div className="relative">
                          <select 
                            id="subject" 
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#54833B] focus:border-[#54833B] block p-3.5 appearance-none font-medium cursor-pointer transition-all duration-300"
                          >
                            <option value="Product Inquiry">Product Inquiry</option>
                            <option value="Manufacturer Partnership">Manufacturer Partnership</option>
                            <option value="General Support">General Support</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Your Message *</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows={3}
                          required
                          value={formState.message}
                          onChange={handleChange}
                          className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#54833B] focus:border-[#54833B] block p-3.5 resize-none transition-all duration-300 placeholder:text-slate-400 font-medium" 
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="group w-full sm:w-auto relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#5c8b42]/90 to-[#2b421e]/90 px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(58,87,40,0.5),inset_0_-4px_8px_rgba(0,0,0,0.4),inset_0_2px_6px_rgba(255,255,255,0.6)] border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 before:absolute before:inset-x-[15%] before:-top-2 before:h-1/2 before:rounded-full before:bg-gradient-to-b before:from-white/50 before:to-transparent disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? 'Sending Message...' : 'Send Message'}
                            {!isSubmitting && (
                              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            )}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </div>

        </div>

        {/* --- FAQ SECTION --- */}
        <section className="bg-white py-16 sm:py-20 px-6 sm:px-12 lg:px-20 border-t border-slate-100 relative z-20">
          <div className="max-w-[85rem] mx-auto">
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
                      <button 
                        key={idx}
                        onClick={() => setActiveFaq(idx)}
                        className={`group text-left w-full rounded-3xl p-4 sm:p-5 transition-all duration-300 flex items-center justify-between ${isActive ? 'bg-[#54833B] shadow-[0_8px_20px_rgba(84,131,59,0.25)]' : 'bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}
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
                    );
                  })}
                </div>
              </div>

              {/* Right Column (Sticky) */}
              <div className="lg:col-span-6 lg:sticky lg:top-[120px] z-10 flex flex-col pt-2 lg:pt-0">
                
                {/* Paragraph */}
                <div className="mb-12 lg:-mt-2">
                  <p className="text-slate-500 text-[15px] sm:text-[16px] font-medium leading-[1.8] max-w-lg">
                    At Advitec, we believe clarity builds trust. That's why we've gathered the most common questions our clients ask and answered.
                  </p>
                </div>

                {/* Answer Box */}
                <div className="relative w-full h-full min-h-[350px] lg:h-auto lg:min-h-[440px] rounded-3xl bg-[#fcfdfa] p-8 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFaq}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex flex-col h-full"
                    >
                      <div className="border-b border-slate-100 pb-6 mb-6">
                        <h3 className="text-[24px] sm:text-[28px] font-black text-slate-900 tracking-tight">Question Answer:</h3>
                      </div>
                      
                      <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed font-medium">
                        {faqs[activeFaq].a}
                      </p>
                      
                      <div className="mt-auto pt-8">
                        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#54833B] pl-6 pr-2 py-2 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#436A2E] hover:shadow-lg">
                          Contact Us Directly
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform">
                            <svg className="w-4 h-4 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
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
                    <li><a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">About Us</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Our Portfolio</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Careers</a></li>
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
