'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loginUser } from '@/features/auth/authActions';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this code only runs on the client
    setIsClient(true);

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.replace('/dashboard/sports'); // Use replace instead of push
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const actionResult = await dispatch(loginUser({ email, password }));

      if (actionResult.type === 'auth/login/fulfilled') {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/dashboard/sports');
      } else if (actionResult.type === 'auth/login/rejected') {
        console.error(actionResult.payload || 'Login failed');
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
    }
  };

  // Prevent rendering until client-side initialization is complete
  if (!isClient) {
    return null;
  }

  return (
    <div className='bg-slate-900 grid place-content-center h-screen'>
      <div className='p-6'>
        <div className='pt-10 px-20 pb-10 bg-white rounded-[5px] w-full'>
          <div>
            <div className='text-xl font-bold text-center'>
              Login to Account
            </div>
            <h3 className='text-center opacity-80 text-[#202224] text-[16px] font-semibold mt-2'>
              Please enter your email and password to continue
            </h3>
            <div className='flex flex-col gap-4 w-full mt-2'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 border rounded bg-gray-50'
                aria-label='Email'
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-2 border rounded bg-gray-50'
                aria-label='Password'
              />
              <button
                onClick={handleLogin}
                className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                disabled={loading}
                aria-label='Login Button'
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {error && (
                <p
                  className='text-red-500 text-sm'
                  aria-live='polite'
                  role='alert'
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
