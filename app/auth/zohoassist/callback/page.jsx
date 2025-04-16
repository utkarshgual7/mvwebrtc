"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Success() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [sessionType, setSessionType] = useState("rs");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      // First exchange code for tokens
      const exchangeToken = async () => {
        try {
          const response = await fetch('/api/zoho/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: authCode,
              location: 'IN'
            }),
          });

          if (response.ok) {
            // Close this window after successful token exchange
            window.opener?.postMessage({ type: 'ZOHO_AUTH_SUCCESS' }, '*');
            window.close();
          }
        } catch (error) {
          console.error('Token exchange failed:', error);
        }
      };
      exchangeToken();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-2 p-4">
      <Card className="w-full max-w-md bg-dark-1 text-white border-none">
        <CardHeader>
          <CardTitle>Authenticating with Zoho...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            Please wait while we complete the authentication...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
