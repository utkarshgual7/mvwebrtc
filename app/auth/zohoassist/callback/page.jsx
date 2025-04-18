"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Starting authentication...");

  useEffect(() => {
    const authCode = searchParams.get("code");
    const location = searchParams.get("location");
    console.log("Auth Flow Started:", { authCode, location });

    if (authCode) {
      const exchangeToken = async () => {
        setStatus("Exchanging authorization code for tokens...");
        try {
          console.log("Sending token exchange request...");
          const response = await fetch('/api/zoho/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: authCode,
              location: location || 'in'
            }),
          });

          const data = await response.json();
          console.log("Token Exchange Response:", {
            success: data.success,
            hasAccessToken: !!data.accessToken,
            redirectUrl: data.redirectUrl
          });

          if (response.ok) {
            setStatus("Authentication successful! Closing window...");
            // Post message to parent window and redirect
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'ZOHO_AUTH_SUCCESS',
                success: true 
              }, '*');
              window.close();
            } else {
              // If opener is not available, redirect
              window.location.href = data.redirectUrl;
            }
          } else {
            throw new Error(data.error || 'Token exchange failed');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          setStatus("Authentication failed. Please try again.");
        }
      };
      exchangeToken();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-2 p-4">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Authenticating with Zoho...</h1>
        <p className="mb-2">{status}</p>
        <p className="text-sm text-gray-400">
          If this page doesn't close automatically, you can close it manually.
        </p>
      </div>
    </div>
  );
}
