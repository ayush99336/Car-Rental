import React, { useState, useEffect } from "react";
import { CAR_DATA } from "./CarData.js";

export default function VehicleModels() {
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    // Set the first car as selected on page load
    setSelectedCar(CAR_DATA[0][0]);
  }, []);

  const handleClick = (car) => {
    setSelectedCar(car);
  };

  return (
    <div className="w-full px-8 lg:px-20 pt-6 py:10 lg:py-20 flex-wrap">
      <div className="flex flex-col justify-center items-center pb-20">
        <h3 className="text-2xl font-semibold">Vehicle Models</h3>
        <h4 className="text-[2.7rem] font-bold py-4 text-center">Our rental fleet</h4>
        <p className="text-[#706F7B] px-6 lg:px-96 text-center">
          Choose from a variety of our amazing vehicles to rent for your next
          adventure or business trip
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-10 justify-center lg:items-start items-center">
        <div className="flex flex-col gap-2 lg:w-[20%] w-full">
          {CAR_DATA.map((carGroup, index) => (
            <div key={index}>
              {carGroup.map((car) => (
                <div
                  key={car.name}
                  onClick={() => handleClick(car)}
                  className={` hover:bg-[#FF4D30] cursor-pointer ${
                    selectedCar === car
                      ? "bg-[#FF4D30] text-white"
                      : "bg-[#e9e9e9] text-black"
                  }`}
                >
                  <button className="px-6 py-4 text-lg font-semibold">
                    {car.name}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          {selectedCar && (
            <img
              src={selectedCar.img}
              alt={selectedCar.name}
              className="pt-12"
            />
          )}
        </div>
        <div className="text-sm text-center w-full lg:w-[20%] h-64">
          {selectedCar && (
            <div className="text-center border border-black">
              <div className="flex bg-[#FF4D30] text-white items-center justify-center py-4">
                <p className="text-3xl font-bold">
                  ${selectedCar.price}
                  <span className="text-lg font-normal">/ rent per day</span>
                </p>
              </div>

              <div className="flex py-2 px-2 border-b border-black">
                <span className=" w-1/3">Model</span>
                <span className="w-2/3 border-l border-black">
                  {selectedCar.model}
                </span>
              </div>
              <div className="flex py-2 px-2 border-b border-black">
                <span className=" w-1/3">Mark</span>
                <span className="w-2/3  border-l border-black">
                  {selectedCar.mark}
                </span>
              </div>
              <div className="flex py-2 px-2 border-b border-black">
                <span className=" w-1/3">Year</span>
                <span className="w-2/3  border-l border-black">
                  {selectedCar.year}
                </span>
              </div>
              <div className="flex py-2 px-2 border-b border-black">
                <span className=" w-1/3">Doors</span>
                <span className="w-2/3  border-l border-black">
                  {selectedCar.doors}
                </span>
              </div>
              <div className="flex py-2 px-2 border-b border-black">
                <span className=" w-1/3">AC</span>
                <span className="w-2/3  border-l border-black">
                  {selectedCar.air}
                </span>
              </div>
              <div className="flex py-2 px-2 border-b border-black">
                <span className=" w-1/3 ">Carrying</span>
                <span className="w-2/3  border-l border-black">
                  {selectedCar.transmission}
                </span>
              </div>
              <div className="flex py-2 px-2">
                <span className=" w-1/3  ">Fuel</span>
                <span className="w-2/3 border-l border-black">
                  {selectedCar.fuel}
                </span>
              </div>
            </div>
          )}
          <button className="w-full uppercase bg-[#FF4D30] text-white px-[2.5rem] py-3 mt-4 text-xl font-semibold hover:bg-opacity-95 shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
