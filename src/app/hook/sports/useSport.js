'use client';
import { useQuery } from '@tanstack/react-query';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const fetchSports = async () => {
  const response = await fetch(`${BASE_URL}/sport/get-sport`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch sports data');
  }
  return response.json();
};
 
export const useSports = () => {
  return useQuery({
    queryKey: ['sports'],
    queryFn: fetchSports,
  });
};
