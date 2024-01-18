import React from "react";
import bgAbout from "../assets/hero/heroes-bg.png";
import FooterBanner from "../components/FooterBanner.jsx";
import img1 from "../assets/team/1.png";
import img2 from "../assets/team/2.png";
import img3 from "../assets/team/3.png";
import img4 from "../assets/team/4.png";
import img5 from "../assets/team/5.png";
import img6 from "../assets/team/6.png";

export default function OurTeam() {
  const teams = [
    { key: 1, img: img1, name: "Luke Miller", role: "Salesman" },
    { key: 2, img: img2, name: "Michael Diaz", role: "Business Owner" },
    { key: 3, img: img3, name: "Briana Ross", role: "Photographer" },
    { key: 4, img: img4, name: "Lauren Rivera", role: "Car Detailist" },
    { key: 5, img: img5, name: "Martin Rizz", role: "Mechanic" },
    { key: 6, img: img6, name: "Caitlyn Hunt", role: "Manager" },
  ];
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
        {teams.map((team) => {
          return (
            <div
              key={team.key}
              className=" flex flex-col w-[300px] justify-center items-center text-center bg-[#f8f8f8] rounded-xl shadow-xl hover:-translate-y-3 ease-in-out duration-200 transition-all"
            >
              <img src={team.img} alt="" />
              <div className="py-6 flex flex-col gap-2">
                <h4 className="text-xl font-semibold">{team.name}</h4>
                <h5>{team.role}</h5>
              </div>
            </div>
          );
        })}
      </div>
      <FooterBanner />
    </div>
  );
}
