import React from 'react';
import { Link } from 'react-router-dom';
import { LogoGraphic } from './Navbar';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark border-t border-white/[0.06] py-9">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center
        justify-between gap-5">

        <Link to="/" className="flex items-center gap-2.5" aria-label="Orbis Accounting">
          <LogoGraphic className="h-5 w-5" />
          <span className="font-display font-extrabold text-[17px] tracking-[0.16em] text-white uppercase">
            Orbis
          </span>
        </Link>

        <p className="text-sm text-gray-400">
          © 2026 Orbis Accounting. All rights reserved.
        </p>

        <ul className="flex items-center gap-5 list-none flex-wrap">
          <li>
            <a href="mailto:info@orbisaccounting.ca"
              className="text-sm text-gray-400 hover:text-white transition-colors">
              info@orbisaccounting.ca
            </a>
          </li>
          <li>
            <Link to="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service"
              className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
          </li>
        </ul>

      </div>
    </footer>
  );
};

export default Footer;
