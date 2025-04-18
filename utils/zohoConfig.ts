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
  token_type: 'Bearer';
}

export const ZOHO_CONFIG = {
  SCOPE: 'ZohoAssist.sessionapi.CREATE',
  CLIENT_ID: process.env.ZOHO_CLIENT_ID!,
  CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET!,
  REDIRECT_URI: process.env.ZOHO_REDIRECT_URI!
};

export function getZohoAuthUrl(domain: ZohoDomain = 'US') {
  const authUrl = `${ZOHO_DOMAINS[domain]}/oauth/v2/auth`;
  const params = new URLSearchParams({
    scope: ZOHO_CONFIG.SCOPE,
    client_id: ZOHO_CONFIG.CLIENT_ID,
    response_type: 'code',
    access_type: 'online',
    redirect_uri: ZOHO_CONFIG.REDIRECT_URI
  });

  return `${authUrl}?${params.toString()}`;
}

export async function generateZohoTokens(
  code: string,
  location: string
): Promise<ZohoTokenResponse> {
  // Convert location to proper domain key
  const domainKey = location.toUpperCase() as ZohoDomain;
  const baseUrl = ZOHO_DOMAINS[domainKey] || ZOHO_DOMAINS.IN;
  
  console.log('Token Generation Params:', {
    baseUrl,
    location,
    clientId: ZOHO_CONFIG.CLIENT_ID,
    redirectUri: ZOHO_CONFIG.REDIRECT_URI
  });

  const tokenUrl = `${baseUrl}/oauth/v2/token`;

  const formData = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: ZOHO_CONFIG.CLIENT_ID,
    client_secret: ZOHO_CONFIG.CLIENT_SECRET,
    redirect_uri: ZOHO_CONFIG.REDIRECT_URI,
    code: code
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Token Generation Error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorText
    });
    throw new Error(`Token generation failed: ${response.statusText}\n${errorText}`);
  }

  const data = await response.json();
  console.log('Token Generation Success:', {
    hasAccessToken: !!data.access_token,
    hasRefreshToken: !!data.refresh_token,
    expiresIn: data.expires_in
  });

  return data;
}

export type ZohoSessionType = 'rs' | 'dm';

export interface ZohoSessionResponse {
  session_id: string;
  join_url: string;
  status: string;
}

export async function createZohoSession(
  accessToken: string,
  customerEmail?: string,
  type: ZohoSessionType = 'rs'
): Promise<ZohoSessionResponse> {
  const url = new URL('https://assist.zoho.com/api/v2/session');
  
  if (customerEmail) {
    url.searchParams.append('customer_email', customerEmail);
  }
  url.searchParams.append('type', type);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to create Zoho session: ${response.statusText}`);
  }

  return response.json();
}