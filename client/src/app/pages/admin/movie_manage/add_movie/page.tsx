"use client";

import axios from "axios";
import { useState } from "react";
import { Addmovie } from "../../../../../../types/addmovie";

export default function page() {
  const [data, setData] = useState<Addmovie>({
    name: "",
    description: "",
    duration: 0,
    release: "",
  });
  const { name, description, duration, release } = data;
  const [file, setFile] = useState<File | null>(null);

  const inputValue = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData({ ...data, [field]: e.target.value });
  };

  const addMovie = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("description", description);
      form.append("duration", String(duration));
      form.append("release", new Date(release).toISOString());
      form.append("poster", file!);
      await axios.post(`${process.env.NEXT_PUBLIC_API}/movies/addmovie`, form);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-15">
      <h1 className="text-white text-5xl text-center font-bold">Add Movie</h1>
      <div className="mt-10">
        <form className="flex flex-col gap-3" onSubmit={addMovie}>
          <p className="text-white">Name</p>
          <input
            type="text"
            placeholder="Enter Movie Name"
            className="border border-white w-[400px] h-10 text-white p-3"
            onChange={inputValue("name")}
          ></input>
          <p className="text-white">Description</p>
          <textarea
            placeholder="Enter Description"
            className="border border-white w-[400px] h-[70px] text-white p-3"
            onChange={inputValue("description")}
          ></textarea>
          <p className="text-white">Duration (Minutes)</p>
          <input
            type="number"
            placeholder="Enter Movie Duration"
            className="border border-white w-[400px] h-10 text-white p-3"
            onChange={inputValue("duration")}
          ></input>
          <p className="text-white">Release Date</p>
          <input
            type="date"
            placeholder="Enter Movie Release Date"
            className="border border-white w-[400px] h-10 text-white p-3"
            onChange={inputValue("release")}
          ></input>
          <p className="text-white">Poster</p>
          <input
            type="file"
            placeholder="Enter Movie Release Date"
            className="border border-white w-[400px] h-10 text-white p-3"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          ></input>
          <button className="bg-yellow-600 text-black font-bold p-5 pl-10 pr-10 rounded-xl text-xl mt-5">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
}
