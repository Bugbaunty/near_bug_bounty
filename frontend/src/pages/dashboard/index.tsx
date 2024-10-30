import React from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import Bounties from "@/pages/bounties/index";
import { useGetAllBounties } from "@/functions";

const Dashboard = () => {
  const { getBounties } = useGetAllBounties();

  React.useEffect(() => {
    getBounties();
  }, []);

  return (
    <div className="flex bg-n-8/90">
      <Header />
      <Sidebar />
      <Bounties />
    </div>
  );
};

export default Dashboard;
