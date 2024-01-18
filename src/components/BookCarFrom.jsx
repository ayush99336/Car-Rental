import React from "react";

export default function BookCarFrom() {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <h5 className="text-lg uppercase font-semibold text-[#FF4D30] pb-4">
        Personal Information
      </h5>
        <div className="flex gap-4 flex-wrap w-full items-center justify-center lg:justify-between">
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                First Name
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="text"
              placeholder="Enter your first name"
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                Last Name
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="text"
              placeholder="Enter your last name"
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                Contact Number
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="number"
              placeholder="Enter your contact no."
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                Age
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="number"
              placeholder="Enter your age"
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                Email
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="email"
              placeholder="Enter your email"
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                Adhaar Number
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="number"
              placeholder="Enter your adhaar no."
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                City
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="text"
              placeholder="Enter your city"
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:pb-4 pb-0">
            <label className="flex items-center gap-2 text-[#706F7B]">
              <h4>
                PIN Code
                <b className="text-[#FF4D30]">*</b>
              </h4>
            </label>
            <input
              required
              type="number"
              placeholder="Enter your Pin"
              className="border rounded px-4 py-2 bg-[#DBDBDB] outline-none"
            />
            <p className="text-[10px] text-[#706F7B]">
              This field is required.
            </p>
          </div>
        </div>
    </div>
  );
}
