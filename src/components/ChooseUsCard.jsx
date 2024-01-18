import React from "react";

export default function ChooseUsCard(props) {
  return (
    <div className="flex lg:flex-row flex-col gap-4 items-center lg:items-start">
      <img className="w-24 lg:w-auto " src={props.imageUrl} alt=""/>
      <div className="flex justify-center items-center lg:items-start flex-col">
        <h4 className="text-2xl font-bold mb-2">{props.title}</h4>
        <p className="text-zinc-500 lg:text-left px-10 lg:px-0 text-center  lg:pr-10 font-rubik">
          {props.content}
        </p>
      </div>
    </div>
  );
}
    