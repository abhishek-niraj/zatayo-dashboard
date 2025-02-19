'use client';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ImageBaseUrl } from '@/app/utils/apiUrl';
import Image from 'next/image';
import InputField from '@/app/components/InputField'; // Adjust the import path
import DropdownField from '@/app/components/DropDownComponent'; // Adjust the import path
import { useQrCodeList } from '@/app/hook/admin/qr/qrApi';
import { IoClose } from 'react-icons/io5';

import {
  useAcceptAndRejectFitnessImage,
  useUpdateFitnessDetail,
} from '@/app/hook/merchant/fitness/merchantFitness';
import { useQueryClient } from '@tanstack/react-query';
import { useLocationCityList } from '@/app/hook/location/locationApi';
import AddMoreImages from '../fitness/add-more-images';
import PopUpModel from '@/app/components/PopUpModel';
import { updateImageStatus } from '@/features/merchantSport/merchnatSportSlice';

export default function MerchantSportDetail() {
  const [isoCode, setIsoCode] = useState('');
  const router = useRouter();
  const { data, isLoading, error } = useQrCodeList();
  const { data: cityData, refetch } = useLocationCityList({
    isoCode: isoCode,
  });
  const selectedSport = useSelector(
    (state) => state.merchantSport.selectedSport
  );
  useEffect(() => {
    if (isoCode) {
      refetch();
    }
  }, [isoCode, refetch]);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const stateData = queryClient.getQueryData(['fetchLocationState']);
  const updateFitnessMutation = useUpdateFitnessDetail();
  const acceptAndRejectFitnessImageMutation = useAcceptAndRejectFitnessImage();
  const [isShowRejectPopUp, setIsShowRejectPopUp] = useState(false);
  const [isShowAcceptPopUp, setIsShowAcceptPopUp] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState('');

  // Local state for form fields
  const [sportName, setSportName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [sportType, setSportType] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [equipmentList, setEquipmentList] = useState([]);
  const [sportId, setSportId] = useState('');

  const handelRejectPopUp = (id = '') => {
    setSelectedImageId(id);
    setIsShowRejectPopUp(!isShowRejectPopUp);
  };
  const handelAcceptPopUp = (id = '') => {
    setSelectedImageId(id);
    setIsShowAcceptPopUp(!isShowAcceptPopUp);
  };
  // Populate state when selectedSport changes
  useEffect(() => {
    if (selectedSport) {
      setSportName(selectedSport.sportName || '');
      setLocationName(selectedSport.locationName || '');
      setSelectedState(selectedSport.sportState || '');
      setCity(selectedSport.sportCity || '');
      setDescription(selectedSport.description || '');
      setLatitude(selectedSport.latitude || '');
      setLongitude(selectedSport.longitude || '');
      setSportType(selectedSport.sportType || '');
      setEquipmentList(selectedSport.equipmentData || []); // Corrected here
      setSportId(selectedSport.newSportId || '');
    }
  }, [selectedSport]);

  // Redirect if no sport is selected
  useEffect(() => {
    if (!selectedSport) {
      router.push('/');
    }
  }, [selectedSport, router]);
  useEffect(() => {
    if (selectedState) {
      const selectedOption = stateData?.data?.find(
        (state) => state.name === selectedState
      );

      if (selectedOption) {
        setIsoCode(selectedOption.isoCode);
      }
    }
  }, [selectedState, stateData?.data]);
  const qrOptions =
    data?.data?.map((item) => ({
      value: item.qrNumber,
      label: item.qrNumber,
      qrId: item.qrId,
      disabled: item.qrNumber === qrCode || item.isAssigned !== 'Not Assigned',
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

  // const handleSubmit = async () => {
  //   try {
  //     const body = {
  //       description: fitnessDetails.description,
  //       latitude: fitnessDetails.latitude,
  //       longitude: fitnessDetails.longitude,
  //       name: fitnessDetails.fitnessName,
  //       locationName: fitnessDetails.locationName,
  //       state: fitnessDetails.selectedState,
  //       city: fitnessDetails.city,
  //       qrId: qrId,
  //       id: fitnessDetails.id,
  //       // bannerImages: document.getElementById('fileInput').files, // Assuming file input element is present in the DOM
  //       // equipments: JSON.stringify([
  //       //   {
  //       //     equipment: 'Infrared Saunas and Steam Rooms',
  //       //     description:
  //       //       'Purpose: Detoxification and relaxation post-workout',
  //       //   },
  //       //   {
  //       //     equipment: 'HydroMassage Beds',
  //       //     description: 'Adjustable water pressure.',
  //       //   },
  //       //   {
  //       //     equipment: 'Stretching Machines',
  //       //     description: 'Guided stretching positions.',
  //       //   },
  //       // ]),
  //     };
  //     await updateFitnessMutation.mutateAsync(body);
  //     alert('Fitness detail updates successfully ');
  //   } catch (error) {
  //     console.log(error);
  //     alert(error);
  //   }
  // };
  // const yesRejectImage = async () => {
  //   const response = await handleAcceptAndRejectImage('0');
  //   console.log('API Response:', response);
  //   if (response.statusCode === 200) {
  //     setIsShowRejectPopUp(false);
  //     dispatch(
  //       updateImageStatus({
  //         imagesFitnessId: selectedImageId,
  //         newStatus: 'Reject',
  //       })
  //     );
  //     alert(response.message);
  //   } else {
  //     alert(response.message);
  //   }
  // };
  // const yesAcceptImage = async () => {
  //   const response = await handleAcceptAndRejectImage('1');
  //   console.log('API Response:', response);
  //   if (response.statusCode === 200) {
  //     setIsShowAcceptPopUp(false);
  //     dispatch(
  //       updateImageStatus({
  //         imagesFitnessId: selectedImageId,
  //         newStatus: 'Accepted',
  //       })
  //     );
  //     alert(response.message);
  //   } else {
  //     alert(response.message);
  //   }
  // };
  // const handleAcceptAndRejectImage = async (isReject) => {
  //   try {
  //     const body = {
  //       isReject: isReject,
  //       imageId: selectedImageId,
  //     };
  //     const response = await acceptAndRejectFitnessImageMu.mutateAsync(
  //       body
  //     );

  //     return response;
  //   } catch (err) {
  //     console.error(error);
  //     alert(error);
  //   }
  // };

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

  const yesRejectImage = async () => {
    const response = await handleAcceptAndRejectImage('0');
    console.log('API Response:', response);
    if (response.statusCode === 200) {
      setIsShowRejectPopUp(false);
      dispatch(
        updateImageStatus({
          imagesSportId: selectedImageId,
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
          imagesSportId: selectedImageId,
          newStatus: 'Accepted',
        })
      );
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className='overflow-y-auto h-full pt-9 px-4'>
      <div className='grid grid-flow-row md:grid-flow-col'>
        <div>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Sport Name */}
            <InputField
              label='Sport Name'
              type='text'
              placeholder='Sport Name'
              value={sportName}
              onChange={(e) => setSportName(e.target.value)}
            />

            {/* Location/Area */}
            <InputField
              label='Location/Area'
              type='text'
              placeholder='Location / Area'
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />

            {/* State Dropdown */}
            {/* <DropdownField
              label='State'
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              options={stateOptions}
            /> */}

            <DropdownField
              label='State'
              value={selectedState}
              onChange={(e) => {
                const selectedOption = stateOptions.find(
                  (option) => option.value === e.target.value
                );
                setSelectedState(e.target.value);

                setIsoCode(selectedOption.isoCode);
                // refetch();
              }}
              options={stateOptions}
            />

            <DropdownField
              label='City'
              value={city}
              onChange={(e) => {
                // const selectedOption = stateOptions.find(
                //   (option) => option.value === e.target.value
                // );
                setCity(e.target.value);

                // setIsoCode(selectedOption.isoCode);
                // refetch();
              }}
              options={cityOptions}
            />
            {/* Latitude */}
            <InputField
              label='Latitude'
              type='text'
              placeholder='Latitude'
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />

            {/* Longitude */}
            <InputField
              label='Longitude'
              type='text'
              placeholder='Longitude'
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />

            {/* Sport Type */}
            <InputField
              label='Sport Type'
              type='text'
              placeholder='Sport Type'
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
            />
            <DropdownField
              label='QrCode'
              value={qrCode}
              onChange={(e) => {
                const selectedOption = qrOptions.find(
                  (option) => option.value === e.target.value
                );

                // setFitnessDetails({
                //   ...fitnessDetails,
                //   qrNumber: e.target.value,
                // });

                setQrCode(selectedOption.qrId);
              }}
              options={qrOptions}
            />
            {/* Description */}

            <InputField
              label='Description'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isTextArea={true} // Enables textarea
            />
          </div>
        </div>
        <div className='pl-2 h-64'>
          <h2 className='text-lg font-semibold'>Equipment List</h2>
          {equipmentList.length > 0 ? (
            <div className='h-60 overflow-y-auto pr-2'>
              {equipmentList.map((item, index) => (
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
      {/* Images */}
      <Fragment>
        <div>
          <div className='flex gap-2'>
            <h2 className='text-lg font-semibold mb-2'>Images</h2>
            <AddMoreImages fitnessSportsId={sportId} />
          </div>
          {selectedSport?.images?.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {selectedSport.images.map((imageData, index) => (
                <div key={imageData.imagesSportId} className=' '>
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
                            handelAcceptPopUp(imageData.imagesSportId)
                          }
                          className='cursor-pointer inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2'
                        >
                          Accept
                        </div>
                        <div
                          onClick={() =>
                            handelRejectPopUp(imageData.imagesSportId)
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
    </div>
  );
}
