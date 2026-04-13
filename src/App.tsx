import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Menu, X, Star, Check, ShieldCheck, Zap, Heart, 
  Users, Leaf, Trophy, ChevronDown, Instagram, 
  Facebook, Twitter, Mail, ArrowRight, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Benefits', href: '#benefits' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-cream-nut/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black text-brown-nut tracking-tighter font-serif">NutCraft</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-brown-nut hover:text-amber-nut font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#pricing" className="bg-amber-nut text-white px-6 py-2.5 rounded-full font-bold hover:bg-brown-nut transition-all transform hover:scale-105 shadow-lg">
              Order Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brown-nut p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-nut border-t border-brown-nut/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-lg font-medium text-brown-nut hover:bg-amber-nut/10 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#pricing" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-amber-nut text-white px-6 py-4 rounded-xl font-bold mt-4"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PeanutButterJar = () => (
  <div className="relative w-64 h-80 mx-auto">
    {/* Jar Body */}
    <div className="absolute inset-x-4 bottom-0 h-64 bg-amber-600 rounded-b-3xl rounded-t-lg shadow-2xl border-4 border-amber-700/20 overflow-hidden">
      {/* Peanut Butter Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#D4860A_0%,#B46B08_100%)] opacity-90"></div>
      {/* Label */}
      <div className="absolute top-12 inset-x-0 h-32 bg-cream-nut border-y-2 border-brown-nut/10 flex flex-col items-center justify-center p-2">
        <span className="text-xs font-bold text-brown-nut tracking-widest uppercase">Premium</span>
        <span className="text-xl font-black text-brown-nut font-serif leading-none">NutCraft</span>
        <div className="w-8 h-0.5 bg-amber-nut my-1"></div>
        <span className="text-[10px] font-bold text-amber-nut uppercase">100% Natural</span>
      </div>
    </div>
    {/* Jar Lid */}
    <div className="absolute top-8 inset-x-2 h-10 bg-brown-nut rounded-t-xl shadow-lg border-b-4 border-black/20">
      <div className="absolute inset-0 flex justify-around items-center px-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-0.5 h-full bg-white/10"></div>
        ))}
      </div>
    </div>
    {/* Reflection */}
    <div className="absolute top-20 left-8 w-4 h-40 bg-white/20 blur-md rounded-full rotate-6"></div>
  </div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center space-x-3 bg-brown-nut/5 p-3 rounded-2xl border border-brown-nut/10">
      <Clock className="text-amber-nut" size={20} />
      <span className="text-sm font-bold text-brown-nut uppercase tracking-wider">Offer ends in:</span>
      <div className="flex space-x-2 font-mono text-xl font-bold text-amber-nut">
        <span>{format(timeLeft.hours)}</span>
        <span className="animate-pulse">:</span>
        <span>{format(timeLeft.minutes)}</span>
        <span className="animate-pulse">:</span>
        <span>{format(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-3xl shadow-sm border border-brown-nut/5 hover:shadow-xl transition-all"
  >
    <div className="w-14 h-14 bg-amber-nut/10 rounded-2xl flex items-center justify-center mb-6 text-amber-nut">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-brown-nut">{title}</h3>
    <p className="text-brown-nut/70 leading-relaxed">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brown-nut/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-amber-nut transition-colors"
      >
        <span className="text-lg font-bold text-brown-nut">{question}</span>
        <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-brown-nut/70 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen selection:bg-amber-nut selection:text-white">
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-amber-nut/10 px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-nut rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-amber-nut uppercase tracking-widest">New Batch Just Roasted</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-brown-nut leading-[1.1] mb-6">
                Crafted for the Bold. <br />
                <span className="text-amber-nut">Fueled by Pure Protein.</span>
              </h1>
              <p className="text-xl text-brown-nut/80 mb-10 max-w-lg leading-relaxed">
                No junk. No compromise. Just real peanut butter the way nature intended. Small-batch roasted for the ultimate flavor profile.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                <a href="#pricing" className="bg-amber-nut text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brown-nut transition-all shadow-xl hover:shadow-amber-nut/20 flex items-center justify-center">
                  Shop Now — Get 20% Off Today
                  <ArrowRight className="ml-2" size={20} />
                </a>
                <a href="#ingredients" className="bg-white text-brown-nut border-2 border-brown-nut/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-brown-nut hover:text-white transition-all flex items-center justify-center">
                  See What's Inside
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Non-GMO', 'Gluten-Free', 'No Added Sugar', '28g Protein'].map((badge) => (
                  <div key={badge} className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-brown-nut/5 shadow-sm">
                    <Check className="text-green-nut mb-1" size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-brown-nut/60">{badge}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <CountdownTimer />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-amber-nut/20 blur-[120px] rounded-full"></div>
              <PeanutButterJar />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-xl border border-brown-nut/5 flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-amber-nut/20 flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-xs">
                  <div className="flex text-amber-nut mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                  <span className="font-bold text-brown-nut">Only 47 jars left in stock!</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF BAR */}
      <section className="bg-brown-nut py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-brown-nut bg-amber-nut/30 flex items-center justify-center text-xs font-bold text-white">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-white/80 text-sm">
              <div className="flex text-amber-nut mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="font-bold">Trusted by 50,000+ happy customers</span>
            </div>
          </div>
          <div className="h-px w-12 bg-white/20 hidden md:block"></div>
          <div className="text-white font-serif italic text-lg">
            "Average rating: <span className="text-amber-nut font-bold not-italic">4.9/5 stars</span>"
          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-brown-nut mb-4">Why NutCraft Wins Every Time</h2>
            <p className="text-brown-nut/60 max-w-2xl mx-auto text-lg">We didn't just make peanut butter. We perfected it for those who demand more from their fuel.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard icon={Zap} title="High Protein" description="Packed with 28g of pure plant-based protein per serving to fuel your recovery." />
            <BenefitCard icon={ShieldCheck} title="Zero Junk" description="No palm oil, no added sugar, no artificial flavors. Just pure, natural goodness." />
            <BenefitCard icon={Leaf} title="Small-Batch Quality" description="Roasted in small batches to ensure consistent texture and peak flavor profile." />
            <BenefitCard icon={Star} title="Great Taste" description="Rich, deep-roasted flavor that puts commercial brands to shame." />
            <BenefitCard icon={Heart} title="Family Safe" description="Non-GMO and gluten-free, making it the perfect choice for health-conscious families." />
            <BenefitCard icon={Trophy} title="Athlete Approved" description="The preferred choice for professional athletes and fitness enthusiasts nationwide." />
          </div>
        </div>
      </section>

      {/* 5. INGREDIENTS SECTION */}
      <section id="ingredients" className="py-24 bg-cream-nut">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-brown-nut mb-8">Only 3 Ingredients. Seriously.</h2>
              <div className="space-y-6 mb-12">
                {[
                  { name: 'Dry Roasted Peanuts', desc: 'Premium runner peanuts, roasted to perfection.' },
                  { name: 'Sea Salt', desc: 'A touch of mineral-rich salt to enhance the natural sweetness.' },
                  { name: 'Love', desc: 'Crafted with passion in every single jar.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-nut text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brown-nut">{item.name}</h4>
                      <p className="text-brown-nut/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brown-nut/5">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brown-nut text-white">
                    <th className="p-6 font-bold">Feature</th>
                    <th className="p-6 font-bold text-amber-nut">NutCraft</th>
                    <th className="p-6 font-bold opacity-50">Competitors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brown-nut/5">
                  {[
                    { label: 'Added Sugar', nut: '0g', comp: '8g+' },
                    { label: 'Palm Oil', nut: 'None', comp: 'Always' },
                    { label: 'Artificial Flavors', nut: 'None', comp: 'Common' },
                    { label: 'Protein / Serving', nut: '28g', comp: '14g' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-amber-nut/5 transition-colors">
                      <td className="p-6 font-medium text-brown-nut">{row.label}</td>
                      <td className="p-6 font-bold text-green-nut flex items-center">
                        <Check size={16} className="mr-2" /> {row.nut}
                      </td>
                      <td className="p-6 text-brown-nut/40">{row.comp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT'S MADE */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-brown-nut mb-4">The NutCraft Process</h2>
            <p className="text-brown-nut/60">From farm to jar, quality is our only metric.</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-amber-nut/10 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: '01', title: 'Premium Sourcing', desc: 'We source only the finest premium peanuts from sustainable farms.' },
                { step: '02', title: 'Small-Batch Roasting', desc: 'Roasted to perfection in small batches to lock in natural oils and flavor.' },
                { step: '03', title: 'Fresh Sealed', desc: 'Sealed immediately to ensure maximum freshness and crunch in every bite.' }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 bg-white border-4 border-amber-nut rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-black text-amber-nut group-hover:bg-amber-nut group-hover:text-white transition-all shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-brown-nut mb-4">{item.title}</h3>
                  <p className="text-brown-nut/60 leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section id="reviews" className="py-24 bg-brown-nut text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-4">Real People. Real Results.</h2>
              <p className="text-white/60 text-lg">Join the community of bold achievers fueled by NutCraft.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
              <div className="text-3xl font-black text-amber-nut mb-1">4.9/5</div>
              <div className="flex text-amber-nut justify-center mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-60">Based on 3,847 reviews</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Marcus T.', loc: 'CrossFit Athlete', text: "Finally, a peanut butter that doesn't feel like a cheat meal. The protein content is insane and the taste is even better. I'm hooked!" },
              { name: 'Sarah L.', loc: 'Health-Conscious Mom', text: "My kids actually ask for this! Knowing it's 100% natural and has no added sugar makes it a staple in our pantry. Worth every penny." },
              { name: 'David R.', loc: 'Personal Trainer', text: "I recommend NutCraft to all my clients. It's the cleanest fuel you can find. The small-batch quality really shows in the texture." }
            ].map((rev, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-amber-nut rounded-full flex items-center justify-center font-bold text-xl">
                    {rev.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{rev.name}</div>
                    <div className="text-xs opacity-50">{rev.loc}</div>
                  </div>
                </div>
                <div className="flex text-amber-nut mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="italic leading-relaxed opacity-80">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-cream-nut">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-brown-nut mb-4">Pick Your Pack. Save More.</h2>
            <p className="text-brown-nut/60">Free shipping on all orders over $35!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <div className="bg-white p-8 rounded-3xl border border-brown-nut/5 shadow-sm">
              <h3 className="text-2xl font-bold text-brown-nut mb-2">Starter Pack</h3>
              <div className="text-4xl font-black text-brown-nut mb-6">$14.99</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> 1 Jar (16oz)</li>
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> 100% Natural</li>
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> Standard Shipping</li>
              </ul>
              <button className="w-full py-4 rounded-full border-2 border-brown-nut text-brown-nut font-bold hover:bg-brown-nut hover:text-white transition-all">
                Add to Cart
              </button>
            </div>

            {/* Most Popular */}
            <div className="bg-white p-8 rounded-3xl border-4 border-amber-nut shadow-2xl relative transform scale-105 z-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-nut text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-brown-nut mb-2">Triple Pack</h3>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-black text-brown-nut">$39.99</span>
                <span className="text-brown-nut/40 line-through">$44.97</span>
              </div>
              <div className="bg-green-nut/10 text-green-nut text-xs font-bold px-3 py-1 rounded-full inline-block mb-6 uppercase tracking-widest">
                Save $5.00 + Free Shipping
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-brown-nut/70 font-bold"><Check size={18} className="text-amber-nut mr-2" /> 3 Jars (16oz each)</li>
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> Free Recipe eBook</li>
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> Priority Shipping</li>
              </ul>
              <button className="w-full py-4 rounded-full bg-amber-nut text-white font-bold text-lg hover:bg-brown-nut transition-all shadow-xl shadow-amber-nut/20">
                Add to Cart
              </button>
            </div>

            {/* Family Pack */}
            <div className="bg-white p-8 rounded-3xl border border-brown-nut/5 shadow-sm">
              <h3 className="text-2xl font-bold text-brown-nut mb-2">Family Pack</h3>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-black text-brown-nut">$74.99</span>
                <span className="text-brown-nut/40 line-through">$89.94</span>
              </div>
              <div className="bg-green-nut/10 text-green-nut text-xs font-bold px-3 py-1 rounded-full inline-block mb-6 uppercase tracking-widest">
                Save $15.00 + Free Shipping
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> 6 Jars (Best Value)</li>
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> 2 Free Recipe eBooks</li>
                <li className="flex items-center text-brown-nut/70"><Check size={18} className="text-amber-nut mr-2" /> VIP Support</li>
              </ul>
              <button className="w-full py-4 rounded-full border-2 border-brown-nut text-brown-nut font-bold hover:bg-brown-nut hover:text-white transition-all">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-brown-nut/60 font-bold uppercase tracking-widest text-xs">
              <ShieldCheck size={20} className="text-green-nut" />
              <span>30-Day No-Risk Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EMAIL CAPTURE */}
      <section className="py-24 bg-amber-nut relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brown-nut rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Get 20% Off Your First Order</h2>
          <p className="text-white/80 text-xl mb-10">Plus free recipes, fitness tips, and exclusive subscriber deals delivered straight to your inbox.</p>
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleEmailSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-6 py-4 rounded-full bg-white text-brown-nut focus:outline-none focus:ring-4 focus:ring-brown-nut/20 font-medium"
                />
                <button type="submit" className="bg-brown-nut text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-all shadow-xl">
                  Claim My Discount
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/20 backdrop-blur-md p-8 rounded-3xl border border-white/20 inline-block"
              >
                <div className="w-16 h-16 bg-white text-amber-nut rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Check Your Inbox!</h3>
                <p className="text-white/80">Your 20% discount code is on its way.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-brown-nut mb-4">Got Questions?</h2>
            <p className="text-brown-nut/60">We've got answers to everything you need to know.</p>
          </div>
          
          <div className="bg-cream-nut/30 rounded-3xl p-8 border border-brown-nut/5">
            <FAQItem 
              question="Is it really all natural?" 
              answer="Yes! NutCraft contains only dry roasted peanuts and a pinch of sea salt. No palm oil, no added sugar, and no artificial preservatives ever." 
            />
            <FAQItem 
              question="Does it need refrigeration?" 
              answer="Nope! Because we use a specialized small-batch roasting process, NutCraft is shelf-stable for up to 6 months. Just store it in a cool, dry place." 
            />
            <FAQItem 
              question="Is it safe for kids?" 
              answer="Absolutely. It's a favorite among health-conscious parents because it provides clean energy without the sugar crash associated with commercial brands." 
            />
            <FAQItem 
              question="How much protein per serving?" 
              answer="Every 2-tablespoon serving packs a powerful 28g of high-quality, plant-based protein." 
            />
            <FAQItem 
              question="What's your return policy?" 
              answer="We offer a 30-day no-risk money-back guarantee. If you don't love it, we'll refund your entire order, no questions asked." 
            />
            <FAQItem 
              question="Do you ship internationally?" 
              answer="Currently, we ship to the US, Canada, and the UK. We're working hard to bring NutCraft to more countries soon!" 
            />
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-brown-nut text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <span className="text-3xl font-black tracking-tighter font-serif mb-6 block">NutCraft</span>
              <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
                "Crafted for the Bold. Fueled by Pure Protein." We're on a mission to provide the cleanest, most powerful fuel for athletes and health-conscious families.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-nut hover:text-white transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-amber-nut">Quick Links</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#ingredients" className="hover:text-white transition-colors">Ingredients</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-amber-nut">Support</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 text-center text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} NutCraft Premium Peanut Butter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
