"use client";
import Image from "next/image";
import { MdEventSeat } from "react-icons/md";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Movies } from "../../../../../types/movies";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Booking } from "../../../../../types/booking";

type QRResponse = {
  chargeId: string;
  qrImage: string;
  expiresAt: string;
};

export default function page() {
  const [seats, setseats] = useState<string[]>(new Array(200).fill("avail"));
  const [seatsNo, setSeatsNo] = useState<number[]>([]);
  const [data, setData] = useState<Movies>();
  const [count_normal, setCount_normal] = useState<number>(0);
  const [count_premium, setCount_premium] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const { id } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  const [qrCode, setQr] = useState<QRResponse | null>(null);
  const [showtime, setShowtime] = useState("");
  const [now, setNow] = useState(Date.now());
  const showtimes = ["10:00", "13:00", "16:00", "19:00"];

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/movies/getmovie_single/${id}`
    );
    setData(res.data.movies);
    setIsLoading(false);
  };

  const getMovieSeat = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/orders/getOrder/${id}`
    );
    const data = res.data.orders;
    const bookedSeat = data
      .filter((e: any) => e.showtime === showtime)
      .map((e: any) => e.seats);
    const newArr = [...seats];
    bookedSeat.map((order: any) => {
      order.map((e: number) => {
        newArr[e] = "booked";
      });
    });
    setseats(newArr);
  };

  const getQrcode = async () => {
    try {
      const data: Booking = {
        amount: (count_normal * 200 + count_premium * 230) * 100,
        seats: seatsNo,
        showtime: showtime,
        userId: session?.user.id as string,
        movieId: id as string,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/payment/promptpay`,
        data
      );
      setQr(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isPastTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);

    const showtimeDate = new Date();
    showtimeDate.setHours(hour, minute, 0, 0);

    return showtimeDate.getTime() <= Date.now();
  };

  const getRemainingTime = (expiresAt: string, now: number) => {
    const diff = new Date(expiresAt).getTime() - now;

    if (diff <= 0) return "หมดอายุแล้ว";

    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getMovieSeat();
  }, [showtime]);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/pages/login");
    }
  }, [status]);

  useEffect(() => {
    if (!qrCode?.expiresAt) return;

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [qrCode?.expiresAt]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-full pt-10 pb-10">
        <div className="flex justify-center items-center gap-20">
          <div>
            {imgLoading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={data?.imgUrl!}
              width={1000}
              height={1000}
              alt="poster"
              className="w-[200px] h-[270px]"
              onLoadingComplete={() => setImgLoading(false)}
            ></Image>
            <div className="mt-10 w-[300px] rounded-2xl bg-white/10 p-6 text-white backdrop-blur-md shadow-lg">
              <h2 className="mb-4 text-center text-2xl font-semibold tracking-wide">
                Booking Summary
              </h2>

              <div className="space-y-3 text-base">
                <div className="flex justify-between">
                  <span className="text-white/70">Movie</span>
                  <span className="font-medium">{data?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Showtime</span>
                  <select
                    value={showtime}
                    onChange={(e) => setShowtime(e.target.value)}
                    className="text-right"
                  >
                    <option className="text-black" hidden value={""}>
                      Select Showtime
                    </option>
                    {showtimes.map((time) => (
                      <option
                        key={time}
                        value={time}
                        disabled={isPastTime(time)}
                        className="text-black disabled:text-gray-600"
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Total Seats</span>
                  <span className="font-medium">
                    {count_normal + count_premium}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Seats Number</span>
                  <span className="font-medium w-[40%] flex justify-end">
                    {seatsNo.toString()}
                  </span>
                </div>

                <div className="border-t border-white/20 pt-3 flex justify-between text-lg">
                  <span className="font-semibold">Total Price</span>
                  <span className="font-bold text-green-400">
                    {count_normal * 200 + count_premium * 230}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[750px] flex flex-col gap-10">
            <div className="flex flex-col items-center">
              <svg
                className="w-[750px] h-[140px]"
                viewBox="0 0 750 140"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 30 120 Q 375 25 720 120"
                  stroke="white"
                  strokeWidth="7"
                  fill="none"
                  className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                />
              </svg>

              <p className="text-white tracking-[0.45em] text-sm -mt-8">
                SCREEN
              </p>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-1 mt-5 w-full ml-auto mr-auto">
              {seats.map((e, index) => {
                const isBooked = seats[index] === "booked";
                const canSelect = showtime !== "";
                return (
                  <div className="" key={index}>
                    <MdEventSeat
                      color={`${
                        isBooked || !canSelect
                          ? "grey"
                          : seats[index] === "unavail"
                          ? "yellow"
                          : index < 100
                          ? "red"
                          : "purple"
                      }`}
                      className="w-6 h-6"
                      onClick={() => {
                        if (isBooked || !canSelect) return;
                        const updated = [...seats];
                        updated[index] === "avail"
                          ? (updated[index] = "unavail")
                          : (updated[index] = "avail");
                        setseats(updated);

                        const seatno = updated.reduce((acc, e, i) => {
                          if (e === "unavail") acc.push(i);
                          return acc;
                        }, [] as number[]);

                        setSeatsNo(seatno);

                        const normal = updated.filter(
                          (e, i) => i < 100 && e === "unavail"
                        ).length;
                        const premium = updated.filter(
                          (e, i) => i >= 100 && e === "unavail"
                        ).length;

                        setCount_normal(normal);
                        setCount_premium(premium);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center gap-5 mt-10">
              <div className="flex flex-col justify-center items-center border-2 border-white p-5 rounded-2xl bg-black w-[150px]">
                <MdEventSeat color="red" className="w-8 h-8" />
                <h1 className="text-white mt-3">Standard Seat</h1>
                <h1 className="text-white"> 200 baht</h1>
              </div>
              <div className="flex flex-col justify-center items-center border-2 border-white p-5 rounded-2xl bg-black w-[150px]">
                <MdEventSeat color="purple" className="w-8 h-8" />
                <h1 className="text-white mt-3">Premium Seat</h1>
                <h1 className="text-white"> 230 baht</h1>
              </div>
              <button
                className="bg-yellow-600 text-black font-bold p-5 pl-10 pr-10 rounded-xl text-xl ml-20 hover:bg-yellow-400 disabled:opacity-20"
                onClick={() => setOpenModal(true)}
                disabled={count_normal + count_premium === 0 || showtime === ""}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpenModal(false)}
            />
            <div className="relative z-10 w-[400px] rounded-2xl bg-zinc-900 p-6 text-white shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-center">
                Confirm Payment
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Movie</span>
                  <span>{data?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Seats</span>
                  <span>{seatsNo}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-green-400 font-bold">
                    {count_normal * 200 + count_premium * 230} บาท
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="flex-1 rounded-xl border border-white/30 py-2 hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  className="flex-1 rounded-xl bg-yellow-500 py-2 font-bold text-black hover:bg-yellow-400"
                  onClick={() => {
                    setOpenModal(false);
                    setOpenQr(true);
                    getQrcode();
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
        {openQr && !qrCode && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 rounded-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              <p className="text-sm text-white/80">Processing</p>
            </div>
          </div>
        )}

        {openQr && qrCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative z-10 w-[400px] rounded-2xl bg-zinc-900 p-6 text-white shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>

              <div className="space-y-3 text-sm">
                <img
                  src={qrCode.qrImage}
                  width={400}
                  height={400}
                  alt="qr"
                ></img>
                {qrCode && (
                  <h1 className="text-white">
                    Qr code จะหมดอายุใน{" "}
                    {getRemainingTime(qrCode.expiresAt, now)}
                  </h1>
                )}

                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-green-400 font-bold">
                    {count_normal * 200 + count_premium * 230} บาท
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setOpenQr(false)}
                  className="flex-1 rounded-xl border border-white/30 py-2 hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  className="flex-1 rounded-xl bg-yellow-500 py-2 font-bold text-black hover:bg-yellow-400"
                  onClick={() => setOpenQr(false)}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
