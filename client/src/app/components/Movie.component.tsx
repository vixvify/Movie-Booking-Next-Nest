"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import axios from "axios";
import { Movies } from "../../../types/movies";
import Link from "next/link";

export default function Movie() {
  const [data, setData] = useState<Movies[]>([]);
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();
  const WIDTH = 300 + 40;

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/movies/getmovie_showing`
    );
    setData(res.data.movies);
    setIsLoading(false);
  };

  const getImages = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push(data[(start + i) % data.length]);
    }
    return result;
  };

  const slideNext = async () => {
    await controls.start({ x: -WIDTH, transition: { duration: 0.35 } });
    setStart((s) => (s + 1) % data.length);
    controls.set({ x: 0 });
  };

  const slidePrev = async () => {
    controls.set({ x: -WIDTH });
    setStart((s) => (s - 1 + data.length) % data.length);
    await controls.start({ x: 0, transition: { duration: 0.35 } });
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
      <div className="flex justify-center items-center ml-auto mr-auto mt-10">
        <div className="flex flex-col justify-center items-start">
          <h1 className="font-bold text-white text-5xl">Now Showing</h1>
          <div className="flex justify-center items-center gap-10 mt-10">
            <GrLinkPrevious
              className="w-10 h-10 text-white cursor-pointer"
              onClick={slidePrev}
            />
            <div className="overflow-hidden w-[80vw] h-[500px]">
              <motion.div animate={controls} className="flex gap-10">
                {getImages().map((e, i) => (
                  <Link href={`/pages/booking/${e?.id}`} key={i}>
                    <div
                      key={i}
                      className="w-[300px] shrink-0 flex flex-col items-start gap-2"
                    >
                      <Image
                        src={e?.imgUrl}
                        width={300}
                        height={400}
                        alt="poster"
                        className="rounded-lg"
                      />
                      <h1 className="text-white text-center text-xl font-bold mt-3">
                        {e?.name}
                      </h1>
                      <h3 className="text-white text-center text-sm font-bold ">
                        {formatDateMovie(e?.release)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
            <GrLinkNext
              className="w-10 h-10 text-white cursor-pointer"
              onClick={slideNext}
            />
          </div>
        </div>
      </div>
    );
  }
}
