import SportHeader from '@/app/components/ui/sports/SportHeader';
import SportList from '@/app/components/ui/sports/SportList';

export default function SportsPage() {
  return (
    <div className='h-full flex flex-col'>
      <h1 className='font-semibold py-5'>Sports</h1>
      {/* Table container */}
      <div className='w-full bg-white h-full rounded-[10px] flex flex-col'>
        <SportHeader title='Sport List' />

        {/* Table Data */}
        <div className='flex-1 overflow-hidden mb-5'>
          {/* Scrollable Table Body */}
          <SportList />
        </div>
      </div>
    </div>
  );
}
