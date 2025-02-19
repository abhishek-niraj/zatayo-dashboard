'use client';
import {
  apiCallWithFormData,
  apiRequest,
  apiRequestFoUploadFiles,
} from '@/app/service/apiCall';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const formData = new FormData();

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
const acceptAndRejectImageApi = async (body) => {
  const response = await apiRequest(
    '/fitness/admin/reject-accept-fitness-image',
    'POST',
    body
  );
  if (response.statusCode !== 200) {
    throw new Error(response.message);
  }
  return response;
};

const addFitnessImages = async ({ fitnessSportsId, file }) => {

  const response = await apiRequestFoUploadFiles(
    '/fitness/admin/add-fitness-image',
    { fitnessSportsId },
    file
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
export const useAcceptAndRejectFitnessImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptAndRejectImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['merchantFitness']);
    },
    onError: (error) => {
      console.log('Api error in accept and reject', error);
    },
  });
};

export const useAddFitnessImages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFitnessImages,
    onSuccess: () => {
      queryClient.invalidateQueries('merchantFitness');
    },
    onError: (error) => {
      console.error('Error uploading images:', error);
    },
  });
};
