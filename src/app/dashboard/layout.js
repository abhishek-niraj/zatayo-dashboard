// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// export default function DashboardLayout({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     if (!isLoggedIn) {
//       router.push('/'); // Redirect to login if not authenticated
//     } else {
//       // Check if the current path is the dashboard root
//       const currentPath = window.location.pathname;
//       if (currentPath === '/dashboard') {
//         router.replace('/dashboard/sports'); // Redirect to sports page
//       }
//     }
//   }, [router]);

//   return (
//     <div>
//       <Header />
//       <div className='flex bg-[#EEEEEE]'>
//         <Sidebar />
//         <div className='flex-1 p-4  bg-[#EEEEEE]'>{children} </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className='h-screen flex flex-col'>
      {/* Header */}
      <Header onMenuClick={toggleSidebar} />

      {/* Content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content */}
        <div className='flex-1 bg-[#EEEEEE] overflow-hidden'>
          {/* Scrollable content */}
          <div className='h-full  px-5 pb-16'>{children}</div>
        </div>
      </div>
    </div>
  );
}
