"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

const confirmLogout = async () => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!",
  }).then((result) => {
    if (result.isConfirmed) {
      signOut();
    }
  });
};

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div>
      <nav className="flex justify-end items-center fixed right-0 top-0 pr-50 h-20 w-full z-999">
        <ul className="flex justify-center items-center gap-10 text-white text-xl">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <li>Movies</li>
          {session?.user && <li>Tickets</li>}
          {!session?.user && (
            <Link href={"/pages/login"}>
              <li>Login</li>
            </Link>
          )}
          {!session?.user && (
            <Link href={"/pages/signup"}>
              <li>Sign up</li>
            </Link>
          )}
          {session?.user && (
            <li className="cursor-pointer" onClick={confirmLogout}>
              Logout
            </li>
          )}
          {session?.user.isAdmin && (
            <Link href={"/pages/admin"}>
              <li>Admin</li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
