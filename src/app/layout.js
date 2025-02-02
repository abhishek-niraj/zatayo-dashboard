'use client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store';
import './globals.css';

// export const metadata = {
//   title: 'Admin Dashboard',
//   description: 'Admin Panel',
// };
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Admin Dashboard</title>
        <meta name='description' content='Admin Panel' />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </body>
    </html>
  );
}

// export default function RootLayout({ children }) {
//   return (
//     <html lang='en'>
//       <body>
//         <QueryClientProvider client={queryClient}>
//           <Provider store={store}>{children}</Provider>
//         </QueryClientProvider>
//       </body>
//     </html>
//   );
// }
