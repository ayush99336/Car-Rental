import React from "react";

export default function TestimonialCard(props) {
  return (
    <div className="bg-white flex flex-col gap-10 shadow-lg p-12 w-full lg:max-w-[400px]">
      <div className="">
        <p className="text-xl font-medium overflow-hidden">{props.content}</p>{" "}
      </div>
      <div className="flex items-center">
        <img className="w-20 h-20 rounded-full" src={props.img} alt="" />
        <div className="flex flex-col flex-grow ml-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{props.name}</span>
              <span className="font-rubik">{props.city}</span>
            </div>
            <div className="text-[#FF4D30]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-quote"
              >
                {/* SVG paths */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
