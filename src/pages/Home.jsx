import React from "react";
import Hero from "../components/Hero";
import BookCar from "../components/BookCar";
import Feature from "../components/Feature";
import VehicleModels from "../components/VehicleModels";
import Banner from "../components/Banner";
import ChooseUs from "../components/ChooseUs";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import AppDownload from "../components/AppDownload";

export default function Home() {
  return (
    <div className=" font-poppins w-full h-full bg-gradient-to-b from-[#f8f8f8] to-white">
      <Hero />
      <BookCar />
      <Feature />
      <VehicleModels />
      <Banner />
      <ChooseUs />
      <Testimonial />
      <FAQ />
      <AppDownload />
    </div>
  );
}
