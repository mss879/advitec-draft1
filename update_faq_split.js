const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const startIndex = code.indexOf('{/* Top Grid: Title and Text */}');
const endIndex = code.indexOf('          </div>\n        </section>', startIndex);

const newContent = `{/* Main Grid: Split Layout */}
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
                        className={\`group text-left w-full rounded-3xl p-4 sm:p-5 transition-all duration-300 flex items-center justify-between \${isActive ? 'bg-[#54833B] shadow-[0_8px_20px_rgba(84,131,59,0.25)]' : 'bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm'}\`}
                      >
                        <div className={\`font-bold text-[15px] sm:text-[16px] pr-4 transition-colors duration-300 \${isActive ? 'text-white' : 'text-slate-800'}\`}>
                          {idx + 1}. {faq.q}
                        </div>
                        <div className={\`flex shrink-0 h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 \${isActive ? 'bg-white' : 'bg-slate-100 group-hover:bg-slate-200'}\`}>
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
              <div className="lg:col-span-6 lg:sticky lg:top-[120px] z-10 flex flex-col">
                
                {/* Paragraph */}
                <div className="mb-12 lg:mt-[72px]">
                  <p className="text-slate-500 text-[15px] sm:text-[16px] font-medium leading-[1.8]">
                    At Advitec, we believe clarity builds trust. That's why we've gathered the most common questions our clients ask and answered.
                  </p>
                </div>

                {/* Answer Box */}
                <div className="relative w-full h-full min-h-[350px] lg:h-auto lg:min-h-[460px] rounded-3xl bg-white p-8 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
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
                        <h3 className="text-[26px] sm:text-[30px] font-black text-slate-900 tracking-tight">Question Answer:</h3>
                      </div>
                      
                      <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed font-medium">
                        {faqs[activeFaq].a}
                      </p>
                      
                      <div className="mt-8 pt-4">
                        <a href="#" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#54833B] pl-6 pr-2 py-2 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#436A2E] hover:shadow-lg">
                          More About Us
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform">
                            <svg className="w-4 h-4 text-[#54833B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

            </div>\n`;

code = code.substring(0, startIndex) + newContent + code.substring(endIndex);
fs.writeFileSync('src/app/page.tsx', code);
