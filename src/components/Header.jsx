import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/home/logo.png";
import { Transition } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleLinkClick() {
    if (isMenuOpen) {
      toggleMenu(); // Close the menu when a link is clicked on smaller screens
    }
  }

  return (
    <header className="w-full px-4 lg:px-20 pt-6 font-rubik bg-initial absolute z-[99999]">
      <nav className="flex justify-between items-center">
        <div>
          <a href="/">
            <img src={logo} className="w-36 cursor-pointer" alt="logo" />
          </a>
        </div>
        <div className="hidden lg:block font-medium">
          <ul className="flex gap-6 items-center ">
            <li className="hover:text-[#FF4D30]">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-[#FF4D30]">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-[#FF4D30]">
              <Link to="/vehical-models">Vehical Models</Link>
            </li>
            <li className="hover:text-[#FF4D30]">
              <Link to="/testimonials">Testimonials</Link>
            </li>
            <li className="hover:text-[#FF4D30]">
              <Link to="/our-team">Our Team</Link>
            </li>
            <li className="hover:text-[#FF4D30]">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-6 items-center font-medium">
          <a href="/" className="hidden lg:block hover:text-[#FF4D30]">
            Sign in
          </a>
          <button className="rounded py-3 px-6 bg-[#FF4D30] text-white shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out hidden lg:block">
            Register
          </button>
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden text-slate-700 font-semibold text-2xl cursor-pointer hover:text-yellow-500"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      <Transition
        show={isMenuOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div
            ref={ref}
            className="flex flex-col gap-6 w-full h-[100vh] fixed top-0 right-0 p-14 rounded-b-md bg-white shadow-md lg:hidden text-center font-medium"
          >
            <div
              className="border rounded px-10 py-4 hover:text-[#FF4D30] hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
              onClick={handleLinkClick}
            >
              <Link to="/">Home</Link>
            </div>
            <div
              className="border  rounded px-10 py-4 hover:text-[#FF4D30] hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
              onClick={handleLinkClick}
            >
              <Link to="/about">About</Link>
            </div>
            <div
              className="border  rounded px-10 py-4 hover:text-[#FF4D30] hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
              onClick={handleLinkClick}
            >
              <Link to="/vehical-models">Vehicle Models</Link>
            </div>
            <div
              className="border  rounded px-10 py-4 hover:text-[#FF4D30] hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
              onClick={handleLinkClick}
            >
              <Link to="/testimonials">Testimonial</Link>
            </div>
            <div
              className="border  rounded px-10 py-4 hover:text-[#FF4D30] hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
              onClick={handleLinkClick}
            >
              <Link to="/our-team">Our Team</Link>
            </div>
            <div
              className="border rounded px-10 py-4 hover:text-[#FF4D30] hover:-translate-y-2 ease-in-out duration-300 cursor-pointer"
              onClick={handleLinkClick}
            >
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        )}
      </Transition>
      <Outlet />
    </header>
  );
}
