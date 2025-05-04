// 'use server';

// import { currentUser } from '@clerk/nextjs/server';
// import { StreamClient } from '@stream-io/node-sdk';

// const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

// export const tokenProvider = async () => {
//   const user = await currentUser();

//   if (!user) throw new Error('User is not authenticated');
//   if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
//   if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

//   const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

//   const expirationTime = Math.floor(Date.now() / 1000) + 3600;
//   const issuedAt = Math.floor(Date.now() / 1000) - 60;

//   const token = streamClient.createToken(user.id, expirationTime, issuedAt);

//   return token;
// };


'use server';

import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  // Generate a unique user ID or get it from your auth system
  const userId = crypto.randomUUID(); // Or implement your own user ID logic

  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(userId, expirationTime, issuedAt);

  return token;
};