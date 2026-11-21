
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const Navbar = ({ children }) => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const desktopNavRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const previousMenuOpen = useRef(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navbar entrance animations
  useEffect(() => {
    let media;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline.fromTo(
        navbarRef.current,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5 }
      );

      timeline.fromTo(
        logoRef.current,
        { x: -18, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.45 },
        "-=0.2"
      );

      // Animate only the links visible at the desktop breakpoint
      media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const items = desktopNavRef.current?.children;

        if (items?.length) {
          gsap.fromTo(
            Array.from(items),
            { y: -12, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.4,
              stagger: 0.07,
              delay: 0.15,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
            }
          );
        }
      });

      media.add("(max-width: 767px)", () => {
        gsap.fromTo(
          menuButtonRef.current,
          { scale: 0.8, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.35,
            delay: 0.15,
            ease: "back.out(1.7)",
            clearProps: "transform,opacity,visibility",
          }
        );
      });
    }, navbarRef);

    return () => {
      media?.revert();
      ctx.revert();
    };
  }, []);

  // Mobile dropdown animation
  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    gsap.killTweensOf(menu);

    if (isMenuOpen) {
      gsap.fromTo(
        menu,
        { autoAlpha: 0, y: -10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    } else if (previousMenuOpen.current) {
      gsap.to(menu, {
        autoAlpha: 0,
        y: -10,
        duration: 0.18,
        ease: "power2.in",
        overwrite: "auto",
      });
    } else {
      gsap.set(menu, {
        autoAlpha: 0,
        y: -10,
      });
    }

    previousMenuOpen.current = isMenuOpen;

    return () => {
      gsap.killTweensOf(menu);
    };
  }, [isMenuOpen]);

  // Close the menu when navigating to another page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Residential", path: "/residential" },
    { name: "Commercial", path: "/commercial" },
    { name: "Restaurant", path: "/Restaurant" },
    { name: "Guides", path: "/blogs" },
    { name: "About Us", path: "/about-us" },
    
  ];

  const linkStyle = (path) =>
    `block rounded-lg px-3 py-2.5 text-sm font-semibold
    transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
      location.pathname === path
        ? "bg-green-50 text-green-700"
        : "text-gray-800"
    }`;

  return (
    <div className="min-h-screen w-full overflow-x-clip">
      <header
        ref={navbarRef}
        className="navbar sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link
            to="/"
            ref={logoRef}
            className="shrink-0"
            aria-label="PestFind home"
          >
            <img
              src="/PestFindLogo.svg"
              alt="PestFind"
              className="block h-auto w-32 sm:w-40 lg:w-44"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            ref={desktopNavRef}
            className="hidden items-center gap-4 md:flex lg:gap-7"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap text-md font-semibold transition-colors hover:text-green-700 ${
                  location.pathname === link.path
                    ? "text-green-700"
                    : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/become-agency"
              className="whitespace-nowrap rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
            >
              Become Agency
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          aria-hidden={!isMenuOpen}
          className={`absolute left-0 top-full w-full border-t border-gray-100 bg-white shadow-lg md:hidden ${
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ visibility: "hidden" }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                tabIndex={isMenuOpen ? 0 : -1}
                className={linkStyle(link.path)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/become-agency"
              tabIndex={isMenuOpen ? 0 : -1}
              className="mt-2 rounded-lg bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Become Agency
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default Navbar;
