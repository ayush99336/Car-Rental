import React, { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import Dropdown from "../components/Dropdown";
import { FaLocationDot } from "react-icons/fa6";
import bgCarBook from "../assets/book-car/book-bg.png";
import { IoMdClose } from "react-icons/io";
import { CAR_DATA } from "./CarData.js";
import BookCarFrom from "./BookCarFrom.jsx";
import "../custom.css";
import { cars, pickUpCities, dropOffCities } from "./BookCarData.js";

export default function BookCar() {
  const [inputValues, setInputValues] = useState({
    car: "",
    pickUpCity: "",
    dropOffCity: "",
    pickUpDate: "",
    dropOffDate: "",
  });

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccess1, setShowSuccess1] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const allInputsFilled = Object.keys(inputValues).every((key) => {
      if (key === "pickUpDate" || key === "dropOffDate") {
        return !!inputValues[key]; // Check if date fields are truthy (not undefined or null)
      }
      return inputValues[key] && inputValues[key].trim() !== ""; // Validate other fields normally
    });
    console.log("Form submitted:", inputValues);
    if (allInputsFilled) {
      setShowError(false);
      setShowSuccess(true);

      console.log("Form submitted:", inputValues);
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false); // Close the div by updating the state
    setShowSuccess1(false);
    setShowError(false);
  };
  const handleClose1 = () => {
    setShowSuccess(false);
    setShowSuccess1(true);
  };



  
  return (
    <div className="px-4 sm:px-8 lg:px-20 pb-20 flex-wrap box-border">
      <div
        className="flex-inline flex-col bg-white gap-4 justify-center flex-wrap items-center lg:gap-6 lg:flex lg:flex-row lg:justify-between p-4 lg:p-8 border shadow-md bg-fixed overflow-x-hidden"
        style={{ backgroundImage: `url(${bgCarBook})` }}
      >
        <h1 className="text-xl lg:text-2xl font-bold my-3">Book a car</h1>
        <form onSubmit={handleSubmit} className="">
          {showError && (
            <div className="flex justify-between items-center bg-[#f8d7da] rounded px-10 py-4 mb-6 text-[#721c24] font-rubik text-lg font-medium">
              {" "}
              <span className="">All fields are required!</span>
              <span
                onClick={handleClose}
                className="cursor-pointer text-xl font-bold"
              >
                <IoMdClose />
              </span>
            </div>
          )}
          {showSuccess1 && (
            <div className="flex justify-between items-center bg-[#ace28e] rounded px-10 py-4 mb-6 text-[#264f1a] font-rubik text-lg font-medium">
              {" "}
              <span className="">Check your mail to confirm booking!</span>
              <span
                onClick={handleClose}
                className="cursor-pointer text-xl font-bold"
              >
                <IoMdClose />
              </span>
            </div>
          )}
          
          {showSuccess && (
            <div className="flex items-center justify-center">
             {/* for overlay effect */}
              <div className="bg-[#4b4b4b4d] h-full right-0 top-0 w-full z-[999999999] fixed overflow-hidden"></div>{" "}
             
              <div className=" bg-white border shadow-lg absolute  justify-center flex-wrap items-center lg:flex lg:flex-row lg:justify-between w-full z-[999999999999] top-[100%] lg:w-[60%] h-[100vh] overflow-x-hidden overflow-y-scroll scroll-bar">
                <div className="w-full flex justify-between items-center bg-[#FF4D30] px-4 py-2 text-white ">
                  <h3 className=" font-semibold text-2xl ">
                    COMPLETE RESERVATION
                  </h3>
                  <span
                    onClick={handleClose}
                    className="cursor-pointer text-xl font-bold"
                  >
                    <IoMdClose />
                  </span>
                </div>
                <div className="flex flex-col gap-2 px-8 py-8 bg-[#ffeae6] w-full">
                  <h4 className="text-lg font-semibold text-[#FF4D30]">
                    Upon completing this reservation enquiry, you will receive:
                  </h4>
                  <p className="text-[#706F7B]">
                    Your rental voucher to produce on arrival at the rental desk
                    and a toll-free customer support number.
                  </p>
                </div>
                <div className=" flex flex-col lg:flex-row px-8 pt-8 w-full justify-center items-center lg:items-start lg:justify-between border-b">
                  <div className="flex flex-col">
                    <h5 className="text-lg font-semibold text-[#FF4D30]">
                      Location & Date
                    </h5>
                    <div className="flex flex-col gap-8 pt-4">
                      <div className="flex gap-2">
                        <span>
                          <MdDateRange />
                        </span>
                        <div className="flex flex-col gap-2 font-semibold">
                          <p>Pick-Up Date & Time</p>{" "}
                          <div className="">
                            <span className="text-[#706F7B] font-normal">
                              {inputValues.pickUpDate}
                            </span>
                            <input
                              type="time"
                              className="border outline-none mt-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>
                          <MdDateRange />
                        </span>
                        <div className="flex flex-col gap-2 font-semibold">
                          <p>Drop-Off Date & Time</p>{" "}
                          <div className="">
                            <span className="text-[#706F7B] font-normal">
                              {inputValues.dropOffDate}
                            </span>
                            <input
                              type="time"
                              className="border outline-none mt-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>
                          <FaLocationDot />
                        </span>
                        <div className="flex flex-col gap-2 font-semibold">
                          <p>Pick-Up Location</p>{" "}
                          <p className="text-[#706F7B] font-normal">
                            {inputValues.pickUpCity}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span>
                          <FaLocationDot />
                        </span>
                        <div className="flex flex-col gap-2 font-semibold pb-8">
                          <p>Drop-Off Location</p>{" "}
                          <p className="text-[#706F7B] font-normal">
                            {inputValues.dropOffCity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------car details------------------------------------------------- */}
                  <div>
                    <div className="flex flex-col gap-2 lg:items-start items-center pt-8 lg:pt-0 ">
                      <h5 className="text-lg font-semibold text-[#FF4D30]">
                        <span className="text-black">Car - </span>
                        {inputValues.car}
                      </h5>
                      {CAR_DATA.map((carGroup, index) => (
                        <div key={index}>
                          {carGroup.map((car, carIndex) => {
                            if (car.name === inputValues.car) {
                              return (
                                <div
                                  key={carIndex}
                                  className="flex items-center justify-center pt-0 lg:pt-8 lg:pb-0 pb-8"
                                >
                                  <img
                                    className="w-[90%]"
                                    src={car.img}
                                    alt=""
                                  />
                                </div>
                              );
                            }
                            return null; // Ensure to return something in all cases within map
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-8 py-8">
                  <div className="flex flex-col items-center lg:items-start">
                    {/* ---------------------------------form--------------------------------- */}

                    <BookCarFrom />
                    <div className="py-10 flex items-center justify-center">
                      <button
                        type="submit"
                        onClick={handleClose1}
                        className="font-rubik text-xl w-full lg:text-2xl font-medium rounded py-3 px-[100px] bg-[#FF4D30] text-white shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out mb-8 lg:mb-0"
                      >
                        Reserve Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          )}
          {/* -------------------------------------form component-------------------------------------------------- */}
          <div className="justify-center flex-wrap items-center lg:flex lg:flex-row lg:justify-between lg:gap-6">
            <div>
              <Dropdown
                icon={<FaCarSide />}
                title=" Select Your Car Type"
                name="car"
                onChange={handleInputChange}
                value={inputValues.car}
                options={cars} // Pass the options array directly
              />
            </div>
            <div>
              <Dropdown
                icon={<FaLocationDot />}
                title="Pick up"
                name="pickUpCity"
                onChange={handleInputChange}
                value={inputValues.pickUpCity}
                options={pickUpCities} // Pass the options array directly
              />
            </div>
            <div className="">
              <Dropdown
                name="dropOffCity"
                icon={<FaLocationDot />}
                title="Drop off"
                onChange={handleInputChange}
                value={inputValues.dropOffCity}
                options={dropOffCities} // Pass the options array directly
              />
            </div>

            <div className="mb-2">
              <label className="flex text-lg items-center gap-4 font-bold mb-4">
                <span>
                  <MdDateRange />
                </span>
                <h4>
                  Pick up
                  <b className="text-[#FF4D30]">*</b>
                </h4>
              </label>

              <input
                type="date"
                placeholder="dd-mm-yyyy"
                min={new Date().toLocaleDateString()}
                max="2030-12-31"
                onChange={handleInputChange}
                name="pickUpDate"
                value={inputValues.pickUpDate}
                className="outline-none box-border w-full  cursor-pointer gap-0 lg:gap-[230px] bg-[#EFEFEF] border px-2 py-3 text-sm text-zinc-500"
              />
            </div>

            <div className="mb-2">
              <label className="flex text-lg items-center gap-4 font-bold mb-4">
                <span>
                  <MdDateRange />
                </span>
                <h4>
                  Drop off
                  <b className="text-[#FF4D30]">*</b>
                </h4>
              </label>

              <input
                type="date"
                placeholder="dd-mm-yyyy"
                onChange={handleInputChange}
                name="dropOffDate"
                value={inputValues.dropOffDate}
                className="outline-none box-border w-full cursor-pointer gap-0 lg:gap-[226px]  bg-[#EFEFEF] border py-3 px-2 text-sm text-zinc-500"
              />
            </div>

            <div className="flex justify-center items-center mt-8 ">
              <button
                type="submit"
                className="font-rubik text-lg font-medium rounded py-3  lg:px-[161px] w-full bg-[#FF4D30] text-white shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out mb-8 lg:mb-0"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
