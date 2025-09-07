import React from "react";
import Navbar from "./Navbar";

function UserDashboard() {
  return (
    <div className="bg-[#F1F8E9] min-h-screen">
      <Navbar />
      {/* Add padding-top to prevent content from hiding behind navbar */}
      <div className="pt-[100px]">{/* Future dashboard content */}</div>
    </div>
  );
}

export default UserDashboard;
