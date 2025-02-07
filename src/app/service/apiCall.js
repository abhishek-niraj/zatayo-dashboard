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

  // console.log('--------------');
  // console.log(response);
  // console.log('-----------------');

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};

export const apiCallWithFormData = async (endpoint, body = null) => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('zatayoAppToken')
      : null;

  if (!token) throw new Error('Authorization token is missing');

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const formdata = new FormData();

  if (body) {
    for (const [key, value] of Object.entries(body)) {
      if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formdata.append(key, file, file.name);
        });
      } else {
        formdata.append(key, value);
      }
    }
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);

  // console.log('--------------');
  // console.log(response);
  // console.log('-----------------');

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json(); // Adjust the response handling as per the API response type
};

export const apiRequestForThirdParty = async (endpoint, method = 'GET') => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(endpoint, options);

  console.log('--------------');
  console.log(response);
  console.log('-----------------');

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};
