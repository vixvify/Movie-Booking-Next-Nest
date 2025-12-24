"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Login } from "../../../../types/login";
import { useRouter } from "next/navigation";
import { Toast } from "@/app/alert/Alert";
import { signIn } from "next-auth/react";

export default function page() {
  const [data, setData] = useState<Login>({
    email: "",
    password: "",
  });
  const { email, password } = data;
  const [isValid, setIsValid] = useState<boolean>(false);
  const router = useRouter();

  const inputValue = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setData({ ...data, [field]: e.target.value });
  };

  const sendData = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.ok && !res.error) {
      Toast.fire({
        icon: "success",
        title: "Login in successfully",
      });
      router.push("/");
    } else {
      Toast.fire({
        icon: "error",
        title: "Login failed",
      });
    }
  };

  useEffect(() => {
    const isFilled = email && password;
    if (isFilled) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-15">
      <h1 className="text-white text-5xl">Login | เข้าสู่ระบบ</h1>
      <div className="border-2 border-white w-full max-w-md rounded-xl py-8 flex flex-col items-center">
        <form
          className="w-[85%] flex flex-col items-start gap-5"
          onSubmit={sendData}
        >
          <p className="text-white">Email</p>
          <input
            type="text"
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            placeholder="กรอกอีเมล"
            onChange={inputValue("email")}
          />
          <p className="text-white">Password</p>
          <input
            type="password"
            className="border-2 border-white w-full h-10 p-3 text-white rounded-md"
            placeholder="กรอกรหัสผ่าน"
            onChange={inputValue("password")}
          />
          <button
            type="submit"
            className="bg-yellow-600 text-black font-bold py-3 rounded-md text-lg w-full mt-4 disabled:opacity-20"
            disabled={!isValid}
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
