import React from "react";

import Hero from "../components/Hero";
import JobLists from "../components/JobLists";
import AppDownload from "../components/AppDownload";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobLists />
      <AppDownload />
      <Footer />
    </div>
  );
}
