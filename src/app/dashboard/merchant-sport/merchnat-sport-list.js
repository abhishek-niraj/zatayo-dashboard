'use client';
import { useMerchantSports } from '@/app/hook/merchant/sport/merchantSport';
import { useDispatch } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { setSelectedSport } from '../../../features/merchantSport/merchnatSportSlice';
export default function MerchantSportList() {
  const { data, isLoading, error } = useMerchantSports();
  const dispatch = useDispatch();
  const router = useRouter();
  if (isLoading) return <p>Loading ....</p>;
  if (error) return <p>Error: {error.message}</p>;
  const handleRowClick = (sport) => {
    dispatch(setSelectedSport(sport));
    router.push(`/dashboard/merchant-sport/${sport.sportId}`);
  };
  return (
    <div className='overflow-y-auto h-full '>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Id
            </th>
            <th scope='col' className='px-6 py-3'>
              Sport Name
            </th>

            <th scope='col' className='px-6 py-3'>
              Description
            </th>
            <th scope='col' className='px-6 py-3'>
              Location
            </th>
            <th scope='col' className='px-6 py-3'>
              State
            </th>
            <th scope='col' className='px-6 py-3'>
              City
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((sport) => (
            <tr
              key={sport.sportId}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200
              hover:bg-slate-50 hover:cursor-pointer
              '
              onClick={() => handleRowClick(sport)} // Navigate to dynamic route
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {sport.sportId}
              </th>
              <th
                scope='row'
                className='px-6 py-4  whitespace-nowrap dark:text-white'
              >
                {sport.sportName}
              </th>
              <td className='px-6 py-4'>{sport.description}</td>
              <td className='px-6 py-4'>{sport.locationName}</td>
              <td className='px-6 py-4'>{sport.sportState}</td>
              <td className='px-6 py-4'>{sport.sportCity}</td>
              <th className=' flex gap-3 px-6 py-4 justify-center text-center items-center '>
                <CiEdit size={25} className='text-[#0373F3]' />

                <RiDeleteBin6Line size={20} className='text-[#EF5B5B]' />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
