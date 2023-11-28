"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { menuData } from "@/constants/menu";
import { careerData, personalData } from "@/constants/data";
import { logo } from "@/assets";
import { ExternalLink } from "lucide-react";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();
  
  const navbarRef = useRef<HTMLDivElement | null>(null); // Define the type explicitly

  useEffect(() => {
    // Event listener to close the navbar when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setNavbarOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <>
      <header
        className={`sm:px-16 px-6 left-0 top-0 z-40 flex w-full items-center bg-gradient-to-b from-primary to-transparent backdrop-blur-lg ${
          sticky
            ? "fixed z-[9999] shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="w-full" ref={navbarRef}>
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-[300px]  px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo w-full flex items-center gap-2 ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <img src={logo.src} alt="Logo" className="w-9 h-9 object-contain" />
                <p className="text-white text-[18px] font-bold cursor-pointer flex">
                  {personalData.nickname}
                </p>
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px]  transition-all duration-300 bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px]  transition-all duration-300 bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px]  px-6 py-4 duration-300 border-body-color/20 bg-tertiary lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:gap-10">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            target={menuItem.newTab ? "_blank" : "_self"}
                            className={`flex items-center py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? " text-on-primary"
                                : "text-dark text-white/70 hover:text-white"
                            }`}
                          >
                            {menuItem.title} 
                            {menuItem.newTab && 
                            <ExternalLink 
                              className="ml-1 mb-1"
                              size={20}
                            />
                            }
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark text-white/70 group-hover:text-white 
                              lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm transition-[top] duration-300 group-hover:opacity-100 
                              bg-tertiary lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg 
                              lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu && menuItem.submenu.map((submenuItem, index) => (
                                submenuItem.path && <Link
                                  href={submenuItem.path}
                                  onClick={() => handleSubmenu(-1)}
                                  target={submenuItem.newTab ? "_blank" : "_self"}
                                  key={index}
                                  className="rounded py-2.5 text-sm  text-white/70 hover:text-white lg:px-3 flex items-center hover:bg-tertiary-active"
                                >
                                  {submenuItem.title}
                                  {submenuItem.newTab && 
                                    <ExternalLink 
                                      className="ml-1 mb-1"
                                      size={20}
                                    />
                                  }
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="text-white  hidden lg:block">
                我好🐂啊
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
