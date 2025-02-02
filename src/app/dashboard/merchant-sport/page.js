import MerchantSportHeader from './merchat-sport-header';
import MerchantSportList from './merchnat-sport-list';

export default function MerchantSports() {
  return (
    <div className='h-full flex flex-col'>
      <h1 className='font-semibold py-5'>Merchant Sport </h1>
      {/* Table container */}
      <div className='w-full  bg-white h-full rounded-[10px] flex flex-col'>
        <MerchantSportHeader />

        {/* Table Data */}
        <div className='flex-1 overflow-hidden mb-10'>
          {/* Scrollable Table Body */}
          <MerchantSportList />
        </div>
      </div>
    </div>
  );
}
