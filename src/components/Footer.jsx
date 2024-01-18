import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import logo from "../assets/home/logo.png";
export default function Footer() {
  return (
    <div className="px-8 lg:px-20 py-20 mt-20 lg:mt-0">
      <div className="flex lg:gap-4 gap-10 lg:flex-row flex-col justify-between lg:items-start items-center text-center lg:text-left">
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <a href="/">
            <img src={logo} className="w-36 cursor-pointer" alt="logo" />
          </a>
          <p className="text-wrap w-72 pb-4 text-[#706F7B] font-rubik">
            We offers a big range of vehicles for all your driving needs. We
            have the perfect car to meet your needs.
          </p>
          <a href="/" className="flex items-center gap-2 hover:text-[#FF4D30]">
            <FaPhoneAlt /> <p>+91-9463836278</p>
          </a>
          <a href="/" className="flex items-center gap-2 hover:text-[#FF4D30]">
            <MdEmail />
            <p>contact@carrental.com</p>
          </a>
        </div>
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <h3 className="text-2xl font-semibold">Company</h3>
          <ul className="flex flex-col gap-2 font-rubik">
            <li className="hover:text-[#FF4D30] cursor-pointer">Bengaluru</li>
            <li className="hover:text-[#FF4D30] cursor-pointer">Careers</li>
            <li className="hover:text-[#FF4D30] cursor-pointer">Mobile</li>
            <li className="hover:text-[#FF4D30] cursor-pointer">Blog</li>
            <li className="hover:text-[#FF4D30] cursor-pointer">How we work</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Working Hours</h3>
          <ul className="flex flex-col gap-2 font-rubik">
            <li>Mon - Fri: 9:00AM - 9:00PM</li>
            <li>Sat: 9:00AM - 19:00PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Subscription</h3>
          <p className="text-wrap w-72 pb-4 text-[#706F7B] font-rubik">
            Subscribe your Email address for latest news & updates.
          </p>
          <input
            className="border rounded py-4 px-2 outline-none bg-[#f8f8f8]"
            type="text"
            placeholder="Enter Email Address"
          />
          <button className="w-full rounded py-3 px-6 bg-[#FF4D30] text-white shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out">
            Submit
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center text center opacity-20">
        <p>❤️ Ayush</p>
      </div>
    </div>
  );
}
