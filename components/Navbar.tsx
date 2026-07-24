import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const LogoGraphic: React.FC<{ className?: string }> = ({ className = 'h-9 w-9' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="14" fill="none" stroke="#2c2c30" strokeWidth="3.2" />
    <circle cx="20" cy="20" r="14" fill="none" stroke="#a3ec6d" strokeWidth="3.2"
      strokeLinecap="round" strokeDasharray="26 200" className="orbit-arc" />
    <circle cx="20" cy="20" r="3.6" fill="#a3ec6d" />
  </svg>
);

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Services', to: '/services' },
    { label: 'Pricing',  to: '/pricing'  },
    { label: 'Contact',  to: '/contact'  },
  ];

  return (
    <>
      <nav className="fixed w-full top-0 z-50 h-[70px]
        bg-[#0b0b0d]/[0.72] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between gap-5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 outline-none" aria-label="Orbis Accounting">
            <LogoGraphic className="h-6 w-6" />
            <span className="font-display font-extrabold text-[18px] tracking-[0.16em] text-white uppercase hidden sm:block">
              Orbis
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 list-none">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`text-[13.5px] font-medium transition-colors hover:text-white ${
                    location.pathname === l.to ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              text-white text-[13.5px] font-semibold transition-all hover:opacity-85"
            style={{ background: '#0a84ff' }}
          >
            Free Quote
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open
                ? <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></>
              }
            </svg>
          </button>

        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-[70px] z-40 bg-[#0b0b0d]
          border-t border-white/[0.06] flex flex-col gap-5 p-7 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-xl font-semibold text-white pb-4 border-b border-white/[0.07]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="w-full text-center py-4 rounded-full text-white font-semibold text-[15px]
              transition-all hover:opacity-85 mt-2"
            style={{ background: '#0a84ff' }}
          >
            Get a Free Quote
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
