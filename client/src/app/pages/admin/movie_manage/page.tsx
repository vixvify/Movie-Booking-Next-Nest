"use client";

import Link from "next/link";

export default function page() {
  return (
    <div className="mt-20 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-10">
        <h1 className="text-center text-white text-5xl">Movie Management</h1>
        <Link href={"/pages/admin/movie_manage/add_movie"}>
          <button className="bg-black border-2 border-white text-white p-3 rounded-xl text-xl">
            Add Movie
          </button>
        </Link>
      </div>
      <div className=""></div>
    </div>
  );
}
