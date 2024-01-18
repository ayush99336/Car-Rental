import React from "react";
import bgAbout from "../assets/hero/heroes-bg.png";
import FooterBanner from "../components/FooterBanner.jsx";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import bgContact from "../assets/banners/bg-contact.png";
import { SiMinutemailer } from "react-icons/si";

export default function Contact() {
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
            <h2 className="text-3xl font-bold">Contact</h2>
            <h3 className="text-lg font-semibold">Home/Contact</h3>
          </div>
        </div>
      </div>
      <div
        className="flex lg:flex-row flex-col flex-wrap gap-10 items-start justify-between px-8 lg:px-36 py-20 text-black bg-no-repeat bg-center bg-fixed"
        style={{
          backgroundImage: `url(${bgContact})`,
        }}
      >
        <div className="lg:w-[50%] w-full  flex flex-col gap-10 lg:text-left text-center">
          <h3 className="text-[2.7rem] font-bold">
            Need additional information?
          </h3>
          <p className="text-[#706F7B] font-rubik text-center lg:text-left pr:0 lg:pr-52">
            A multifaceted professional skilled in multiple fields of research,
            development as well as a learning specialist. Over 15 years of
            experience.
          </p>
          <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
            <a
              href="/"
              className="flex items-center gap-2 hover:text-[#FF4D30]"
            >
              <FaPhoneAlt /> <p>+91-9463836278</p>
            </a>
            <a
              href="/"
              className="flex items-center gap-2 hover:text-[#FF4D30]"
            >
              <MdEmail />
              <p>contact@carrental.com</p>
            </a>
          </div>
        </div>
        <div className="lg:w-[40%] w-full">
          <form className="flex flex-col gap-4" action="">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold" htmlFor="">
                Full Name
              </label>
              <input
                className="border rounded px-20 py-2 bg-[#f2f2f2] outline-none"
                type="text"
                placeholder='E.g. "Joe Biden"'
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold" htmlFor="">
                Email
              </label>
              <input
                className="border rounded px-20 py-2 bg-[#f2f2f2] outline-none"
                type="text"
                placeholder="yourmail@exmaple.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold" htmlFor="">
                Tell us about it
              </label>
              <textarea
                className="rounded border bg-[#f2f2f2] px-10 py-2 outline-none"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Write here"
              ></textarea>
              <button
                type="submit"
                className="font-rubik text-lg font-medium rounded py-3 px-[16px] mt-2 bg-[#FF4D30] text-white shadow-custom hover:shadow-custom-hovered transition-all duration-300 ease-in-out mb-8 lg:mb-0 flex flex-row gap-4 items-center justify-center"
              >
                <span>
                  <SiMinutemailer />
                </span>
                <p>Send Message</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterBanner />
    </div>
  );
}
