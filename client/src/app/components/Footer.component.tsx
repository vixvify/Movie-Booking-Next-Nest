"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-700 border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Movie Booking. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-black transition">
            Home
          </a>
          <a href="#" className="hover:text-black transition">
            Movies
          </a>
          <a href="#" className="hover:text-black transition">
            Tickets
          </a>
        </div>
      </div>
    </footer>
  );
}
