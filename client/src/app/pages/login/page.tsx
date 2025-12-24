"use client";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-15">
      <h1 className="text-white text-5xl">Login | เข้าสู่ระบบ</h1>
      <div className="border-2 border-white w-full max-w-md rounded-xl py-8 flex flex-col items-center">
        <form className="w-[85%] flex flex-col items-start gap-5">
          <p className="text-white">Email</p>
          <input
            type="text"
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            placeholder="กรอกอีเมล"
          />
          <p className="text-white">Password</p>
          <input
            type="password"
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            placeholder="กรอกรหัสผ่าน"
          />
          <button
            type="submit"
            className="bg-yellow-600 text-black font-bold py-3 rounded-md text-lg w-full mt-4"
          >
            Login
          </button>
        </form>

        <div className="flex gap-2 mt-6">
          <p className="text-white">Don't have an account?</p>
          <Link href="/pages/signup" className="text-sky-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
