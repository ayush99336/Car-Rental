import React from "react";
import bgAbout from "../assets/hero/heroes-bg.png";
import main from "../assets/about/about-main.jpg";
import icon1 from "../assets/about/icon1.png";
import icon2 from "../assets/about/icon2.png";
import icon3 from "../assets/about/icon3.png";
import Feature from "../components/Feature";
import { FaPhoneAlt } from "react-icons/fa";
import bgBanner from "../assets/banners/book-banner.png"

export default function About() {
  return (
    <div className="font-poppins relative flex flex-col gap-10">
      <div
        className="bg-no-repeat w-full h-full bg-top absolute"
        style={{
          backgroundImage: `url(${bgAbout})`,
          opacity: "0.1", // Set the opacity value here (0.1 for 10%)
        }}
      ></div>
      <div className="flex lg:flex-row px-8 lg:px-20 py-32 text-black relative z-10">
        <div>
          <h2 className="text-3xl font-bold">About</h2>
          <h3 className="text-lg font-semibold">Home/About</h3>
        </div>
      </div>
      <div className="flex gap-10 flex-col lg:flex-row items-center justify-center px-8 lg:px-20 pt-48 text-black ">
        <div>
          <img src={main} alt="" className="rounded-lg shadow-xl" />
        </div>
        <div className="flex flex-col lg:text-start text-center w-full lg:w-[40%]">
          <h3 className="text-2xl font-semibold">About Car Rental</h3>
          <h4 className="text-[2.7rem] font-bold py-4 leading-[3rem]">
            You start the engine and your adventure begins
          </h4>
          <p className="text-[#706F7B] lg:text-left text-center">
            Certain but she but shyness why cottage. Guy the put instrument sir
            entreaties affronting. Pretended exquisite see cordially the you.
            Weeks quiet do vexed or whose. Motionless if no to affronting
            imprudence no precaution. My indulged as disposal strongly attended.
          </p>
          <div className="flex lg:justify-start justify-center items-center gap-10">
            <div>
              <img className="py-6" src={icon1} alt="" />
              <div className="flex gap-4 items-center font-rubik">
                <span className="text-3xl font-bold">20</span>
                <p className="text-[#706F7B]">
                  Car
                  <br />
                  Types
                </p>
              </div>
            </div>
            <div>
              <img className="py-6" src={icon2} alt="" />
              <div className="flex gap-4 items-center font-rubik">
                <span className="text-3xl font-bold">85</span>
                <p className="text-[#706F7B]">
                  Rental
                  <br />
                  Outlets
                </p>
              </div>
            </div>
            <div>
              <img className="py-6" src={icon3} alt="" />
              <div className="flex gap-4 items-center font-rubik">
                <span className="text-3xl font-bold">75</span>
                <p className="text-[#706F7B]">
                  Repair
                  <br />
                  Shops
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
      <Feature />
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
    </div>
  );
}
