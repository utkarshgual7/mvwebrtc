export const ZOHO_DOMAINS = {
  US: 'https://accounts.zoho.com',
  AU: 'https://accounts.zoho.com.au',
  EU: 'https://accounts.zoho.eu',
  IN: 'https://accounts.zoho.in',
  CN: 'https://accounts.zoho.com.cn',
  JP: 'https://accounts.zoho.jp'
} as const;

export type ZohoDomain = keyof typeof ZOHO_DOMAINS;

export interface ZohoTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  api_domain: string;
  token_type: string;
}

export const ZOHO_CONFIG = {
  CLIENT_ID: process.env.ZOHO_CLIENT_ID!,
  CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET!,
  REDIRECT_URI: process.env.ZOHO_REDIRECT_URI!,
  SCOPES: ['ZohoAssist.sessionapi.CREATE']
};

export function getZohoAuthUrl(domain: ZohoDomain = 'IN'): string {
  const baseUrl = ZOHO_DOMAINS[domain];
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: ZOHO_CONFIG.CLIENT_ID,
    scope: ZOHO_CONFIG.SCOPES.join(' '),
    redirect_uri: ZOHO_CONFIG.REDIRECT_URI,
    access_type: 'offline', // This is important for refresh token
    prompt: 'consent'  // Force consent screen to get refresh token
  });

  return `${baseUrl}/oauth/v2/auth?${params.toString()}`;
}

export async function generateZohoTokens(
  code: string,
  location: string
): Promise<ZohoTokenResponse> {
  const domainKey = location.toUpperCase() as ZohoDomain;
  const baseUrl = ZOHO_DOMAINS[domainKey] || ZOHO_DOMAINS.IN;
  
  console.log('Token Generation Started:', {
    baseUrl,
    location,
    code: code.substring(0, 15) + '...',
    clientId: ZOHO_CONFIG.CLIENT_ID,
    redirectUri: ZOHO_CONFIG.REDIRECT_URI
  });

  // Create form data as specified in Zoho docs
  const formData = new URLSearchParams({
    code: code,
    client_id: ZOHO_CONFIG.CLIENT_ID,
    client_secret: ZOHO_CONFIG.CLIENT_SECRET,
    redirect_uri: ZOHO_CONFIG.REDIRECT_URI,
    grant_type: 'authorization_code',
    scope: ZOHO_CONFIG.SCOPES.join(',')
  });

  try {
    const response = await fetch(`${baseUrl}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData.toString()
    });

    const responseText = await response.text();
    console.log('Raw Token Response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse token response:', e);
      throw new Error('Invalid response format from Zoho');
    }

    if (!response.ok) {
      console.error('Token Generation Failed:', {
        status: response.status,
        error: data
      });
      throw new Error(data.error || 'Failed to generate tokens');
    }

    // Validate required fields
    if (!data.access_token) {
      throw new Error('No access token in response');
    }

    console.log('Token Generation Success:', {
      hasAccessToken: !!data.access_token,
      hasRefreshToken: !!data.refresh_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
      apiDomain: data.api_domain
    });

    return data;
  } catch (error) {
    console.error('Token Generation Error:', error);
    throw error;
  }
}

export type ZohoSessionType = 'rs' | 'dm';

export interface ZohoSessionResponse {
  session_id: string;
  join_url: string;
  status: string;
}

// export async function createZohoSession(
//   accessToken: string,
//   customerEmail?: string,
//   type: ZohoSessionType = 'rs'
// ): Promise<ZohoSessionResponse> {
//   const url = new URL('https://assist.zoho.com/api/v2/session');
  
//   if (customerEmail) {
//     url.searchParams.append('customer_email', customerEmail);
//   }
//   url.searchParams.append('type', type);

//   const response = await fetch(url.toString(), {
//     method: 'POST',
//     headers: {
//       'Authorization': `Zoho-oauthtoken ${accessToken}`
//     }
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to create Zoho session: ${response.statusText}`);
//   }

//   return response.json();
// }