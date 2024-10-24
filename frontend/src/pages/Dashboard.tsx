import React from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import Bounties from "./Bounties";
const { writeFile } = require("fs");
const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const path = require("path");
const homedir = require("os").homedir();
const reader = require('xlsx');
const { startLookupMap } = require("./maps/lookup_map");

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
