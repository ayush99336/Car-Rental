import React from "react";
import FeatureCard from "./FeatureCard";
import icon1 from "../assets/plan/icon1.png";
import icon2 from "../assets/plan/icon2.png";
import icon3 from "../assets/plan/icon3.png";

export default function Feature() {
  return (
    <div className="flex flex-col justify-center items-center py-20 lg:gap-6 px-8 lg:px-40 lg:py-16 ">
      <p className="text-2xl font-semibold">Plan your trip now</p>
      <h2 className="text-[2.7rem] font-bold text-center">
        Quick & easy car rental
      </h2>
      <div className="flex flex-col lg:flex-row gap:10  mt-6">
        {" "}
        <FeatureCard
          imageUrl={icon1}
          title="Select car"
          content="We offers a big range of vehicles for all your driving needs. We have the perfect car to meet your needs"
        />
        <FeatureCard
          imageUrl={icon2}
          title="Contact Operator"
          content="Our knowledgeable and friendly operators are always ready to help with any questions or concerns"
        />
        <FeatureCard
          imageUrl={icon3}
          title="Let's Drive"
          content="Whether you're hitting the open road, we've got you covered with our wide range of cars"
        />
      </div>
    </div>
  );
}
