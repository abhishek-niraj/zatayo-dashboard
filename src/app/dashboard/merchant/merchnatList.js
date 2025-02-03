'use client';
import { useMerchantUser } from '@/app/hook/admin/merchant/merchnatUser';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
export default function MerchantList() {
  const { data, isLoading, error } = useMerchantUser();
  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>Error:{error.message}</p>;
  return (
    <div className='overflow-y-auto h-full mb-9'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Id
            </th>
            <th scope='col' className='px-6 py-3'>
              Merchant Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Mobile Number
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((merchant) => (
            <tr
              key={merchant.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {merchant.id}
              </th>
              <th
                scope='row'
                className='px-6 py-4  whitespace-nowrap dark:text-white'
              >
                {merchant.name}
              </th>
              <th
                scope='row'
                className='px-6 py-4  whitespace-nowrap dark:text-white'
              >
                {merchant.contactNumber}
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
