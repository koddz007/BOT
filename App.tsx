import React from 'react';
import { Bot, MessageCircle, Phone, Mail, Menu, X, ArrowRight } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { ServiceCard } from './components/ServiceCard';
import { SERVICES, BRAND_NAME, WHATSAPP_NUMBER } from './constants';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToChat = () => {
    const element = document.getElementById('demo-chat');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-green-600 p-2 rounded-lg text-white">
                <Bot size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight">{BRAND_NAME}</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Services</a>
              <a href="#demo-chat" className="text-gray-600 hover:text-green-600 font-medium transition-colors">AI Demo</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Contact</a>
              <button 
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-green-600/20"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Services</a>
              <a href="#demo-chat" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">AI Demo</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Contact</a>
              <button 
                onClick={openWhatsApp}
                className="w-full mt-4 bg-green-600 text-white px-5 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              AI-Powered Business Growth
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Scale Your Brand with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">Intelligent AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We build custom AI chatbots, automate your workflows, and run high-converting ad campaigns. Experience the future of sales automation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToChat}
                className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                Try AI Demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={openWhatsApp}
                className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-semibold hover:border-green-600 hover:text-green-600 transition-all"
              >
                Book a Call
              </button>
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-md lg:max-w-full">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative">
                {/* Visual Representation of Dashboard/Analytics */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                             <Bot size={24} />
                         </div>
                         <div>
                             <h3 className="font-bold text-lg">Sales Automator</h3>
                             <p className="text-sm text-gray-500">Active • Responding to leads</p>
                         </div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-green-500 w-3/4"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Leads Captured</span>
                            <span className="font-bold">1,248</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl mt-4 border border-gray-100">
                             <div className="flex gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                <div className="flex-1 bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-600">
                                    How much for a custom chatbot?
                                </div>
                             </div>
                             <div className="flex gap-3 justify-end">
                                <div className="flex-1 bg-green-100 p-2 rounded-lg rounded-tr-none shadow-sm text-sm text-gray-800">
                                    We offer custom packages starting from...
                                </div>
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">AI</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-green-600 font-semibold tracking-wide uppercase text-sm mb-2">Our Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Scale</h3>
            <p className="text-lg text-gray-600">From intelligent chatbots to high-converting ad campaigns, we provide end-to-end solutions for modern businesses.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Chat Demo Section */}
      <section id="demo-chat" className="py-24 bg-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="order-2 lg:order-1">
                     <ChatInterface />
                 </div>
                 <div className="order-1 lg:order-2 space-y-6">
                     <div className="inline-block p-2 px-4 bg-green-100 text-green-800 rounded-lg font-semibold text-sm">
                         Live Interactive Demo
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                         Experience Our <span className="text-green-600">AI Sales Agent</span> In Action
                     </h2>
                     <p className="text-lg text-gray-600 leading-relaxed">
                         This chat widget is powered by the same technology we use to build assistants for our clients. 
                         Try asking it about our services, pricing models, or how we can help your specific industry.
                     </p>
                     <ul className="space-y-4">
                         {[
                             '24/7 Customer Engagement',
                             'Instant Lead Qualification',
                             'Seamless WhatsApp Integration',
                             'Natural Language Processing'
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-700">
                                 <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                                     <Bot size={14} />
                                 </div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </div>
             </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 skew-x-12 transform origin-top-right opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Automate Your Growth?</h2>
           <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
               Join hundreds of businesses leveraging Koddz Empire's AI solutions. Let's build something great together.
           </p>
           <button 
             onClick={openWhatsApp}
             className="bg-green-500 hover:bg-green-400 text-white text-lg px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-green-900/50 flex items-center gap-3 mx-auto"
           >
             <MessageCircle size={24} />
             Start Your Project Now
           </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-green-600 p-1.5 rounded text-white">
                             <Bot size={20} />
                        </div>
                        <span className="font-bold text-xl text-gray-900">{BRAND_NAME}</span>
                    </div>
                    <p className="text-gray-500 mb-6 max-w-sm">
                        Empowering businesses with next-gen AI automation, video marketing, and web solutions.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Placeholders */}
                        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600 cursor-pointer transition-colors">
                            <span className="font-bold">fb</span>
                        </div>
                         <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600 cursor-pointer transition-colors">
                            <span className="font-bold">ig</span>
                        </div>
                         <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600 cursor-pointer transition-colors">
                            <span className="font-bold">in</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Services</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li><a href="#" className="hover:text-green-600">AI Chatbots</a></li>
                        <li><a href="#" className="hover:text-green-600">Web Development</a></li>
                        <li><a href="#" className="hover:text-green-600">Video Editing</a></li>
                        <li><a href="#" className="hover:text-green-600">Facebook Ads</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center gap-2">
                            <Phone size={16} className="text-green-600" />
                            <span>{WHATSAPP_NUMBER}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} className="text-green-600" />
                            <span>hello@koddzempire.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MessageCircle size={16} className="text-green-600" />
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:underline">Chat on WhatsApp</a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
                <div className="flex gap-6 text-sm text-gray-500">
                    <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
