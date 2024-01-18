import React from "react";
import TestimonialCard from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/testimonials/pfp1.jpg";
import image2 from "../assets/testimonials/pfp2.jpg";

export default function Testimonial() {

  return (
    <div className="w-full bg-[#f8f8f8]">
      <div className="flex flex-col justify-center items-center py-36 lg:gap-16 px-8 lg:px-40 lg:py-20 ">
        <div className="flex flex-col gap-2 justify-center items-center text-center">
          <h3 className="text-2xl font-medium font-rubik">
            Reviewed by People
          </h3>
          <h2 className="text-[2.7rem] font-bold">Client's Testimonials</h2>
          <p className="text-[#706F7B] font-rubik px-10 lg:px-40 text-center">
            Discover the positive impact we've made on the our clients by
            reading through their testimonials. Our clients have experienced our
            service and results, and they're eager to share their positive
            experiences with you.
          </p>
        </div>
          <div className="flex lg:flex-row flex-col gap-10 pt-10 lg:pt-0">
            <TestimonialCard
              content='"We rented a car from this website and had an amazing experience! The booking was easy and the rental rates were very affordable."'
              img={image1}
              name="Swarup Jana"
              city="Kolkata, India"
            />
            <TestimonialCard
              content='"The car was in great condition and made our trip even better. Highly recommend for this car rental website!"'
              img={image2}
              name="Arpita Biswas"
              city="Bengaluru, India"
            />
          </div>

      </div>
    </div>
  );
}
