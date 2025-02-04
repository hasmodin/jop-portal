import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

export default function ManageJob() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-job", {
        headers: {
          token: companyToken,
        },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-gray-500">
                <td className="py-2 px-4 text-left border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 text-left border-b">{job.title}</td>
                <td className="py-2 px-4 text-left border-b max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 text-left border-b max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 text-left border-b">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b">
                  <input className="scale-125 ml-4" type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="py-2 px-4 bg-black opacity-80 hover:opacity-100 rounded text-white mt-2   "
        >
          Add New Job
        </button>
      </div>
    </div>
  );
}
