"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Header() {
  const header = ["/avatarheader.png", "/superheader.png", "/spiderheader.png"];

  return (
    <div className="flex justify-center items-center w-full">
      <Carousel className="w-[80%] mx-auto relative">
        <CarouselContent>
          {header.map((e, index) => (
            <CarouselItem key={index}>
              <Image
                src={e}
                width={1920}
                height={450}
                alt="poster"
                className="w-full"
              ></Image>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
