import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ApplyJob from "./pages/ApplyJob.jsx";
import Applications from "./pages/Applications.jsx";
import RecruiterLogin from "./components/RecruiterLogin.jsx";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard.jsx";
import AddJob from "./pages/AddJob.jsx";
import ManageJob from "./pages/ManageJob.jsx";
import ViewApplications from "./pages/ViewApplications.jsx";
import "quill/dist/quill.snow.css";

function App() {
  const { ShowRecruiterLogin } = useContext(AppContext);

  return (
    <>
      {ShowRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        //Nested routes for dashboard
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJob />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </>
  );
}
export { App };
