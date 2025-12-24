"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Movies } from "../../../types/movies";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Movie() {
  const [data, setData] = useState<Movies[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="flex justify-center items-center ml-auto mr-auto">
        <div className="flex flex-col justify-center items-start w-[80%]">
          <h1 className="font-bold text-white text-5xl">Now Showing</h1>
          <div className="gap-10 mt-10">
            <Carousel>
              <CarouselContent className="flex items-center">
                {data.map((e, index) => (
                  <CarouselItem key={index} className="basis-1/5">
                    <Link href={`/pages/booking/${e.id}`}>
                      <Image
                        src={e.imgUrl}
                        width={300}
                        height={450}
                        alt="poster"
                        className="rounded-md"
                      ></Image>
                    </Link>
                    <h1 className="text-white mt-5 text-xl font-bold">
                      {e.name}
                    </h1>
                    <h1 className="text-white mt-1 text-md font-bold">
                      {formatDateMovie(e.release)}
                    </h1>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}
