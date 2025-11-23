import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Zap, Shield, Sun, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {/* Hero Section - Light Modern Design with Warm Gradient */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        {/* Background Gradients/Orbs - Light Theme */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px] mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[100px] mix-blend-multiply"></div>
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-red-100/20 rounded-full blur-[80px] mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-orange-100 text-orange-600 text-sm font-bold mb-8 shadow-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                The Future of Energy is Here
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Power Your Home with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">Pure Sunshine.</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Switch to Aswin Solar for a cleaner future and lower bills. We combine advanced AI technology with expert engineering to deliver the most efficient solar solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                 <Link to="/quote">
                   <Button size="lg" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/30 rounded-xl transition-all hover:scale-105">
                     Get Free Proposal <ArrowRight className="ml-2 w-5 h-5" />
                   </Button>
                 </Link>
                 <Link to="/calculator">
                   <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 border-gray-300 hover:bg-white hover:border-gray-400 hover:text-gray-900 rounded-xl shadow-sm">
                     Calculate Savings
                   </Button>
                 </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Floating Overlap */}
      <section className="relative z-20 -mt-10 px-4">
         <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 py-8 px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
               <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">25+</div>
               <div className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wider">Years Warranty</div>
            </div>
            <div className="text-center">
               <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">30%</div>
               <div className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wider">Avg ROI</div>
            </div>
            <div className="text-center">
               <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">5k+</div>
               <div className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wider">Installations</div>
            </div>
            <div className="text-center">
               <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">0</div>
               <div className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wider">Down Payment</div>
            </div>
         </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-600 font-bold tracking-wide uppercase mb-3 text-sm">Why Aswin Solar?</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Energy that works for you.</h3>
            <p className="text-lg text-gray-600">We don't just install panels; we engineer a complete energy ecosystem for your home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sun,
                title: 'Premium Technology',
                desc: 'We use only Tier-1 monocrystalline panels with the highest efficiency ratings in the market.'
              },
              {
                icon: Shield,
                title: '25-Year Protection',
                desc: 'Rest easy with our comprehensive performance and workmanship warranty covering your entire system.'
              },
              {
                icon: Zap,
                title: 'Smart Monitoring',
                desc: 'Track your production and savings in real-time through our dedicated mobile app.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-[2rem] p-8 md:p-10 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-primary-600 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8" />
                 </div>
                 <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                 <p className="text-gray-600 leading-relaxed">
                   {item.desc}
                 </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1">
               <div className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold mb-4">DESIGN</div>
               <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Beautiful, Sleek Design.</h3>
               <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                 Gone are the days of bulky, ugly solar setups. Our low-profile mounting systems and all-black panels integrate seamlessly with your roof's aesthetic, increasing your home's value while powering it.
               </p>
               <ul className="space-y-4">
                 {['Low-profile mounting', 'All-black aesthetics', 'Hidden wiring'].map((feat, i) => (
                   <li key={i} className="flex items-center space-x-3 text-gray-700 font-medium">
                     <div className="bg-green-100 rounded-full p-1"><Check className="w-4 h-4 text-green-600" /></div>
                     <span>{feat}</span>
                   </li>
                 ))}
               </ul>
             </div>
             <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80" 
                  alt="Solar Panels" 
                  className="rounded-[2.5rem] shadow-2xl w-full rotate-2 hover:rotate-0 transition-transform duration-500"
                />
             </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-primary-600 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start your savings journey.</h2>
             <p className="text-primary-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Get a custom design and quote for your home in less than 24 hours. No commitment required.</p>
             
             <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
               <Link to="/quote" className="w-full sm:w-auto">
                 <button className="bg-white text-primary-900 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg w-full sm:w-auto">
                   Get My Free Quote
                 </button>
               </Link>
               <Link to="/consultant" className="w-full sm:w-auto">
                 <button className="bg-primary-700 text-white border border-primary-500 font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary-800 transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                   <MessageSquare className="w-5 h-5" />
                   Ask AI Consultant
                 </button>
               </Link>
             </div>
             
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;