import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [jobs, setJobs] = useState([]);

  const [ShowRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const fetchData = () => {
    setJobs(jobsData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isSearched, setIsSearched] = useState(false);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    ShowRecruiterLogin,
    setShowRecruiterLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
