import React, { useState } from "react";
import bg from "../assets/faq/car.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQ() {
  const quesAndAns = [
    {
      key: 1,
      q: "1. What is special about comparing rental car deals?",
      a: "Comparing rental car deals is important as it helps find the best deal that fits your budget and requirements, ensuring you get the most value for your money. By comparing various options, you can find deals that offer lower prices, additional services, or better car models. You can find car rental deals by researching online and comparing prices from different rental companies.",
    },
    {
      key: 2,
      q: "2. How do I find the car rental deals?",
      a: "You can find car rental deals by researching online and comparing prices from different rental companies. Websites such as Expedia, Kayak, and Travelocity allow you to compare prices and view available rental options. It is also recommended to sign up for email newsletters and follow rental car companies on social media to be informed of any special deals or promotions.",
    },
    {
      key: 3,
      q: "3. How do I find such low rental car prices?",
      a: "Book in advance: Booking your rental car ahead of time can often result in lower prices. Compare prices from multiple companies: Use websites like Kayak, Expedia, or Travelocity to compare prices from multiple rental car companies. Look for discount codes and coupons: Search for discount codes and coupons that you can use to lower the rental price. Renting from an off-airport location can sometimes result in lower prices.",
    },
  ];
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div
      className="bg-no-repeat lg:bg-left bg-left-bottom w-full h-full"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col justify-center items-center py-36 lg:gap-16 px-4 lg:px-40 lg:py-20">
        <div className="flex flex-col gap-2 justify-center items-center text-center lg:py-0 pb-10">
          <h3 className="text-2xl font-medium font-rubik">FAQ</h3>
          <h2 className="text-[2.7rem] font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-[#706F7B] font-rubik px-10 lg:px-40 text-center">
            Frequently Asked Questions About the Car Rental Booking Process on
            Our Website: Answers to Common Concerns and Inquiries.
          </p>
        </div>
        <div className="flex flex-col border shadow-lg items-start mx-10 lg:mx-20 bg-white">
          {quesAndAns.map((qa, index) => (
            <div key={qa.key} className="flex flex-col cursor-pointer">
              <div
                className={`flex items-center justify-between px-10 py-4 ${
                  expandedIndex === index
                    ? "bg-[#FF4D30] text-white shadow-custom-hovered "
                    : ""
                }`}
                onClick={() => toggleExpand(index)} // Toggle on click
                style={{
                  transition: "background-color 0.3s ease-in-out",
                  backgroundColor:
                    expandedIndex === index ? "#FF4D30" : "white",
                }}
              >
                <h4 className="text-lg font-medium">{qa.q}</h4>
                {expandedIndex === index ? (
                  // Show up arrow if expanded
                  <FaChevronUp />
                ) : (
                  // Show down arrow if not expanded
                  <FaChevronDown />
                )}
              </div>
              {/* Expanded answer content */}
              <div
                className={`transition-max-height overflow-hidden ${
                  expandedIndex === index
                    ? "max-h-[500px] transition-all ease-in-out duration-700 translate-y-3"
                    : "h=0 max-h-0 transition-all ease-in-out duration-500 "
                }`}
              >
                <div className="px-10">
                  <p className="text-[1rem] px-4 py-4 font-rubik text-[#706F7B]">
                    {qa.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
