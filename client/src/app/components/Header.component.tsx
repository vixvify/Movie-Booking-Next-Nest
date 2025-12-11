"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

export default function Header() {
  const header = ["/avatarheader.png", "/superheader.png", "/spiderheader.png"];
  const [start, setStart] = useState(0);
  const controls = useAnimation();
  const WIDTH2 = 1920;

  const getImages = () => {
    const result = [];
    for (let i = 0; i < 2; i++) {
      result.push(header[(start + i) % header.length]);
    }
    return result;
  };

  const slideNext = async () => {
    await controls.start({ x: -WIDTH2, transition: { duration: 0.35 } });
    setStart((s) => (s + 1) % header.length);
    controls.set({ x: 0 });
  };

  const slidePrev = async () => {
    controls.set({ x: -WIDTH2 });
    setStart((s) => (s - 1 + header.length) % header.length);
    await controls.start({ x: 0, transition: { duration: 0.35 } });
  };
  useEffect(() => {
    const auto = setInterval(() => {
      slideNext();
    }, 4000);

    return () => clearInterval(auto);
  }, [start]);

  return (
    <div className="flex justify-center items-center">
      <GrLinkPrevious
        className="w-10 h-10 text-white cursor-pointer absolute z-999 left-20"
        onClick={slidePrev}
      />
      <div className="w-full h-[700px] overflow-hidden">
        <motion.div animate={controls} className="flex gap-10">
          {getImages().map((src, i) => (
            <Image
              src={src}
              width={10000}
              height={10000}
              alt="poster"
              key={i}
              className="w-screen h-full object-cover object-[center_10%]"
            ></Image>
          ))}
        </motion.div>
      </div>
      <GrLinkNext
        className="w-10 h-10 text-white cursor-pointer absolute z-999 right-20"
        onClick={slideNext}
      />
    </div>
  );
}
