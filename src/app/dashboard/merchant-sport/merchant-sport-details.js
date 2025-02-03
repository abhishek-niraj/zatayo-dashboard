'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ImageBaseUrl } from '@/app/utils/apiUrl';
import Image from 'next/image';
import InputField from '@/app/components/InputField'; // Adjust the import path
import DropdownField from '@/app/components/DropDownComponent'; // Adjust the import path

export default function MerchantSportDetail() {
  const router = useRouter();
  const selectedSport = useSelector(
    (state) => state.merchantSport.selectedSport
  );

  // Local state for form fields
  const [sportName, setSportName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [sportType, setSportType] = useState('');
  const [equipmentList, setEquipmentList] = useState([]);

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
    }
  }, [selectedSport]);

  // Redirect if no sport is selected
  useEffect(() => {
    if (!selectedSport) {
      router.push('/');
    }
  }, [selectedSport, router]);

  // Dropdown options for state
  const stateOptions = [
    { value: 'california', label: 'California' },
    { value: 'texas', label: 'Texas' },
    { value: 'florida', label: 'Florida' },
    { value: 'new-york', label: 'New York' },
    { value: 'illinois', label: 'Illinois' },
  ];

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

            <InputField
              label='State'
              type='text'
              placeholder='State'
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            />

            {/* City */}
            <InputField
              label='City'
              type='text'
              placeholder='City Name'
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
        <div className='px-5'>
          <h2 className='text-lg font-semibold '>Equipment List</h2>
          {equipmentList.length > 0 ? (
            <div>
              {equipmentList.map((item, index) => (
                <div key={index} className='py-2'>
                  <div className='text-lg font-semibold'> {item.equipment}</div>
                  <div>{item.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <p>No equipment available.</p>
          )}
        </div>
      </div>
      {/* Images */}
      <div>
        <h2 className='text-lg font-semibold mb-2'>Images</h2>
        {selectedSport?.images?.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {selectedSport.images.map((imageData, index) => (
              <div key={index} className='relative w-full h-40'>
                <Image
                  className='rounded-lg object-cover'
                  src={`${ImageBaseUrl}${imageData.image}`} // Fixed to use `imageData.image`
                  alt={`sport-image-${index}`}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500 text-sm'>No image available</p>
        )}
      </div>
    </div>
  );
}
