"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Orders } from "../../../../types/orders";

export default function page() {
  const [data, setData] = useState<Orders[]>([]);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/orders/getorders/${session?.user.id}`
      );
      setData(res.data.orders);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  } else {
    return (
      <div className=" text-white w-full flex flex-col justify-center items-center">
        <div className="w-[50%] mt-10">
          <h1 className="text-2xl font-bold mb-6">ประวัติการซื้อตั๋วหนัง</h1>
          <div className="flex flex-col gap-5">
            {data.map((e) => (
              <div
                key={e.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{e.movie.name}</h2>
                  <span
                    className={`text-sm ${
                      e.status === "PAID" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {e.status}
                  </span>
                </div>

                <div className="text-sm text-zinc-400 mt-2">
                  <p>
                    วันที่: {new Date(e.createdAt).toLocaleDateString("th-TH")}
                  </p>
                  <p>รอบฉาย: {e.showtime}</p>
                  <p>ที่นั่ง: {e.seats.join(", ")}</p>
                  <p>ราคารวม: {e.amount / 100} บาท</p>
                </div>
              </div>
            ))}

            {data.length === 0 && (
              <div className="text-center text-zinc-500">
                ยังไม่มีประวัติการซื้อตั๋ว
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
