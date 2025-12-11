"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

export default function Comingsoon() {
  const allImages = [
    "/14.png",
    "/15.png",
    "/16.png",
    "/17.png",
    "/18.png",
    "/23.png",
    "/20.png",
    "/21.png",
    "/22.png",
  ];
  const [start, setStart] = useState(0);
  const controls = useAnimation();
  const WIDTH = 300 + 40;

  const getImages = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push(allImages[(start + i) % allImages.length]);
    }
    return result;
  };

  const slideNext = async () => {
    await controls.start({ x: -WIDTH, transition: { duration: 0.35 } });
    setStart((s) => (s + 1) % allImages.length);
    controls.set({ x: 0 });
  };

  const slidePrev = async () => {
    controls.set({ x: -WIDTH });
    setStart((s) => (s - 1 + allImages.length) % allImages.length);
    await controls.start({ x: 0, transition: { duration: 0.35 } });
  };

  return (
    <div className="flex justify-center items-center ml-auto mr-auto mt-10">
      <div className="flex flex-col justify-center items-start">
        <h1 className="font-bold text-white text-5xl">Coming Soon</h1>
        <div className="flex justify-center items-center gap-10 mt-10">
          <GrLinkPrevious
            className="w-10 h-10 text-white cursor-pointer"
            onClick={slidePrev}
          />
          <div className="overflow-hidden w-[80vw] h-[400px]">
            <motion.div animate={controls} className="flex gap-10">
              {getImages().map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  width={300}
                  height={400}
                  alt="poster"
                  className="rounded-lg shrink-0"
                />
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
