'use client';
import { IoIosSearch } from 'react-icons/io';

export default function Header({ onMenuClick }) {
  return (
    <div className='sticky top-0 z-50 bg-white'>
      <div className='flex h-14'>
        <div className=' hidden md:block w-52 flex-none text-xl font-bold p-4'>
          Jatayu Dashboard
        </div>

        <div className='pl-3 flex flex-1 bg-white justify-self-start items-center'>
          <button onClick={onMenuClick}>
            <a className='text-3xl' href='#'>
              &#8801;
            </a>
          </button>
          <div className=' pl-5 flex-1 items-center'>
            <div className='pl-5 flex items-center max-w-screen-sm  h-10 rounded-2xl bg-gray-50 w-full'>
              <div className='bg-gray-50'>
                <IoIosSearch />
              </div>
              <input
                type='text'
                placeholder='Search'
                className='p-2 border-none rounded-2xl  bg-gray-50 w-full focus:outline-none'
              ></input>
            </div>
          </div>
          <div className='px-5'>User Profile</div>
        </div>
      </div>
    </div>
  );
}
