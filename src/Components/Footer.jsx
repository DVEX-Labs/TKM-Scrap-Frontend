import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 py-16 border-t border-[#1E293B] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#18931D] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
              <span className="bg-[#18931D] text-white p-2 rounded-xl shadow-lg shadow-green-900/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </span>
              ECO SCRAP
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
              Transforming waste into value. We make scrap collection seamless, rewarding, and eco-friendly across your city.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-[#18931D] hover:border-[#18931D] hover:text-white transition-all hover:-translate-y-1">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-[#18931D] hover:border-[#18931D] hover:text-white transition-all hover:-translate-y-1">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-[#18931D] hover:border-[#18931D] hover:text-white transition-all hover:-translate-y-1">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-[0.15em]">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-400 font-medium hover:text-white hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link to="/about-us" className="text-slate-400 font-medium hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link to="/products" className="text-slate-400 font-medium hover:text-white hover:translate-x-1 inline-block transition-all">Scrap Rates</Link></li>
              <li><Link to="/contact" className="text-slate-400 font-medium hover:text-white hover:translate-x-1 inline-block transition-all">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-[0.15em]">Legal & Safety</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 font-medium hover:text-white hover:translate-x-1 inline-block transition-all">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 font-medium hover:text-white hover:translate-x-1 inline-block transition-all">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 font-medium hover:text-white hover:translate-x-1 inline-block transition-all">Data Safety</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-[0.15em]">Get In Touch</h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#18931D]">
                  <i className="fas fa-phone-alt text-sm"></i>
                </div>
                <span className="text-slate-400 font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#18931D]">
                  <i className="fab fa-whatsapp text-sm"></i>
                </div>
                <span className="text-slate-400 font-medium">WhatsApp Us</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#18931D]">
                  <i className="fas fa-envelope text-sm"></i>
                </div>
                <span className="text-slate-400 font-medium">info@ecoscrap.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 font-medium text-sm">
            &copy; {new Date().getFullYear()} ECO SCRAP. All rights reserved.
          </p>
          <p className="text-slate-500 font-medium text-sm">
            Made with <span className="text-[#18931D] text-base mx-1">♻️</span> for a greener planet
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
