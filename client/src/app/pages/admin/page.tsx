"use client";
import Link from "next/link";

export default function page() {
  return (
    <div className="mt-20">
      <h1 className="text-5xl text-white text-center">Admin Management</h1>
      <div className="flex justify-center items-center mt-15 gap-5">
        <Link href={"/pages/admin/movie_manage"}>
          <button className="bg-black border-2 border-white text-white p-3 rounded-xl text-xl">
            Movies Management
          </button>
        </Link>
        <Link href={"/pages/admin/order_manage"}>
          <button className="bg-black border-2 border-white text-white p-3 rounded-xl text-xl">
            Orders Management
          </button>
        </Link>
      </div>
    </div>
  );
}
