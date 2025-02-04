'use client';
import AddQrModelComponent from '@/app/components/AddQrModelComponent';
import { Fragment, useState } from 'react';
import { IoIosSearch, IoIosAdd } from 'react-icons/io';
export default function QrCodeHeader({ title }) {
  const [isShowPopOfAddQr, setIsShowPopOfAddQr] = useState(false);

  const handleAddQr = () => {
    setIsShowPopOfAddQr(!isShowPopOfAddQr);
  };
  return (
    <Fragment>
      <div className='flex flex-wrap justify-between items-center p-4'>
        <div className='mb-4 md:mb-0'>
          <h1 className='text-lg md:text-xl'>{title}</h1>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='w-full md:w-auto mr-3 h-14 bg-lightGray rounded-[12px] flex items-center'>
            <div className='flex w-full items-center'>
              <input
                type='text'
                placeholder='Search'
                className='flex-1 bg-lightGray px-2 outline-none text-sm'
              />
              <div className='pr-5'>
                <IoIosSearch />
              </div>
            </div>
          </div>
          <div
            className='flex bg-blueButton text-white px-4 py-3 rounded-[10px]
             items-center cursor-pointer'
            onClick={handleAddQr}
          >
            <IoIosAdd size={24} className='text-white' />
            <span className='ml-2 text-sm'>Add QrCode</span>
          </div>
        </div>
      </div>
      <AddQrModelComponent
        isShow={isShowPopOfAddQr}
        setIsShow={setIsShowPopOfAddQr}
      />
    </Fragment>
  );
}
