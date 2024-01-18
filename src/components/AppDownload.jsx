import React from 'react'
import android from "../assets/download/googleapp.svg"
import apple from "../assets/download/appstore.svg"
import bg from "../assets/banners/bg02.png"

export default function AppDownload() {
  return (
    <div
      className="bg-[#f8f8f8] px-8 lg:px-20 py-28 mt-20 lg:mt-0"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="lg:w-[50%] w-full flex flex-col gap-8 leading-11 justify-center items-center text-center lg:items-start lg:text-left">
        <h2 className="text-[2.7rem] font-bold">
          Download our app to get most out of it
        </h2>
        <p className="text-[#706F7B] font-rubik lg:pr-20 pr-0">
          Thrown shy denote ten ladies though ask saw. Or by to he going think
          order event music. Incommode so intention defective at convinced. Led
          income months itself and houses you.
        </p>
        <div className="flex lg:flex-row flex-col gap-4">
          <img className="w-48" src={android} alt="adroid-download" />
          <img className="w-48" src={apple} alt="apple download" />
        </div>
      </div>
    </div>
  );
}
