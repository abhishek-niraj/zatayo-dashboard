'use client';
import { apiCallWithFormData, apiRequest } from '@/app/service/apiCall';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchMerchnatFitness = async () => {
  return apiRequest('/fitness/admin/get-fitness/', 'GET');
};

const updateMerchantFitness = async (body) => {
  const response = await apiCallWithFormData(
    '/fitness/admin/update-fitness',
    body
  );
  if (response.statusCode !== 200) {
    throw new Error(response.message);
  }
  return response;
};
export const useMerchantFitness = () => {
  return useQuery({
    queryKey: ['merchantFitness'],
    queryFn: fetchMerchnatFitness,
  });
};

export const useUpdateFitnessDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMerchantFitness,
    onSuccess: () => {
      queryClient.invalidateQueries(['merchantFitness']);
    },
    onError: (error) => {
      console.error('Api error:', error);
    },
  });
};
