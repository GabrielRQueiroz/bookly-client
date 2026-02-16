export const config = {
  useMock: process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
};
