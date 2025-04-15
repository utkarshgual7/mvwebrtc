"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const [code, setCode] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      // Set the code in cookies
      document.cookie = `zoho_auth_code=${authCode}; path=/; max-age=3600`;
      setCode(authCode);
    }
  }, [searchParams]);

  if (!code) {
    return <div className="p-8 text-center">No authorization code found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Success! Authorization Completed
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Your Authorization Code:</h2>
        <code className="bg-gray-200 p-2 rounded block break-all">{code}</code>
      </div>
      <p className="mt-4 text-gray-600">
        This code has been saved and will be used for API authentication.
      </p>
    </div>
  );
}
