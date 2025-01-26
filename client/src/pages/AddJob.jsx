import React, { useRef, useState, useEffect } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";

export default function AddJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [loaction, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Porgramming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something awesome...",
      });
    }
  }, []);

  return (
    <form
      action=""
      className="container w-full flex flex-col gap-4 p-4 items-start"
    >
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setJobTitle(e.target.value)}
          vlaue={jobTitle}
          required
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded-lg"
        />
      </div>
      <div className="w-full">
        <p className="my-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="flex flex-col gap-2">
          <p>Job Category</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p>Job Location</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p>Job Level</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option vlaue="Beginner level">Beginner level</option>
            <option vlaue="Intermediate level">Intermediate level</option>
            <option vlaue="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <p>Salary</p>
        <input
          type="number"
          min={0}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="25000"
          value={salary}
          required
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded-lg sm:w-1/4"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg opacity-80 hover:opacity-100"
      >
        ADD
      </button>
    </form>
  );
}
