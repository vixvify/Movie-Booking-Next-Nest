"use client";
import { useState, useEffect } from "react";
import { Movies } from "../../../../../types/movies";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const [data, setData] = useState<Movies[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/movies/getmovie_showing`
    );
    setData(res.data.movies);
    setIsLoading(false);
  };

  const formatDateMovie = (date?: string | Date | null) => {
    if (!date) return "-";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "-";

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
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
      <div className="flex flex-col justify-around items-center w-full mt-10">
        <div className="flex justify-center items-center text-white text-5xl font-bold gap-15">
          <h1>Now Showing</h1>
          <Link href={"/pages/movies/coming"}>
            <h1 className="opacity-20">Coming Soon</h1>
          </Link>
        </div>
        <div className="flex justify-center items-center flex-wrap w-[80%] gap-10 mt-20">
          {data?.map((e, index) => {
            return (
              <div className="" key={index}>
                <Link href={`/pages/booking/${e.id}`}>
                  <Image
                    src={e.imgUrl}
                    width={300}
                    height={400}
                    alt="poster"
                    className="rounded-xl"
                  ></Image>
                </Link>
                <h1 className="text-white mt-5 text-xl font-bold">{e.name}</h1>
                <h1 className="text-white mt-1 text-md font-bold">
                  {formatDateMovie(e.release)}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
