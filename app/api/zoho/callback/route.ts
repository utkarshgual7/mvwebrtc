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
// Store the token in a cookie
const response = NextResponse.redirect(
  `${request.nextUrl.origin}/meeting?zoho=success`
);

// Set the access token in an HTTP-only cookie
response.cookies.set('zoho_access_token', tokenData.access_token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: tokenData.expires_in // Token expiration in seconds
});

// If refresh token is provided, store it as well
if (tokenData.refresh_token) {
  response.cookies.set('zoho_grant_token', tokenData.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
}
    // Store tokens securely (implement your storage solution)
    // For demo purposes, we'll redirect with a success message
    return NextResponse.redirect(
      `/zoho/success`
    );
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/meeting?zoho=error`
    );
  }
}