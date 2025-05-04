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
import { PinProtectionModal } from './PinProtectionModal';

export default function ZohoAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [domain, setDomain] = useState<ZohoDomain>('US');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ZOHO_AUTH_SUCCESS') {
        console.log('Zoho authentication successful, showing session modal');
        setShowModal(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleZohoAuth = async () => {
    setShowPinModal(true);
  };

  const handlePinSuccess = async () => {
    setIsLoading(true);
    try {
      console.log('Initiating Zoho authentication...');
      const response = await fetch(`/api/zoho/auth?domain=${domain}`);
      const { authUrl } = await response.json();
      console.log('Opening auth URL:', authUrl);
      console.log('Zoho auth URL:', authUrl);
      console.log('success:', response.ok, 'status:', response.status);
      console.log("authentication successful, opening session modal");
      
      window.open(authUrl, '_blank');
      console.log("successfully authenticated with zoho, opening session modal");
    } catch (error) {
      console.error('Zoho auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSession = async (email: string, type: ZohoSessionType) => {
    try {
      console.log('Creating Zoho session...', { email, type });
      const response = await fetch('/api/zoho/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerEmail: email, type }),
      });

      const data = await response.json();
      console.log('Session creation response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create session');
      }

      if (data.join_url) {
        console.log('Opening join URL:', data.join_url);
        window.open(data.join_url, '_blank');
      }
    } catch (error) {
      console.error('Session creation failed:', error);
      throw error;
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
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
      </div>

      <PinProtectionModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
      />

      <ZohoSessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreateSession={handleCreateSession}
      />
    </>
  );
}