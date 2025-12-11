"use client";

import Header from "@/app/components/Header.component";
import Movie from "@/app/components/Movie.component";
import Comingsoon from "@/app/components/Comingsoon.component";

export default function Home() {
  return (
    <div className="pb-20">
      <Header />
      <Movie />
      <Comingsoon />
    </div>
  );
}
