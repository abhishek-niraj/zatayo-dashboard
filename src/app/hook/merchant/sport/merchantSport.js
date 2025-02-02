'use client';
import { useQuery } from '@tanstack/react-query';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchMerchantSport = async () => {
  const token = localStorage.getItem('zatayoAppToken');
  const requestBody = JSON.stringify({
    sportId: '', // Make sure to provide valid values
    city: '',
  });
  const response = await fetch(
    `${BASE_URL}/merchant-sports/admin/get-sport-byId`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    }
  );
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to fetch merchant sport data');
  } else {
    return response.json();
  }
};

export const useMerchantSports = () => {
  return useQuery({
    queryKey: ['merchantSports'],
    queryFn: fetchMerchantSport,
  });
};
