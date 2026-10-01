import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 py-16 border-t border-[#1E293B] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#18931D] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4 bg-white rounded-lg inline-block px-3 py-2">
              <BrandLogo imageClassName="h-8 w-auto" linkTo="/" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
              Transforming waste into value. We make scrap collection seamless, rewarding, and eco-friendly across your city.
            </p>
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
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                </div>
                <span className="text-slate-400 font-medium">+91 95671 63707</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#18931D]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path></svg>
                </div>
                <span className="text-slate-400 font-medium">WhatsApp Us</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#18931D]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <span className="text-slate-400 font-medium">info@tkmscraps.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 font-medium text-sm">
            &copy; {new Date().getFullYear()} TKM SCRAPS. All rights reserved.
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
