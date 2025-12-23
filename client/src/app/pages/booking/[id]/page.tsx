"use client";
import Image from "next/image";
import { MdEventSeat } from "react-icons/md";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Movies } from "../../../../../types/movies";

export default function page() {
  const [seats, setseats] = useState<boolean[]>(new Array(200).fill(false));
  const [data, setData] = useState<Movies>();
  const [count_normal, setCount_normal] = useState<number>(0);
  const [count_premium, setCount_premium] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/movies/getmovie_single/${id}`
    );
    setData(res.data.movies);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-full pt-10 pb-10">
        <div className="flex justify-center items-center gap-20">
          <div>
            {imgLoading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={data?.imgUrl!}
              width={1000}
              height={1000}
              alt="poster"
              className="w-[200px] h-[270px]"
              onLoadingComplete={() => setImgLoading(false)}
            ></Image>
            <div className="mt-10 w-[300px] rounded-2xl bg-white/10 p-6 text-white backdrop-blur-md shadow-lg">
              <h2 className="mb-4 text-center text-2xl font-semibold tracking-wide">
                Booking Summary
              </h2>

              <div className="space-y-3 text-base">
                <div className="flex justify-between">
                  <span className="text-white/70">Movie</span>
                  <span className="font-medium">{data?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Showtime</span>
                  <select>
                    <option className="text-black">10.00</option>
                    <option className="text-black">12.00</option>
                    <option className="text-black">14.00</option>
                    <option className="text-black">16.00</option>
                    <option className="text-black">18.00</option>
                    <option className="text-black">20.00</option>
                  </select>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Total Seats</span>
                  <span className="font-medium">
                    {count_normal + count_premium}
                  </span>
                </div>

                <div className="border-t border-white/20 pt-3 flex justify-between text-lg">
                  <span className="font-semibold">Total Price</span>
                  <span className="font-bold text-green-400">
                    {count_normal * 200 + count_premium * 230}
                  </span>
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

              <p className="text-white tracking-[0.45em] text-sm -mt-8">
                SCREEN
              </p>
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
                        if (index < 100) {
                          const total = updated.filter(
                            (e, i) => i < 100 && e == true
                          );
                          setCount_normal(total.length);
                        } else {
                          const total = updated.filter(
                            (e, i) => i >= 100 && e == true
                          );
                          setCount_premium(total.length);
                        }
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
}
