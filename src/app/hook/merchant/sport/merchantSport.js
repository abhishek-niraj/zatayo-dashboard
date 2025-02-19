'use client';
import { apiCallWithFormData } from '@/app/service/apiCall';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

const updateMerchantSport = async (body) => {
  const response = await apiCallWithFormData(
    '/merchant-sports/admin/update-merchant-sport',
    body
  );
  if (response.statusCode !== 200) {
    throw new Error(response.message);
  }
  return response;
};

export const useMerchantSports = () => {
  return useQuery({
    queryKey: ['merchantSports'],
    queryFn: fetchMerchantSport,
  });
};

export const useUpdateMerchantSportDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMerchantSport,
    onSuccess: () => {
      queryClient.invalidateQueries(['merchantSports']);
    },
    onError: (error) => {
      console.error('Api error for merchant sport', error);
    },
  });
};
