"use client";

import { useEffect, useState } from "react";

export default function Success() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get token from cookies
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const zohoToken = getCookie("zoho_grant_token");
    setToken(zohoToken || "");
  }, []);

  if (!token) {
    return <div className="p-8 text-center">No authorization token found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Success! Authorization Completed
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Your Authorization Token:
        </h2>
        <code className="bg-gray-200 p-2 rounded block break-all">{token}</code>
      </div>
    </div>
  );
}
