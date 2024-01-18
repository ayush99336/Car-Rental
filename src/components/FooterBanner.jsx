import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import bgBanner from "../assets/banners/book-banner.png";
export default function FooterBanner() {
  return (
    <div
      className="px-8 w-full text-white  bg-[rgb(45,45,45)] items-center lg:items-start justify-center py-10 lg:py-20 flex flex-col lg:flex-row gap-4 lg:gap-10 bg-blend-overlay text-center"
      style={{
        backgroundImage: `url(${bgBanner})`,
        opacity: "0.89", // Set the opacity value here (0.1 for 10%)
      }}
    >
      <h2 className=" text-3xl lg:text-[2.4rem] font-extrabold leading-[2.7rem]">
        Book a car by getting in touch with us
      </h2>
      <span className="text-[#FF4D30] font-bold text-2xl lg:text-[2.4rem] flex items-center gap-2">
        <FaPhoneAlt />
        +91-9463836278
      </span>
    </div>
  );
}
