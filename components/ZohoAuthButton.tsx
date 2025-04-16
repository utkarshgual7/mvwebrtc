'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ZOHO_DOMAINS, ZohoDomain, ZohoSessionType } from '@/utils/zohoConfig';

export default function ZohoAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [domain, setDomain] = useState<ZohoDomain>('US');
  const [sessionType, setSessionType] = useState<ZohoSessionType>('rs');

  // Check if user is authenticated with Zoho
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/zoho/check-auth');
        const { authenticated } = await response.json();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Failed to check auth status:', error);
      }
    };
    checkAuth();
  }, []);

  const handleZohoAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/zoho/auth?domain=${domain}`);
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Zoho auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/zoho/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: sessionType,
        }),
      });

      if (!response.ok) {
        throw new Error(`Session creation failed: ${response.statusText}`);
      }

      const sessionData = await response.json();
      
      if (sessionData.join_url) {
        window.open(sessionData.join_url, '_blank');
      }
    } catch (error) {
      console.error('Failed to create Zoho session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isAuthenticated ? (
        <>
          <Select value={domain} onValueChange={(value: ZohoDomain) => setDomain(value)}>
            <SelectTrigger className="w-[180px] bg-[#19232d] border-none text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-dark-1 border-dark-1">
              {(Object.keys(ZOHO_DOMAINS) as ZohoDomain[]).map((key) => (
                <SelectItem key={key} value={key} className="text-white hover:bg-[#4c535b]">
                  Zoho {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            onClick={handleZohoAuth}
            disabled={isLoading}
            className="bg-[#19232d] hover:bg-[#4c535b]"
          >
            {isLoading ? 'Connecting...' : 'Connect with Zoho'}
          </Button>
        </>
      ) : (
        <>
          <Select value={sessionType} onValueChange={(value: ZohoSessionType) => setSessionType(value)}>
            <SelectTrigger className="w-[180px] bg-[#19232d] border-none text-white">
              <SelectValue placeholder="Session Type" />
            </SelectTrigger>
            <SelectContent className="bg-dark-1 border-dark-1">
              <SelectItem value="rs" className="text-white hover:bg-[#4c535b]">
                Remote Support
              </SelectItem>
              <SelectItem value="dm" className="text-white hover:bg-[#4c535b]">
                Screen Sharing
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={createSession}
            disabled={isLoading}
            className="bg-[#19232d] hover:bg-[#4c535b]"
          >
            {isLoading ? 'Creating Session...' : 'Start Zoho Session'}
          </Button>
        </>
      )}
    </div>
  );
}