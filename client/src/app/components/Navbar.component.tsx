"use client";

export default function Navbar() {
  return (
    <div>
      <nav>
        <ul className="fixed flex justify-center items-center gap-10 right-0 pr-20 pt-5 text-white text-xl z-999">
          <li>Home</li>
          <li>Movies</li>
          <li>Tickets</li>
          <li>Login</li>
          <li>Signup</li>
        </ul>
      </nav>
    </div>
  );
}
