// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function Sidebar() {
//   const pathname = usePathname();

//   const menuItems = [
//     { name: 'Sports', path: '/dashboard/sports' },
//     { name: 'Fitness', path: '/dashboard/fitness' },
//   ];

//   return (
//     <div className='hidden md:block'>
//       <div className=' w-52 h-full bg-white text-black flex flex-col'>
//         <nav className='flex-1'>
//           <ul className='space-y-2'>
//             {menuItems.map((item) => (
//               <li key={item.path}>
//                 <Link
//                   href={item.path}
//                   className={`block px-4 py-2
//                   ${
//                     pathname === item.path
//                       ? 'bg-[#4880FF] text-white'
//                       : 'hover:bg-gray-50'
//                   }
//                   ${pathname === item.path ? 'hover:bg-[#4880FF]' : ''}
//                 `}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdSportsTennis,
  MdQrCodeScanner,
  MdFitnessCenter,
  MdSportsVolleyball,
} from 'react-icons/md';
import { LuUserRound } from 'react-icons/lu';

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const menuItems = [
    { icon: <MdSportsTennis />, name: 'Sports', path: '/dashboard/sports' },
    { icon: <MdQrCodeScanner />, name: 'Qr', path: '/dashboard/qr' },
    { icon: <MdFitnessCenter />, name: 'Fitness', path: '/dashboard/fitness' },
    { icon: <LuUserRound />, name: 'Merchant', path: '/dashboard/merchant' },
    {
      icon: <MdSportsVolleyball />,
      name: 'Merchant Sport',
      path: '/dashboard/merchant-sport',
    },
  ];

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
        onClick={onClose} // Close sidebar when overlay is clicked
      ></div>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full  md:mt-0     mt-[56px] w-64 bg-white z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:w-52`}
      >
        <nav className='flex-1'>
          <ul className='space-y-2'>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 ${
                    pathname === item.path
                      ? 'bg-[#4880FF] text-white'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={onClose} // Close sidebar on link click
                >
                  <div className='flex gap-4 items-center'>
                    {item.icon} {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
