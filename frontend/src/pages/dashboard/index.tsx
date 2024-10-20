import React from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import Bounties from "@/pages/bounties/index";

const Dashboard = () => {
  return (
    <div className="flex ">
      <Header />
      <Sidebar />
      <Bounties />
    </div>
  );
};

export default Dashboard;
