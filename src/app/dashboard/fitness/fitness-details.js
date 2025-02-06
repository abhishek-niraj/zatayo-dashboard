'use client';

import InputField from '@/app/components/InputField';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ImageBaseUrl } from '@/app/utils/apiUrl';
import Image from 'next/image';
import DropdownField from '@/app/components/DropDownComponent';
import { useQrCodeList } from '@/app/hook/admin/qr/qrApi';
import { useUpdateFitnessDetail } from '@/app/hook/merchant/fitness/merchantFitness';
export default function FitnessDetails() {
  const { data, isLoading, error } = useQrCodeList();

  const router = useRouter();
  const updateFitnessMutation = useUpdateFitnessDetail();

  const selectedFitness = useSelector(
    (state) => state.merchantFitness.selectedFitness
  );

  const [qrId, setQrId] = useState('');
  const [qrData, setQrData] = useState({ data: [] }); // Ensure safe default structure

  // Local state for form fields
  const [fitnessDetails, setFitnessDetails] = useState({
    fitnessName: '',
    locationName: '',
    selectedState: '',
    city: '',
    description: '',
    latitude: '',
    longitude: '',
    sportType: '',
    qrNumber: '',
    id: '',
    equipmentList: [],
  });

  useEffect(() => {
    if (selectedFitness) {
      setFitnessDetails({
        fitnessName: selectedFitness.name || '',
        locationName: selectedFitness.locationName || '',
        selectedState: selectedFitness.fitnessState || '',
        city: selectedFitness.fitnessCity || '',
        description: selectedFitness.description || '',
        latitude: selectedFitness.latitude || '',
        longitude: selectedFitness.longitude || '',
        sportType: selectedFitness.sportType || '',
        qrNumber: selectedFitness.qrNumber || '',
        equipmentList: selectedFitness.equipmentData || [],
        id: selectedFitness.fitnessId || '',
      });
    }
  }, [selectedFitness]);

  useEffect(() => {
    if (!selectedFitness) {
      router.replace('/'); // Ensures safe redirection only when necessary
    }
  }, [selectedFitness, router]);

  // Dropdown options for state

  // Safe mapping over qrData
  const qrOptions =
    data?.data?.map((item) => ({
      value: item.qrNumber,
      label: item.qrNumber,
      qrId: item.qrId,
      disabled:
        item.qrNumber === fitnessDetails.qrNumber ||
        item.isAssigned !== 'Not Assigned',
    })) || [];

  const handleSubmit = async () => {
    try {
      const body = {
        description: fitnessDetails.description,
        latitude: fitnessDetails.latitude,
        longitude: fitnessDetails.longitude,
        name: fitnessDetails.fitnessName,
        locationName: fitnessDetails.locationName,
        state: fitnessDetails.selectedState,
        city: fitnessDetails.city,
        qrId: qrId,
        id: fitnessDetails.id,
        // bannerImages: document.getElementById('fileInput').files, // Assuming file input element is present in the DOM
        // equipments: JSON.stringify([
        //   {
        //     equipment: 'Infrared Saunas and Steam Rooms',
        //     description:
        //       'Purpose: Detoxification and relaxation post-workout',
        //   },
        //   {
        //     equipment: 'HydroMassage Beds',
        //     description: 'Adjustable water pressure.',
        //   },
        //   {
        //     equipment: 'Stretching Machines',
        //     description: 'Guided stretching positions.',
        //   },
        // ]),
      };
      await updateFitnessMutation.mutateAsync(body);
      alert('Fitness detail updates successfully ');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Error:{error.message}</p>;
  if (data.statusCode === 400) {
    return <p>Error:{data.message}</p>;
  }
  return (
    <div className='overflow-y-auto h-full pt-9 px-4'>
      <div className='grid grid-flow-row md:grid-flow-col'>
        <div>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <InputField
              label='Fitness Name'
              type='text'
              placeholder='Fitness Name'
              value={fitnessDetails.fitnessName}
              onChange={(e) =>
                setFitnessDetails({
                  ...fitnessDetails,
                  fitnessName: e.target.value,
                })
              }
            />
            <InputField
              label='Location /Area'
              type='text'
              placeholder='Location Area'
              value={fitnessDetails.locationName}
              onChange={(e) =>
                setFitnessDetails({
                  ...fitnessDetails,
                  locationName: e.target.value,
                })
              }
            />
            <InputField
              label='State'
              type='text'
              placeholder='State'
              value={fitnessDetails.selectedState}
              onChange={(e) =>
                setFitnessDetails({
                  ...fitnessDetails,
                  selectedState: e.target.value,
                })
              }
            />
            <InputField
              label='City'
              type='text'
              placeholder='City Name'
              value={fitnessDetails.city}
              onChange={(e) =>
                setFitnessDetails({ ...fitnessDetails, city: e.target.value })
              }
            />
            <InputField
              label='Latitude'
              type='text'
              placeholder='Latitude'
              value={fitnessDetails.latitude}
              onChange={(e) =>
                setFitnessDetails({
                  ...fitnessDetails,
                  latitude: e.target.value,
                })
              }
            />
            <InputField
              label='Longitude'
              type='text'
              placeholder='Longitude'
              value={fitnessDetails.longitude}
              onChange={(e) =>
                setFitnessDetails({
                  ...fitnessDetails,
                  longitude: e.target.value,
                })
              }
            />
            {/* <InputField
              label='QrCode'
              type='text'
              placeholder='QrNumber'
              value={fitnessDetails.qrNumber}
              onChange={(e) =>
                setFitnessDetails({
                  ...fitnessDetails,
                  qrNumber: e.target.value,
                })
              }
            /> */}
            {/* Qr Dropdown */}
            <DropdownField
              label='QrCode'
              value={fitnessDetails.qrNumber}
              onChange={(e) => {
                const selectedOption = qrOptions.find(
                  (option) => option.value === e.target.value
                );
                setFitnessDetails({
                  ...fitnessDetails,
                  qrNumber: e.target.value,
                });
                setQrId(selectedOption.qrId);
              }}
              options={qrOptions}
            />
            <InputField
              label='Description'
              placeholder='Enter description'
              value={fitnessDetails.description}
              onChange={(e) => {
                setFitnessDetails({
                  ...fitnessDetails,
                  description: e.target.value,
                });
              }}
              isTextArea={true} // Enables textarea
            />
          </div>
        </div>
        <div className='pl-2 h-64'>
          <h2 className='text-lg font-semibold'>Equipment List</h2>
          {fitnessDetails.equipmentList.length > 0 ? (
            <div className='h-60 overflow-y-auto pr-2'>
              {fitnessDetails.equipmentList.map((item, index) => (
                <div
                  key={index}
                  className='mb-2 py-2 px-2 bg-slate-50 rounded-md'
                >
                  <div className='text-lg font-semibold'>{item.equipment}</div>
                  <div>{item.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-50 text-sm'>No equipment available.</p>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-lg font-semibold mb-2'>Images</h2>
        {selectedFitness?.images?.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {selectedFitness.images.map((imageData, index) => (
              <div key={index} className='relative w-full h-40'>
                <Image
                  className='rounded-lg object-cover'
                  src={`${ImageBaseUrl}/${imageData.image}`} // Fixed to use `imageData.image`
                  alt={`sport-image-${index}`}
                  layout='fill'
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500 text-sm'>No image available</p>
        )}
      </div>
      <div className='flex'>
        <button
          onClick={() => {
            handleSubmit();
            console.log();
          }}
          className=' ml-auto bg-blueButton text-white px-4 py-2 rounded-[5px]'
        >
          Update
        </button>
      </div>
    </div>
  );
}
