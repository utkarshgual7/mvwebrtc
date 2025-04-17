import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('zoho_access_token')?.value;
  const refreshToken = request.cookies.get('zoho_refresh_token')?.value;

  console.log('Session Creation Attempt:', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken
  });

  if (!accessToken) {
    return NextResponse.json(
      { error: 'No access token found' },
      { status: 401 }
    );
  }

  try {
    const { customerEmail, type } = await request.json();

    const response = await fetch('https://assist.zoho.com/api/v2/session', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_email: customerEmail || '',
        type: type || 'rs'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Session Creation Failed:', {
        status: response.status,
        error: data
      });
      throw new Error(data.message || 'Failed to create session');
    }

    return NextResponse.json({
      success: true,
      session: data
    });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}