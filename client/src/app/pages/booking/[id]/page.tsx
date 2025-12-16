"use client";
import Image from "next/image";
import { MdEventSeat } from "react-icons/md";
import { useState } from "react";

export default function page() {
  const [seats, setseats] = useState(new Array(200).fill(false));
  return (
    <div className="flex flex-col justify-center items-center w-full pt-10 pb-10">
      <div className="flex justify-center items-center gap-20">
        <div>
          <Image
            src={"/15.png"}
            width={1000}
            height={1000}
            alt="poster"
            className="w-[200px] h-[270px]"
          ></Image>
          <div className="mt-10 w-[300px] rounded-2xl bg-white/10 p-6 text-white backdrop-blur-md shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-semibold tracking-wide">
              Booking Summary
            </h2>

            <div className="space-y-3 text-base">
              <div className="flex justify-between">
                <span className="text-white/70">Movie</span>
                <span className="font-medium">Tee Yod 3</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/70">Showtime</span>
                <span className="font-medium">19.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/70">Total Seats</span>
                <span className="font-medium">1</span>
              </div>

              <div className="border-t border-white/20 pt-3 flex justify-between text-lg">
                <span className="font-semibold">Total Price</span>
                <span className="font-bold text-green-400">200 ฿</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[750px] flex flex-col gap-10">
          <div className="flex flex-col items-center">
            <svg
              className="w-[750px] h-[140px]"
              viewBox="0 0 750 140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 30 120 Q 375 25 720 120"
                stroke="white"
                strokeWidth="7"
                fill="none"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </svg>

            <p className="text-white tracking-[0.45em] text-sm -mt-8">SCREEN</p>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-1 mt-5 w-full ml-auto mr-auto">
            {seats.map((e, index) => {
              return (
                <div className="" key={index}>
                  <MdEventSeat
                    color={`${
                      seats[index] ? "yellow" : index < 100 ? "red" : "purple"
                    }`}
                    className="w-6 h-6"
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
          <div className="flex justify-center items-center gap-5 mt-10">
            <div className="flex flex-col justify-center items-center border-2 border-white p-5 rounded-2xl bg-black w-[150px]">
              <MdEventSeat color="red" className="w-8 h-8" />
              <h1 className="text-white mt-3">Standard Seat</h1>
              <h1 className="text-white"> 200 baht</h1>
            </div>
            <div className="flex flex-col justify-center items-center border-2 border-white p-5 rounded-2xl bg-black w-[150px]">
              <MdEventSeat color="purple" className="w-8 h-8" />
              <h1 className="text-white mt-3">Premium Seat</h1>
              <h1 className="text-white"> 230 baht</h1>
            </div>
            <button className="bg-yellow-600 text-black font-bold p-5 pl-10 pr-10 rounded-xl text-xl ml-20">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
