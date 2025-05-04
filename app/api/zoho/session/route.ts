import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, generateSessionEmailContent } from '@/utils/emailService';

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

    if (!customerEmail || !type) {
      return NextResponse.json(
        { error: 'Customer email and session type are required' },
        { status: 400 }
      );
    }

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

    const { customer_url, technician_url } = sessionData.representation;

    // Send email to customer with the customer URL
    try {
      const { text, html } = generateSessionEmailContent(customer_url, type);
      await sendEmail({
        to: customerEmail,
        subject: 'Your Zoho Meeting Session is Ready',
        text,
        html,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue with the response even if email fails
    }

    return NextResponse.json({
      success: true,
      session: sessionData,
      join_url: technician_url // Return technician URL to open in new tab
    });

  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to create session' },
      { status: 500 }
    );
  }
}