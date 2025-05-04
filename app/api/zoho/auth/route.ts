import { NextResponse } from 'next/server';
import { getZohoAuthUrl } from '@/utils/zohoConfig';

export async function GET() {
  try {
    const authUrl = getZohoAuthUrl();
    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Zoho auth URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate auth URL' }, 
      { status: 500 }
    );
  }
}