'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ZOHO_DOMAINS, ZohoDomain } from '@/utils/zohoConfig';

export default function ZohoAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState<ZohoDomain>('US');

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

  return (
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
        {isLoading ? 'Connecting...' : 'Connect with Zoho Assist'}
      </Button>
    </div>
  );
}