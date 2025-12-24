"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Signup } from "../../../../types/signup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toast } from "@/app/alert/Alert";

export default function page() {
  const [data, setData] = useState<Signup>({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = data;
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const router = useRouter();

  const inputValue = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setData({ ...data, [field]: e.target.value });
  };

  const sendData = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/user/signup`, data);
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      router.push("/pages/login");
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Signed in failed",
      });
      console.log(err);
    }
  };

  useEffect(() => {
    const isFilled = name && email && password && confirmPass;
    const isMatch = password === confirmPass;
    if (isFilled && isMatch) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, email, password, confirmPass]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-15">
      <h1 className="text-white text-5xl">Sign up | สมัครบัญชี</h1>
      <div className="border-2 border-white w-full max-w-md rounded-xl py-8 flex flex-col items-center">
        <form
          className="w-[85%] flex flex-col items-start gap-3"
          onSubmit={sendData}
        >
          <p className="text-white">Name</p>
          <input
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            type="text"
            placeholder="กรอกชื่อ"
            onChange={inputValue("name")}
          />
          <p className="text-white">Email</p>
          <input
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            type="email"
            placeholder="กรอกอีเมล"
            onChange={inputValue("email")}
          />
          <p className="text-white">Password</p>
          <input
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            onChange={inputValue("password")}
          />
          <p className="text-white">Confirm Password</p>
          <input
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <button
            className="bg-yellow-600 text-black font-bold py-3 rounded-md text-lg w-full mt-4 disabled:opacity-20"
            disabled={!isValid}
          >
            Sign up
          </button>
        </form>
        <div className="flex gap-2 mt-6">
          <p className="text-white">Have any account?</p>
          <Link href="/pages/login" className="text-sky-300">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
