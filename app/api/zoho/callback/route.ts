import { NextRequest, NextResponse } from 'next/server';
import { generateZohoTokens, ZohoDomain } from '@/utils/zohoConfig';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const domain = (searchParams.get('domain') as ZohoDomain) || 'IN';

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 }
    );
  }

  try {
    const tokenData = await generateZohoTokens(code, domain);

    // Create the response with redirect
    const response = NextResponse.redirect(
      `${request.nextUrl.origin}/meeting?zoho=success`
    );
    console.log('response', response);

    // Set secure HTTP-only cookies for tokens
    response.cookies.set({
      name: 'zoho_access_token',
      value: tokenData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in
    });

    if (tokenData.refresh_token) {
      response.cookies.set({
        name: 'zoho_refresh_token',
        value: tokenData.refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/meeting?zoho=error`
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, location } = await request.json();
    console.log('Token Exchange Started:', { code: !!code, location });

    if (!code) {
      console.log('Token Exchange Failed: No code provided');
      return NextResponse.json(
        { error: 'No authorization code provided' },
        { status: 400 }
      );
    }

    const tokenData = await generateZohoTokens(code, location);
    console.log('Token Generation Success:', {
      hasAccessToken: !!tokenData.access_token,
      hasRefreshToken: !!tokenData.refresh_token,
      expiresIn: tokenData.expires_in
    });
    
    // Create response
    const response = NextResponse.json({ 
      success: true,
      accessToken: tokenData.access_token,
      redirectUrl: '/meeting?zoho=success'
    });

    // Set cookies with appropriate settings
    response.cookies.set({
      name: 'zoho_access_token',
      value: tokenData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokenData.expires_in
    });

    if (tokenData.refresh_token) {
      response.cookies.set({
        name: 'zoho_refresh_token',
        value: tokenData.refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    console.log('Cookies Set Successfully');
    return response;
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Token exchange failed' },
      { status: 500 }
    );
  }
}