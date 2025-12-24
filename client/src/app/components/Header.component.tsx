"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function Header() {
  const header = ["/avatarheader.png", "/superheader.png", "/spiderheader.png"];
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
    })
  );

  return (
    <div className="flex justify-center items-center w-full">
      <Carousel
        className="w-[80%] mx-auto relative"
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {header.map((e, index) => (
            <CarouselItem key={index}>
              <Image
                src={e}
                width={1920}
                height={450}
                alt="poster"
                className="w-full rounded-xl"
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
