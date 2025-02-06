'use client';
import { CiEdit } from 'react-icons/ci';
import { useMerchantFitness } from '../../hook/merchant/fitness/merchantFitness';
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { setSelectedFitness } from '../../../features/merchantSport/merchantFitness';
export default function MerchnatFitnessList() {
  const { data, isLoading, error } = useMerchantFitness();
  const router = useRouter();
  const dispatch = useDispatch();
  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>Error:{error.message}</p>;
  const handleRowClick = (fitness) => {
    dispatch(setSelectedFitness(fitness));
    router.push(`/dashboard/fitness/${fitness.fitnessId}`);
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
              Fitness Name
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
          {data?.data?.map((fitness) => (
            <tr
              key={fitness.fitnessId}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200
                  hover:bg-slate-50 hover:cursor-pointer
                  '
              onClick={() => handleRowClick(fitness)} // Navigate to dynamic route
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {fitness.fitnessId}
              </th>
              <th
                scope='row'
                className='px-6 py-4  whitespace-nowrap dark:text-white'
              >
                {fitness.name}
              </th>
              <td className='px-6 py-4'>{fitness.description}</td>
              <td className='px-6 py-4'>{fitness.locationName}</td>
              <td className='px-6 py-4'>{fitness.fitnessState}</td>
              <td className='px-6 py-4'>{fitness.fitnessCity}</td>
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
