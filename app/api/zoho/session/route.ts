import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('zoho_access_token')?.value;
  const refreshToken = request.cookies.get('zoho_refresh_token')?.value;

  console.log('Session API Request:', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    cookies: request.cookies.getAll().map(c => c.name)
  });

  if (!accessToken) {
    console.log('Session creation failed: No access token found');
    return NextResponse.json(
      { error: 'Not authenticated with Zoho' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    console.log('Creating Zoho session with params:', {
      ...body,
      accessTokenPrefix: accessToken.substring(0, 10) + '...'
    });

    const sessionResponse = await fetch('https://assist.zoho.com/api/v2/session', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_email: body.customerEmail,
        type: body.type || 'rs'
      })
    });

    const sessionData = await sessionResponse.json();
    console.log('Zoho Session API Response:', {
      status: sessionResponse.status,
      success: sessionResponse.ok,
      data: sessionData
    });

    if (!sessionResponse.ok) {
      throw new Error(`Session creation failed: ${sessionData.message || sessionResponse.statusText}`);
    }

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}