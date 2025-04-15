'use client';
import { useState } from 'react';
import { Button } from './ui/button';

export default function ZohoAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleZohoAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/zoho/auth');
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Zoho auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleZohoAuth}
      disabled={isLoading}
      className="bg-blue-600 hover:bg-blue-700"
    >
      {isLoading ? 'Connecting...' : 'Connect with Zoho Assist'}
    </Button>
  );
}