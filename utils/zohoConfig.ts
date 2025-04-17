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
  
  console.log('Token Generation Started:', {
    baseUrl,
    location,
    code: code.substring(0, 15) + '...'
  });

  // Construct form data exactly as specified in docs
  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('client_id', ZOHO_CONFIG.CLIENT_ID);
  formData.append('client_secret', ZOHO_CONFIG.CLIENT_SECRET);
  formData.append('redirect_uri', ZOHO_CONFIG.REDIRECT_URI);
  formData.append('code', code);

  try {
    const response = await fetch(`${baseUrl}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Token Generation Failed:', {
        status: response.status,
        error: data
      });
      throw new Error(data.error || 'Failed to generate tokens');
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