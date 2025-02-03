'use client';
import { apiRequest } from '@/app/service/apiCall';
import { useQuery } from '@tanstack/react-query';

const fetchMerchnatFitness = async () => {
  return apiRequest('/fitness/admin/get-fitness/', 'GET');
};

export const useMerchantFitness = () => {
  return useQuery({
    queryKey: ['merchantFitness'],
    queryFn: fetchMerchnatFitness,
  });
};
