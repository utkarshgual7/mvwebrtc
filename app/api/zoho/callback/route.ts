import { NextRequest, NextResponse } from 'next/server';
import { ZOHO_CONFIG } from '@/utils/zohoConfig';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' }, 
      { status: 400 }
    );
  }

  try {
    const tokenResponse = await fetch(ZOHO_CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: ZOHO_CONFIG.CLIENT_ID,
        client_secret: ZOHO_CONFIG.CLIENT_SECRET,
        redirect_uri: ZOHO_CONFIG.REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Token request failed');
    }

    const tokenData = await tokenResponse.json();

    // Store tokens securely (implement your storage solution)
    // For demo purposes, we'll redirect with a success message
    return NextResponse.redirect(
      `${request.nextUrl.origin}/meeting?zoho=success`
    );
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/meeting?zoho=error`
    );
  }
}