import React from "react";
import { Link } from "react-router-dom";

import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const linkClass =
    "w-fit text-sm text-green-100 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c422e] rounded-sm";

  const headingClass =
    "mb-4 text-xs font-extrabold tracking-[0.16em] text-white sm:mb-5";

  // Social Media Links
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/pestfind/about/?viewAsMember=true",
      icon: FaLinkedinIn,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/pestfind/?hl=en",
      icon: FaInstagram,
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/PestFind",
      icon: FaXTwitter,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61596957892958&sk=directory_names",
      icon: FaFacebookF,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@PestFind",
      icon: FaYoutube,
    },
  ];

  return (
    <footer className="overflow-hidden bg-[#0c422e] px-8 py-10 text-white sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-16 2xl:px-24">
      <div className="mx-auto w-full max-w-7xl">

        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.25fr)] lg:gap-10 xl:gap-14">

          {/* Logo and Description */}
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <Link
              to="/"
              aria-label="PestFind home"
              className="inline-flex max-w-full rounded-[20px] bg-white p-2 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0c422e] sm:rounded-[24px]"
            >
              <img
                src="/PestFindLogo.svg"
                alt="PestFind"
                className="h-[66px] w-[210px] max-w-full object-cover sm:h-[76px] sm:w-[245px]"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-green-100 sm:mt-5">
              A simpler way to find dependable pest care for
              homes and businesses.
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="min-w-0">
            <h3 className={headingClass}>SERVICES</h3>

            <div className="flex flex-col items-start gap-3">
              <Link to="/residential" className={linkClass}>
                Residential
              </Link>

              <Link to="/commercial" className={linkClass}>
                Commercial
              </Link>

              <Link to="/restaurant" className={linkClass}>
                Restaurant
              </Link>
            </div>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore" className="min-w-0">
            <h3 className={headingClass}>EXPLORE</h3>

            <div className="flex flex-col items-start gap-3">
              <Link to="/about-us" className={linkClass}>
                About Us
              </Link>

              <Link to="/blogs" className={linkClass}>
                PestFind Blogs
              </Link>

              <Link to="/become-agency" className={linkClass}>
                Become Agency
              </Link>
            </div>
          </nav>

          {/* Help */}
          <nav
            aria-label="Help and legal"
            className="col-span-2 min-w-0 sm:col-span-1"
          >
            <h3 className={headingClass}>NEED HELP?</h3>

            <div className="flex flex-col items-start gap-3">
              <Link to="/#pest-request-form" className={linkClass}>
                Find pest care
              </Link>

              <a
                href="mailto:hello@mypestfind.com"
                className={`${linkClass} break-words`}
              >
                hello@mypestfind.com
              </a>

              <Link
                to="/terms-and-conditions"
                className={linkClass}
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </nav>

        </div>

        {/* Social Media Section */}
        <div className="mt-10 border-t border-white/15 pt-7 sm:mt-12 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

            {/* Social Heading */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-extrabold tracking-[0.16em] text-white">
                FOLLOW US
              </h3>

              <p className="mt-2 text-sm text-green-100">
                Stay connected with PestFind.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit PestFind on ${social.name}`}
                    title={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-green-100 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#0c422e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c422e]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/15 sm:my-9 lg:my-10" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center gap-3 text-center text-xs leading-5 text-green-200 sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 PestFind. All rights reserved.</p>

          <p>Made easier, one pest at a time.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;