'use client';
import { useQuery } from '@tanstack/react-query';

const { apiRequest } = require('@/app/service/apiCall');

const fetchMerchantUser = async () => {
  return apiRequest('/merchant/get-all-merchant', 'POST');
};

export const useMerchantUser = () => {
  return useQuery({
    queryKey: ['fetchMerchantUser'],
    queryFn: fetchMerchantUser,
  });
};
