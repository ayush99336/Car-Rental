import React from "react";
import bgAbout from "../assets/hero/heroes-bg.png";
import Testimonial from "../components/Testimonial";
import FooterBanner from "../components/FooterBanner";

export default function Testimonials() {
  return (
    <div className="font-poppins w-full h-full relative">
      <div
        className="bg-no-repeat w-full h-full right-0 top-0 bg-top absolute"
        style={{
          backgroundImage: `url(${bgAbout})`,
          opacity: "0.1", // Set the opacity value here (0.1 for 10%)
        }}
      ></div>
      <div className="flex lg:flex-row px-8 lg:px-20 py-32 text-black relative z-10">
        <div>
          <h2 className="text-3xl font-bold">Testimonials</h2>
          <h3 className="text-lg font-semibold">Home/Testimonials</h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 flex-row items-center justify-center py-24 text-black ">
        <Testimonial />
      </div>
      <FooterBanner/>
    </div>
  );
}
