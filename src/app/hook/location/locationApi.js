'use client';
import { apiRequest } from '@/app/service/apiCall';
import { useQuery } from '@tanstack/react-query';

const locationState = async () => {
  const response = await apiRequest('/statesCities/get-states', 'POST');
  if (response.statusCode !== 200) {
    throw new Error(response.message);
  }
  return response;
};
// Fetch Cities based on isoCode
const fetchCities = async (body) => {
  const response = await apiRequest('/statesCities/get-cities', 'POST', body);
  if (response.statusCode !== 200) {
    throw new Error(response.message);
  }
  return response;
};

export const useLocationStateList = () => {
  return useQuery({
    queryKey: ['fetchLocationState'],
    queryFn: locationState,
  });
};

export const useLocationCityList = (body) => {
  return useQuery({
    queryKey: ['fetchLocationCity', body],
    queryFn: () => fetchCities(body),
    enabled: !!body && Object.keys(body).length > 0,
  });
};
