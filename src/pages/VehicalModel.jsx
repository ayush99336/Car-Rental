import React from "react";
import bgAbout from "../assets/hero/heroes-bg.png";
import { CAR_DATA } from "../components/CarData.js";
import { FaStar } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import { RiOilFill } from "react-icons/ri";
import { GiCarDoor } from "react-icons/gi";
import { GiGearStick } from "react-icons/gi";
import FooterBanner from "../components/FooterBanner.jsx";

export default function VehicalModel() {
  return (
    <div className="font-poppins w-full h-full relative">
      <div className="font-poppins relative flex flex-col gap-10">
        <div
          className="bg-no-repeat w-full h-full bg-top absolute"
          style={{
            backgroundImage: `url(${bgAbout})`,
            opacity: "0.1",
          }}
        ></div>
        <div className="flex lg:flex-row px-8 lg:px-20 py-32 text-black relative z-10">
          <div>
            <h2 className="text-3xl font-bold">Vehicle Models</h2>
            <h3 className="text-lg font-semibold">Home/Vehicle Models</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 flex-row items-center justify-center px-8 lg:px-20 py-20 text-black ">
        {CAR_DATA.map((carGroup, index) => {
          return (
            <div key={index}>
              {carGroup.map((car) => {
                return (
                  <div
                    key={car.name}
                    className="flex w-[300px] flex-col flex-wrap overflow-x-hidden border rounded-lg p-4"
                  >
                    <img src={car.img} alt="" className="object-cover" />
                    <div className="flex flex-row justify-between border-b mt-4 pb-4">
                      <div className="flex flex-col gap-2 flex-1">
                        <h4 className="text-xl font-semibold">{car.mark}</h4>
                        <span className="flex gap-2 text-[#FF4D30]">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>
                        <div className="flex gap-2 items-center">
                          <span>
                            <FaCarSide />
                          </span>
                          <span>{car.model}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span>
                            <GiGearStick />
                          </span>
                          <span>{car.transmission}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-right items-end flex-1">
                        <h4 className="text-xl font-semibold">{`$${car.price}`}</h4>
                        <span>per day</span>
                        <div className="flex gap-2 items-center">
                          <span>
                            <GiCarDoor />
                          </span>
                          <span>{car.doors}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span>
                            <RiOilFill />
                          </span>
                          <span>{car.fuel}</span>
                        </div>
                      </div>
                    </div>{" "}
                    <button
                      type=""
                      className="font-rubik text-lg font-medium rounded mt-4 py-3 px-3 bg-[#FF4D30] text-white shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out mb-8 lg:mb-0"
                    >
                      Book Ride
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <FooterBanner />
    </div>
  );
}
