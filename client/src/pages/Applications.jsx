import React from "react";
import { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Applications() {
  const [isEdit, setEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <>
      <Navbar />
      <div className="container px-4 2xl:px-20 mx-auto my-10">
        <h2 className="text-2xl font-semibold">Your Resume</h2>
        <div className="flex gap-4 mt-4">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  Select Resume
                </p>
                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={(e) => setEdit(false)}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2 "
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href=""
              >
                Resume
              </a>
              <button
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4 mt-4">Applied Jobs</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left ">Company</th>
              <th className="py-3 px-4 border-b text-left ">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b text-left ">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="py-3 px-4 border-b flex items-center gap-2">
                    <img className="h-8 w-8" src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.title}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-gray-100"
                      } border px-4 py-2 rounded-lg`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
