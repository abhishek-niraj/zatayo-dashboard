'use client';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('zatayoAppToken')
      : null;

  if (!token) throw new Error('Authorization token is missing');

  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  console.log('--------------');
  console.log(response);
  console.log('-----------------');

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};
