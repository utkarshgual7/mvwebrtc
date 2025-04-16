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
import { ZohoSessionModal } from './ZohoSessionModal';

export default function ZohoAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [domain, setDomain] = useState<ZohoDomain>('US');

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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ZOHO_AUTH_SUCCESS') {
        setIsAuthenticated(true);
        setShowSessionModal(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleZohoAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/zoho/auth?domain=${domain}`);
      const { authUrl } = await response.json();
      
      // Open auth in a new window
      const authWindow = window.open(
        authUrl,
        'Zoho Authentication',
        'width=600,height=800,left=200,top=200'
      );

      // Check for auth completion
      const checkAuth = setInterval(async () => {
        try {
          if (authWindow?.closed) {
            clearInterval(checkAuth);
            const authCheck = await fetch('/api/zoho/check-auth');
            const { authenticated } = await authCheck.json();
            if (authenticated) {
              setIsAuthenticated(true);
              setShowSessionModal(true);
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }, 1000);
    } catch (error) {
      console.error('Zoho auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSession = async (email: string, type: ZohoSessionType) => {
    try {
      const response = await fetch('/api/zoho/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: email || undefined,
          type,
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
      throw error;
    }
  };

  return (
    <>
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
          <Button 
            onClick={() => setShowSessionModal(true)}
            className="bg-[#19232d] hover:bg-[#4c535b]"
          >
            Create Zoho Session
          </Button>
        )}
      </div>

      <ZohoSessionModal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        onCreateSession={handleCreateSession}
      />
    </>
  );
}