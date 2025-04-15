export const ZOHO_CONFIG = {
  AUTH_URL: process.env.ZOHO_AUTH_URL || 'https://accounts.zoho.com/oauth/v2/auth',
  TOKEN_URL: process.env.ZOHO_TOKEN_URL || 'https://accounts.zoho.com/oauth/v2/token',
  SCOPE: 'ZohoAssist.users.ALL',
  CLIENT_ID: process.env.ZOHO_CLIENT_ID!,
  CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET!,
  REDIRECT_URI: process.env.ZOHO_REDIRECT_URI!
};

export function getZohoAuthUrl() {
  const params = new URLSearchParams({
    scope: ZOHO_CONFIG.SCOPE,
    client_id: ZOHO_CONFIG.CLIENT_ID,
    response_type: 'code',
    access_type: 'offline',
    redirect_uri: ZOHO_CONFIG.REDIRECT_URI
  });

  return `${ZOHO_CONFIG.AUTH_URL}?${params.toString()}`;
}