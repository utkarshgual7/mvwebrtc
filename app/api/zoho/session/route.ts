import { NextRequest, NextResponse } from 'next/server';
import { createZohoSession } from '@/utils/zohoConfig';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('zoho_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated with Zoho' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { customerEmail, type } = body;

    const sessionData = await createZohoSession(
      accessToken,
      customerEmail,
      type
    );

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Failed to create Zoho session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}