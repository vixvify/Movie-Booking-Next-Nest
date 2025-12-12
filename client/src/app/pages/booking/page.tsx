"use client";
import Image from "next/image";
import { MdEventSeat } from "react-icons/md";
import { useState } from "react";

export default function page() {
  const [seats, setseats] = useState(new Array(200).fill(false));
  return (
    <div className="flex flex-col justify-center items-center w-full pt-20">
      <div className="flex justify-center items-start gap-20">
        <div>
          <Image
            src={"/15.png"}
            width={1000}
            height={1000}
            alt="poster"
            className="w-[200px] h-[270px]"
          ></Image>
          <div className="text-white mt-10 text-xl">
            <h1>
              <b>Movie : </b> Tee yod 3
            </h1>
            <h1>
              <b>Showtime : </b> 19.00
            </h1>
            <h1>
              <b>Total seat : </b> 1
            </h1>
            <h1>
              <b>Price : </b> 200 baht
            </h1>
          </div>
        </div>
        <div className="w-[750px] flex flex-col gap-10">
          <div
            className="w-[90%] h-8 bg-gray-200 rounded-b-3xl shadow-lg ml-auto mr-auto
           transform perspective-700 -rotate-x-30 flex items-center justify-center text-gray-500 text-sm"
          >
            SCREEN
          </div>
          <div className="flex justify-center items-center flex-wrap gap-1 mt-5 w-full ml-auto mr-auto">
            {seats.map((e, index) => {
              return (
                <div className="" key={index}>
                  <MdEventSeat
                    color={`${
                      seats[index] ? "yellow" : index < 100 ? "red" : "purple"
                    }`}
                    className="w-8 h-8"
                    onClick={() => {
                      const updated = [...seats];
                      updated[index] = !updated[index];
                      setseats(updated);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 mt-10 ml-70">
        <div className="flex flex-col justify-center items-center border-2 border-white p-5 rounded-2xl bg-black">
          <MdEventSeat color="red" className="w-8 h-8" />
          <h1 className="text-white mt-3">Standard Seat</h1>
          <h1 className="text-white"> 200 baht</h1>
        </div>
        <div className="flex flex-col justify-center items-center border-2 border-white p-5 rounded-2xl bg-black">
          <MdEventSeat color="purple" className="w-8 h-8" />
          <h1 className="text-white mt-3">Premium Seat</h1>
          <h1 className="text-white"> 230 baht</h1>
        </div>
        <button className="bg-yellow-600 text-black font-bold p-5 pl-10 pr-10 rounded-xl text-xl ml-20">
          Continue
        </button>
      </div>
    </div>
  );
}
