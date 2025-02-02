'use client';
import { useSports } from '@/app/hook/sports/useSport';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function SportList() {
  const { data, isLoading, error } = useSports();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className='overflow-y-auto h-full mb-9'>
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
              State
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((sport) => (
            <tr
              key={sport.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {sport.id}
              </th>
              <th
                scope='row'
                className='px-6 py-4  whitespace-nowrap dark:text-white'
              >
                {sport.name}
              </th>
              <th
                scope='row'
                className='px-6 py-4  whitespace-nowrap dark:text-white'
              >
                {sport.description}
              </th>
              <td className=' flex gap-3 px-6 py-4'>
                <CiEdit size={25} className='text-[#0373F3]' />

                <RiDeleteBin6Line size={20} className='text-[#EF5B5B]' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
