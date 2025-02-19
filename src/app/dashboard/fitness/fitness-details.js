'use client';

import InputField from '@/app/components/InputField';
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ImageBaseUrl } from '@/app/utils/apiUrl';
import Image from 'next/image';
import DropdownField from '@/app/components/DropDownComponent';
import { useQrCodeList } from '@/app/hook/admin/qr/qrApi';
import { useUpdateFitnessDetail } from '@/app/hook/merchant/fitness/merchantFitness';
import { useAcceptAndRejectFitnessImage } from '@/app/hook/merchant/fitness/merchantFitness';
import { useQueryClient } from '@tanstack/react-query';
import { useLocationCityList } from '@/app/hook/location/locationApi';
import PopUpModel from '@/app/components/PopUpModel';
import { IoClose } from 'react-icons/io5';
import { updateImageStatus } from '@/features/merchantSport/merchantFitness';
import AddMoreImages from './add-more-images';

export default function FitnessDetails() {
  const [isoCode, setIsoCode] = useState('');
  const { data, isLoading, error } = useQrCodeList();
  const { data: cityData, refetch } = useLocationCityList({
    isoCode: isoCode,
  });
  useEffect(() => {
    if (isoCode) {
      refetch();
    }
  }, [isoCode, refetch]);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const stateData = queryClient.getQueryData(['fetchLocationState']);
  const router = useRouter();
  const updateFitnessMutation = useUpdateFitnessDetail();
  const acceptAndRejectFitnessImageMutation = useAcceptAndRejectFitnessImage();
  const [isShowRejectPopUp, setIsShowRejectPopUp] = useState(false);
  const [isShowAcceptPopUp, setIsShowAcceptPopUp] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState('');
  const handelRejectPopUp = (id = '') => {
    setSelectedImageId(id);
    setIsShowRejectPopUp(!isShowRejectPopUp);
  };
  const handelAcceptPopUp = (id = '') => {
    setSelectedImageId(id);
    setIsShowAcceptPopUp(!isShowAcceptPopUp);
  };

  const handleAddQr = () => {
    setIsShowPopOfAddQr(!isShowPopOfAddQr);
  };
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
  
  useEffect(() => {
    if (fitnessDetails?.selectedState) {
      const selectedOption = stateData?.data?.find(
        (state) => state.name === fitnessDetails.selectedState
      );

      if (selectedOption) {
        setIsoCode(selectedOption.isoCode);
      }
    }
  }, [fitnessDetails?.selectedState, stateData?.data]);
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

  const stateOptions =
    stateData?.data?.map((state) => ({
      value: state.name,
      label: state.name,
      isoCode: state.isoCode,
    })) || [];

  const cityOptions =
    cityData?.data?.map((state) => ({
      value: state.name,
      label: state.name,
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
  const yesRejectImage = async () => {
    const response = await handleAcceptAndRejectImage('0');
    console.log('API Response:', response);
    if (response.statusCode === 200) {
      setIsShowRejectPopUp(false);
      dispatch(
        updateImageStatus({
          imagesFitnessId: selectedImageId,
          newStatus: 'Reject',
        })
      );
      alert(response.message);
    } else {
      alert(response.message);
    }
  };
  const yesAcceptImage = async () => {
    const response = await handleAcceptAndRejectImage('1');
    console.log('API Response:', response);
    if (response.statusCode === 200) {
      setIsShowAcceptPopUp(false);
      dispatch(
        updateImageStatus({
          imagesFitnessId: selectedImageId,
          newStatus: 'Accepted',
        })
      );
      alert(response.message);
    } else {
      alert(response.message);
    }
  };
  const handleAcceptAndRejectImage = async (isReject) => {
    try {
      const body = {
        isReject: isReject,
        imageId: selectedImageId,
      };
      const response = await acceptAndRejectFitnessImageMutation.mutateAsync(
        body
      );

      return response;
    } catch (err) {
      console.error(error);
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
            {/* <InputField
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
            /> */}
            <DropdownField
              label='State'
              value={fitnessDetails.selectedState}
              onChange={(e) => {
                const selectedOption = stateOptions.find(
                  (option) => option.value === e.target.value
                );
                setFitnessDetails({
                  ...fitnessDetails,
                  selectedState: e.target.value,
                });
                setIsoCode(selectedOption.isoCode);
                // refetch();
              }}
              options={stateOptions}
            />
            {/* <InputField
              label='City'
              type='text'
              placeholder='City Name'
              value={fitnessDetails.city}
              onChange={(e) =>
                setFitnessDetails({ ...fitnessDetails, city: e.target.value })
              }
            /> */}

            <DropdownField
              label='City'
              value={fitnessDetails.city}
              onChange={(e) => {
                // const selectedOption = stateOptions.find(
                //   (option) => option.value === e.target.value
                // );
                setFitnessDetails({
                  ...fitnessDetails,
                  city: e.target.value,
                });

                // setIsoCode(selectedOption.isoCode);
                // refetch();
              }}
              options={cityOptions}
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
      <Fragment>
        <div>
          <div className='flex gap-2'>
            <h2 className='text-lg font-semibold mb-2'>Images</h2>
            <AddMoreImages fitnessSportsId={fitnessDetails.id} />
          </div>
          {selectedFitness?.images?.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {selectedFitness.images.map((imageData, index) => (
                <div key={imageData.imagesFitnessId} className=' '>
                  <div className='max-w-sm rounded overflow-hidden shadow-lg'>
                    {/* Image Section */}
                    <div className='relative w-full h-48'>
                      <Image
                        src={`${ImageBaseUrl}/${imageData.image}`}
                        alt={`sport-image-${index}`}
                        layout='fill'
                        style={{ objectFit: 'cover' }}
                        className='rounded-t-md'
                      />
                    </div>

                    {/* Tags Section */}
                    <div className='px-6 pt-4 pb-2'>
                      <div className='flex justify-between'>
                        <div
                          onClick={() =>
                            handelAcceptPopUp(imageData.imagesFitnessId)
                          }
                          className='cursor-pointer inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2'
                        >
                          Accept
                        </div>
                        <div
                          onClick={() =>
                            handelRejectPopUp(imageData.imagesFitnessId)
                          }
                          className=' cursor-pointer inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2'
                        >
                          Reject
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                          {imageData.imageStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 text-sm'>No image available</p>
          )}
        </div>
        {isShowRejectPopUp ? (
          <PopUpModel>
            <div className='px-2'>
              <div className='flex justify-between'>
                <p>Warning</p>
                <div className=' cursor-pointer bg-slate-300 rounded-[100px] h-6 w-6 flex items-center justify-center'>
                  <IoClose onClick={handelRejectPopUp} size={16} />
                </div>
              </div>
              <p>Are you want to reject the image?</p>
              <div className='flex  justify-end mt-5'>
                <div className='flex space-x-3'>
                  <button
                    onClick={yesRejectImage}
                    className='bg-blueButton px-3 py-1 rounded-md text-white'
                  >
                    Yes
                  </button>
                  <button
                    onClick={handelRejectPopUp}
                    className='bg-slate-300 px-3 py-1 rounded-md'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </PopUpModel>
        ) : (
          <></>
        )}

        {isShowAcceptPopUp ? (
          <PopUpModel>
            <div className='px-2'>
              <div className='flex justify-between'>
                <p>Warning</p>
                <div className=' cursor-pointer bg-slate-300 rounded-[100px] h-6 w-6 flex items-center justify-center'>
                  <IoClose onClick={handelAcceptPopUp} size={16} />
                </div>
              </div>
              <p>Are you want to Accept this image?</p>
              <div className='flex  justify-end mt-5'>
                <div className='flex space-x-3'>
                  <button
                    onClick={yesAcceptImage}
                    className='bg-blueButton px-3 py-1 rounded-md text-white'
                  >
                    Yes
                  </button>
                  <button
                    onClick={handelAcceptPopUp}
                    className='bg-slate-300 px-3 py-1 rounded-md'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </PopUpModel>
        ) : (
          <></>
        )}
      </Fragment>

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
