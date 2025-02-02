'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ImageBaseUrl } from '@/app/utils/apiUrl';
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

  // Populate state when selectedSport changes
  useEffect(() => {
    if (selectedSport) {
      setSportName(selectedSport.sportName || '');
      setLocationName(selectedSport.locationName || '');
      setSelectedState(selectedSport.sportState || '');
      setCity(selectedSport.city || '');
      setDescription(selectedSport.description || '');
      setLatitude(selectedSport.latitude || '');
      setLongitude(selectedSport.longitude || '');
      setSportType(selectedSport.sportType || '');
    }
  }, [selectedSport]);

  // Redirect if no sport is selected
  useEffect(() => {
    if (!selectedSport) {
      router.push('/');
    }
  }, [selectedSport, router]);

  return (
    <div className='overflow-y-auto h-full pt-9 px-4'>
      <div className='grid grid-flow-row md:grid-flow-col'>
        <div>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Sport Name */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Sport Name
              </label>
              <input
                type='text'
                placeholder='Sport Name'
                value={sportName}
                onChange={(e) => setSportName(e.target.value)}
                className='w-full p-2 border rounded bg-gray-50 outline-none'
              />
            </div>

            {/* Location/Area */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Location/Area
              </label>
              <input
                type='text'
                placeholder='Location / Area'
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className='w-full p-2 border rounded bg-gray-50 outline-none'
              />
            </div>

            {/* State Dropdown */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                State
              </label>
              <select
                className='w-full p-2 border rounded bg-gray-50 outline-none'
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value='' disabled>
                  Select a State
                </option>
                <option value='california'>California</option>
                <option value='texas'>Texas</option>
                <option value='florida'>Florida</option>
                <option value='new-york'>New York</option>
                <option value='illinois'>Illinois</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                City
              </label>
              <input
                type='text'
                placeholder='City Name'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='w-full p-2 border rounded bg-gray-50 outline-none'
              />
            </div>

            {/* Description */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Description
              </label>
              <input
                type='text'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full p-2 border rounded bg-gray-50 outline-none'
              />
            </div>

            {/* Latitude */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Latitude
              </label>
              <input
                type='text'
                placeholder='Latitude'
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className='w-full p-2 border rounded bg-gray-50 outline-none'
              />
            </div>

            {/* Longitude */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Longitude
              </label>
              <input
                type='text'
                placeholder='Longitude'
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className='w-full p-2 border rounded bg-gray-50 outline-none'
              />
            </div>

            {/* Sport Type */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Sport Type
              </label>
              <input
                type='text'
                placeholder='Sport Type'
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
                className='w-full p-2 border rounded bg-gray-50 outline-none'
              />
            </div>
          </div>
        </div>
        <div>Equipment list</div>
      </div>
      {/* Images */}
      <div>
        <figure className='max-w-1'>
          <img
            className='h-2 max-w-full rounded-lg'
            src={`${ImageBaseUrl}${selectedSport.images[0]['image']}`}
            alt='sport-image'
          ></img>
        </figure>
      </div>
    </div>
  );
}
