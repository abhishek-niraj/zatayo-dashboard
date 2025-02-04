'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/app/service/apiCall';

const fetchQrList = async () => {
  return await apiRequest('/qrCode/get-qr-codes', 'POST');
};

const addQrCode = async (data) => {
  const response = await apiRequest('/qrCode/add-qr-code', 'POST', data);
  if (response.statusCode !== 200) {
    throw new Error(response.message);
  }
  return response;
};
export const useQrCodeList = () => {
  return useQuery({
    queryKey: ['fetchQrList'],
    queryFn: fetchQrList,
  });
};

export const useAddQrCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addQrCode,
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchQrList']);
    },
    onError: (error) => {
      console.error('API Error:', error);
    },
  });
};
