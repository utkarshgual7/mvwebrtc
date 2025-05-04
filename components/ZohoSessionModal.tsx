'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ZohoSessionType } from '@/utils/zohoConfig';

interface ZohoSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSession: (email: string, type: ZohoSessionType) => Promise<void>;
}

export function ZohoSessionModal({ isOpen, onClose, onCreateSession }: ZohoSessionModalProps) {
  const [email, setEmail] = useState('');
  const [sessionType, setSessionType] = useState<ZohoSessionType>('rs');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onCreateSession(email, sessionType);
      onClose();
    } catch (error) {
      console.error('Failed to create session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-1 text-white">
        <DialogHeader>
          <DialogTitle>Create Zoho Assist Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Email (Optional)</label>
            <Input
              type="email"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#19232d] border-none"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Session Type *</label>
            <Select value={sessionType} onValueChange={(value: ZohoSessionType) => setSessionType(value)}>
              <SelectTrigger className="bg-[#19232d] border-none">
                <SelectValue placeholder="Select session type" />
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
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#19232d] hover:bg-[#4c535b]"
          >
            {isLoading ? 'Creating Session...' : 'Create Session'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}