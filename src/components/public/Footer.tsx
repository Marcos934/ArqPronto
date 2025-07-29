import { Building2, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">TerraraProjetos</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Transforming architectural dreams into reality with innovative designs and sustainable solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect With Us</h3>
            <div className="mt-4 flex space-x-6">
              {[
                { Icon: Facebook, name: 'Facebook' },
                { Icon: Instagram, name: 'Instagram' },
                { Icon: Twitter, name: 'Twitter' },
                { Icon: Linkedin, name: 'LinkedIn' }
              ].map(({ Icon, name }) => (
                <a
                  key={name}
                  href="#"
                  className="text-gray-400 hover:text-white"
                  aria-label={name}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white">Subscribe to our newsletter</h4>
              <div className="mt-4 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-auto rounded-l-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="flex-none rounded-r-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} TerraraProjetos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}