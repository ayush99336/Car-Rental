import React from "react";
import image1 from "../assets/chooseUs/main.png";
import icon1 from "../assets/chooseUs/icon1.png";
import icon2 from "../assets/chooseUs/icon2.png";
import icon3 from "../assets/chooseUs/icon3.png";
import bg from "../assets/chooseUs/bg.png"

import { FiArrowRightCircle } from "react-icons/fi";
import ChooseUsCard from "./ChooseUsCard";

export default function ChooseUs() {
  return (
    <div
      className="flex flex-col justify-center items-center lg:gap-16 bg-no-repeat bg-left-bottom bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img className="pt-10" src={image1} alt="car-img" />
      <div className="flex lg:flex-row lg:justify-start lg:items-start lg:text-start justify-center items-center text-center flex-col gap-24 lg:gap-52  px-8 lg:px-40 lg:py-16">
        <div className="flex flex-col gap-2 lg:justify-start lg:items-start items-center flex-wrap w-full lg:w-[100%]">
          <h2 className="text-2xl font-medium font-rubik">Why Choose Us</h2>
          <h3 className="text-[2.7rem] font-bold leading-10">
            Best valued deals you will ever find
          </h3>
          <p className="text-[#706F7B] py-6 font-rubik">
            Discover the best deals you'll ever find with our unbeatable offers.
            We're dedicated to providing you with the best value for your money,
            so you can enjoy top-quality services and products without breaking
            the bank. Our deals are designed to give you the ultimate renting
            experience, so don't miss out on your chance to save big.
          </p>
          <button className="font-rubik font-medium flex items-center gap-4 rounded py-3 px-6 bg-[#FF4D30] text-white shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out w-48">
            <p>Find Details </p>{" "}
            <span>
              <FiArrowRightCircle />
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-10 w-[100%]">
          <ChooseUsCard
            imageUrl={icon1}
            title="Cross Country Drive"
            content="Take your driving experience to the next level with our top-notch vehicles for your cross-country adventures."
          />
          <ChooseUsCard
            imageUrl={icon2}
            title="All Inclusive Pricing"
            content="Get everything you need in one convenient, transparent price with our all-inclusive pricing policy."
          />
          <ChooseUsCard
            imageUrl={icon3}
            title="No Hidden Charges"
            content="Enjoy peace of mind with our no hidden charges policy. We believe in transparent and honest pricing."
          />
        </div>
      </div>
    </div>
  );
}
