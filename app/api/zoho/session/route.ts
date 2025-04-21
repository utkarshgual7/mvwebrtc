import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('zoho_access_token')?.value;

  console.log('Session Creation Attempt:', {
    hasAccessToken: !!accessToken,
    tokenPrefix: accessToken ? accessToken.substring(0, 15) + '...' : 'none'
  });

  if (!accessToken) {
    return NextResponse.json(
      { error: 'No access token found' },
      { status: 401 }
    );
  }

  try {
    const { customerEmail, type } = await request.json();

    // Create session directly
    const response = await fetch('https://assist.zoho.in/api/v2/session', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        customer_email: customerEmail || '',
        type: type || 'rs'
      })
    });

    const responseText = await response.text();
    console.log('Raw Session Response:', responseText);

    let sessionData;
    try {
      sessionData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse session response:', e);
      throw new Error('Invalid response from Zoho API');
    }

    if (!response.ok) {
      console.error('Session Creation Failed:', {
        status: response.status,
        error: sessionData
      });
      throw new Error(sessionData.error?.message || 'Failed to create session');
    }

    return NextResponse.json({
      success: true,
      session: sessionData
    });

  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to create session' },
      { status: 500 }
    );
  }
}