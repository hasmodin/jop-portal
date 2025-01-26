import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Navbar for recruiter panel */}
      <div className="shadow py-4 ">
        <div className="px-5  flex justify-between items-center ">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-32 cursor-pointer gap-3 "
            src={assets.logo}
            alt=""
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome! GreatStack</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full "
                src={assets.company_icon}
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white border border-gray-200 rounded-lg">
                  <li className="cursor-pointer py-1 px-2 pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        {/* side bar for managing add-jobs, manage-jobs and view applicatons */}
        <div className="inline-block min-h-screen border-r-2 text-gray-800">
          <ul className="flex flex-col gap-3 p-5">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm-px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500 "
                }`
              }
              to="/dashboard/add-job"
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm-px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500 "
                }`
              }
              to="/dashboard/manage-job"
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm-px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500 "
                }`
              }
              to="/dashboard/view-applications"
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
